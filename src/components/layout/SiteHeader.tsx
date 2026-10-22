import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, ORG } from '@/data/organization'
import { useTheme } from '@/hooks/useTheme'
import { useLockBodyScroll, useEscapeKey } from '@/hooks/useLockBodyScroll'
import { asset, cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useLockBodyScroll(open)
  useEscapeKey(() => setOpen(false), open)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic',
          scrolled
            ? 'border-b border-line/50 bg-ink/80 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`${ORG.name} — home`}
          >
            <img
              src={asset('/img/mark.png')}
              alt=""
              width={32}
              height={42}
              className="h-8 w-auto shrink-0 transition-transform duration-700 ease-cinematic group-hover:-translate-y-0.5 md:h-9"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.95rem] font-medium tracking-[-0.01em] text-bone">
                InAmigos
              </span>
              <span className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-widest text-bone-faint">
                Foundation
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative block rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300',
                        isActive ? 'text-bone' : 'text-bone-dim hover:text-bone'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 -z-10 rounded-full bg-ember/10 ring-1 ring-ember/25"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line/70 text-bone-dim transition-colors duration-300 hover:border-ember/50 hover:text-ember"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -70, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 70, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="grid place-items-center"
                >
                  {theme === 'dark' ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href={ORG.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden !px-5 !py-3 !text-[0.8rem] sm:inline-flex"
            >
              Donate
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line/70 text-bone transition-colors duration-300 hover:border-ember/50 lg:hidden"
            >
              <Menu size={18} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div
              className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line/70 text-bone"
                >
                  <X size={18} strokeWidth={1.7} />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10 flex-1">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink
                        to={link.href}
                        end={link.href === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-baseline justify-between border-b border-line/40 py-4 font-display text-3xl tracking-tightest transition-colors',
                            isActive ? 'text-ember' : 'text-bone'
                          )
                        }
                      >
                        <span>{link.label}</span>
                        <span className="font-mono text-[0.6rem] text-bone-faint">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 space-y-4">
                <a
                  href={ORG.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  Donate to the foundation
                  <ArrowUpRight size={16} strokeWidth={2} />
                </a>
                <a
                  href={ORG.volunteerFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full"
                >
                  Become a volunteer
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
