import Link from 'next/link'

import Card from '@/components/ui/card'
import Container from '@/components/ui/container'

import { MOCK_OPPORTUNITIES } from '@/lib/mock-opportunities'

export default function SuccessorDashboardPage() {
  const picks = MOCK_OPPORTUNITIES.slice(0, 2)

  return (
    <section className="flex flex-col gap-10 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">継ぎ手ホーム</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          注目の公開募集モックです。実データは次のクエリレイヤーを刺して差し替えます。
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {picks.map((o) => (
            <Link key={o.id} href={`/opportunities/${o.id}`}>
              <Card className="h-full transition hover:border-zinc-300 dark:hover:border-zinc-600">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{o.craftType}</div>
                <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {o.title}
                </h2>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{o.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
          <p className="font-medium text-zinc-900 dark:text-zinc-50">応募状況ダミー</p>
          <p className="mt-2">
            提出済み応募モック値: <span className="tabular-nums">2</span> 件／返信済みモック値:{' '}
            <span className="tabular-nums">1</span> 件
          </p>
        </div>
      </Container>
    </section>
  )
}
