/** Row shape for `public.profiles` (aligned with DB migration). */
export type Profile = {
  id: string
  display_name: string
  avatar_url: string | null
  organization_ids: string[]
  created_at: string
  updated_at: string
}
