'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Container from '@/components/ui/container'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/lib/roles'

export default function SiteHeader() {
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()
        const r = data?.role
        setRole(r === 'shop' || r === 'successor' ? r : null)
      } else {
        setRole(null)
      }
      setReady(true)
    }

    void load()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void load()
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          TSUGITE
        </Link>

        {!ready ? (
          <span
            className="h-9 min-w-[8rem] max-w-[10rem] flex-1 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
            aria-hidden
          />
        ) : (
          <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <Link className="hover:text-zinc-950 dark:hover:text-white" href="/opportunities">
              募集
            </Link>
            <Link className="hover:text-zinc-950 dark:hover:text-white" href="/demo/ryokan">
              デモ
            </Link>
            <Link className="hover:text-zinc-950 dark:hover:text-white" href="/app">
              MVP
            </Link>
            {userId ? (
              <AuthenticatedNavLinks role={role} />
            ) : (
              <Link className="hover:text-zinc-950 dark:hover:text-white" href="/login">
                ログイン
              </Link>
            )}
          </nav>
        )}
      </Container>
    </header>
  )
}

function AuthenticatedNavLinks({ role }: { role: UserRole | null }) {
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
      <SignOutControl />
    </>
  )
}

function SignOutControl() {
  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.assign('/')
  }

  return (
    <button
      type="button"
      className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
      onClick={() => void signOut()}
    >
      ログアウト
    </button>
  )
}
