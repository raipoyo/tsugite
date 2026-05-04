import { notFound } from 'next/navigation'

import { guideScenes } from '@/features/hackathon/mvp-data'
import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'

export default async function GuideSceneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const scene = guideScenes.find((item) => item.id === id)
  if (!scene) notFound()

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
          {['湯呑みの絵柄は客側', '茶托は盆の中心より少し右', '急須の注ぎ口は客へ向けない'].map(
            (rule) => (
              <MvpCard
                key={rule}
                title={rule}
                description="先代女将のインタビューと正解画像から抽出した確認ポイント。"
              />
            ),
          )}
        </div>
      </section>
      <section>
        <SectionTitle>過去ログ</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          {['82点: 茶托位置を修正', '91点: ほぼ正解', '76点: 急須の向きに注意'].map((log) => (
            <MvpCard key={log} title={log} description="観察結果、差分、AIフィードバックを保存。" />
          ))}
        </div>
      </section>
    </main>
  )
}
