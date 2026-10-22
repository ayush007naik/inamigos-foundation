import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Renders the title as an h2 by default. */
  as?: 'h1' | 'h2' | 'h3'
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  as: Tag = 'h2',
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'items-start',
        action ? 'md:flex-row md:items-end md:justify-between md:gap-12' : '',
        className
      )}
    >
      <Reveal className={cn('flex flex-col gap-5', align === 'center' ? 'items-center' : 'items-start')}>
        {eyebrow && (
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <Tag className="display text-balance max-w-[20ch] text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] text-bone">
          {title}
        </Tag>
        {description && (
          <p className="lede max-w-[54ch] text-pretty">{description}</p>
        )}
      </Reveal>
      {action && (
        <Reveal delay={0.12} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
