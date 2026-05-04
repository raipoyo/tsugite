export type ListingStatus = 'draft' | 'published'

export type ShopListingDraft = {
  id: string
  title: string
  status: ListingStatus
  updatedAtLabel: string
}

/** MVP: 一覧はダミー固定。後続でユーザー紐付けのDBに置換 */
export const MOCK_SHOP_LISTINGS: ShopListingDraft[] = [
  {
    id: 'listing-draft-01',
    title: '見習い募集（準備中）',
    status: 'draft',
    updatedAtLabel: '2026-05-02',
  },
  {
    id: 'listing-pub-01',
    title: '初夏のワークショップ補助手当つき',
    status: 'published',
    updatedAtLabel: '2026-04-18',
  },
]

export function getMockListing(id: string): ShopListingDraft | undefined {
  return MOCK_SHOP_LISTINGS.find((l) => l.id === id)
}
