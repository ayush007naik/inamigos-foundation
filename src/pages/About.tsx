import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Handshake,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { ORG, CREDENTIALS } from '@/data/organization'
import { VOLUNTEERS, initials } from '@/data/volunteers'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Media } from '@/components/Media'
import { SplitText } from '@/components/SplitText'
import { CtaBand } from '@/components/sections/CtaBand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const LEADERSHIP = [
  'Govind Shukla',
  'Sagarika Jaiswal',
  'Khush Gupta',
  'Iniya Radhakrishnan',
  'Madhusoodan M',
  'Adil Ali',
]

const CREDENTIAL_ICONS = [ShieldCheck, BadgeCheck, Building2, Target, Sparkles]

const TIMELINE = [
  {
    year: '2020',
    date: '23 September 2020',
    title: 'InAmigos Foundation is founded',
    body: `${ORG.founder} establishes the foundation in Chhattisgarh with a Section 8 registration, giving six community programmes a legal home and a published standard to work towards.`,
  },
  {
    year: '2020—',
    date: 'Since founding',
    title: 'A full set of accreditations',
    body: '80G and 12A certification for donor transparency and tax exemption, CSR-1 registration for corporate partnerships, NITI Aayog registration aligned to national development goals, and IAF ISO 9001:2015 certification for operational quality.',
  },
  {
    year: '2021—',
    date: 'Four years of Vikas',
    title: 'Project Vikas scales employability',
    body: 'Internship programmes in data operations, finance, research, content writing, digital marketing and social work onboard 30,000+ interns, engage 100,000+ interns and open 1,000+ internship opportunities.',
  },
  {
    year: 'Ongoing',
    date: 'Every single day',
    title: 'The daily work',
    body: 'Project Jeev feeds 50+ stray animals each day through its volunteer network. Project Seva distributes meals and clothing to the underprivileged, past 50,000 in total. Project Prakriti has planted more than 20,000 saplings, and Project Udaan has transformed the lives of 900+ women.',
  },
  {
    year: '2025',
    date: 'February – March',
    title: 'Three public events',
    body: 'The International Day of Women and Girls in Science in Rohtak, Haryana, followed by International Day of Happiness and World Water Day — both hosted online and open to anyone who wants to join.',
  },
]

const PRINCIPLES = [
  {
    title: 'Publish the numbers',
    body: 'Meals served, animals fed, saplings planted, interns trained, women empowered. We put them on the record so that anyone can hold us to them.',
  },
  {
    title: 'Keep the programme count small',
    body: 'Six initiatives is deliberate. Stretching thinner across more would make every one of them weaker, and we would rather be genuinely good at six things.',
  },
  {
    title: 'Work with the community, not at it',
    body: 'Udaan runs through rural self-help groups. Prakriti involves local communities so the green spaces stay cared for. Ownership outlasts our visit.',
  },
  {
    title: 'Transparency before scale',
    body: 'Every rupee raised is allocated towards food and water, education, animal welfare, women’s empowerment and environmental sustainability — and reported back.',
  },
]

export default function About() {
  useDocumentTitle(
    'About Us — InAmigos Foundation',
    'Founded 23 September 2020 by Mr. Govind Shukla. Section 8 registered, 80G and 12A certified, CSR-1 registered, NITI Aayog registered and IAF ISO 9001:2015 certified.'
  )
  const leaders = VOLUNTEERS.filter((v) => LEADERSHIP.includes(v.name))

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built by people who refuse to look away."
        description={`InAmigos Foundation was founded on ${ORG.foundedOn} by ${ORG.founder}. We are a Section 8 registered non-profit, licensed by the Central Government, working from Chhattisgarh across 28 states — and we believe in the power of collective action.`}
        image="/img/g-05.webp"
        imageAlt="InAmigos Foundation community gathering"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        meta={
          <dl className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            {[
              ['Founded', ORG.foundedOn],
              ['Founder', ORG.founder],
              ['Base', 'Bilaspur, Chhattisgarh'],
              ['Reach', '28 states'],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="font-mono text-[0.58rem] uppercase tracking-widest text-bone-faint">{term}</dt>
                <dd className="mt-1.5 font-display text-[1.05rem] text-bone">{detail}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* --- Narrative ---------------------------------------------------- */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
                Who we are
              </p>
            </Reveal>
            <SplitText
              text="A movement, not an NGO."
              className="display mt-6 block text-[clamp(2rem,1.3rem+3vw,3.5rem)] text-bone"
              as="h2"
              delay={0.05}
            />
            <Reveal delay={0.14}>
              <div className="prose-in mt-8">
                <p>
                  The InAmigos Foundation, a non-profit organization based in Chhattisgarh, was founded on
                  September 23, 2020, with the vision to improve society. Spearheaded by founder and CEO
                  Mr. Govind Shukla, the foundation focuses on strengthening underprivileged communities
                  through its impactful programs.
                </p>
                <p>
                  Licensed as a Section 8 non-profit by the Central Government, the InAmigos Foundation
                  ensures transparency and accountability, backed by 80G and 12A certifications. Every
                  rupee raised is invested in transformative projects, encompassing social inclusion,
                  education, food distribution, animal welfare, women’s empowerment, and environmental
                  sustainability.
                </p>
                <p>
                  We operate across India, addressing critical societal issues through a network of
                  dedicated professionals and volunteers. Our social media platforms actively showcase
                  our impact, keeping our supporters informed and engaged.
                </p>
                <p>
                  At InAmigos Foundation, we believe in the power of collective action. Our transparent
                  operations and strong partnerships enable us to bring real, measurable change to
                  society — and we encourage more individuals and organizations to join our mission.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" className="relative">
            <Media
              src="/img/g-02.webp"
              alt="InAmigos Foundation volunteers at work"
              ratio="3 / 4"
              className="rounded-[2rem]"
            />
            <div className="absolute -bottom-8 -left-4 w-56 rounded-2xl border border-line/60 bg-ink/90 p-6 backdrop-blur-md sm:-left-8">
              <Handshake size={20} strokeWidth={1.5} className="text-ember" aria-hidden="true" />
              <p className="mt-4 font-display text-[1.1rem] leading-snug text-bone">
                “Every contribution strengthens our cause and enables us to expand our reach and impact.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Credentials -------------------------------------------------- */}
      <section className="border-y border-line/50 bg-ink-soft/30 py-20 md:py-28" aria-labelledby="credentials-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Credentials & recognitions"
            title="Five registrations, all of them checkable."
            description="Each of these exists so that a donor, a corporate partner or a volunteer can verify us independently. None of them are decoration."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CREDENTIALS.map((credential, i) => {
              const Icon = CREDENTIAL_ICONS[i]
              return (
                <Reveal key={credential.id} delay={i * 0.07}>
                  <article className="group flex h-full flex-col rounded-[1.5rem] border border-line/55 bg-ink/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ember/45">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-ember/30 bg-ember/10 text-ember transition-colors duration-500 group-hover:bg-ember group-hover:text-ink">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-6 font-display text-[1.35rem] leading-snug text-bone">{credential.title}</h3>
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-ember">
                      {credential.authority}
                    </p>
                    <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-bone-dim">{credential.detail}</p>
                  </article>
                </Reveal>
              )
            })}

            <Reveal delay={0.35}>
              <article className="flex h-full flex-col justify-between rounded-[1.5rem] border border-ember/30 bg-ember/8 p-7">
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ember">Founded</p>
                  <p className="mt-4 font-display text-[clamp(2.5rem,2rem+2vw,3.25rem)] leading-none text-bone">
                    23
                    <span className="block text-[0.9rem] uppercase tracking-widest text-bone-dim">
                      September 2020
                    </span>
                  </p>
                </div>
                <p className="mt-6 text-[0.88rem] leading-relaxed text-bone-dim">
                  Registered and operating out of Bilaspur, Chhattisgarh — with chapters and volunteers
                  in 28 states.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Timeline ----------------------------------------------------- */}
      <section className="shell py-20 md:py-28" aria-labelledby="timeline-heading">
        <SectionHeading
          eyebrow="How we got here"
          title="A short, honest history."
          description="We are young — five years is not long. Here is what we have actually done with that time."
        />

        <ol className="mt-16 border-l border-line/60 pl-6 md:pl-10">
          {TIMELINE.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 0.06} direction="left" className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-ember ring-4 ring-ink md:-left-[2.85rem]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-[0.64rem] uppercase tracking-widest text-ember">
                  {entry.year}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                  {entry.date}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[1.45rem] leading-snug text-bone">{entry.title}</h3>
              <p className="mt-3 max-w-[62ch] text-[0.98rem] leading-[1.72] text-bone-dim">{entry.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* --- Principles --------------------------------------------------- */}
      <section className="border-y border-line/50 bg-ink-soft/30 py-20 md:py-28" aria-labelledby="principles-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title="Four commitments we can be judged against."
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden rounded-3xl border border-line/50 bg-line/40 md:grid-cols-2">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.07} className="bg-ink/90 p-8 md:p-10">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ember">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-[1.4rem] leading-snug text-bone">{principle.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-bone-dim">{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Leadership ---------------------------------------------------- */}
      <section className="shell py-20 md:py-28" aria-labelledby="leadership-heading">
        <SectionHeading
          eyebrow="The core team"
          title="Who you are actually working with."
          description="A small core team, supported by a large volunteer network. Every one of them answers to the same published numbers."
          action={
            <Link to="/volunteers" className="btn btn-ghost">
              Full directory
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-[1.5rem] border border-line/55 bg-ink-soft/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ember/45">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-ember/30 bg-ember/10 font-display text-lg text-ember transition-colors duration-500 group-hover:bg-ember group-hover:text-ink">
                  {initials(person.name)}
                </span>
                <h3 className="mt-6 font-display text-[1.3rem] leading-snug text-bone">{person.name}</h3>
                <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-ember">
                  {person.role}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-bone-dim transition-colors hover:text-bone"
                  >
                    <Mail size={12} strokeWidth={1.8} aria-hidden="true" />
                    Email
                  </a>
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-bone-dim transition-colors hover:text-bone"
                    >
                      <ArrowUpRight size={12} strokeWidth={1.8} aria-hidden="true" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- Facts strip --------------------------------------------------- */}
      <section className="relative isolate overflow-hidden" aria-labelledby="facts-heading">
        <Media
          src="/img/g-17.webp"
          alt="InAmigos Foundation field activity"
          plain
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, rgb(var(--c-ink) / 0.93), rgb(var(--c-ink) / 0.82) 50%, rgb(var(--c-ink) / 0.96))',
          }}
        />
        <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

        <div className="shell py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow flex items-center gap-3">
              <CalendarDays size={13} strokeWidth={1.8} className="text-ember" aria-hidden="true" />
              Working days, not launch days
            </p>
            <h2 id="facts-heading" className="display mt-6 text-[clamp(2rem,1.3rem+3vw,3.25rem)] text-bone">
              The programmes run every week of the year.
            </h2>
            <p className="lede mt-6 max-w-[56ch]">
              Feeding happens on schedule. Classes run through the week. Drives are planted and watered.
              Internships are mentored month by month. This is the unglamorous part, and it is where the
              work actually happens.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                'Food distribution',
                'School & digital literacy',
                'Animal rescue & feeding',
                'Women’s skill training',
                'Tree plantation',
                'Internships & mentoring',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line/60 px-4 py-2 font-mono text-[0.64rem] uppercase tracking-widest text-bone-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
