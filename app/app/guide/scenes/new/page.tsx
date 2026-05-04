import Card from '@/components/ui/card'
import { LinkButton, PageHeader } from '@/features/hackathon/mvp-ui'

export default function NewScenePage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Guide setup"
        title="正解の所作を登録"
        description="本番では店主がスマホで正解状態を撮影し、チェック項目をAIが初期生成する。ハッカソンでは事前登録済みの旅館シーンを使う。"
        actions={
          <LinkButton href="/app/guide/scenes/tea-service/live">登録済みデモを見る</LinkButton>
        }
      />
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            'シーン名: 客室のお茶出し準備',
            '正解画像: 3枚登録済み',
            'チェック項目: 4件',
            '音声フィードバック: 有効',
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-washi-3 bg-surface-muted p-4 text-sm font-semibold text-ink"
            >
              {item}
            </div>
          ))}
        </div>
      </Card>
    </main>
  )
}
