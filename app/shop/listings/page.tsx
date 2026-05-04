import Link from 'next/link'

import Container from '@/components/ui/container'

import { MOCK_SHOP_LISTINGS } from '@/lib/mock-listings'

export default function ShopListingsPage() {
  return (
    <section className="flex flex-col gap-6 py-10">
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">募集一覧</h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              MVP では固定モックのみ。一覧 API を差し込むときにこのレイアウトを流用する。
            </p>
          </div>
          <Link
            href="/shop/listings/new"
            className="inline-flex h-11 min-w-fit items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            新しい募集をつくる
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full border-collapse bg-white text-left text-sm dark:bg-zinc-950">
            <thead className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                  タイトル
                </th>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">状態</th>
                <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">更新</th>
                <th className="hidden px-4 py-3 text-right font-semibold text-zinc-700 sm:table-cell dark:text-zinc-300">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SHOP_LISTINGS.map((item) => (
                <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="px-4 py-3 text-zinc-900 dark:text-zinc-50">{item.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === 'published'
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                      }`}
                    >
                      {item.status === 'published' ? '公開' : '下書き'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {item.updatedAtLabel}
                  </td>
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    <Link
                      href={`/shop/listings/${item.id}/edit`}
                      className="font-medium text-zinc-900 dark:text-zinc-50"
                    >
                      編集
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
          公開・下書き切り替えやプレビューは次の開発サイクルで Server Actions と接続する。
        </p>
      </Container>
    </section>
  )
}
