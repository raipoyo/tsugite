import Container from '@/components/ui/container'

const APPLICATIONS_MOCK = [
  {
    oppId: 'kogei-001',
    title: '漆芸・基礎講習と職人体験',
    status: '下書き送付済',
    updated: '2026-05-02',
  },
  {
    oppId: 'kogei-002',
    title: '藍染め工房インターン',
    status: '選考結果待ち',
    updated: '2026-04-18',
  },
] as const

export default function SuccessorApplicationsPage() {
  return (
    <section className="flex flex-col gap-6 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          応募履歴（モック）
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          状態遷移はまだサーバーに載っていません。UI の確認用です。
        </p>
        <ul className="mt-10 space-y-4">
          {APPLICATIONS_MOCK.map((row) => (
            <li
              key={row.oppId}
              className="rounded-xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="font-medium text-zinc-900 dark:text-zinc-50">{row.title}</div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span>NPC ID / {row.oppId}</span>
                <span>更新モック値 {row.updated}</span>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  {row.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
