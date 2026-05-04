import Link from 'next/link'

import Card from '@/components/ui/card'
import { LinkButton, PageHeader } from '@/features/hackathon/mvp-ui'

export default function AuthSignupPage() {
  return (
    <main className="min-h-full bg-washi px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          eyebrow="Demo auth"
          title="ハッカソンでは仮ログインで進む"
          description="本番はSupabase AuthのMagic Linkに寄せる。デモでは認証で詰まらないよう、アプリ本体へ直接入れる導線を優先する。"
          actions={<LinkButton href="/app">アプリへ入る</LinkButton>}
        />
        <Card className="p-6">
          <h1 className="text-xl font-semibold text-ink">本番実装メモ</h1>
          <p className="mt-3 text-sm leading-7 text-ink-3">
            Supabase Authのメールリンクを接続し、初回ログイン後に{' '}
            <Link className="font-semibold text-shu underline" href="/auth/role">
              /auth/role
            </Link>{' '}
            で役割を選ばせる。
          </p>
        </Card>
      </div>
    </main>
  )
}
