import ArchiveUploadCard from '@/features/hackathon/archive-upload-card'
import { LinkButton, PageHeader } from '@/features/hackathon/mvp-ui'

export default function ArchiveUploadPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Archive upload"
        title="動画アップロード"
        description="動画をSupabase Storageへ保存し、interviews レコードを作る。アップロード後は詳細画面から処理状態を確認する。"
        actions={<LinkButton href="/app/archive">一覧へ戻る</LinkButton>}
      />
      <ArchiveUploadCard />
    </main>
  )
}
