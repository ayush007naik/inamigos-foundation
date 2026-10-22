import { useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Pin,
  AlertCircle,
} from 'lucide-react'
import { ORG } from '@/data/organization'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { cn } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface FormState {
  name: string
  email: string
  phone: string
  topic: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const EMPTY: FormState = { name: '', email: '', phone: '', topic: 'General enquiry', message: '' }

const TOPICS = [
  'General enquiry',
  'Donation & receipts',
  'Volunteering',
  'CSR & partnerships',
  'Internships (Project Vikas)',
  'Press & media',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s-]{7,17}$/

function validate(values: FormState): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please tell us your name.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (values.message.trim().length < 10) errors.message = 'A little more detail helps us answer properly.'
  return errors
}

export default function Contact() {
  useDocumentTitle(
    'Contact Us — InAmigos Foundation',
    'Write to InAmigos Foundation: support@inamigosfoundation.org.in, +91 626 730 9902, or visit the registered office in Bilaspur, Chhattisgarh.'
  )
  const [values, setValues] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const set = (key: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0] as keyof FormState
      document.getElementById(`contact-${firstKey}`)?.focus()
      return
    }
    // Frontend only — no backend. The confirmation below is a local state.
    setSent(true)
    setValues(EMPTY)
  }

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      setCopied(null)
    }
  }

  const socialIcon: Record<string, typeof Instagram> = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    pinterest: Pin,
  }

  const contactRows = [
    {
      id: 'support',
      icon: Mail,
      label: 'General enquiries',
      value: ORG.email,
      href: `mailto:${ORG.email}`,
    },
    {
      id: 'hr',
      icon: Mail,
      label: 'Volunteering & HR',
      value: ORG.hrEmail,
      href: `mailto:${ORG.hrEmail}`,
    },
    {
      id: 'gmail',
      icon: Mail,
      label: 'Alternate email',
      value: ORG.emailAlternate,
      href: `mailto:${ORG.emailAlternate}`,
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      value: ORG.phone,
      href: `tel:${ORG.phoneRaw}`,
    },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to us. A person reads every message."
        description="Questions about donating, volunteering, partnerships or the work itself — it all lands with the same small team in Bilaspur, Chhattisgarh. We answer, usually within a couple of days."
        image="/img/g-04.webp"
        imageAlt="InAmigos Foundation community gathering"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        meta={
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.64rem] uppercase tracking-widest text-bone-faint">
            <span>Mon — Sat</span>
            <span>10:00 am — 6:00 pm IST</span>
            <span>Bilaspur, Chhattisgarh</span>
          </div>
        }
      />

      {/* --- Form + details --------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Form */}
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us what you need."
              description="This form is validated in your browser — nothing is uploaded or stored on a server by this site. For anything urgent, email or call us directly."
            />

            <Reveal delay={0.1}>
              <div className="mt-10">
                {sent ? (
                  <div
                    role="status"
                    className="rounded-[1.5rem] border border-moss/45 bg-moss/10 p-8"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-moss/50 text-moss">
                      <Check size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-[1.6rem] text-bone">Thank you — it is with us.</h3>
                    <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-bone-dim">
                      Your message has been validated and is ready for the team. Since this site runs
                      entirely in your browser, please also send it to{' '}
                      <a href={`mailto:${ORG.email}`} className="text-ember underline underline-offset-4">
                        {ORG.email}
                      </a>{' '}
                      so it reaches us straight away.
                    </p>
                    <button type="button" onClick={() => setSent(false)} className="btn btn-ghost mt-7">
                      Write another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="space-y-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="field-label">
                          Full name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          className="field"
                          value={values.name}
                          onChange={(e) => set('name', e.target.value)}
                          placeholder="Your name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <p id="contact-name-error" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-clay">
                            <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="field-label">
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          className="field"
                          value={values.email}
                          onChange={(e) => set('email', e.target.value)}
                          placeholder="you@example.com"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p id="contact-email-error" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-clay">
                            <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="field-label">
                          Phone <span className="normal-case tracking-normal text-bone-faint/70">(optional)</span>
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          className="field"
                          value={values.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          placeholder="+91 00000 00000"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                          autoComplete="tel"
                        />
                        {errors.phone && (
                          <p id="contact-phone-error" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-clay">
                            <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-topic" className="field-label">
                          What is it about?
                        </label>
                        <select
                          id="contact-topic"
                          name="topic"
                          className="field"
                          value={values.topic}
                          onChange={(e) => set('topic', e.target.value)}
                        >
                          {TOPICS.map((topic) => (
                            <option key={topic} value={topic}>
                              {topic}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="field-label">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        className="field resize-y"
                        value={values.message}
                        onChange={(e) => set('message', e.target.value)}
                        placeholder="Give us as much context as you can."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="contact-message-error" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-clay">
                          <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <button type="submit" className="btn btn-primary">
                        Send message
                        <ArrowUpRight size={15} strokeWidth={2} />
                      </button>
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                        Or write to {ORG.email}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Details */}
          <div className="space-y-4 lg:pt-24">
            <Reveal>
              <div className="rounded-[1.5rem] border border-line/55 bg-ink-soft/40 p-7">
                <p className="eyebrow">Reach us</p>
                <ul className="mt-6 space-y-5">
                  {contactRows.map((row) => (
                    <li key={row.id} className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ember/30 bg-ember/10 text-ember">
                        <row.icon size={15} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.58rem] uppercase tracking-widest text-bone-faint">
                          {row.label}
                        </span>
                        <a
                          href={row.href}
                          className="mt-1 block truncate font-display text-[1.05rem] text-bone transition-colors hover:text-ember"
                        >
                          {row.value}
                        </a>
                      </span>
                      <button
                        type="button"
                        onClick={() => copy(row.value, row.id)}
                        aria-label={`Copy ${row.label}`}
                        className="mt-4 shrink-0 text-bone-faint transition-colors hover:text-ember"
                      >
                        {copied === row.id ? (
                          <Check size={14} strokeWidth={2} />
                        ) : (
                          <Copy size={14} strokeWidth={1.8} />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[1.5rem] border border-line/55 bg-ink-soft/40 p-7">
                <p className="eyebrow">Registered office</p>
                <div className="mt-5 flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.7} className="mt-1 shrink-0 text-ember" aria-hidden="true" />
                  <address className="not-italic text-[0.95rem] leading-relaxed text-bone-dim">
                    {ORG.address.line1}
                    <br />
                    {ORG.address.line2}
                    <br />
                    {ORG.address.pin}
                    <br />
                    {ORG.address.country}
                  </address>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bilaspur%2C%20Chhattisgarh%20495555%2C%20India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-ember transition-colors hover:text-ember-soft"
                >
                  Open in Maps
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-[1.5rem] border border-line/55 bg-ink-soft/40 p-7">
                <p className="eyebrow">Follow the work</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {ORG.social.map((item) => {
                    const Icon = socialIcon[item.icon] ?? Instagram
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-[1rem] border border-line/60 px-4 py-3 transition-colors hover:border-ember/50 hover:text-ember"
                        >
                          <Icon size={15} strokeWidth={1.7} aria-hidden="true" className="text-ember" />
                          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-bone-dim transition-colors group-hover:text-ember">
                            {item.label}
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="rounded-[1.5rem] border border-ember/35 bg-ember/[0.07] p-7">
                <p className="eyebrow text-ember">Give</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-bone-dim">
                  The foundation is 80G and 12A certified. Every contribution goes towards the six
                  programmes — food and clothing, education, animal care, women&rsquo;s empowerment
                  and greening.
                </p>
                <a
                  href={ORG.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('btn btn-primary mt-6')}
                >
                  Donate securely
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
