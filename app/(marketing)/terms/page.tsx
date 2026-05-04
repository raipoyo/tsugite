import Container from '@/components/ui/container'

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col py-12 md:py-16">
      <Container className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-ink-3 md:text-base">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink">
          利用規約（ドラフト）
        </h1>
        <p>
          本ページの利用規約はプレースホルダーです。正式版リリース前に、法的レビューを経た条文で置き換えます。
          サービス運営側の義務、アカウント削除、コンテンツの権利帰属、準拠法・管轄裁判所などについて取り決めていきます。
        </p>
        <ul className="list-inside list-disc space-y-3 text-ink-3">
          <li>
            サービス対象ユーザーは、18
            歳以上または保護者の同意を得ている未成年人に限定することがあります。
          </li>
          <li>
            掲載内容の正確さはユーザー責務とし、公序良俗および法令に抵触する情報の掲載を禁止しています。
          </li>
          <li>Beta の間は SLA・賠償範囲を限定することがあります。</li>
        </ul>
      </Container>
    </main>
  )
}
