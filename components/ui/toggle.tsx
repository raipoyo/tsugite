import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  description?: string
  label: ReactNode
}

export default function Toggle({ className, description, id, label, ...props }: ToggleProps) {
  const toggleId = id ?? String(label)

  return (
    <label
      className="flex min-h-11 items-center justify-between gap-4 text-sm text-ink"
      htmlFor={toggleId}
    >
      <span className="grid gap-1">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-xs leading-5 text-ink-4">{description}</span> : null}
      </span>
      <input
        className={cn('peer sr-only', className)}
        id={toggleId}
        role="switch"
        type="checkbox"
        {...props}
      />
      <span
        aria-hidden="true"
        className="relative h-7 w-12 shrink-0 rounded-full bg-washi-3 transition-colors after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-success peer-checked:after:translate-x-5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-shu peer-disabled:opacity-60"
      />
    </label>
  )
}
