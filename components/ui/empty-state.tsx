import type { ReactNode } from 'react'

type EmptyStateProps = {
  action?: ReactNode
  description: string
  title: string
}

export default function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="grid min-h-48 place-items-center rounded-lg border border-dashed border-washi-3 bg-washi p-6 text-center">
      <div className="grid max-w-sm gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <p className="text-sm leading-6 text-ink-4">{description}</p>
        {action ? <div className="justify-self-center">{action}</div> : null}
      </div>
    </div>
  )
}
