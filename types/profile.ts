export type UserRole = 'shop' | 'successor'

export type ShopProfileMeta = {
  displayName?: string
  region?: string
  description?: string
}

export type SuccessorProfileMeta = {
  displayName?: string
  interests?: string
  bio?: string
}

/** Row shape for `public.profiles` (aligned with DB migrations). */
export type Profile = {
  id: string
  display_name: string
  avatar_url: string | null
  organization_ids: string[]
  role: UserRole | null
  shop_profile: ShopProfileMeta | null
  successor_profile: SuccessorProfileMeta | null
  created_at: string
  updated_at: string
}
