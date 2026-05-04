import { archiveInterviews } from '@/features/hackathon/mvp-data'
import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'

export default function ArchivePage() {
  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Archive"
        title="インタビュー動画一覧"
        description="店主の語りから、継承に必要な判断基準を抽出する。MVPでは動画詳細でタグ抽出済みの状態を強く見せる。"
        actions={
          <>
            <LinkButton href="/app/archive/interview-okami">最重要動画を見る</LinkButton>
            <LinkButton href="/app/archive/upload" variant="secondary">
              動画アップロード
            </LinkButton>
          </>
        }
      />
      <section>
        <SectionTitle note="Whisper -> タグ抽出 -> RAG材料化">動画</SectionTitle>
        <div className="space-y-4">
          {archiveInterviews.map((interview) => (
            <MvpCard
              key={interview.id}
              title={interview.title}
              description={interview.excerpt}
              href={`/app/archive/${interview.id}`}
              badge={`${interview.tags} tags`}
              meta={`${interview.status} / ${interview.duration}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
