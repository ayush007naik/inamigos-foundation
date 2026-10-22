import { Outlet } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { ScrollToTop } from './ScrollToTop'
import { Preloader } from '@/components/effects/Preloader'
import { Cursor } from '@/components/effects/Cursor'
import { ScrollProgress } from '@/components/effects/ScrollProgress'

export function Layout() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <ScrollToTop />
      <div className="grain-fixed" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ember focus:px-5 focus:py-2.5 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
