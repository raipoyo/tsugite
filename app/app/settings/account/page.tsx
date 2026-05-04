import Card from '@/components/ui/card'
import { PageHeader } from '@/features/hackathon/mvp-ui'

export default function AccountSettingsPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="アカウント設定"
        description="ログイン情報やプロフィールを管理する。"
      />
      <Card className="p-6 text-sm leading-7 text-ink-3">
        Supabase Auth で認証済み。プロフィール編集は今後対応予定。
      </Card>
    </main>
  )
}
