import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import Container from '@/components/ui/container'
import SuccessorProfileForm from '@/features/register/successor-profile-form'

import { parseUserRole } from '@/lib/roles'
import type { ClerkUserPublicMetadataShape } from '@/types/metadata'

export default async function RegisterSuccessorPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const role = parseUserRole(user.publicMetadata as Record<string, unknown>)
  if (!role) redirect('/onboarding/role')
  if (role !== 'successor') redirect('/shop')

  const meta = user.publicMetadata as ClerkUserPublicMetadataShape | undefined | null
  const sp = meta?.successorProfile

  return (
    <main className="flex flex-1 flex-col bg-zinc-50 py-12 dark:bg-black">
      <Container>
        <h1 className="text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          継ぎ手プロフィール
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-600 dark:text-zinc-400">
          興味分野や自己紹介を入力して、応募やスカウト（将来機能）への下地を作ります。
        </p>
        <div className="mt-10">
          <SuccessorProfileForm
            defaultDisplayName={sp?.displayName ?? ''}
            defaultInterests={sp?.interests ?? ''}
            defaultBio={sp?.bio ?? ''}
          />
        </div>
      </Container>
    </main>
  )
}
