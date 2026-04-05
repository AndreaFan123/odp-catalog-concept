import { useEffect, useState } from 'react'

/**
 * Returns the current window.innerWidth, updated on resize.
 * Initializes to window.innerWidth (this project has no SSR).
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export const BP_TABLET  = 768
export const BP_DESKTOP = 1024
