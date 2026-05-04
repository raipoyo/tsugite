import AgentDemoChat from '@/features/hackathon/agent-demo-chat'
import { PageHeader } from '@/features/hackathon/mvp-ui'

export default function AgentPage() {
  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Agent"
        title="店主AI分身とのチャット"
        description="Archiveの暗黙知タグを出典に、判断理由まで返す。ハッカソンでは音声より、回答と出典がつながることを確実に見せる。"
      />
      <AgentDemoChat />
    </main>
  )
}
