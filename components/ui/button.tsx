import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  isLoading?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-shu bg-shu text-white hover:bg-shu-2 active:bg-shu disabled:border-ink-4 disabled:bg-ink-4',
  secondary:
    'border-ink-2 bg-ink-2 text-white hover:bg-ink-3 active:bg-ink disabled:border-ink-4 disabled:bg-ink-4',
  outline:
    'border-washi-3 bg-white text-ink hover:border-ink-4 hover:bg-washi active:bg-washi-2 disabled:text-ink-4',
  ghost:
    'border-transparent bg-transparent text-ink-2 hover:bg-washi active:bg-washi-2 disabled:text-ink-4',
  danger:
    'border-danger bg-danger text-white hover:bg-danger-strong active:bg-danger disabled:border-ink-4 disabled:bg-ink-4',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
}

export default function Button({
  children,
  className,
  disabled,
  isLoading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-semibold leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu disabled:cursor-not-allowed disabled:opacity-70',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      <span>{children}</span>
    </button>
  )
}
