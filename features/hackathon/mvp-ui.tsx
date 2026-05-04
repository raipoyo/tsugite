import Link from 'next/link'
import type { ReactNode } from 'react'

import Badge from '@/components/ui/badge'
import Card from '@/components/ui/card'
import { cn } from '@/lib/cn'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}

export function PageHeader({ actions, description, eyebrow, title }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-ink px-6 py-8 text-white shadow-sm md:px-10 md:py-12">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(185,80,59,0.42),transparent_62%)]" />
      <div className="relative max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-shu-3">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 md:text-lg">{description}</p>
        {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  )
}

type LinkButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function LinkButton({ children, href, variant = 'primary' }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu',
        variant === 'primary' && 'bg-shu text-white hover:bg-shu-2',
        variant === 'secondary' &&
          'border border-white/25 bg-white/10 text-white hover:bg-white/15',
        variant === 'ghost' && 'border border-ink/10 bg-white text-ink hover:bg-washi',
      )}
    >
      {children}
    </Link>
  )
}

type MvpCardProps = {
  title: string
  description: string
  href?: string
  badge?: string
  meta?: string
  children?: ReactNode
}

export function MvpCard({ badge, children, description, href, meta, title }: MvpCardProps) {
  const content = (
    <Card className="group h-full p-5 transition hover:-translate-y-0.5 hover:border-shu/35 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          {meta ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-4">{meta}</p>
          ) : null}
          <h2 className="mt-2 text-xl font-semibold text-ink">{title}</h2>
        </div>
        {badge ? <Badge tone="shu">{badge}</Badge> : null}
      </div>
      <p className="mt-3 text-sm leading-7 text-ink-3">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </Card>
  )

  if (!href) return content

  return (
    <Link
      href={href}
      className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu"
    >
      {content}
    </Link>
  )
}

type StatCardProps = {
  label: string
  value: string
  note: string
}

export function StatCard({ label, note, value }: StatCardProps) {
  return (
    <Card className="p-5">
      <p className="text-sm text-ink-4">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs font-medium text-shu">{note}</p>
    </Card>
  )
}

export function SectionTitle({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{children}</h2>
      {note ? <p className="text-sm text-ink-4">{note}</p> : null}
    </div>
  )
}
