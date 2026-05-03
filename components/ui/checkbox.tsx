import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  description?: string
  label: ReactNode
}

export default function Checkbox({ className, description, id, label, ...props }: CheckboxProps) {
  const checkboxId = id ?? String(label)

  return (
    <label className="flex min-h-11 items-start gap-3 text-sm text-ink" htmlFor={checkboxId}>
      <input
        className={cn(
          'mt-0.5 size-5 rounded border-washi-3 bg-white accent-shu focus:outline-2 focus:outline-offset-2 focus:outline-shu disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
        id={checkboxId}
        type="checkbox"
        {...props}
      />
      <span className="grid gap-1">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-xs leading-5 text-ink-4">{description}</span> : null}
      </span>
    </label>
  )
}
