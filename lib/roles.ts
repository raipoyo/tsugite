import type { ClerkUserPublicMetadataShape } from '@/types/metadata'

export type UserRole = 'shop' | 'successor'

export function parseUserRole(
  meta: ClerkUserPublicMetadataShape | Record<string, unknown> | undefined | null,
): UserRole | null {
  if (!meta || typeof meta !== 'object') return null
  const r = 'role' in meta ? meta.role : undefined
  if (r === 'shop' || r === 'successor') return r
  return null
}
