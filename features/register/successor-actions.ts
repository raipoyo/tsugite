'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { parseUserRole } from '@/lib/roles'

const MAX_LENGTH = 2000

export type SuccessorProfileState = {
  error?: string
}

export async function saveSuccessorProfile(
  prev: SuccessorProfileState,
  formData: FormData,
): Promise<SuccessorProfileState> {
  void prev
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  if (parseUserRole(user.publicMetadata as Record<string, unknown>) !== 'successor') {
    return { error: 'role_mismatch' }
  }

  const displayName = String(formData.get('displayName') ?? '').trim()
  const interests = String(formData.get('interests') ?? '').trim()
  const bio = String(formData.get('bio') ?? '').trim()

  if (!displayName) {
    return { error: 'required' }
  }
  if (bio.length > MAX_LENGTH || interests.length > MAX_LENGTH) {
    return { error: 'too_long' }
  }

  const raw = user.publicMetadata
  const meta =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {}

  await client.users.updateUser(userId, {
    publicMetadata: {
      ...meta,
      successorProfile: {
        displayName,
        interests,
        bio,
      },
    },
  })

  redirect('/successor')
}
