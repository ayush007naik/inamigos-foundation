import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, ArrowUpRight, Check, ImagePlus, ShieldCheck, X } from 'lucide-react'
import { ORG } from '@/data/organization'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  profession: string
  facebook: string
  twitter: string
  linkedin: string
  address: string
  about: string
}

type Errors = Partial<Record<keyof FormState, string>>

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  profession: '',
  facebook: '',
  twitter: '',
  linkedin: '',
  address: '',
  about: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s-]{7,17}$/
const URL_RE = /^$|^https?:\/\/[^\s]+\.[^\s]+/i

function validate(values: FormState): Errors {
  const errors: Errors = {}
  if (values.firstName.trim().length < 2) errors.firstName = 'First name is required.'
  if (values.lastName.trim().length < 2) errors.lastName = 'Last name is required.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!PHONE_RE.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (!URL_RE.test(values.facebook.trim())) errors.facebook = 'Use a full URL starting with https://'
  if (!URL_RE.test(values.twitter.trim())) errors.twitter = 'Use a full URL starting with https://'
  if (!URL_RE.test(values.linkedin.trim())) errors.linkedin = 'Use a full URL starting with https://'
  if (values.address.trim().length < 8) errors.address = 'Tell us your city and state.'
  if (values.about.trim().length < 20)
    errors.about = 'A couple of lines about you helps us place you well.'
  return errors
}

export default function VolunteerApply() {
  useDocumentTitle(
    'Become a Volunteer — InAmigos Foundation',
    'Apply to volunteer with InAmigos Foundation. Tell us about yourself and we will match you to a programme in your city.'
  )
  const [values, setValues] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [photo, setPhoto] = useState<string | null>(null)
  const [photoName, setPhotoName] = useState<string>('')
  const [sent, setSent] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (photo) URL.revokeObjectURL(photo)
    setPhoto(URL.createObjectURL(file))
    setPhotoName(file.name)
  }

  const clearPhoto = () => {
    if (photo) URL.revokeObjectURL(photo)
    setPhoto(null)
    setPhotoName('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0] as keyof FormState
      document.getElementById(`apply-${firstKey}`)?.focus()
      return
    }
    setSent(true)
    setValues(EMPTY)
    clearPhoto()
  }

  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <p id={`apply-${key}-error`} className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-clay">
        <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
        {errors[key]}
      </p>
    ) : null

  return (
    <>
      <PageHero
        eyebrow="Become a volunteer"
        title="Tell us who you are. We will find you work worth doing."
        description="This is the official volunteer application, mirrored here. Every field below maps to the form the foundation publishes — nothing is more complicated than that."
        image="/img/g-09.webp"
        imageAlt="InAmigos Foundation volunteer at work"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Volunteer' }]}
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={ORG.volunteerFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open the official Google Form
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <p className="font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
              Or fill this one in
            </p>
          </div>
        }
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Form */}
          <div>
            <SectionHeading
              eyebrow="Application"
              title="A few details and a short note."
              description="Required fields are marked by the underline. Social links are optional — they simply help us reach you faster."
            />

            <Reveal delay={0.1}>
              <div className="mt-10">
                {sent ? (
                  <div role="status" className="rounded-[1.5rem] border border-moss/45 bg-moss/10 p-8">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-moss/50 text-moss">
                      <Check size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-[1.6rem] text-bone">Application ready.</h3>
                    <p className="mt-3 max-w-[48ch] text-[0.95rem] leading-relaxed text-bone-dim">
                      Everything checks out. Because this site runs entirely in your browser, please
                      also submit the official form so the foundation receives it, or email us
                      directly at{' '}
                      <a href={`mailto:${ORG.hrEmail}`} className="text-ember underline underline-offset-4">
                        {ORG.hrEmail}
                      </a>
                      . Our volunteer team will reply within a few days.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-4">
                      <button type="button" onClick={() => setSent(false)} className="btn btn-ghost">
                        Start another
                      </button>
                      <a
                        href={ORG.volunteerFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Open the official form
                        <ArrowUpRight size={15} strokeWidth={2} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="space-y-10">
                    {/* Name */}
                    <fieldset className="grid gap-8 sm:grid-cols-2">
                      <legend className="field-label mb-5">Name</legend>
                      <div>
                        <label htmlFor="apply-firstName" className="field-label">
                          First name
                        </label>
                        <input
                          id="apply-firstName"
                          type="text"
                          className="field"
                          value={values.firstName}
                          onChange={(e) => set('firstName', e.target.value)}
                          placeholder="First name"
                          aria-invalid={Boolean(errors.firstName)}
                          aria-describedby={errors.firstName ? 'apply-firstName-error' : undefined}
                          autoComplete="given-name"
                        />
                        {fieldError('firstName')}
                      </div>
                      <div>
                        <label htmlFor="apply-lastName" className="field-label">
                          Last name
                        </label>
                        <input
                          id="apply-lastName"
                          type="text"
                          className="field"
                          value={values.lastName}
                          onChange={(e) => set('lastName', e.target.value)}
                          placeholder="Last name"
                          aria-invalid={Boolean(errors.lastName)}
                          aria-describedby={errors.lastName ? 'apply-lastName-error' : undefined}
                          autoComplete="family-name"
                        />
                        {fieldError('lastName')}
                      </div>
                    </fieldset>

                    {/* Contact */}
                    <fieldset className="grid gap-8 sm:grid-cols-2">
                      <legend className="field-label mb-5">How to reach you</legend>
                      <div>
                        <label htmlFor="apply-email" className="field-label">
                          Email
                        </label>
                        <input
                          id="apply-email"
                          type="email"
                          className="field"
                          value={values.email}
                          onChange={(e) => set('email', e.target.value)}
                          placeholder="you@example.com"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'apply-email-error' : undefined}
                          autoComplete="email"
                        />
                        {fieldError('email')}
                      </div>
                      <div>
                        <label htmlFor="apply-phone" className="field-label">
                          Phone
                        </label>
                        <input
                          id="apply-phone"
                          type="tel"
                          className="field"
                          value={values.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          placeholder="+91 00000 00000"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'apply-phone-error' : undefined}
                          autoComplete="tel"
                        />
                        {fieldError('phone')}
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="apply-address" className="field-label">
                          Address
                        </label>
                        <input
                          id="apply-address"
                          type="text"
                          className="field"
                          value={values.address}
                          onChange={(e) => set('address', e.target.value)}
                          placeholder="Area, city, state"
                          aria-invalid={Boolean(errors.address)}
                          aria-describedby={errors.address ? 'apply-address-error' : undefined}
                          autoComplete="street-address"
                        />
                        {fieldError('address')}
                      </div>
                    </fieldset>

                    {/* Photo */}
                    <fieldset>
                      <legend className="field-label mb-5">Photograph</legend>
                      <input
                        ref={fileRef}
                        id="apply-photo"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={onPhoto}
                      />
                      {photo ? (
                        <div className="flex items-center gap-5 rounded-[1.25rem] border border-line/60 bg-ink-soft/40 p-4">
                          <img
                            src={photo}
                            alt="Selected photograph preview"
                            className="h-20 w-20 rounded-full object-cover"
                          />
                          <span className="min-w-0 flex-1 truncate font-mono text-[0.66rem] uppercase tracking-widest text-bone-dim">
                            {photoName}
                          </span>
                          <button
                            type="button"
                            onClick={clearPhoto}
                            aria-label="Remove photograph"
                            className="text-bone-faint transition-colors hover:text-clay"
                          >
                            <X size={16} strokeWidth={2} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="flex w-full items-center justify-center gap-3 rounded-[1.25rem] border border-dashed border-line px-6 py-10 font-mono text-[0.66rem] uppercase tracking-widest text-bone-dim transition-colors hover:border-ember/60 hover:text-ember"
                        >
                          <ImagePlus size={18} strokeWidth={1.7} aria-hidden="true" />
                          Upload a photograph
                        </button>
                      )}
                    </fieldset>

                    {/* Profession */}
                    <fieldset>
                      <legend className="field-label mb-5">What you do</legend>
                      <div>
                        <label htmlFor="apply-profession" className="field-label">
                          Profession
                        </label>
                        <input
                          id="apply-profession"
                          type="text"
                          className="field"
                          value={values.profession}
                          onChange={(e) => set('profession', e.target.value)}
                          placeholder="Student, teacher, designer, engineer…"
                        />
                      </div>
                    </fieldset>

                    {/* Socials */}
                    <fieldset className="grid gap-8 sm:grid-cols-3">
                      <legend className="field-label mb-5">Social links (optional)</legend>
                      {(
                        [
                          ['facebook', 'Facebook', 'https://facebook.com/you'],
                          ['twitter', 'Twitter', 'https://twitter.com/you'],
                          ['linkedin', 'LinkedIn', 'https://linkedin.com/in/you'],
                        ] as const
                      ).map(([key, label, placeholder]) => (
                        <div key={key}>
                          <label htmlFor={`apply-${key}`} className="field-label">
                            {label}
                          </label>
                          <input
                            id={`apply-${key}`}
                            type="url"
                            className="field"
                            value={values[key]}
                            onChange={(e) => set(key, e.target.value)}
                            placeholder={placeholder}
                            aria-invalid={Boolean(errors[key])}
                            aria-describedby={errors[key] ? `apply-${key}-error` : undefined}
                          />
                          {fieldError(key)}
                        </div>
                      ))}
                    </fieldset>

                    {/* About */}
                    <fieldset>
                      <legend className="field-label mb-5">About you</legend>
                      <div>
                        <label htmlFor="apply-about" className="field-label">
                          Why do you want to volunteer?
                        </label>
                        <textarea
                          id="apply-about"
                          rows={6}
                          className="field resize-y"
                          value={values.about}
                          onChange={(e) => set('about', e.target.value)}
                          placeholder="Your skills, your hours, what you hope to do."
                          aria-invalid={Boolean(errors.about)}
                          aria-describedby={errors.about ? 'apply-about-error' : undefined}
                        />
                        {fieldError('about')}
                      </div>
                    </fieldset>

                    <div className="flex flex-wrap items-center gap-6">
                      <button type="submit" className="btn btn-primary">
                        Submit application
                        <ArrowUpRight size={15} strokeWidth={2} />
                      </button>
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                        Or apply on the official form
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Side rail */}
          <aside className="space-y-4 lg:pt-24">
            <Reveal>
              <div className="rounded-[1.5rem] border border-line/55 bg-ink-soft/40 p-7">
                <p className="eyebrow">What happens next</p>
                <ol className="mt-6 space-y-6">
                  {[
                    ['We read it', 'Our volunteer team reads every application — usually within three working days.'],
                    ['We match you', 'We look at your city, skills and availability, then suggest a programme that fits.'],
                    ['You start', 'A briefing, a plan, and someone to check in with. You are never dropped into the deep end.'],
                  ].map(([title, body], i) => (
                    <li key={title} className="flex gap-4">
                      <span className="font-mono text-[0.66rem] text-ember tabular">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="block font-display text-[1.1rem] text-bone">{title}</span>
                        <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-bone-dim">{body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[1.5rem] border border-line/55 bg-ink-soft/40 p-7">
                <p className="eyebrow">Six ways to help</p>
                <ul className="mt-6 space-y-3">
                  {[
                    ['Seva', 'Meals and clothing'],
                    ['BachpanShala', 'Education and digital literacy'],
                    ['Jeev', 'Stray animal care'],
                    ['Udaan', 'Women’s empowerment'],
                    ['Prakriti', 'Plantation drives'],
                    ['Vikas', 'Internships and careers'],
                  ].map(([name, detail]) => (
                    <li key={name} className="flex items-baseline justify-between gap-4 border-b border-line/50 pb-3 last:border-b-0 last:pb-0">
                      <span className="font-display text-[1.02rem] text-bone">{name}</span>
                      <span className="text-right font-mono text-[0.58rem] uppercase tracking-widest text-bone-faint">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-[1.5rem] border border-ember/35 bg-ember/[0.07] p-7">
                <ShieldCheck size={20} strokeWidth={1.6} className="text-ember" aria-hidden="true" />
                <h3 className="mt-5 font-display text-[1.3rem] text-bone">Your data stays with you.</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-bone-dim">
                  This site is frontend-only. Your application is checked in your browser and is
                  never transmitted here. To have it reach the foundation, use the official Google
                  Form or email us.
                </p>
                <a
                  href={`mailto:${ORG.hrEmail}?subject=Volunteer%20application`}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-ember transition-colors hover:text-ember-soft"
                >
                  {ORG.hrEmail}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
