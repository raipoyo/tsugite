import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function ArchivePage() {
  const { interviews, isReal } = await getAppData()
  const primaryInterview = interviews[0]

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Archive"
        title="インタビュー動画一覧"
        description="店主の語りから、継承に必要な判断基準を抽出する。"
        actions={
          <>
            <LinkButton href={`/app/archive/${primaryInterview?.id ?? 'interview-okami'}`}>
              最新動画を見る
            </LinkButton>
            <LinkButton href="/app/archive/upload" variant="secondary">
              動画アップロード
            </LinkButton>
          </>
        }
      />
      <section>
        <SectionTitle note={isReal ? 'Supabase interviews' : 'Whisper -> タグ抽出 -> RAG材料化'}>
          動画
        </SectionTitle>
        <div className="space-y-4">
          {interviews.map((interview) => (
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
