import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
  helperText?: string
  label: string
}

export default function Textarea({
  className,
  error,
  helperText,
  id,
  label,
  ...props
}: TextareaProps) {
  const textareaId = id ?? label
  const descriptionId = `${textareaId}-description`

  return (
    <label className="grid gap-2 text-sm font-medium text-ink" htmlFor={textareaId}>
      <span>{label}</span>
      <textarea
        aria-describedby={error || helperText ? descriptionId : undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          'min-h-28 w-full resize-y rounded-md border border-washi-3 bg-white px-3 py-2 text-base text-ink shadow-xs transition-colors placeholder:text-ink-4 hover:border-ink-4 focus:border-shu focus:outline-2 focus:outline-offset-2 focus:outline-shu disabled:cursor-not-allowed disabled:bg-washi disabled:text-ink-4',
          error ? 'border-danger bg-danger-bg/40 focus:border-danger focus:outline-danger' : '',
          className,
        )}
        id={textareaId}
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
