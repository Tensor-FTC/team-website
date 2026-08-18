import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a CSS media query and re-renders when it flips.
 *
 * Used for the things CSS cannot express on its own — deciding whether to mount
 * a pointer-driven effect at all, rather than mounting it and hiding it.
 *
 * `useSyncExternalStore` is the right shape for this: `matchMedia` is an
 * external store, so React reads it directly rather than mirroring it into
 * state and keeping the copy in sync from an effect.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onStoreChange)
      return () => mediaQuery.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // This site is client-rendered; the fallback only matters if that changes.
    () => false,
  )
}

/**
 * True when the visitor has a mouse or trackpad.
 *
 * Hover- and cursor-driven effects (the magnetic buttons, the card spotlight)
 * are pointless on a phone — worse than pointless, since they cost work on the
 * device least able to spare it. Everything gated on this degrades to a plain,
 * fully usable control.
 */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
