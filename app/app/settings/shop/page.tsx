import Card from '@/components/ui/card'
import { PageHeader } from '@/features/hackathon/mvp-ui'

export default function ShopSettingsPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="店舗情報"
        description="店舗名や業種などの基本情報を管理する。"
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
            <dt className="text-sm text-ink-4">担当者</dt>
            <dd className="mt-1 font-semibold text-ink">先代女将</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-4">ステータス</dt>
            <dd className="mt-1 font-semibold text-shu">運用中</dd>
          </div>
        </dl>
      </Card>
    </main>
  )
}
