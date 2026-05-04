import Container from '@/components/ui/container'

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col py-12 md:py-16">
      <Container className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-zinc-700 md:text-base dark:text-zinc-300">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          プライバシーポリシー（ドラフト）
        </h1>
        <p>
          認証機能には Clerk が使われます。ユーザー登録および認証処理のためにメールやデバイス情報が
          Clerk 側でも取り扱われます。 サービス側が取得するログ・イベントは今後の版で列挙します。
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">収集項目（例）</h2>
        <ul className="list-inside list-disc space-y-3 text-zinc-600 dark:text-zinc-400">
          <li>ログインおよびセッション管理に必要な識別子</li>
          <li>プロフィール表示にユーザーが入力する任意の項目</li>
          <li>サポートおよび不正利用検知アクセスログ</li>
        </ul>
      </Container>
    </main>
  )
}
