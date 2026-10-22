import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * A soft spotlight cursor for pointer devices. It grows over interactive
 * elements and hides on touch devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) setVisible(true)
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="active"]')
      setActive(Boolean(interactive))
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [reduced, visible])

  if (reduced) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-9 w-9 rounded-full border border-ember/60 transition-[width,height,opacity] duration-300 ease-cinematic md:block"
        style={{
          opacity: visible ? (active ? 1 : 0.5) : 0,
          width: active ? 44 : 36,
          height: active ? 44 : 36,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[151] hidden h-1.5 w-1.5 rounded-full bg-ember transition-opacity duration-300 md:block"
        style={{ opacity: visible && !active ? 1 : 0 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[151] hidden h-1.5 w-1.5 rounded-full bg-ember transition-opacity duration-300 md:block"
        style={{ opacity: visible && pressed ? 1 : 0 }}
      />
    </>
  )
}
