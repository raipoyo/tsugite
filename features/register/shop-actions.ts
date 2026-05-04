'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { parseUserRole } from '@/lib/roles'

const MAX_LENGTH = 2000

export type ShopProfileState = {
  error?: string
}

export async function saveShopProfile(
  prev: ShopProfileState,
  formData: FormData,
): Promise<ShopProfileState> {
  void prev
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  if (parseUserRole(user.publicMetadata as Record<string, unknown>) !== 'shop') {
    return { error: 'role_mismatch' }
  }

  const displayName = String(formData.get('displayName') ?? '').trim()
  const region = String(formData.get('region') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()

  if (!displayName || !region) {
    return { error: 'required' }
  }
  if (description.length > MAX_LENGTH) {
    return { error: 'too_long' }
  }

  const raw = user.publicMetadata
  const meta =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {}

  await client.users.updateUser(userId, {
    publicMetadata: {
      ...meta,
      shopProfile: {
        displayName,
        region,
        description,
      },
    },
  })

  redirect('/shop')
}
