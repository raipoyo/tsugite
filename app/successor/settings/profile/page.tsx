import SuccessorProfileForm from '@/features/register/successor-profile-form'
import { getCurrentProfile } from '@/lib/get-profile'

export default async function SuccessorProfileSettingsPage() {
  const profile = await getCurrentProfile()
  const meta = profile?.successor_profile ?? {}

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-6 text-base font-medium text-zinc-700 dark:text-zinc-300">プロフィール</h2>
      <SuccessorProfileForm
        defaultDisplayName={meta.displayName ?? ''}
        defaultInterests={meta.interests ?? ''}
        defaultBio={meta.bio ?? ''}
      />
    </div>
  )
}
