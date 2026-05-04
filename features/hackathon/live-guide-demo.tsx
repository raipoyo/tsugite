'use client'

import Card from '@/components/ui/card'
import GuideInterface from '@/features/guide/components/guide-interface'
import type { SceneState } from '@/features/guide/types'

import type { AppScene } from './real-data'

type LiveGuideDemoProps = {
  scene: AppScene
  shopId: string | null
}

export default function LiveGuideDemo({ scene, shopId }: LiveGuideDemoProps) {
  if (!shopId) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sumi-600">ライブ判定を使用するにはログインが必要です。</p>
      </Card>
    )
  }

  const sceneState: SceneState = {
    id: scene.id,
    sceneName: scene.name,
    correctState: scene.correctState,
    season: scene.season,
  }

  return <GuideInterface shopId={shopId} scenes={[sceneState]} />
}
