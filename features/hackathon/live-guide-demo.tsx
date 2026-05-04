'use client'

import { useEffect, useState } from 'react'

import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'

const checks = [
  { label: '湯呑みの向き', status: 'OK', detail: '絵柄が客側を向いている' },
  { label: '茶托の位置', status: '注意', detail: '右へ2cm寄せると正解に近い' },
  { label: '菓子皿の余白', status: 'OK', detail: '客の利き手側に十分な余白' },
  { label: '急須の注ぎ口', status: '注意', detail: '客へ向けない。少し斜め外へ' },
] as const

export default function LiveGuideDemo() {
  const [running, setRunning] = useState(true)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setTick((value) => value + 1), 1800)
    return () => window.clearInterval(id)
  }, [running])

  const activeCheck = checks[tick % checks.length]
  const score = 78 + ((tick * 7) % 15)

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <Card className="overflow-hidden bg-ink text-white">
        <div className="relative h-[360px] overflow-hidden bg-[radial-gradient(circle_at_35%_20%,rgba(240,216,208,0.22),transparent_28%),linear-gradient(135deg,#17242d,#243a46_52%,#111820)] p-5 sm:aspect-[4/3] sm:h-auto">
          <div className="absolute left-[18%] top-[18%] h-24 w-32 rounded-full border border-white/15 bg-white/8 blur-[1px]" />
          <div className="absolute left-[33%] top-[42%] h-32 w-44 rounded-[45%] border-2 border-shu-3/80 bg-shu-3/10 shadow-[0_0_50px_rgba(240,216,208,0.22)]" />
          <div className="absolute left-[42%] top-[51%] h-16 w-20 rounded-full border border-white/30 bg-white/10" />
          <div className="absolute right-[22%] top-[34%] h-20 w-28 rounded-xl border border-white/20 bg-white/8" />
          <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/15 bg-black/28 p-4 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                  Gemma 3 live judge
                </p>
                <p className="mt-1 text-lg font-semibold">{activeCheck.detail}</p>
              </div>
              <Badge tone={activeCheck.status === 'OK' ? 'success' : 'warning'}>
                {activeCheck.status}
              </Badge>
            </div>
          </div>
          <div className="absolute left-[30%] top-[39%] h-44 w-56 rounded-[42%] border-2 border-dashed border-shu-3/70" />
          <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            {running ? 'LIVE' : 'PAUSED'}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-5">
          <p className="text-sm text-ink-4">一致度スコア</p>
          <div className="mt-3 flex items-end gap-3">
            <p className="text-5xl font-semibold text-ink">{score}</p>
            <p className="pb-2 text-sm font-semibold text-shu">/ 100</p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-washi-2">
            <div
              className="h-full rounded-full bg-shu transition-all"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="mt-5 flex gap-2">
            <Button
              onClick={() => setRunning((value) => !value)}
              variant={running ? 'danger' : 'primary'}
            >
              {running ? '判定を止める' : '判定を再開'}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold text-ink">判定項目</h2>
          <div className="mt-4 space-y-3">
            {checks.map((check) => (
              <div
                key={check.label}
                className="rounded-xl border border-washi-3 bg-surface-muted p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">{check.label}</p>
                  <Badge tone={check.status === 'OK' ? 'success' : 'warning'}>{check.status}</Badge>
                </div>
                <p className="mt-1 text-xs leading-5 text-ink-4">{check.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
