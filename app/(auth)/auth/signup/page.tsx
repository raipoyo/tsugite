import Link from 'next/link'

import Card from '@/components/ui/card'
import Container from '@/components/ui/container'

export default function AuthSignupPage() {
  return (
    <main className="flex flex-1 flex-col bg-washi py-16">
      <Container className="max-w-lg">
        <h1 className="text-center text-2xl font-semibold tracking-tight text-ink">
          アカウント登録
        </h1>
        <p className="mt-4 text-center text-sm leading-relaxed text-ink-3">
          登録後にロールを選んでいただきます。
        </p>
        <Card className="mt-10 p-8">
          <p className="text-sm leading-relaxed text-ink-3">
            メールアドレスを使ったMagic Link認証を準備中です。
            すでにアカウントをお持ちの場合は
            <Link className="font-semibold text-shu underline underline-offset-4" href="/login">
              ログイン
            </Link>
            からお進みください。
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-shu px-4 text-sm font-semibold text-white transition hover:bg-shu-2"
            >
              ログイン
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-washi-3 px-4 text-sm font-medium text-ink transition hover:bg-washi"
            >
              トップへ戻る
            </Link>
          </div>
        </Card>
      </Container>
    </main>
  )
}
