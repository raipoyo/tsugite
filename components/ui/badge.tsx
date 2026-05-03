import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'unknown' | 'shu'

type BadgeProps = {
  children: ReactNode
  className?: string
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'border-washi-3 bg-washi text-ink-3',
  success: 'border-success/25 bg-success-bg text-success',
  warning: 'border-warning/25 bg-warning-bg text-warning',
  danger: 'border-danger/25 bg-danger-bg text-danger',
  unknown: 'border-unknown/25 bg-unknown-bg text-unknown',
  shu: 'border-shu/25 bg-shu-3 text-shu',
}

export default function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex min-h-7 items-center rounded-md border px-2.5 text-xs font-semibold leading-none',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
