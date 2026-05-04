import type { Profile, UserRole } from '@/types/profile'

export type { UserRole } from '@/types/profile'

export function parseUserRole(profile: Pick<Profile, 'role'> | null | undefined): UserRole | null {
  const r = profile?.role
  if (r === 'shop' || r === 'successor') return r
  return null
}
