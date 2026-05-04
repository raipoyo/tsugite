import type { UserRole } from '@/lib/roles'

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

/** Clerk `publicMetadata` shape we persist in this app (extend as needed). */
export type ClerkUserPublicMetadataShape = {
  role?: UserRole
  shopProfile?: ShopProfileMeta
  successorProfile?: SuccessorProfileMeta
}
