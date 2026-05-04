import Container from '@/components/ui/container'
import ShopProfileForm from '@/features/register/shop-profile-form'
import { getCurrentProfile } from '@/lib/get-profile'

export default async function ShopProfilePage() {
  const profile = await getCurrentProfile()
  const sp = profile?.shop_profile

  return (
    <section className="flex flex-col gap-6 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">店プロフィール</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          入力内容は <code className="text-xs">profiles.shop_profile</code> に保持されます。
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
