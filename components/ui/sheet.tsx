import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SheetSide = 'bottom' | 'right'

type SheetProps = {
  children: ReactNode
  className?: string
  description?: string
  isPreview?: boolean
  open?: boolean
  side?: SheetSide
  title: string
}

const sideClasses: Record<SheetSide, string> = {
  bottom: 'inset-x-0 bottom-0 max-h-[82svh] rounded-t-lg',
  right: 'bottom-0 right-0 top-0 w-full max-w-md',
}

export default function Sheet({
  children,
  className,
  description,
  isPreview = false,
  open = false,
  side = 'bottom',
  title,
}: SheetProps) {
  if (!open) {
    return null
  }

  const sheet = (
    <aside
      aria-describedby={description ? 'sheet-description' : undefined}
      aria-labelledby="sheet-title"
      aria-modal={isPreview ? undefined : true}
      className={cn(
        'overflow-auto bg-white p-5 shadow-xl',
        isPreview ? 'rounded-lg border border-washi-3' : `fixed ${sideClasses[side]}`,
        className,
      )}
      role="dialog"
    >
      <div className="grid gap-2 border-b border-washi-2 pb-4">
        <h2 className="text-lg font-semibold text-ink" id="sheet-title">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-6 text-ink-4" id="sheet-description">
            {description}
          </p>
        ) : null}
      </div>
      <div className="py-4">{children}</div>
    </aside>
  )

  if (isPreview) {
    return sheet
  }

  return (
    <div className="fixed inset-0 z-40 bg-ink/50" role="presentation">
      {sheet}
    </div>
  )
}
