import { MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'

const logs = [
  '茶托を右へ2cm。次回改善済み',
  '湯呑みの向き OK。菓子皿の余白 OK',
  '急須の注ぎ口が客側。音声で注意',
]

export default function GuideLogsPage() {
  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Guide logs"
        title="観察ログ履歴"
        description="MVPではライブ判定の説得力を補う履歴画面。時系列で改善が見えることを伝える。"
      />
      <section>
        <SectionTitle>ログ</SectionTitle>
        <div className="space-y-4">
          {logs.map((log, index) => (
            <MvpCard
              key={log}
              title={log}
              description="2026-05-05 旅館デモ / 客室のお茶出し準備"
              badge={`${86 - index * 4}点`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
