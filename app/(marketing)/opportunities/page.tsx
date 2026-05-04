import Link from 'next/link'

import Card from '@/components/ui/card'
import Container from '@/components/ui/container'

import { MOCK_OPPORTUNITIES } from '@/lib/mock-opportunities'

export default function OpportunitiesPage() {
  return (
    <main className="flex flex-1 flex-col py-12 md:py-16">
      <Container>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink">募集一覧</h1>
        <p className="mt-3 max-w-2xl text-ink-3">
          現在は開発用モックデータです。正式版では検索フィルターと並び順を強化します。
        </p>

        <div className="mt-10 grid gap-5">
          {MOCK_OPPORTUNITIES.map((o) => (
            <Link key={o.id} href={`/opportunities/${o.id}`}>
              <Card className="p-6 transition hover:-translate-y-0.5 hover:border-shu/35 hover:shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-4">
                      {o.craftType}
                    </div>
                    <h2 className="mt-1 text-lg font-semibold text-ink">{o.title}</h2>
                  </div>
                  <span className="rounded-full bg-shu-3 px-3 py-1 text-xs font-medium text-shu">
                    {o.prefecture}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">{o.excerpt}</p>
                <p className="mt-4 text-xs text-ink-4">{o.shopName}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
