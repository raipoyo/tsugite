import SiteFooter from '@/features/marketing/site-footer'
import SiteHeader from '@/features/marketing/site-header'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </>
  )
}
