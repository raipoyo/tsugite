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
        description="カメラをかざすと AI が正解状態との差分をリアルタイムに判定し、フィードバックを音声で伝える。"
      />
      <LiveGuideDemo scene={scene} shopId={shopId} />
    </main>
  )
}
