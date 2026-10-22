import { Link } from 'react-router-dom'
import { ArrowUpRight, Eye } from 'lucide-react'
import { POSTS } from '@/data/posts'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Spotlight } from '@/components/Spotlight'
import { formatIndian } from '@/lib/utils'

export function JournalPreview() {
  const [lead, ...rest] = POSTS.slice(0, 3)

  return (
    <section className="relative border-t border-line/50 py-24 md:py-32" aria-labelledby="journal-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="The journal"
          title="What we have been thinking about."
          description="Field notes, method and honest accounts of what worked, what did not, and what we are changing next."
          action={
            <Link to="/blog" className="btn btn-ghost">
              Read the journal
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          }
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Spotlight className="h-full rounded-[1.75rem]">
              <Link to={`/blog/${lead.slug}`} className="group block">
                <div className="overflow-hidden rounded-[1.75rem] border border-line/55">
                  <Media
                    src={lead.image}
                    alt={lead.imageAlt}
                    ratio="16 / 10"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    imgClassName="group-hover:scale-[1.06]"
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
                  <span className="text-ember">{lead.category}</span>
                  <span>{lead.date}</span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={12} strokeWidth={1.7} aria-hidden="true" />
                    {formatIndian(lead.views)}
                  </span>
                </div>
                <h3 className="display-tight mt-3 max-w-[24ch] text-[clamp(1.5rem,1.2rem+1.4vw,2.15rem)] text-bone transition-colors duration-300 group-hover:text-ember">
                  {lead.title}
                </h3>
                <p className="mt-3 max-w-[54ch] text-[0.95rem] leading-relaxed text-bone-dim">
                  {lead.excerpt}
                </p>
              </Link>
            </Spotlight>
          </Reveal>

          <div className="flex flex-col gap-8">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={0.08 * (i + 1)}>
                <Spotlight className="rounded-xl">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex items-center gap-5 border-b border-line/40 pb-8 last:border-0 last:pb-0"
                  >
                    <div className="w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
                      <Media
                        src={post.image}
                        alt={post.imageAlt}
                        ratio="4 / 3"
                        sizes="144px"
                        imgClassName="group-hover:scale-[1.07]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ember">
                        {post.category}
                      </p>
                      <h3 className="mt-2 font-display text-[1.12rem] leading-snug text-bone transition-colors duration-300 group-hover:text-ember sm:text-[1.3rem]">
                        {post.title}
                      </h3>
                      <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                        {post.date}
                      </p>
                    </div>
                  </Link>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
