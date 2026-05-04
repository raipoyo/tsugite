import Link from 'next/link'

import Card from '@/components/ui/card'
import Container from '@/components/ui/container'

const btnPrimary =
  'inline-flex h-11 min-w-[9rem] w-full items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto'

const btnSecondary =
  'inline-flex h-11 min-w-[9rem] w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:w-auto'

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 py-20 dark:border-zinc-800 dark:from-zinc-950 dark:to-black">
        <Container>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            — 小さくなる伝統に、新たな継ぎ手を —
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-50">
            伝統の現場と、次の担い手をつなぐ
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            日本各地で受け継がれてきた技術や文化が、後継者不足のなかでも失われないように。掲載者は募集や体験を公開し、継ぎ手候補は志に合った現場へたどり着けます。
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/login" className={btnPrimary}>
              はじめる
            </Link>
            <Link href="/opportunities" className={btnSecondary}>
              募集を見る
            </Link>
            <Link href="/login" className={btnSecondary}>
              ログイン
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                店として掲載する
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                伝統産業や教育現場での「学び」を募集情報として載せられます。Google
                でログインし、オンボーディングで店側の運用形態を選びます。
              </p>
              <div className="mt-6">
                <Link
                  className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
                  href="/login"
                >
                  店として登録の流れ →
                </Link>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                継ぎ手として参加する
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                載っている募集だけが入口ではありません。プロフィールを整え応募ログを一元化できるよう、経路ごと用意していく予定です（MVP
                ではレイアウトと誘導が中心）。
              </p>
              <div className="mt-6">
                <Link
                  className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
                  href="/login"
                >
                  継ぎ手として登録する →
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <Container className="text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            TSUGITE は現在ベータ開発中です。掲載内容・利用規約は正式リリース前に更新されます。
          </p>
          <Link
            className="mt-4 inline-block text-sm font-medium text-zinc-900 dark:text-zinc-50"
            href="/terms"
          >
            利用規約
          </Link>
        </Container>
      </section>
    </main>
  )
}
