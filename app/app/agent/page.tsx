import AgentDemoChat from '@/features/hackathon/agent-demo-chat'
import { PageHeader } from '@/features/hackathon/mvp-ui'
import { getAppData } from '@/features/hackathon/real-data'

export default async function AgentPage() {
  const { tags } = await getAppData()

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Agent"
        title="店主AI分身とのチャット"
        description="Archiveから抽出した暗黙知タグを出典に、先代の判断理由まで返す。"
      />
      <AgentDemoChat tags={tags} />
    </main>
  )
}
