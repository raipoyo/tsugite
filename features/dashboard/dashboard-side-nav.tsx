'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
}

type DashboardSideNavProps = {
  title: string
  items: NavItem[]
}

export default function DashboardSideNav({ title, items }: DashboardSideNavProps) {
  const pathname = usePathname()

  return (
    <aside className="w-full shrink-0 border-b border-zinc-200 bg-white md:w-52 md:border-b-0 md:border-r dark:border-zinc-800 dark:bg-zinc-950">
      <div className="p-6">
        <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">{title}</div>
      </div>
      <nav className="flex flex-row gap-1 overflow-x-auto px-4 pb-4 md:flex-col md:px-2 md:pb-8">
        {items.map(({ href, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm md:whitespace-normal ${
                active
                  ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900/70'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
