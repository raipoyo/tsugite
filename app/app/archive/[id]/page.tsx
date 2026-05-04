import { notFound } from 'next/navigation'

import Card from '@/components/ui/card'
import { archiveInterviews, tacitTags } from '@/features/hackathon/mvp-data'
import { LinkButton, MvpCard, PageHeader, SectionTitle } from '@/features/hackathon/mvp-ui'

export default async function ArchiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const interview = archiveInterviews.find((item) => item.id === id)
  if (!interview) notFound()

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
          <div className="aspect-video bg-[radial-gradient(circle_at_50%_42%,rgba(240,216,208,0.24),transparent_28%),linear-gradient(135deg,#142028,#2b4351)] p-6">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/12 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-white/50">Video mock</p>
              <div>
                <p className="text-3xl font-semibold">{interview.duration}</p>
                <p className="mt-2 text-white/62">先代女将の語りを再生中</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-semibold text-ink">抽出サマリー</h2>
          <p className="mt-3 text-sm leading-7 text-ink-3">
            状況、判断、理由の3層に分けることで、後継者が「なぜそうするか」まで検索・相談できる。
          </p>
          <div className="mt-5 grid gap-3">
            {['Whisper文字起こし完了', '暗黙知タグ7件', 'RAG出典として利用可能'].map((item) => (
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
          {tacitTags.map((tag) => (
            <MvpCard
              key={tag.situation}
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
