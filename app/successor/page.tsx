import Container from '@/components/ui/container'

export default function SuccessorDashboardPage() {
  return (
    <section className="flex flex-col gap-10 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">継ぎ手ホーム</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Archive・Guide・Agent を使って現場の技術を学びましょう。
        </p>
      </Container>
    </section>
  )
}
