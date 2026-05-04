import Card from '@/components/ui/card'
import { PageHeader } from '@/features/hackathon/mvp-ui'

export default function AccountSettingsPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="アカウント設定"
        description="低優先度。認証はSupabase Authへ接続済みだが、デモでは固定導線を優先する。"
      />
      <Card className="p-6 text-sm leading-7 text-ink-3">
        デモユーザー: owner@tsugite.local / role: shop
      </Card>
    </main>
  )
}
