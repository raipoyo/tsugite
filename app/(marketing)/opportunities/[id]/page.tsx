import Link from 'next/link'
import { notFound } from 'next/navigation'

import Card from '@/components/ui/card'
import Container from '@/components/ui/container'

import { getOpportunityById } from '@/lib/mock-opportunities'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { id } = await params
  const opp = getOpportunityById(id)
  if (!opp) notFound()

  const posted = new Date(opp.postedAtIso).toLocaleDateString('ja-JP')

  return (
    <main className="flex flex-1 flex-col py-12 md:py-16">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{opp.craftType}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {opp.title}
        </h1>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="rounded-lg bg-white px-3 py-1 text-xs shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
            {opp.prefecture}
          </span>
          <span>掲載: {posted}</span>
          <span>{opp.shopName}</span>
        </div>

        <Card className="mt-10 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">概要</h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {opp.description}
          </p>
          <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              処遇メモ（参考）
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{opp.compensationNote}</p>
          </div>
        </Card>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-zinc-900 px-4 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            この募集に応募する（開発中）
          </Link>
          <Link
            href="/opportunities"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-zinc-300 px-4 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            一覧へ戻る
          </Link>
        </div>
      </Container>
    </main>
  )
}
