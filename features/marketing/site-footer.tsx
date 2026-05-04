import Link from 'next/link'

import Container from '@/components/ui/container'

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-washi-2 bg-washi py-10">
      <Container className="flex flex-col gap-6 text-sm text-ink-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-semibold text-ink">TSUGITE</div>
          <p className="mt-2 max-w-sm">― 小さくなる伝統に、新たな継ぎ手を ―</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Link className="hover:text-ink" href="/opportunities">
            募集を見る
          </Link>
          <Link className="hover:text-ink" href="/terms">
            利用規約
          </Link>
          <Link className="hover:text-ink" href="/privacy">
            プライバシー
          </Link>
          <Link className="hover:text-ink" href="/contact">
            お問い合わせ
          </Link>
        </div>
      </Container>
      <Container className="mt-8 text-xs text-ink-4">
        © {new Date().getFullYear()} TSUGITE
      </Container>
    </footer>
  )
}
