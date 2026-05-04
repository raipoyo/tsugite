import Card from '@/components/ui/card'
import { PageHeader } from '@/features/hackathon/mvp-ui'

export default function ArchiveTimelinePage() {
  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Knowledge timeline"
        title="知の蓄積タイムライン"
        description="低優先度なのでモック。動画を入れるほど、タグとGuideログが増える見え方を示す。"
      />
      <Card className="p-6">
        <div className="space-y-5">
          {[
            '5/03 雨の日の玄関対応を追加',
            '5/04 お茶出しの判断基準を抽出',
            '5/05 常連客対応をAgent出典化',
          ].map((item) => (
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
