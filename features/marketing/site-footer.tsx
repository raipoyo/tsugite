import Link from 'next/link'

import Container from '@/components/ui/container'

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <Container className="flex flex-col gap-6 text-sm text-zinc-600 sm:flex-row sm:items-start sm:justify-between dark:text-zinc-400">
        <div>
          <div className="font-semibold text-zinc-900 dark:text-zinc-50">TSUGITE</div>
          <p className="mt-2 max-w-sm">― 小さくなる伝統に、新たな継ぎ手を ―</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/opportunities">
            募集を見る
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/terms">
            利用規約
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/privacy">
            プライバシー
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/contact">
            お問い合わせ
          </Link>
        </div>
      </Container>
      <Container className="mt-8 text-xs text-zinc-400">
        © {new Date().getFullYear()} TSUGITE
      </Container>
    </footer>
  )
}
