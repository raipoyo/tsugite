import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

const navItems = ['ダッシュボード', 'テンプレート', '判定', 'レコメンド']

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-washi-3 bg-washi/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-h-11 items-center justify-between gap-4">
            <a
              className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu"
              href="#top"
            >
              <span className="grid size-9 place-items-center rounded-md bg-ink text-sm font-bold text-washi">
                継
              </span>
              <span>
                <span className="block text-base font-bold leading-5 text-ink">TSUGITE</span>
                <span className="block text-xs leading-5 text-ink-4">現場判断ワークスペース</span>
              </span>
            </a>
            <span className="rounded-md border border-success/25 bg-success-bg px-2.5 py-1 text-xs font-semibold text-success">
              Design System
            </span>
          </div>
          <nav aria-label="主要ナビゲーション" className="-mx-1 flex gap-1 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <a
                className="min-h-10 shrink-0 rounded-md px-3 py-2 text-sm font-semibold text-ink-3 transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu"
                href="#catalog"
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
