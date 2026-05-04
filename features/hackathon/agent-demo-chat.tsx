'use client'

import { useState } from 'react'

import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { agentMessages, tacitTags } from '@/features/hackathon/mvp-data'

type Message = {
  role: 'assistant' | 'user'
  text: string
  source?: string
}

const replies = [
  'それは急がなくていい。まず相手が何に困っているかを見るの。荷物、足元、表情。この順で整えると、言葉は少なくて済むわ。',
  'お茶は熱さより香りを優先しなさい。到着直後のお客様には、急かされている印象を残さないこと。',
  '新人には全部を直させない。一番印象に残る一点だけ戻して、次の成功を作りなさい。',
]

export default function AgentDemoChat() {
  const [messages, setMessages] = useState<Message[]>([...agentMessages])
  const [input, setInput] = useState('雨の日の玄関対応で最初に見ることは？')

  function submit() {
    const value = input.trim()
    if (!value) return
    const reply = replies[messages.length % replies.length]
    setMessages((current) => [
      ...current,
      { role: 'user', text: value },
      { role: 'assistant', text: reply, source: '暗黙知タグ: 雨の日の玄関対応' },
    ])
    setInput('')
  }

  return (
    <div className="grid min-h-[640px] gap-6 lg:grid-cols-[1fr_340px]">
      <Card className="flex min-h-[560px] flex-col overflow-hidden">
        <div className="border-b border-washi-3 bg-ink px-5 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">Okami voice agent</p>
          <h1 className="mt-1 text-xl font-semibold">先代女将AI</h1>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto bg-surface-muted p-5">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={message.role === 'user' ? 'text-right' : ''}
            >
              <div
                className={
                  message.role === 'user'
                    ? 'ml-auto inline-block max-w-[82%] rounded-2xl bg-shu px-4 py-3 text-left text-sm leading-7 text-white'
                    : 'inline-block max-w-[82%] rounded-2xl border border-washi-3 bg-white px-4 py-3 text-sm leading-7 text-ink shadow-sm'
                }
              >
                {message.text}
                {message.source ? (
                  <p className="mt-3 border-t border-washi-3 pt-2 text-xs font-semibold text-shu">
                    参照: {message.source}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <form
          className="border-t border-washi-3 bg-white p-4"
          onSubmit={(event) => {
            event.preventDefault()
            submit()
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-11 flex-1 rounded-full border border-washi-3 px-4 text-sm text-ink outline-none focus:border-shu focus:ring-2 focus:ring-shu/20"
              placeholder="先代に質問する"
            />
            <Button type="submit">送信</Button>
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-ink">RAG出典</h2>
          <div className="mt-4 space-y-3">
            {tacitTags.slice(0, 3).map((tag) => (
              <div key={tag.situation} className="rounded-xl border border-washi-3 bg-white p-3">
                <p className="text-sm font-semibold text-ink">{tag.situation}</p>
                <p className="mt-1 text-xs leading-5 text-ink-4">{tag.reason}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-ink">音声デモ</h2>
          <p className="mt-2 text-sm leading-7 text-ink-3">
            本番API接続時は回答をTTS化。ハッカソン展示では、チャットの返答と出典提示を確実に見せる。
          </p>
          <div className="mt-4 rounded-full bg-washi-2 p-2">
            <div className="h-2 w-2/3 rounded-full bg-shu" />
          </div>
        </Card>
      </div>
    </div>
  )
}
