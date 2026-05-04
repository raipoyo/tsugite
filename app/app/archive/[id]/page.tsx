import { notFound } from 'next/navigation'

import Card from '@/components/ui/card'
import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'
import { getAppData, getSignedInterviewUrl } from '@/features/hackathon/real-data'

export default async function ArchiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { interviews, tags } = await getAppData()
  const interview = interviews.find((item) => item.id === id)
  if (!interview) notFound()
  const relatedTags = tags.filter((tag) => tag.interviewId === interview.id)
  const displayTags = relatedTags.length > 0 ? relatedTags : tags
  const videoUrl = await getSignedInterviewUrl(interview.storagePath)

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Archive detail"
        title={interview.title}
        description={interview.excerpt}
        actions={
          <>
            <LinkButton href="/app/agent">この出典で相談</LinkButton>
            <LinkButton href="/app/archive/tags" variant="secondary">
              タグ一覧
            </LinkButton>
          </>
        }
      />
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden bg-ink text-white">
          {videoUrl ? (
            <video controls className="aspect-video w-full bg-black" src={videoUrl} />
          ) : (
            <div className="aspect-video bg-[radial-gradient(circle_at_50%_42%,rgba(240,216,208,0.24),transparent_28%),linear-gradient(135deg,#142028,#2b4351)] p-6">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/12 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-white/50">Video</p>
                <div>
                  <p className="text-3xl font-semibold">{interview.duration}</p>
                  <p className="mt-2 text-white/62">
                    動画URL未生成。ストレージ保存後に再生できる。
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-semibold text-ink">抽出サマリー</h2>
          <p className="mt-3 text-sm leading-7 text-ink-3">
            状況、判断、理由の3層に分けることで、後継者が「なぜそうするか」まで検索・相談できる。
          </p>
          <div className="mt-5 grid gap-3">
            {[
              interview.transcript ? 'Whisper文字起こし完了' : '文字起こし待ち',
              `暗黙知タグ${relatedTags.length}件`,
              relatedTags.length > 0 ? 'RAG出典として利用可能' : 'タグ抽出待ち',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-washi px-4 py-3 text-sm font-semibold text-ink"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>
      <section>
        <SectionTitle>抽出タグ</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {displayTags.map((tag) => (
            <MvpCard
              key={tag.id}
              title={tag.situation}
              description={tag.reason}
              meta={tag.judgment}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
