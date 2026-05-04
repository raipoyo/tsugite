import { notFound } from 'next/navigation'

import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function GuideSceneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { scenes } = await getAppData()
  const scene = scenes.find((item) => item.id === id)
  if (!scene) notFound()
  const rules = Object.entries(scene.correctState)

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Scene detail"
        title={scene.name}
        description={scene.summary}
        actions={
          <>
            <LinkButton href={`/app/guide/scenes/${scene.id}/live`}>ライブ判定を開始</LinkButton>
            <LinkButton href="/app/guide/logs" variant="secondary">
              ログを見る
            </LinkButton>
          </>
        }
      />
      <section>
        <SectionTitle>正解状態</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          {(rules.length > 0 ? rules : [['正解状態', '登録済み']]).map(([key, value]) => (
            <MvpCard
              key={key}
              title={key}
              description={typeof value === 'string' ? value : JSON.stringify(value)}
            />
          ))}
        </div>
      </section>
      <section>
        <SectionTitle>過去ログ</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          <MvpCard
            title={`${scene.lastScore || '--'}点 / ${scene.logs} logs`}
            description="ライブ判定画面から保存された観察結果、差分、AIフィードバックを参照する。"
          />
        </div>
      </section>
    </main>
  )
}
