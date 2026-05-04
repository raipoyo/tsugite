import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  helperText?: string
  label: string
}

export default function Input({ className, error, helperText, id, label, ...props }: InputProps) {
  const inputId = id ?? label
  const descriptionId = `${inputId}-description`

  return (
    <label className="grid gap-2 text-sm font-medium text-ink" htmlFor={inputId}>
      <span>{label}</span>
      <input
        aria-describedby={error || helperText ? descriptionId : undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          'min-h-11 w-full rounded-md border border-washi-3 bg-white px-3 text-base text-ink shadow-xs transition-colors placeholder:text-ink-4 hover:border-ink-4 focus:border-shu focus:outline-2 focus:outline-offset-2 focus:outline-shu disabled:cursor-not-allowed disabled:bg-washi disabled:text-ink-4',
          error ? 'border-danger bg-danger-bg/40 focus:border-danger focus:outline-danger' : '',
          className,
        )}
        id={inputId}
        {...props}
      />
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
