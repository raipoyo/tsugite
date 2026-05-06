import SettingsTabNav from '@/features/settings/settings-tab-nav'

const SUCCESSOR_SETTINGS_TABS = [
  { href: '/successor/settings/profile', label: 'プロフィール' },
  { href: '/successor/settings/account', label: 'アカウント' },
]

export default function SuccessorSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-zinc-200 px-6 pt-6 dark:border-zinc-800">
        <h1 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">設定</h1>
        <SettingsTabNav tabs={SUCCESSOR_SETTINGS_TABS} role="successor" />
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
