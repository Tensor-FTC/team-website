import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from './cn'

type NetworkGraphProps = {
  /** Nodes across and down. The logo is 3x3; larger reads better at hero size. */
  columns?: number
  rows?: number
  /** Follow the pointer and fire signals along the edges. */
  interactive?: boolean
  className?: string
}

type Node = {
  /** Resting position, in CSS pixels. */
  baseX: number
  baseY: number
  /** Current position, eased toward base plus pointer offset. */
  x: number
  y: number
  /** 0 = idle, 1 = fully lit. Decays every frame. */
  charge: number
  /** Row index, which picks the colour. */
  row: number
}

type Edge = { a: number; b: number }

/** A pulse of light travelling from one node to another. */
type Signal = { edge: number; t: number; speed: number; reverse: boolean }

/** Row colours, matching the logo top-to-bottom: light blue, navy, white. */
const ROW_COLOURS = ['91, 194, 231', '78, 94, 190', '235, 240, 255']

/** Ambient motion does not need 60fps, and halving the frames halves the cost. */
const TARGET_FPS = 30

/**
 * Devices report dpr up to 3. Rendering a soft, blurred graph at full retina
 * resolution costs 4-9x the fill rate for no visible gain, so cap it.
 */
const MAX_DPR = 1.5

/** Size of the pre-rendered glow sprites, in device pixels. */
const GLOW_SPRITE = 64

/**
 * Builds a radial-gradient sprite once, so the draw loop can `drawImage` it
 * instead of calling `createRadialGradient` for every node on every frame.
 * Gradient creation was by far the most expensive thing this component did.
 */
function makeGlowSprite(rgb: string): HTMLCanvasElement {
  const sprite = document.createElement('canvas')
  sprite.width = GLOW_SPRITE
  sprite.height = GLOW_SPRITE
  const ctx = sprite.getContext('2d')
  if (!ctx) return sprite

  const half = GLOW_SPRITE / 2
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
  gradient.addColorStop(0, `rgba(${rgb}, 1)`)
  gradient.addColorStop(0.5, `rgba(${rgb}, 0.35)`)
  gradient.addColorStop(1, `rgba(${rgb}, 0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, GLOW_SPRITE, GLOW_SPRITE)
  return sprite
}

/**
 * The team mark, alive.
 *
 * A grid of nodes wired together, drawn on a canvas. Signals travel along the
 * edges, and nodes near the pointer brighten and lean toward it. This is the
 * one piece of heavy motion on the site, and it is the logo itself rather than
 * generic decoration.
 *
 * It pauses when scrolled off screen, runs at 30fps, caps its resolution and
 * pre-renders its glows — a school laptop should not spin its fan over a
 * background animation. With reduced motion requested it draws a single static
 * frame: the same network, just still.
 */
export function NetworkGraph({
  columns = 5,
  rows = 3,
  interactive = true,
  className,
}: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const glowSprites = ROW_COLOURS.map(makeGlowSprite)
    const signalSprite = makeGlowSprite('140, 214, 245')

    let nodes: Node[] = []
    let edges: Edge[] = []
    let signals: Signal[] = []
    let width = 0
    let height = 0
    // Pointer position in canvas space, or null when it is away.
    let pointer: { x: number; y: number } | null = null
    let frame = 0
    let lastSpawn = 0
    let lastDraw = 0

    /** Lay the grid out for the canvas's current size. */
    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Inset so nodes and their glow never clip at the edges.
      const padX = width / (columns + 1)
      const padY = height / (rows + 1)
      const stepX = columns > 1 ? (width - padX * 2) / (columns - 1) : 0
      const stepY = rows > 1 ? (height - padY * 2) / (rows - 1) : 0

      nodes = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          // A little jitter keeps it from looking like graph paper. Seeded off
          // the indices so it stays put across resizes.
          const jitterX = Math.sin((r * 7 + c * 13) * 1.7) * stepX * 0.1
          const jitterY = Math.cos((r * 11 + c * 5) * 2.3) * stepY * 0.1
          const baseX = padX + c * stepX + jitterX
          const baseY = padY + r * stepY + jitterY
          nodes.push({ baseX, baseY, x: baseX, y: baseY, charge: 0, row: r })
        }
      }

      // Wire horizontal neighbours, vertical neighbours and both diagonals —
      // the same connection pattern as the logo.
      edges = []
      const at = (r: number, c: number) => r * columns + c
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (c + 1 < columns) edges.push({ a: at(r, c), b: at(r, c + 1) })
          if (r + 1 < rows) {
            edges.push({ a: at(r, c), b: at(r + 1, c) })
            if (c + 1 < columns) edges.push({ a: at(r, c), b: at(r + 1, c + 1) })
            if (c > 0) edges.push({ a: at(r, c), b: at(r + 1, c - 1) })
          }
        }
      }

      signals = []
    }

    const draw = (time: number) => {
      if (running) frame = requestAnimationFrame(draw)

      // Frame-rate cap. Skipping work is much cheaper than doing it twice.
      if (running && time - lastDraw < 1000 / TARGET_FPS) return
      lastDraw = time

      const still = prefersReducedMotion
      ctx.clearRect(0, 0, width, height)

      /* --- nodes drift toward the pointer, then relax back --- */
      for (const node of nodes) {
        let targetX = node.baseX
        let targetY = node.baseY

        if (pointer && !still) {
          const dx = pointer.x - node.baseX
          const dy = pointer.y - node.baseY
          const dist = Math.hypot(dx, dy)
          const reach = Math.min(width, height) * 0.45
          if (dist < reach) {
            const pull = (1 - dist / reach) ** 2
            targetX += dx * pull * 0.22
            targetY += dy * pull * 0.22
            node.charge = Math.max(node.charge, pull)
          }
        }

        node.x += (targetX - node.x) * 0.14
        node.y += (targetY - node.y) * 0.14
        node.charge *= 0.9
      }

      /* --- edges: all the dim ones in a single path, lit ones individually --- */
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(150, 180, 225, 0.1)'
      ctx.beginPath()
      const litEdges: Edge[] = []
      for (const edge of edges) {
        const a = nodes[edge.a]
        const b = nodes[edge.b]
        if (Math.max(a.charge, b.charge) > 0.02) {
          litEdges.push(edge)
          continue
        }
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
      }
      ctx.stroke()

      for (const edge of litEdges) {
        const a = nodes[edge.a]
        const b = nodes[edge.b]
        const lit = Math.max(a.charge, b.charge)
        ctx.strokeStyle = `rgba(150, 180, 225, ${0.1 + lit * 0.5})`
        ctx.lineWidth = 1 + lit * 0.8
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      /* --- signals travelling along edges --- */
      if (!still) {
        // Spawn a new pulse a few times a second.
        if (time - lastSpawn > 320 && signals.length < 10 && edges.length > 0) {
          lastSpawn = time
          signals.push({
            edge: Math.floor(Math.random() * edges.length),
            t: 0,
            speed: 0.012 + Math.random() * 0.016,
            reverse: Math.random() < 0.5,
          })
        }

        signals = signals.filter((signal) => {
          signal.t += signal.speed
          if (signal.t >= 1) {
            // Light the node it arrives at, so pulses feel like they land.
            const edge = edges[signal.edge]
            const target = nodes[signal.reverse ? edge.a : edge.b]
            if (target) target.charge = Math.min(1, target.charge + 0.55)
            return false
          }

          const edge = edges[signal.edge]
          const from = nodes[signal.reverse ? edge.b : edge.a]
          const to = nodes[signal.reverse ? edge.a : edge.b]
          if (!from || !to) return false

          const px = from.x + (to.x - from.x) * signal.t
          const py = from.y + (to.y - from.y) * signal.t
          // Fade in and out so pulses do not pop at the ends.
          ctx.globalAlpha = Math.sin(signal.t * Math.PI) * 0.95
          ctx.drawImage(signalSprite, px - 9, py - 9, 18, 18)
          ctx.globalAlpha = 1

          return true
        })
      }

      /* --- nodes on top --- */
      for (const node of nodes) {
        // A slow breath keeps the graph alive when nothing is happening.
        const breath = still ? 0 : Math.sin(time / 1400 + node.baseX * 0.01) * 0.5 + 0.5
        const radius = 4.5 + node.charge * 3.5 + breath * 0.6

        if (node.charge > 0.04) {
          const halo = radius * 5
          ctx.globalAlpha = node.charge * 0.4
          ctx.drawImage(glowSprites[node.row % glowSprites.length], node.x - halo, node.y - halo, halo * 2, halo * 2)
          ctx.globalAlpha = 1
        }

        ctx.fillStyle = `rgba(${ROW_COLOURS[node.row % ROW_COLOURS.length]}, ${
          0.55 + node.charge * 0.45
        })`
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    /* --- only animate while on screen --- */
    let running = false

    const start = () => {
      if (running || prefersReducedMotion) return
      running = true
      frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    build()
    // One frame is enough when motion is reduced.
    if (prefersReducedMotion) draw(0)

    const onResize = () => {
      build()
      if (prefersReducedMotion) draw(0)
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(canvas)

    // A canvas scrolled far up the page should not keep burning frames.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '120px' },
    )
    visibility.observe(canvas)

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }
    const onPointerLeave = () => {
      pointer = null
    }

    if (interactive && !prefersReducedMotion) {
      // Listen on the window so nodes react as the pointer approaches, not only
      // once it is over the canvas.
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      stop()
      resizeObserver.disconnect()
      visibility.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [columns, rows, interactive, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      // Decorative: the surrounding copy carries the meaning.
      aria-hidden="true"
      className={cn('block size-full', className)}
    />
  )
}
