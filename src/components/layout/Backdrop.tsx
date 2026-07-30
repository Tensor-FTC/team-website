/**
 * The fixed backdrop behind every page.
 *
 * A faint engineering grid over the dark canvas, masked so it fades out toward
 * the edges, plus a single low glow behind the top of the page. No animation and
 * no colour washes — the network graph in the hero is where the movement lives.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />

      {/* Blueprint grid, faded out toward the edges. */}
      <div
        className="blueprint absolute inset-0 opacity-70"
        style={{
          maskImage: 'radial-gradient(120% 80% at 50% 0%, black 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, black 10%, transparent 75%)',
        }}
      />

      {/* A cool glow up top, so the header does not sit on flat black. */}
      <div className="absolute -top-64 left-1/2 h-[36rem] w-[80rem] -translate-x-1/2 rounded-full bg-node/20 blur-3xl" />
    </div>
  )
}
