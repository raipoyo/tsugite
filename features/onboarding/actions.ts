'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import type { UserRole } from '@/lib/roles'

export async function setUserRole(role: UserRole): Promise<void> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const raw = user.publicMetadata
  const meta =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {}

  try {
    await client.users.updateUser(userId, {
      publicMetadata: {
        ...meta,
        role,
      },
    })
  } catch {
    redirect('/onboarding/role?error=failed')
  }

  redirect(role === 'shop' ? '/register/shop' : '/register/successor')
}
