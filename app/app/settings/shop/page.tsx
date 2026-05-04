import Card from '@/components/ui/card'
import { PageHeader } from '@/features/hackathon/mvp-ui'

export default function ShopSettingsPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="店舗情報編集"
        description="低優先度。デモでは旅館固定の店舗情報を表示するだけに留める。"
      />
      <Card className="p-6">
        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-ink-4">店舗名</dt>
            <dd className="mt-1 font-semibold text-ink">山あいの宿 つぎて庵</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-4">業種</dt>
            <dd className="mt-1 font-semibold text-ink">旅館</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-4">デモ担当</dt>
            <dd className="mt-1 font-semibold text-ink">先代女将</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-4">MVP状態</dt>
            <dd className="mt-1 font-semibold text-shu">固定シナリオ</dd>
          </div>
        </dl>
      </Card>
    </main>
  )
}
