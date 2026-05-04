import { demoScenario, guideScenes, tacitTags } from '@/features/hackathon/mvp-data'
import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'

export default function RyokanDemoPage() {
  return (
    <main className="min-h-full bg-washi px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <PageHeader
          eyebrow="Hackathon demo scenario"
          title={`${demoScenario.shopName} の引き継ぎ`}
          description="旅館の客室準備を題材に、Archiveで先代の判断を残し、Guideで所作を判定し、Agentで迷った瞬間に相談する流れを一画面で見せる。"
          actions={
            <>
              <LinkButton href="/app/guide/scenes/tea-service/live">ライブ判定へ</LinkButton>
              <LinkButton href="/app/agent" variant="secondary">
                AI分身へ相談
              </LinkButton>
            </>
          }
        />

        <section>
          <SectionTitle note="審査員向けのクリック順">デモ導線</SectionTitle>
          <div className="grid gap-5 md:grid-cols-3">
            <MvpCard
              badge="1"
              title="Archiveを見る"
              description="先代女将のインタビューから、状況・判断・理由のタグを抽出済みとして見せる。"
              href="/app/archive/interview-okami"
            />
            <MvpCard
              badge="2"
              title="Guideで判定"
              description="客室のお茶出し準備をカメラ風UIで判定。ズレた所作だけを短く返す。"
              href="/app/guide/scenes/tea-service/live"
            />
            <MvpCard
              badge="3"
              title="Agentに相談"
              description="抽出済みタグを出典に、先代女将の口調で判断を返す。"
              href="/app/agent"
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionTitle>登録シーン</SectionTitle>
            <div className="space-y-4">
              {guideScenes.map((scene) => (
                <MvpCard
                  key={scene.id}
                  badge={scene.priority}
                  title={scene.name}
                  description={scene.summary}
                  href={`/app/guide/scenes/${scene.id}`}
                  meta={`${scene.status} / score ${scene.lastScore}`}
                />
              ))}
            </div>
          </div>
          <div>
            <SectionTitle>抽出された暗黙知</SectionTitle>
            <div className="space-y-4">
              {tacitTags.map((tag) => (
                <MvpCard
                  key={tag.situation}
                  title={tag.situation}
                  description={tag.reason}
                  meta={tag.judgment}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
