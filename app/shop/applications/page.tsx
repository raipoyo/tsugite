import Container from '@/components/ui/container'

const MOCK_ROWS = [
  { applicant: '山田 継太郎', opp: '漆芸・基礎講習', status: '書類確認中', date: '2026-05-01' },
  { applicant: '継宮 ひなた', opp: '藍染めインターン', status: '面談済', date: '2026-04-27' },
] as const

export default function ShopApplicationsPage() {
  return (
    <section className="flex flex-col gap-6 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">応募（モック）</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          ワークフローの実装までのプレースホルダです。
        </p>
        <ul className="mt-10 space-y-4">
          {MOCK_ROWS.map((row) => (
            <li
              key={row.date + row.applicant}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">{row.applicant}</div>
                <div className="text-sm text-zinc-500">{row.opp}</div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-0">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-900">
                  {row.status}
                </span>
                <span className="text-xs text-zinc-500">{row.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
