import { notFound } from 'next/navigation'

import LiveGuideDemo from '@/features/hackathon/live-guide-demo'
import { PageHeader } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function GuideLivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { shopId, scenes } = await getAppData()
  const scene = scenes.find((item) => item.id === id)
  if (!scene) notFound()

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Live guide"
        title={`${scene.name} のライブ判定`}
        description="登録済みの正解状態を使ってライブ判定する。実カメラ接続前でも、観察ログはSupabaseへ保存できる。"
      />
      <LiveGuideDemo scene={scene} shopId={shopId} />
    </main>
  )
}
