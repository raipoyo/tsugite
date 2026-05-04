import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Serif_JP } from 'next/font/google'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const notoSerifJP = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  preload: false,
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
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJP.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
