import Link from 'next/link'
import type { ReactNode } from 'react'

const navItems = [
  { href: '/app', label: 'Home' },
  { href: '/app/guide', label: 'Guide' },
  { href: '/app/archive', label: 'Archive' },
  { href: '/app/agent', label: 'Agent' },
  { href: '/app/settings/shop', label: 'Settings' },
] as const

export default function MvpAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-washi">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-washi/88 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/app" className="text-lg font-semibold tracking-tight text-ink">
            TSUGITE MVP
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold text-ink-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 hover:bg-white hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/demo/ryokan"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-2"
          >
            デモ導線
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
