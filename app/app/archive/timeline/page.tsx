import Card from '@/components/ui/card'
import { PageHeader } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function ArchiveTimelinePage() {
  const { interviews, tags } = await getAppData()
  const items = [
    ...interviews.map((interview) => `${interview.date} ${interview.title} を追加`),
    ...tags.slice(0, 6).map((tag) => `暗黙知タグ「${tag.situation}」を抽出`),
  ]

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Knowledge timeline"
        title="知の蓄積タイムライン"
        description="動画とタグが増えるほど、継承知識の蓄積が時系列で見える。"
      />
      <Card className="p-6">
        <div className="space-y-5">
          {items.map((item) => (
            <div
              key={item}
              className="border-l-4 border-shu py-2 pl-4 text-sm font-semibold text-ink"
            >
              {item}
            </div>
          ))}
        </div>
      </Card>
    </main>
  )
}
