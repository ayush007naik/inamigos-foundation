import { useMemo, useState } from 'react'
import { Search, X, Mail, Linkedin, ArrowUpRight, Users } from 'lucide-react'
import { VOLUNTEERS, TEAM_GROUPS, initials } from '@/data/volunteers'
import { ORG } from '@/data/organization'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { cn } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Volunteers() {
  useDocumentTitle(
    'Our Volunteers — InAmigos Foundation',
    'The people behind the work: thirty-four named members and a volunteer network across 28 states. Roles, contact details and how to join.'
  )
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState<string>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return VOLUNTEERS.filter((v) => {
      const matchesTeam = team === 'All' || v.team === team
      const matchesQuery =
        q.length === 0 ||
        v.name.toLowerCase().includes(q) ||
        v.role.toLowerCase().includes(q) ||
        v.team.toLowerCase().includes(q)
      return matchesTeam && matchesQuery
    })
  }, [query, team])

  return (
    <>
      <PageHero
        eyebrow="Our volunteers"
        title="Two hundred people who decided to show up."
        description="Thirty-four named members run the foundation day to day, supported by a volunteer network across 28 states. Below is the official directory — names, roles and how to reach them."
        image="/img/g-08.webp"
        imageAlt="InAmigos Foundation volunteer at work"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Volunteers' }]}
        meta={
          <div className="flex flex-wrap items-center gap-3">
            <a href={ORG.volunteerFormUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Become a volunteer
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <a href={`mailto:${ORG.email}`} className="btn btn-ghost">
              Ask us anything
            </a>
          </div>
        }
      />

      {/* --- Filters ------------------------------------------------------ */}
      <div className="sticky top-[4.5rem] z-30 border-y border-line/50 bg-ink/85 backdrop-blur-xl md:top-20">
        <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-1 overflow-x-auto">
            {TEAM_GROUPS.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setTeam(group)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-[0.78rem] font-medium transition-colors duration-300',
                  team === group
                    ? 'bg-ember/12 text-ember ring-1 ring-ember/35'
                    : 'text-bone-dim hover:text-bone'
                )}
              >
                {group}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2.5 border-b border-line pb-1.5 transition-colors focus-within:border-ember lg:w-64 lg:flex-none">
              <Search size={15} strokeWidth={1.7} className="shrink-0 text-bone-faint" aria-hidden="true" />
              <label htmlFor="volunteer-search" className="sr-only">
                Search volunteers by name or role
              </label>
              <input
                id="volunteer-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or role"
                className="w-full bg-transparent text-[0.9rem] text-bone outline-none placeholder:text-bone-faint"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="shrink-0 text-bone-faint transition-colors hover:text-bone"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </div>
            <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint tabular">
              {filtered.length} of {VOLUNTEERS.length}
            </span>
          </div>
        </div>
      </div>

      {/* --- Directory ----------------------------------------------------- */}
      <section className="shell py-16 md:py-24" aria-label="Volunteer directory">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-line/60 text-bone-faint">
              <Users size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="font-display text-2xl text-bone">No one matches that yet.</p>
            <p className="max-w-[40ch] text-[0.95rem] text-bone-dim">
              Try a different name, role or team — or join us and add yourself to the list.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setTeam('All')
              }}
              className="btn btn-ghost mt-2"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((person, i) => (
              <Reveal key={person.email} delay={Math.min(i, 9) * 0.035} className="h-full">
                <li className="h-full list-none">
                  <article className="group flex h-full flex-col rounded-[1.4rem] border border-line/55 bg-ink-soft/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ember/45">
                    <div className="flex items-start gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ember/30 bg-ember/10 font-display text-[0.95rem] text-ember transition-colors duration-500 group-hover:bg-ember group-hover:text-ink">
                        {initials(person.name)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-display text-[1.15rem] leading-snug text-bone">{person.name}</h2>
                        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-ember">
                          {person.role}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                      {person.team}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-bone-dim transition-colors hover:text-ember"
                      >
                        <Mail size={12} strokeWidth={1.8} aria-hidden="true" />
                        Email
                      </a>
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-bone-dim transition-colors hover:text-ember"
                        >
                          <Linkedin size={12} strokeWidth={1.8} aria-hidden="true" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      {/* --- How to join ---------------------------------------------------- */}
      <section className="border-t border-line/50 bg-ink-soft/30 py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="How to join"
            title="Three steps, and we will take it from there."
            description="There is no interview gauntlet and no fee. Tell us who you are and what you can do, and we will find you something worth doing."
          />

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Fill the form',
                body: 'Name, email, phone, profession, address and a short note about why you want to join. A photo helps us put a face to the name.',
              },
              {
                step: '02',
                title: 'We reply',
                body: 'Our HR team reads every submission and comes back to you with the programmes that match your skills and your city.',
              },
              {
                step: '03',
                title: 'You start',
                body: 'Volunteer briefings, field work, or remote work on campaigns, content and operations — the shape is up to you.',
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08}>
                <li className="h-full list-none rounded-[1.5rem] border border-line/55 bg-ink/60 p-8">
                  <span className="font-display text-[2.5rem] leading-none text-ember/35">{item.step}</span>
                  <h3 className="mt-5 font-display text-[1.35rem] text-bone">{item.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-bone-dim">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href={ORG.volunteerFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open the volunteer form
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
              <p className="font-mono text-[0.64rem] uppercase tracking-widest text-bone-faint">
                Or email {ORG.email}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
