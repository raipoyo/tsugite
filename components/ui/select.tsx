import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode
  error?: string
  helperText?: string
  label: string
}

export default function Select({
  children,
  className,
  error,
  helperText,
  id,
  label,
  ...props
}: SelectProps) {
  const selectId = id ?? label
  const descriptionId = `${selectId}-description`

  return (
    <label className="grid gap-2 text-sm font-medium text-ink" htmlFor={selectId}>
      <span>{label}</span>
      <select
        aria-describedby={error || helperText ? descriptionId : undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          'min-h-11 w-full rounded-md border border-washi-3 bg-white px-3 text-base text-ink shadow-xs transition-colors hover:border-ink-4 focus:border-shu focus:outline-2 focus:outline-offset-2 focus:outline-shu disabled:cursor-not-allowed disabled:bg-washi disabled:text-ink-4',
          error ? 'border-danger bg-danger-bg/40 focus:border-danger focus:outline-danger' : '',
          className,
        )}
        id={selectId}
        {...props}
      >
        {children}
      </select>
      {error || helperText ? (
        <span
          className={cn('text-xs leading-5', error ? 'text-danger' : 'text-ink-4')}
          id={descriptionId}
        >
          {error ?? helperText}
        </span>
      ) : null}
    </label>
  )
}
