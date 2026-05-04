import { MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'

const history = ['雨の日の玄関対応', '常連客の早着対応', '新人への注意の仕方']

export default function AgentHistoryPage() {
  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Agent history"
        title="会話履歴"
        description="過去の相談履歴。Archiveタグを出典に返した回答を振り返れる。"
      />
      <section>
        <SectionTitle>最近の相談</SectionTitle>
        <div className="space-y-4">
          {history.map((item) => (
            <MvpCard
              key={item}
              title={item}
              description="先代女将AIがArchiveタグを参照して回答。"
            />
          ))}
        </div>
      </section>
    </main>
  )
}
