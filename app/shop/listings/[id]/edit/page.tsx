import Link from 'next/link'
import { notFound } from 'next/navigation'

import Button from '@/components/ui/button'
import Container from '@/components/ui/container'

import { getMockListing } from '@/lib/mock-listings'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditListingPage({ params }: Props) {
  const { id } = await params
  const listing = getMockListing(id)
  if (!listing) notFound()

  return (
    <section className="flex flex-col gap-6 py-10">
      <Container className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">募集を編集</h1>
        <p className="mt-2 font-mono text-xs text-zinc-500">{listing.id}</p>
        <form
          action="#"
          className="mt-8 flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <label className="flex flex-col gap-1 text-sm font-medium">
            タイトル
            <input
              defaultValue={listing.title}
              name="title"
              className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <span className="text-zinc-500">状態:</span>
            <span>{listing.status === 'published' ? '公開' : '下書き'}</span>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" disabled aria-disabled title="開発中です">
              保存（開発中）
            </Button>
            <Link
              href="/shop/listings"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              戻る
            </Link>
          </div>
        </form>
      </Container>
    </section>
  )
}
