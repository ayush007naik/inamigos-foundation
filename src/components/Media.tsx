import { useState, type CSSProperties } from 'react'
import { LQIP } from '@/data/lqip'
import { asset, srcSetFor } from '@/lib/utils'

interface MediaProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Optional aspect ratio, e.g. '4 / 5'. Falls back to the intrinsic ratio. */
  ratio?: string
  /** Above-the-fold images load eagerly. */
  priority?: boolean
  style?: CSSProperties
  /** Disable the blur-up (used for small decorative marks). */
  plain?: boolean
  /**
   * Layout width of the image. Drives which responsive variant the browser
   * picks — keep it honest or the image will look soft.
   */
  sizes?: string
}

/**
 * Image primitive with a low-quality-image placeholder and a graceful fade-in
 * once the real asset has decoded.
 */
export function Media({
  src,
  alt,
  className = '',
  imgClassName = '',
  ratio,
  priority = false,
  style,
  plain = false,
  sizes = '100vw',
}: MediaProps) {
  const [loaded, setLoaded] = useState(false)
  const key = src.replace('/img/', '').replace('.webp', '')
  const lqip = LQIP[key]

  const srcSet = srcSetFor(src)

  return (
    <div
      className={`media ${className}`}
      style={{
        ...(ratio ? { aspectRatio: ratio } : null),
        ...(lqip && !plain ? { backgroundImage: `url(${lqip})`, backgroundSize: 'cover', backgroundPosition: 'center' } : null),
        ...style,
      }}
    >
      <img
        src={asset(src)}
        alt={alt}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...{ fetchpriority: priority ? 'high' : 'auto' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${imgClassName} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-out`}
      />
    </div>
  )
}
