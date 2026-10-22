import { useCountUp } from '@/hooks/useCountUp'
import { formatIndian } from '@/lib/utils'

interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function Counter({ value, suffix = '', prefix = '', duration = 1900, className = '' }: CounterProps) {
  const { ref, value: current } = useCountUp(value, { duration })
  const formatted = value >= 1000 ? formatIndian(Math.round(current)) : Math.round(current).toLocaleString('en-IN')

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
