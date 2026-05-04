'use client'

import { useAuth, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

import Container from '@/components/ui/container'

import { parseUserRole } from '@/lib/roles'

export default function SiteHeader() {
  const { isLoaded, userId } = useAuth()

  return (
    <header className="border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          TSUGITE
        </Link>

        {!isLoaded ? (
          <span
            className="h-9 flex-1 min-w-[8rem] max-w-[10rem] animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
            aria-hidden
          />
        ) : (
          <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <Link className="hover:text-zinc-950 dark:hover:text-white" href="/opportunities">
              募集
            </Link>
            {userId ? (
              <AuthenticatedNavLinks />
            ) : (
              <Link className="hover:text-zinc-950 dark:hover:text-white" href="/sign-in">
                ログイン
              </Link>
            )}
          </nav>
        )}
      </Container>
    </header>
  )
}

function AuthenticatedNavLinks() {
  const { user } = useUser()
  const role = parseUserRole(user?.publicMetadata as Record<string, unknown> | undefined)

  return (
    <>
      {role === 'shop' ? (
        <Link className="hover:text-zinc-950 dark:hover:text-white" href="/shop">
          ダッシュボード（店）
        </Link>
      ) : null}
      {role === 'successor' ? (
        <Link className="hover:text-zinc-950 dark:hover:text-white" href="/successor">
          ダッシュボード（継ぎ手）
        </Link>
      ) : null}
      {!role ? (
        <Link className="hover:text-zinc-950 dark:hover:text-white" href="/onboarding/role">
          はじめる
        </Link>
      ) : null}
      <UserButton />
    </>
  )
}
