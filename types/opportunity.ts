export type OpportunityId = string

export type Opportunity = {
  id: OpportunityId
  title: string
  shopName: string
  prefecture: string
  excerpt: string
  description: string
  craftType: string
  compensationNote: string
  postedAtIso: string
}
