import type { Opportunity } from '@/types/opportunity'

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'kogei-001',
    title: '漆芸工房での基礎講習と職人体験',
    shopName: '京漆 いと川',
    prefecture: '京都府',
    excerpt: '拭き漆の基礎から、小物づくりを通じた継承プログラム。',
    description:
      '本格漆工房での3ヶ月の基礎講習です。漆の扱い方、下地、拭き漆までを一緒に進めます。経験は不問。安全講習のうえ工房作業に参加いただきます。',
    craftType: '漆芸',
    compensationNote: '交通費支援・条件は面談時にご案内します',
    postedAtIso: '2026-04-12T00:00:00.000Z',
  },
  {
    id: 'kogei-002',
    title: '藍染め工房の見学型インターンシップ',
    shopName: '群青舎',
    prefecture: '徳島県',
    excerpt: '天然藍の建て方から染めまで。観光地では味わえない現場があります。',
    description:
      '藍瓮の管理補佐、生地の準備、染め行程のフォローを担当していただきます。土日祝の稼働相談可。伝統資料のデータ化プロジェクトにも参加いただけます。',
    craftType: '染織（藍染）',
    compensationNote: '日当の有無・金額は募集段階で確定させます（現時点未取得）',
    postedAtIso: '2026-04-02T00:00:00.000Z',
  },
  {
    id: 'kogei-003',
    title: '鍛錬場での小刀仕上げ補佐',
    shopName: '朝霧鍛冶',
    prefecture: '岐阜県',
    excerpt: '小刀の研磨・柄巻など、仕上げ工程を中心にキャリア形成を支援。',
    description:
      '安全区域での研磨補佐、素材仕分け、顧客向けワークショップ補佐が主な業務です。ヒアリングのうえ、段階的に工程を拡張します。',
    craftType: '鍛冶',
    compensationNote: '雇用形態・給与は面談（正社員登用の実績あり）',
    postedAtIso: '2026-03-28T00:00:00.000Z',
  },
]

export function getOpportunityById(id: string): Opportunity | undefined {
  return MOCK_OPPORTUNITIES.find((o) => o.id === id)
}
