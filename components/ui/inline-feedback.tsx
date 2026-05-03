import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type FeedbackTone = 'info' | 'success' | 'warning' | 'danger'

type InlineFeedbackProps = {
  children: ReactNode
  className?: string
  tone?: FeedbackTone
  title: string
}

const toneClasses: Record<FeedbackTone, string> = {
  info: 'border-unknown/25 bg-unknown-bg text-unknown',
  success: 'border-success/25 bg-success-bg text-success',
  warning: 'border-warning/25 bg-warning-bg text-warning',
  danger: 'border-danger/25 bg-danger-bg text-danger',
}

export default function InlineFeedback({
  children,
  className,
  title,
  tone = 'info',
}: InlineFeedbackProps) {
  return (
    <div className={cn('rounded-lg border p-4', toneClasses[tone], className)} role="status">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-1 text-sm leading-6">{children}</div>
    </div>
  )
}
