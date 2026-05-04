import { MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function ArchiveTagsPage() {
  const { tags } = await getAppData()

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Tacit library"
        title="暗黙知タグ一覧"
        description="Agentが参照する最小単位。状況・判断・理由に分けて、人がレビューできる形にする。"
      />
      <section>
        <SectionTitle>{tags.length}件のタグ</SectionTitle>
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
