import { MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function AgentSourcesPage() {
  const { tags } = await getAppData()

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Agent sources"
        title="参照された出典一覧"
        description="RAG回答の根拠を確認する画面。審査ではAgent内の出典表示で代替可能。"
      />
      <section>
        <SectionTitle>出典</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {tags.map((tag) => (
            <MvpCard
              key={tag.id}
              title={tag.situation}
              description={tag.reason}
              meta={tag.judgment}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
