import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TabItem = {
  content: ReactNode
  label: string
  value: string
}

type TabsProps = {
  activeValue: string
  className?: string
  items: TabItem[]
}

export default function Tabs({ activeValue, className, items }: TabsProps) {
  const activeItem = items.find((item) => item.value === activeValue) ?? items[0]

  return (
    <div className={cn('grid gap-4', className)}>
      <div
        aria-label="表示切替"
        className="inline-flex w-full gap-1 rounded-md border border-washi-3 bg-washi p-1 sm:w-fit"
        role="tablist"
      >
        {items.map((item) => {
          const isActive = item.value === activeItem.value

          return (
            <button
              aria-selected={isActive}
              className={cn(
                'min-h-10 flex-1 rounded-sm px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu sm:flex-none',
                isActive
                  ? 'bg-white text-ink shadow-xs'
                  : 'text-ink-4 hover:bg-white/70 hover:text-ink',
              )}
              key={item.value}
              role="tab"
              type="button"
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="text-sm leading-6 text-ink-3" role="tabpanel">
        {activeItem.content}
      </div>
    </div>
  )
}
