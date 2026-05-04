import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function GuidePage() {
  const { scenes } = await getAppData()
  const primaryScene = scenes[0]

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Guide"
        title="シーン一覧"
        description="店主が残した正解状態を、後継者が現場で再現できているか判定する。"
        actions={
          <>
            <LinkButton href={`/app/guide/scenes/${primaryScene?.id ?? 'tea-service'}/live`}>
              ライブ判定
            </LinkButton>
            <LinkButton href="/app/guide/scenes/new" variant="secondary">
              シーン登録
            </LinkButton>
          </>
        }
      />
      <section>
        <SectionTitle>登録済みシーン</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {scenes.map((scene) => (
            <MvpCard
              key={scene.id}
              title={scene.name}
              description={scene.summary}
              href={`/app/guide/scenes/${scene.id}`}
              badge={scene.priority}
              meta={`${scene.status} / ${scene.logs} logs`}
            >
              <div className="h-2 overflow-hidden rounded-full bg-washi-2">
                <div
                  className="h-full rounded-full bg-shu"
                  style={{ width: `${scene.lastScore}%` }}
                />
              </div>
            </MvpCard>
          ))}
        </div>
      </section>
    </main>
  )
}
