import { cn } from '@/lib/cn'

export type StatusKind = 'completed' | 'incomplete' | 'unknown' | 'loading' | 'error' | 'disabled'

type StatusBadgeProps = {
  className?: string
  status: StatusKind
}

const statusContent: Record<StatusKind, { className: string; label: string; mark: string }> = {
  completed: {
    className: 'border-success/25 bg-success-bg text-success',
    label: '完了',
    mark: '✓',
  },
  incomplete: {
    className: 'border-warning/25 bg-warning-bg text-warning',
    label: '未完了',
    mark: '!',
  },
  unknown: {
    className: 'border-unknown/25 bg-unknown-bg text-unknown',
    label: '判定不能',
    mark: '?',
  },
  loading: {
    className: 'border-ink-4/25 bg-washi text-ink-3',
    label: '判定中',
    mark: '…',
  },
  error: {
    className: 'border-danger/25 bg-danger-bg text-danger',
    label: 'エラー',
    mark: '!',
  },
  disabled: {
    className: 'border-washi-3 bg-washi-2 text-ink-4',
    label: '無効',
    mark: '-',
  },
}

export default function StatusBadge({ className, status }: StatusBadgeProps) {
  const content = statusContent[status]

  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center gap-2 rounded-md border px-2.5 text-xs font-semibold leading-none',
        content.className,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-4 place-items-center rounded-full border border-current text-[10px] leading-none"
      >
        {content.mark}
      </span>
      {content.label}
    </span>
  )
}
