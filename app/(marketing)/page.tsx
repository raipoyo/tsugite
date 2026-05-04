import Link from 'next/link'

import Card from '@/components/ui/card'
import Container from '@/components/ui/container'

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-washi-2 py-20">
        {/* 和紙テクスチャ風グラジェント — アプリの PageHeader と同じ shu radial 手法 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(240,216,208,0.55),transparent_55%),linear-gradient(to_bottom,#eef0ec,#dde2dc)]" />
        {/* 細かいノイズ感のオーバーレイ */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <Container className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink-4">
            — 小さくなる伝統に、新たな継ぎ手を —
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            見て覚えろ、をAIで残して継ぐ
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-3">
            Archiveで先代の判断を残し、Guideで現場の所作を判定し、Agentで迷った瞬間に相談する。
            職人・旅館・老舗飲食——言語化されてこなかった技と判断を、次の世代へ渡す。
          </p>
          <div className="mt-10">
            <Link
              href="/app"
              className="inline-flex h-11 min-w-[9rem] w-full items-center justify-center rounded-lg bg-shu px-5 text-sm font-semibold text-white transition hover:bg-shu-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu sm:w-auto"
            >
              はじめる
            </Link>
          </div>
        </Container>
      </section>

      {/* 機能紹介 */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-4">
                Archive
              </p>
              <h2 className="mt-3 text-lg font-semibold text-ink">先代の判断を残す</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                先代へのインタビュー動画から、状況・判断・理由の3層タグを抽出します。
              </p>
              <div className="mt-6">
                <Link
                  className="text-sm font-semibold text-shu underline-offset-4 hover:text-shu-2 hover:underline"
                  href="/app/archive"
                >
                  Archiveを開く →
                </Link>
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-4">Guide</p>
              <h2 className="mt-3 text-lg font-semibold text-ink">現場の所作を判定する</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                正解の所作と現場をリアルタイムで比較し、ズレた点だけを短く返します。
              </p>
              <div className="mt-6">
                <Link
                  className="text-sm font-semibold text-shu underline-offset-4 hover:text-shu-2 hover:underline"
                  href="/app/guide"
                >
                  Guideを開く →
                </Link>
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-4">Agent</p>
              <h2 className="mt-3 text-lg font-semibold text-ink">迷った瞬間に相談する</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                Archiveから抽出した暗黙知を出典に、先代の判断を再現するAIに相談できます。
              </p>
              <div className="mt-6">
                <Link
                  className="text-sm font-semibold text-shu underline-offset-4 hover:text-shu-2 hover:underline"
                  href="/app/agent"
                >
                  Agentを開く →
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* ベータ告知 */}
      <section className="border-t border-washi-2 py-12">
        <Container className="text-center">
          <p className="text-sm text-ink-3">
            TSUGITE は現在ベータ開発中です。掲載内容・利用規約は正式リリース前に更新されます。
          </p>
          <Link
            className="mt-4 inline-block text-sm font-medium text-ink hover:text-shu"
            href="/terms"
          >
            利用規約
          </Link>
        </Container>
      </section>
    </main>
  )
}
