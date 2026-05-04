import { demoScenario, mvpMetrics } from '@/features/hackathon/mvp-data'
import { LinkButton, StatCard } from '@/features/hackathon/mvp-ui'

export default function PitchVisualPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-8 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(185,80,59,0.42),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(238,240,236,0.14),transparent_24%)]" />
        <div className="relative flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-shu-3">TSUGITE</p>
          <LinkButton href="/demo/ryokan" variant="secondary">
            デモへ
          </LinkButton>
        </div>

        <div className="relative grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xl text-white/58">Hackathon MVP</p>
            <h1 className="mt-6 max-w-4xl text-6xl font-semibold tracking-tight md:text-8xl">
              {demoScenario.pitchLine}
            </h1>
            <p className="mt-8 max-w-2xl text-2xl leading-10 text-white/68">
              Archive、Guide、Agentを1つの旅館デモに固定。審査員に「暗黙知が残り、現場で使える」瞬間だけを見せる。
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/14 bg-white/8 p-5 backdrop-blur">
            <div className="aspect-[4/3] rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(238,240,236,0.22),rgba(185,80,59,0.18)),radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.28),transparent_24%)] p-5">
              <div className="flex h-full flex-col justify-end rounded-[1.2rem] border border-white/15 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-white/48">Live feedback</p>
                <p className="mt-3 text-3xl font-semibold">
                  茶托を右へ2cm。急須の注ぎ口は客側へ向けない。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative grid gap-4 md:grid-cols-3">
          {mvpMetrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>
    </main>
  )
}
