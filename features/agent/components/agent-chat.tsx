'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import Card from '@/components/ui/card'
import type { ChatCitation } from '@/types/agent'

type AgentChatProps = {
  shopId: string
}

type AgentChatMessage = UIMessage<unknown, { citations: ChatCitation[] }>

function getMessageCitations(message: AgentChatMessage): ChatCitation[] {
  return message.parts.find((part) => part.type === 'data-citations')?.data ?? []
}

export default function AgentChat({ shopId }: AgentChatProps) {
  const [input, setInput] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { error, messages, sendMessage, status } = useChat<AgentChatMessage>({
    transport: new DefaultChatTransport<AgentChatMessage>({
      api: '/api/agent/chat',
      body: { shopId },
    }),
    onFinish: async ({ message }) => {
      // Generate TTS audio for assistant's response
      if (message.role === 'assistant') {
        const text = message.parts
          .filter((part) => part.type === 'text')
          .map((part) => part.text)
          .join('')

        if (!text) return

        try {
          const response = await fetch('/api/agent/tts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text,
            }),
          })

          if (response.ok) {
            const audioBlob = await response.blob()
            const url = URL.createObjectURL(audioBlob)
            setAudioUrl(url)

            // Auto-play audio
            if (audioRef.current) {
              audioRef.current.src = url
              void audioRef.current.play()
              setIsPlayingAudio(true)
            }
          }
        } catch (error) {
          console.error('Failed to generate audio:', error)
        }
      }
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handlePlayAudio = () => {
    if (audioRef.current && audioUrl) {
      void audioRef.current.play()
      setIsPlayingAudio(true)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlayingAudio(false)}
        onPause={() => setIsPlayingAudio(false)}
      />

      {/* Messages area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-ink">先代女将に相談できます</h3>
              <p className="text-sm text-ink/60">
                困ったことや判断に迷うことがあれば、お気軽にご質問ください。
              </p>
              <div className="mt-4 space-y-2 text-left">
                <p className="text-xs font-medium text-ink/60">サンプル質問:</p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setInput('常連の田中様が来られた時の対応は？')
                    }}
                    className="block w-full rounded border border-ink/10 p-2 text-left text-xs text-ink/80 hover:bg-washi/50"
                  >
                    • 常連の田中様が来られた時の対応は？
                  </button>
                  <button
                    onClick={() => {
                      setInput('季節の挨拶で気をつけることは？')
                    }}
                    className="block w-full rounded border border-ink/10 p-2 text-left text-xs text-ink/80 hover:bg-washi/50"
                  >
                    • 季節の挨拶で気をつけることは？
                  </button>
                  <button
                    onClick={() => {
                      setInput('お茶の温度はどのくらいが適切？')
                    }}
                    className="block w-full rounded border border-ink/10 p-2 text-left text-xs text-ink/80 hover:bg-washi/50"
                  >
                    • お茶の温度はどのくらいが適切？
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card
              className={`max-w-[80%] p-4 ${
                message.role === 'user' ? 'bg-shu/10 text-ink' : 'bg-washi text-ink'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">
                {message.parts.map((part, index) =>
                  part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                )}
              </div>
              {message.role === 'assistant' && getMessageCitations(message).length > 0 && (
                <div className="mt-4 border-t border-ink/10 pt-3">
                  <div className="text-xs font-medium text-ink/60">参照した暗黙知タグ</div>
                  <div className="mt-2 space-y-2">
                    {getMessageCitations(message).map((citation) => (
                      <div
                        key={citation.id}
                        className="rounded-md border border-washi-3 bg-white p-2"
                      >
                        <div className="flex items-center gap-2">
                          <p className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">
                            {citation.title}
                          </p>
                          <Badge tone={citation.retrieval === 'vector' ? 'success' : 'neutral'}>
                            {citation.retrieval === 'vector' ? '類似' : '最近'}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-ink/70">{citation.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {message.role === 'assistant' &&
                audioUrl &&
                messages[messages.length - 1].id === message.id && (
                  <div className="mt-2">
                    <button
                      onClick={handlePlayAudio}
                      disabled={isPlayingAudio}
                      className="text-xs text-shu hover:underline disabled:opacity-50"
                    >
                      {isPlayingAudio ? '再生中...' : '音声で聞く'}
                    </button>
                  </div>
                )}
            </Card>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] bg-washi p-4 text-ink">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-ink/60"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-ink/60 [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-ink/60 [animation-delay:0.4s]"></div>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="border-t border-danger/20 bg-danger-bg px-4 py-3 text-sm text-danger">
          Agent の応答生成に失敗しました。ログイン状態と店舗へのアクセス権を確認してください。
        </div>
      )}

      {/* Input area */}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!input.trim()) return
          sendMessage({ text: input })
          setInput('')
        }}
        className="border-t border-ink/10 p-4"
      >
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="質問を入力してください..."
            className="flex-1 resize-none rounded-md border border-washi-3 bg-white px-3 py-2 text-base text-ink shadow-xs transition-colors placeholder:text-ink-4 hover:border-ink-4 focus:border-shu focus:outline-2 focus:outline-offset-2 focus:outline-shu disabled:cursor-not-allowed disabled:bg-washi disabled:text-ink-4"
            rows={3}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            送信
          </Button>
        </div>
      </form>
    </div>
  )
}
