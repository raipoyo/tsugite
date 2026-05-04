import { MvpCard, PageHeader } from '@/features/hackathon/mvp-ui'

export default function MembersSettingsPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="メンバー招待"
        description="店舗に参加するメンバーを招待・管理する。"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <MvpCard title="店主" description="Archive登録と正解シーンの管理者。" badge="owner" />
        <MvpCard
          title="後継者"
          description="GuideとAgentを現場で利用するユーザー。"
          badge="trainee"
        />
      </div>
    </main>
  )
}
