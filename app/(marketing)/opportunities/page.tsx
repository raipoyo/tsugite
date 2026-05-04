import Link from 'next/link'

import Card from '@/components/ui/card'
import Container from '@/components/ui/container'

import { MOCK_OPPORTUNITIES } from '@/lib/mock-opportunities'

export default function OpportunitiesPage() {
  return (
    <main className="flex flex-1 flex-col py-12 md:py-16">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          募集一覧
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          現在は開発用モックデータです。正式版では検索フィルターと並び順を強化します。
        </p>

        <div className="mt-10 grid gap-5">
          {MOCK_OPPORTUNITIES.map((o) => (
            <Link key={o.id} href={`/opportunities/${o.id}`}>
              <Card className="p-6 transition hover:border-zinc-300 dark:hover:border-zinc-600">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-zinc-500">
                      {o.craftType}
                    </div>
                    <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {o.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-900">
                    {o.prefecture}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {o.excerpt}
                </p>
                <p className="mt-4 text-xs text-zinc-400">{o.shopName}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
