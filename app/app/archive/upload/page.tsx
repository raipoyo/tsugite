import Card from '@/components/ui/card'
import { LinkButton, PageHeader } from '@/features/hackathon/mvp-ui'

export default function ArchiveUploadPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Archive upload"
        title="動画アップロード"
        description="本番は動画をSupabase Storageへ保存し、Whisperで文字起こし、LLMで暗黙知タグを抽出する。デモでは処理済み結果を見せる。"
        actions={<LinkButton href="/app/archive/interview-okami">処理済み結果を見る</LinkButton>}
      />
      <Card className="p-8">
        <div className="rounded-[1.5rem] border-2 border-dashed border-washi-3 bg-surface-muted p-10 text-center">
          <p className="text-xl font-semibold text-ink">interview-okami.mp4</p>
          <p className="mt-3 text-sm text-ink-4">
            アップロード済み。文字起こしとタグ抽出は完了状態で固定。
          </p>
        </div>
      </Card>
    </main>
  )
}
