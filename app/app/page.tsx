import {
  LinkButton,
  MvpCard,
  PageHeader,
  SectionTitle,
  StatCard,
} from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function AppHomePage() {
  const { interviews, scenes, metrics } = await getAppData()
  const primaryScene = scenes[0]

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="TSUGITE"
        title="暗黙知の継承を、3つの機能で"
        description="Archiveで先代の判断を残し、Guideで現場の所作を判定し、Agentで迷った瞬間に相談する。"
        actions={
          <>
            <LinkButton href={`/app/guide/scenes/${primaryScene?.id ?? 'tea-service'}/live`}>
              ライブ判定を開く
            </LinkButton>
            <LinkButton href="/app/agent" variant="secondary">
              AIに相談する
            </LinkButton>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section>
        <SectionTitle>使い方</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          <MvpCard
            badge="1"
            title="Archiveで先代の知恵を残す"
            description="インタビュー動画から状況・判断・理由を抽出し、引き継ぎの材料にする。"
            href="/app/archive"
          />
          <MvpCard
            badge="2"
            title="Guideで現場を判定する"
            description="登録した正解状態と現場をリアルタイムで比較。ズレた所作だけを短く返す。"
            href={`/app/guide/scenes/${primaryScene?.id ?? 'tea-service'}/live`}
          />
          <MvpCard
            badge="3"
            title="Agentに相談する"
            description="抽出した暗黙知を出典に、先代の判断を再現するAIがその場で答える。"
            href="/app/agent"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle>最近のGuide</SectionTitle>
          <div className="space-y-4">
            {scenes.slice(0, 2).map((scene) => (
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
            {interviews.slice(0, 2).map((interview) => (
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
