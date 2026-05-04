import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import DashboardSideNav from '@/features/dashboard/dashboard-side-nav'

import { parseUserRole } from '@/lib/roles'

const SUCCESSOR_NAV = [
  { href: '/successor', label: '概要' },
  { href: '/successor/profile', label: 'プロフィール' },
  { href: '/successor/applications', label: '応募一覧' },
] as const

export default async function SuccessorSectionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const role = parseUserRole(user.publicMetadata as Record<string, unknown>)
  if (!role) redirect('/onboarding/role')
  if (role !== 'successor') redirect('/shop')

  return (
    <div className="flex min-h-[60vh] flex-1 flex-col md:flex-row">
      <DashboardSideNav title="継ぎ手向けメニュー" items={[...SUCCESSOR_NAV]} />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
