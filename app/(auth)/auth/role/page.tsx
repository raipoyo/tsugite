import { LinkButton, MvpCard, PageHeader } from '@/features/hackathon/mvp-ui'

export default function AuthRolePage() {
  return (
    <main className="min-h-full bg-washi px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader
          eyebrow="Role select"
          title="役割を選ぶ"
          description="デモでは旅館の店主側に固定。将来は店主と後継者でダッシュボードを分ける。"
          actions={<LinkButton href="/app">店主として進む</LinkButton>}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <MvpCard
            title="店主"
            description="Archiveへ動画を入れ、Guideの正解シーンを登録し、後継者にAI分身を渡す。"
            href="/app"
            badge="demo"
          />
          <MvpCard
            title="後継者"
            description="現場でGuideを使い、判断に迷ったらAgentに相談する。"
            href="/app/guide"
            badge="later"
          />
        </div>
      </div>
    </main>
  )
}
