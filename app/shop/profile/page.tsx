import Container from '@/components/ui/container'
import ShopProfileForm from '@/features/register/shop-profile-form'

import { currentUser } from '@clerk/nextjs/server'
import type { ClerkUserPublicMetadataShape } from '@/types/metadata'

export default async function ShopProfilePage() {
  const user = await currentUser()
  const meta = user?.publicMetadata as ClerkUserPublicMetadataShape | undefined | null
  const sp = meta?.shopProfile

  return (
    <section className="flex flex-col gap-6 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">店プロフィール</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          入力内容は現状ユーザー publicMetadata に保持されます。
        </p>
        <div className="mt-8">
          <ShopProfileForm
            defaultDisplayName={sp?.displayName ?? ''}
            defaultRegion={sp?.region ?? ''}
            defaultDescription={sp?.description ?? ''}
          />
        </div>
      </Container>
    </section>
  )
}
