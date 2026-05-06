import { getAppData } from '@/features/hackathon/real-data'

export default async function SuccessorArchivePage() {
  const { tags } = await getAppData()

  return (
    <div className="space-y-8 p-6">
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-ink-3">Archive</p>
        <h1 className="text-2xl font-bold text-ink">暗黙知タグ閲覧</h1>
        <p className="mt-2 text-sm text-ink-3">
          店舗の先代が蓄積してきた判断基準・暗黙知を閲覧できます。Agent
          への質問の参考にしてください。
        </p>
      </div>

      {tags.length === 0 ? (
        <div className="rounded-2xl border border-washi-3 bg-washi-2 p-8 text-center">
          <p className="text-sm text-ink-3">まだ暗黙知タグがありません。</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tags.map((tag) => (
            <div key={tag.id} className="rounded-2xl border border-washi-3 bg-white p-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-ink-3">状況</p>
              <p className="text-sm font-semibold text-ink">{tag.situation}</p>
              <p className="mb-1 mt-3 text-xs font-medium uppercase tracking-widest text-ink-3">
                判断
              </p>
              <p className="text-sm text-ink-3">{tag.judgment}</p>
              <p className="mb-1 mt-3 text-xs font-medium uppercase tracking-widest text-ink-4">
                理由
              </p>
              <p className="text-sm text-ink-4">{tag.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
