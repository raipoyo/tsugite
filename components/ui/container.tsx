import type { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<{
  className?: string
}>

export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>{children}</div>
}
