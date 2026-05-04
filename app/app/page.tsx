import { archiveInterviews, guideScenes, mvpMetrics } from '@/features/hackathon/mvp-data'
import {
  LinkButton,
  MvpCard,
  PageHeader,
  SectionTitle,
  StatCard,
} from '@/features/hackathon/mvp-ui'

export default function MvpHomePage() {
  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="MVP dashboard"
        title="3機能だけに絞ったハッカソン本体"
        description="Guideで現場判定、Archiveで暗黙知抽出、Agentで先代AIに相談。設定や認証は後回しにして、審査員が触る核心だけを前面に出す。"
        actions={
          <>
            <LinkButton href="/app/guide/scenes/tea-service/live">ライブ判定を開く</LinkButton>
            <LinkButton href="/app/agent" variant="secondary">
              AI分身に相談
            </LinkButton>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {mvpMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section>
        <SectionTitle note="優先度順">機能エントリー</SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          <MvpCard
            title="Guide"
            description="カメラ風UIで客室準備をライブ判定。所作のズレをその場で返すMVP核心。"
            href="/app/guide"
            badge="最優先"
          />
          <MvpCard
            title="Archive"
            description="動画インタビューから状況・判断・理由を抽出し、RAGの材料にする。"
            href="/app/archive"
            badge="重要"
          />
          <MvpCard
            title="Agent"
            description="抽出済み暗黙知を出典に、先代女将の口調で回答するチャット。"
            href="/app/agent"
            badge="最優先"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle>最近のGuide</SectionTitle>
          <div className="space-y-4">
            {guideScenes.slice(0, 2).map((scene) => (
              <MvpCard
                key={scene.id}
                title={scene.name}
                description={scene.summary}
                href={`/app/guide/scenes/${scene.id}`}
                meta={`${scene.logs} logs`}
                badge={`${scene.lastScore}点`}
              />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>最近のArchive</SectionTitle>
          <div className="space-y-4">
            {archiveInterviews.slice(0, 2).map((interview) => (
              <MvpCard
                key={interview.id}
                title={interview.title}
                description={interview.excerpt}
                href={`/app/archive/${interview.id}`}
                meta={interview.status}
                badge={`${interview.tags} tags`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
