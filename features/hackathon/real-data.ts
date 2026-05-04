import { createClient } from '@/lib/supabase/server'
import { ensureShopForProfile } from '@/lib/shops'

import {
  archiveInterviews as fallbackInterviews,
  guideScenes as fallbackScenes,
  mvpMetrics as fallbackMetrics,
  tacitTags as fallbackTags,
} from './mvp-data'

export type AppScene = {
  id: string
  name: string
  status: string
  lastScore: number
  logs: number
  priority: string
  summary: string
  correctState: Record<string, unknown>
  season: string | null
}

export type AppInterview = {
  id: string
  title: string
  duration: string
  status: string
  tags: number
  date: string
  excerpt: string
  storagePath: string | null
  transcript: string | null
}

export type AppTacitTag = {
  id: string
  situation: string
  judgment: string
  reason: string
  interviewId: string | null
}

export type AppData = {
  isReal: boolean
  shopId: string | null
  scenes: AppScene[]
  interviews: AppInterview[]
  tags: AppTacitTag[]
  metrics: { label: string; value: string; note: string }[]
}

export type AppObservationLog = {
  id: string
  sceneName: string
  score: number | null
  feedback: string
  observedAt: string
}

type ObservationLogRow = {
  scene_id: string | null
  vision_result: Record<string, unknown> | null
}

type ObservationLogWithSceneRow = ObservationLogRow & {
  id: string
  observed_at: string
  llm_feedback: string | null
  reference_scenes: { scene_name: string } | { scene_name: string }[] | null
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '--:--'
  const minutes = Math.floor(seconds / 60)
  const remaining = String(seconds % 60).padStart(2, '0')
  return `${minutes}:${remaining}`
}

function summarizeCorrectState(value: Record<string, unknown>): string {
  const keys = Object.keys(value)
  if (keys.length === 0) return '正解状態は登録済み。現場の観察結果と比較する。'
  return `${keys.slice(0, 4).join('、')} を正解状態として比較する。`
}

function getScoreFromLog(logs: ObservationLogRow[], sceneId: string): number {
  const latest = logs.find((log) => log.scene_id === sceneId)
  const score = latest?.vision_result?.score
  return typeof score === 'number' ? score : 0
}

function fallbackData(): AppData {
  return {
    isReal: false,
    shopId: null,
    scenes: fallbackScenes.map((scene) => ({
      ...scene,
      correctState: {},
      season: null,
    })),
    interviews: fallbackInterviews.map((interview) => ({
      ...interview,
      storagePath: null,
      transcript: interview.excerpt,
    })),
    tags: fallbackTags.map((tag, index) => ({
      id: `fallback-${index}`,
      ...tag,
      interviewId: null,
    })),
    metrics: [...fallbackMetrics],
  }
}

export async function getAppData(): Promise<AppData> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return fallbackData()

  const { data: profile } = await supabase
    .from('profiles')
    .select('shop_profile')
    .eq('id', user.id)
    .maybeSingle()

  const shop = await ensureShopForProfile(supabase, user.id, profile?.shop_profile)
  if (!shop) return fallbackData()

  const [{ data: sceneRows }, { data: interviewRows }, { data: tagRows }, { data: logRows }] =
    await Promise.all([
      supabase
        .from('reference_scenes')
        .select('id, scene_name, correct_state, season, created_at')
        .eq('shop_id', shop.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('interviews')
        .select('id, storage_path, transcript, duration_sec, created_at')
        .eq('shop_id', shop.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('tacit_tags')
        .select('id, interview_id, situation, judgment, reason, created_at')
        .eq('shop_id', shop.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('observation_logs')
        .select('scene_id, vision_result, observed_at')
        .eq('shop_id', shop.id)
        .order('observed_at', { ascending: false }),
    ])

  const logs = (logRows ?? []) as ObservationLogRow[]
  const tags = (tagRows ?? []).map((tag) => ({
    id: tag.id,
    situation: tag.situation,
    judgment: tag.judgment,
    reason: tag.reason,
    interviewId: tag.interview_id,
  }))
  const tagCountByInterview = new Map<string, number>()
  for (const tag of tags) {
    if (!tag.interviewId) continue
    tagCountByInterview.set(tag.interviewId, (tagCountByInterview.get(tag.interviewId) ?? 0) + 1)
  }

  const scenes = (sceneRows ?? []).map((scene, index) => {
    const correctState = (scene.correct_state ?? {}) as Record<string, unknown>
    const logCount = logs.filter((log) => log.scene_id === scene.id).length
    return {
      id: scene.id,
      name: scene.scene_name,
      status: logCount > 0 ? 'ライブ判定済み' : '登録済み',
      lastScore: getScoreFromLog(logs, scene.id),
      logs: logCount,
      priority: index === 0 ? '最新' : '登録済み',
      summary: summarizeCorrectState(correctState),
      correctState,
      season: scene.season,
    }
  })

  const interviews = (interviewRows ?? []).map((interview) => {
    const tagsCount = tagCountByInterview.get(interview.id) ?? 0
    const filename = interview.storage_path.split('/').pop() ?? 'インタビュー動画'
    return {
      id: interview.id,
      title: filename,
      duration: formatDuration(interview.duration_sec),
      status:
        tagsCount > 0 ? '抽出完了' : interview.transcript ? '文字起こし済み' : 'アップロード済み',
      tags: tagsCount,
      date: new Date(interview.created_at).toISOString().slice(0, 10),
      excerpt:
        interview.transcript?.slice(0, 96) ??
        '文字起こし待ち。動画を処理すると暗黙知タグへ変換できる。',
      storagePath: interview.storage_path,
      transcript: interview.transcript,
    }
  })

  return {
    isReal: true,
    shopId: shop.id,
    scenes,
    interviews,
    tags,
    metrics: [
      { label: '登録シーン', value: String(scenes.length), note: 'Supabase' },
      { label: '暗黙知タグ', value: String(tags.length), note: '抽出済み' },
      { label: '観察ログ', value: String(logs.length), note: '実保存' },
    ],
  }
}

export async function getSignedInterviewUrl(storagePath: string | null): Promise<string | null> {
  if (!storagePath) return null
  const supabase = await createClient()
  const { data } = await supabase.storage
    .from('interview-videos')
    .createSignedUrl(storagePath, 60 * 10)
  return data?.signedUrl ?? null
}

export async function getObservationLogs(): Promise<AppObservationLog[]> {
  const data = await getAppData()
  if (!data.isReal || !data.shopId) {
    return [
      {
        id: 'fallback-log-1',
        sceneName: '客室のお茶出し準備',
        score: 86,
        feedback: '茶托を右へ2cm。次回改善済み',
        observedAt: '2026-05-05',
      },
      {
        id: 'fallback-log-2',
        sceneName: '客室のお茶出し準備',
        score: 82,
        feedback: '湯呑みの向き OK。菓子皿の余白 OK',
        observedAt: '2026-05-05',
      },
    ]
  }

  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('observation_logs')
    .select('id, scene_id, observed_at, vision_result, llm_feedback, reference_scenes(scene_name)')
    .eq('shop_id', data.shopId)
    .order('observed_at', { ascending: false })
    .limit(20)

  return ((rows ?? []) as ObservationLogWithSceneRow[]).map((row) => {
    const score = row.vision_result?.score
    const referenceScene = Array.isArray(row.reference_scenes)
      ? row.reference_scenes[0]
      : row.reference_scenes
    return {
      id: row.id,
      sceneName: referenceScene?.scene_name ?? '未紐づけシーン',
      score: typeof score === 'number' ? score : null,
      feedback: row.llm_feedback ?? 'フィードバック未保存',
      observedAt: new Date(row.observed_at).toLocaleString('ja-JP'),
    }
  })
}
