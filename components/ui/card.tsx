import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <section className={cn('rounded-lg border border-washi-3 bg-white shadow-sm', className)}>
      {children}
    </section>
  )
}
