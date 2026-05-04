import AgentDemoChat from '@/features/hackathon/agent-demo-chat'
import { PageHeader } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function AgentPage() {
  const { isReal, tags } = await getAppData()

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Agent"
        title="店主AI分身とのチャット"
        description={
          isReal
            ? 'Supabaseの暗黙知タグを出典に、判断理由まで返す。'
            : 'Archiveの暗黙知タグを出典に、判断理由まで返す。未ログイン時はデモデータで動く。'
        }
      />
      <AgentDemoChat tags={tags} />
    </main>
  )
}
