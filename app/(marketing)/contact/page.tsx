import Container from '@/components/ui/container'

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col py-12 md:py-16">
      <Container className="max-w-xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink">お問い合わせ</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-3">
          MVP
          フェーズでは窓口を用意していません。開発チームへの連絡はリポジトリに紐付くワークフローに沿ってください。
        </p>
        <p className="mt-6 text-sm leading-relaxed text-ink-3">
          正式リリース時には、このページからフォームまたはメール転送での連絡を受けられるようにします。
        </p>
      </Container>
    </main>
  )
}
