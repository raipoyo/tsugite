import Link from 'next/link'

import Button from '@/components/ui/button'
import Container from '@/components/ui/container'

export default function NewListingPage() {
  return (
    <section className="flex flex-col gap-6 py-10">
      <Container className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">新しい募集</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          UI のみです。送信しても一覧には反映されません（バックエンド未接続）。
        </p>
        <form
          action="#"
          className="mt-8 flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <label className="flex flex-col gap-1 text-sm font-medium">
            タイトル
            <input
              name="title"
              placeholder="伝統木工・見習い募集"
              required
              className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            ひとこと説明
            <textarea
              name="intro"
              rows={4}
              required
              className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button type="button" disabled aria-disabled title="開発中です">
              下書き保存（開発中）
            </Button>
            <Link
              href="/shop/listings"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              一覧に戻る
            </Link>
          </div>
        </form>
      </Container>
    </section>
  )
}
