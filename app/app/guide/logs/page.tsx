import { MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'
import { getObservationLogs } from '@/features/hackathon/real-data'

export default async function GuideLogsPage() {
  const logs = await getObservationLogs()

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Guide logs"
        title="観察ログ履歴"
        description="ライブ判定の記録。時系列で所作の改善が確認できる。"
      />
      <section>
        <SectionTitle>ログ</SectionTitle>
        <div className="space-y-4">
          {logs.map((log) => (
            <MvpCard
              key={log.id}
              title={log.feedback}
              description={`${log.observedAt} / ${log.sceneName}`}
              badge={log.score === null ? undefined : `${log.score}点`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
