import ShopProfileForm from '@/features/register/shop-profile-form'
import { getCurrentProfile } from '@/lib/get-profile'

export default async function ShopInfoSettingsPage() {
  const profile = await getCurrentProfile()
  const meta = profile?.shop_profile ?? {}

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-6 text-base font-medium text-zinc-700 dark:text-zinc-300">店舗情報</h2>
      <ShopProfileForm
        defaultDisplayName={meta.displayName ?? ''}
        defaultRegion={meta.region ?? ''}
        defaultDescription={meta.description ?? ''}
      />
    </div>
  )
}
