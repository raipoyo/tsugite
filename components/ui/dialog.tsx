import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type DialogProps = {
  actions?: ReactNode
  children: ReactNode
  className?: string
  description?: string
  isPreview?: boolean
  open?: boolean
  title: string
}

export default function Dialog({
  actions,
  children,
  className,
  description,
  isPreview = false,
  open = false,
  title,
}: DialogProps) {
  if (!open) {
    return null
  }

  const dialog = (
    <section
      aria-describedby={description ? 'dialog-description' : undefined}
      aria-labelledby="dialog-title"
      aria-modal={isPreview ? undefined : true}
      className={cn('w-full max-w-lg rounded-lg bg-white p-5 shadow-xl', className)}
      role="dialog"
    >
      <div className="grid gap-2 border-b border-washi-2 pb-4">
        <h2 className="text-lg font-semibold text-ink" id="dialog-title">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-6 text-ink-4" id="dialog-description">
            {description}
          </p>
        ) : null}
      </div>
      <div className="py-4 text-sm leading-6 text-ink-3">{children}</div>
      {actions ? <div className="flex flex-wrap justify-end gap-2">{actions}</div> : null}
    </section>
  )

  if (isPreview) {
    return dialog
  }

  return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4">{dialog}</div>
}
