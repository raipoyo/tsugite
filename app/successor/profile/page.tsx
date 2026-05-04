import Container from '@/components/ui/container'
import SuccessorProfileForm from '@/features/register/successor-profile-form'
import { getCurrentProfile } from '@/lib/get-profile'

export default async function SuccessorProfilePage() {
  const profile = await getCurrentProfile()
  const sp = profile?.successor_profile

  return (
    <section className="flex flex-col gap-6 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">プロフィール</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          入力内容は <code className="text-xs">profiles.successor_profile</code> に保持されます。
        </p>
        <div className="mt-8">
          <SuccessorProfileForm
            defaultDisplayName={sp?.displayName ?? ''}
            defaultInterests={sp?.interests ?? ''}
            defaultBio={sp?.bio ?? ''}
          />
        </div>
      </Container>
    </section>
  )
}
