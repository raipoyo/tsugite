import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TSUGITE — 伝統に、新たな継ぎ手を',
  description:
    '日本各地の伝統技術・文化を担う現場と、学び・継承を望む継ぎ手候補をつなぐプラットフォーム。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
          <div className="flex min-h-screen flex-1 flex-col">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
