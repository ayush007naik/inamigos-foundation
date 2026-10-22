import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Instagram, Facebook, Twitter, Send, Mail, Phone, MapPin, Check } from 'lucide-react'
import { ORG, NAV_LINKS } from '@/data/organization'
import { INITIATIVES } from '@/data/initiatives'
import { Aurora } from '@/components/Aurora'
import { cn } from '@/lib/utils'

const SOCIAL_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
}

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    // Frontend-only build: acknowledgement is shown locally, nothing is transmitted.
    setSent(true)
    setEmail('')
    window.setTimeout(() => setSent(false), 4200)
  }

  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate overflow-hidden border-t border-line/50 bg-ink-soft">
      <div className="hairline-ember absolute inset-x-0 top-0 h-px" aria-hidden="true" />
      <Aurora className="-z-10" intensity={0.28} />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-ember/10 blur-[120px]" aria-hidden="true" />

      <div className="shell relative py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">Stay in the loop</p>
            <h2 className="display mt-5 max-w-[15ch] text-[clamp(2.1rem,1.3rem+3.2vw,3.75rem)] text-bone">
              Compassion is a practice, not a moment.
            </h2>
            <p className="lede mt-6 max-w-[46ch]">
              Join the InAmigos circle for field updates, volunteer calls and new initiatives — and
              help keep six projects moving across India.
            </p>

            <form onSubmit={handleSubscribe} className="mt-9 max-w-md" noValidate>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-3 border-b border-line pb-3 transition-colors focus-within:border-ember">
                <Send size={16} strokeWidth={1.6} className="shrink-0 text-bone-faint" aria-hidden="true" />
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-[0.95rem] text-bone outline-none placeholder:text-bone-faint"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-ember px-4 py-2 font-mono text-[0.62rem] uppercase tracking-widest text-ink transition-transform duration-300 hover:scale-[1.04]"
                >
                  {sent ? <Check size={13} className="mx-auto" aria-label="Subscribed" /> : 'Join'}
                </button>
              </div>
              <p
                className={cn(
                  'mt-3 font-mono text-[0.62rem] uppercase tracking-widest transition-opacity duration-300',
                  sent ? 'text-moss opacity-100' : 'text-bone-faint opacity-0'
                )}
                role="status"
              >
                {sent ? 'Thank you — you are on the list.' : ''}
              </p>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow">Explore</h3>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-2 text-[0.92rem] text-bone-dim transition-colors duration-300 hover:text-bone"
                    >
                      <span className="h-px w-0 bg-ember transition-all duration-500 ease-cinematic group-hover:w-5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow">Initiatives</h3>
              <ul className="mt-5 space-y-3">
                {INITIATIVES.map((i) => (
                  <li key={i.key}>
                    <Link
                      to={`/causes#${i.key}`}
                      className="group inline-flex items-center gap-2 text-[0.92rem] text-bone-dim transition-colors duration-300 hover:text-bone"
                    >
                      <span className="h-px w-0 bg-ember transition-all duration-500 ease-cinematic group-hover:w-5" />
                      {i.project}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line/50 pt-12 md:grid-cols-3">
          <address className="not-italic">
            <h3 className="eyebrow">Contact us</h3>
            <ul className="mt-5 space-y-3.5 text-[0.92rem] text-bone-dim">
              <li className="flex gap-3">
                <MapPin size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                <span>
                  {ORG.address.line1}
                  <br />
                  {ORG.address.line2} — {ORG.address.pin}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                <a href={`mailto:${ORG.email}`} className="underline-draw">
                  {ORG.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                <a href={`tel:${ORG.phoneRaw}`} className="underline-draw">
                  {ORG.phone}
                </a>
              </li>
            </ul>
          </address>

          <div>
            <h3 className="eyebrow">Follow us</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {ORG.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line/70 text-bone-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/60 hover:text-ember"
                    >
                      {Icon ? <Icon size={17} strokeWidth={1.6} /> : null}
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="mt-6 max-w-[34ch] text-[0.85rem] leading-relaxed text-bone-faint">
              Section 8 registered non-profit · 80G & 12A certified · CSR-1 registered · NITI Aayog
              registered · IAF ISO 9001:2015 certified.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <h3 className="eyebrow">Back to top</h3>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group grid h-12 w-12 place-items-center rounded-full border border-line/70 text-bone-dim transition-all duration-300 hover:border-ember/60 hover:text-ember"
              aria-label="Scroll back to top"
            >
              <ArrowUp
                size={18}
                strokeWidth={1.6}
                className="transition-transform duration-500 ease-cinematic group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-bone-faint">
            © {year} {ORG.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-bone-faint">
            {ORG.credits.label && (
              <a href={ORG.credits.href} target="_blank" rel="noopener noreferrer" className="underline-draw">
                {ORG.credits.label}
              </a>
            )}
          </p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative select-none overflow-hidden px-5 pb-6" aria-hidden="true">
        <p className="display whitespace-nowrap text-center text-[clamp(3.5rem,13vw,13rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--c-bone)/0.12)]">
          InAmigos Foundation
        </p>
        <p className="display mt-2 whitespace-nowrap text-center text-[clamp(1.1rem,2.6vw,2.6rem)] leading-none text-bone/10">
          Where friendship becomes action
        </p>
      </div>
    </footer>
  )
}
