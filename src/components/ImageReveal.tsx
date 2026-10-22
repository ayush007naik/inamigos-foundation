import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Media } from '@/components/Media'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  ratio?: string
  priority?: boolean
  /** How far the image drifts against the scroll, in percent. */
  parallax?: number
  /** Delay before the reveal begins, in seconds. */
  delay?: number
}

/**
 * An image that wipes open as it enters the viewport while drifting gently
 * against the scroll — the workhorse of the editorial sections.
 */
export function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  ratio,
  priority = false,
  parallax = 8,
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${parallax}%`, `${-parallax}%`])

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? undefined : { clipPath: 'inset(0% 0% 100% 0%)' }}
        whileInView={reduced ? undefined : { clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.25, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute -inset-y-[14%] inset-x-0"
          style={reduced ? undefined : { y }}
        >
          <Media
            src={src}
            alt={alt}
            priority={priority}
            className="h-full w-full"
            imgClassName={imgClassName}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
