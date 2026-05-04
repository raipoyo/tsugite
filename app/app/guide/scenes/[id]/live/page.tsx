import { notFound } from 'next/navigation'

import LiveGuideDemo from '@/features/hackathon/live-guide-demo'
import { guideScenes } from '@/features/hackathon/mvp-data'
import { PageHeader } from '@/features/hackathon/mvp-ui'

export default async function GuideLivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const scene = guideScenes.find((item) => item.id === id)
  if (!scene) notFound()

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Live guide"
        title={`${scene.name} のライブ判定`}
        description="カメラ映像を模したデモUI。実装時は端末カメラのフレームをGemma 3へ渡し、正解状態との差分だけを短く返す。"
      />
      <LiveGuideDemo />
    </main>
  )
}
