import SettingsTabNav from '@/features/settings/settings-tab-nav'

const SHOP_SETTINGS_TABS = [
  { href: '/shop/settings/shop', label: '店舗情報' },
  { href: '/shop/settings/members', label: 'メンバー' },
  { href: '/shop/settings/account', label: 'アカウント' },
]

export default function ShopSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-zinc-200 px-6 pt-6 dark:border-zinc-800">
        <h1 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">設定</h1>
        <SettingsTabNav tabs={SHOP_SETTINGS_TABS} role="shop" />
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
