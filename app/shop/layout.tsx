import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import DashboardSideNav from '@/features/dashboard/dashboard-side-nav'

import { parseUserRole } from '@/lib/roles'

const SHOP_NAV = [
  { href: '/shop', label: '概要' },
  { href: '/shop/profile', label: 'プロフィール' },
  { href: '/shop/listings', label: '募集管理' },
  { href: '/shop/applications', label: '応募' },
] as const

export default async function ShopSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const role = parseUserRole(user.publicMetadata as Record<string, unknown>)
  if (!role) redirect('/onboarding/role')
  if (role !== 'shop') redirect('/successor')

  return (
    <div className="flex min-h-[60vh] flex-1 flex-col md:flex-row">
      <DashboardSideNav title="店向けメニュー" items={[...SHOP_NAV]} />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
