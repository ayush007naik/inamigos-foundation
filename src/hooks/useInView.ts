import { useEffect, useRef, useState } from 'react'

interface Options {
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number
  /** Root margin — negative bottom delays the trigger until the element is well in view. */
  rootMargin?: string
  /** Fire once and then stop observing. */
  once?: boolean
}

/**
 * Returns whether the referenced element has entered the viewport.
 * Used to drive scroll-triggered reveals throughout the site.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
