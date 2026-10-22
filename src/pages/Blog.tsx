import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Eye, Search, X } from 'lucide-react'
import { POSTS, POST_CATEGORIES } from '@/data/posts'
import { PageHero } from '@/components/PageHero'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { cn, formatIndian } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** The official categories are comma-separated strings; show the first tag. */
function shortLabel(category: string): string {
  const [first] = category.split(',')
  return first.trim()
}

export default function Blog() {
  useDocumentTitle(
    'Journal — InAmigos Foundation',
    "Essays on education, animal welfare, water, women's empowerment and the everyday work of a community foundation."
  )
  const [category, setCategory] = useState<string>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return POSTS.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const [featured, ...rest] = filtered
  const showFeatured = featured !== undefined && category === 'All' && query.trim() === ''

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the field, written by the people doing it."
        description="Ten essays on education, animals, water, women and the long unglamorous work of holding a community together. Written by our team and our volunteers."
        image="/img/post-transforming-lives.webp"
        imageAlt="InAmigos Foundation journal"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Journal' }]}
        meta={
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.64rem] uppercase tracking-widest text-bone-faint">
            <span>{POSTS.length} articles</span>
            <span>{POST_CATEGORIES.length} categories</span>
            <span>Updated March 2025</span>
          </div>
        }
      />

      {/* --- Featured ------------------------------------------------------ */}
      {showFeatured && featured && (
        <section className="shell pb-4 pt-12 md:pt-16" aria-label="Featured article">
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid gap-8 overflow-hidden rounded-[2rem] border border-line/55 bg-ink-soft/40 p-6 transition-all duration-500 hover:border-ember/45 md:grid-cols-[1.05fr_0.95fr] md:p-8"
            >
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <Media
                  src={featured.image}
                  alt={featured.imageAlt}
                  ratio="16 / 11"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  imgClassName="group-hover-fine:scale-[1.05]"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
                  Featured read
                </p>
                <h2 className="display mt-5 text-[clamp(1.9rem,1.3rem+2.4vw,3.1rem)] text-bone">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-bone-dim">
                  {featured.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
                  <span>{featured.date}</span>
                  <span className="text-ember">{shortLabel(featured.category)}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Eye size={12} strokeWidth={1.8} aria-hidden="true" />
                    {formatIndian(featured.views)}
                  </span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-ember">
                  Read the article
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-500 ease-cinematic group-hover-fine:translate-x-1 group-hover-fine:-translate-y-1"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* --- Filters ------------------------------------------------------- */}
      <div className="sticky top-[4.5rem] z-30 border-y border-line/50 bg-ink/85 backdrop-blur-xl md:top-20">
        <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setCategory('All')}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 font-mono text-[0.68rem] uppercase tracking-widest transition-colors duration-300',
                category === 'All'
                  ? 'bg-ember/12 text-ember ring-1 ring-ember/35'
                  : 'text-bone-dim hover:text-bone'
              )}
            >
              All
            </button>
            {POST_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 font-mono text-[0.68rem] uppercase tracking-widest transition-colors duration-300',
                  category === cat
                    ? 'bg-ember/12 text-ember ring-1 ring-ember/35'
                    : 'text-bone-dim hover:text-bone'
                )}
              >
                {shortLabel(cat)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2.5 border-b border-line pb-1.5 transition-colors focus-within:border-ember lg:w-64 lg:flex-none">
              <Search size={15} strokeWidth={1.7} className="shrink-0 text-bone-faint" aria-hidden="true" />
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the journal"
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
              {filtered.length}
            </span>
          </div>
        </div>
      </div>

      {/* --- Grid ------------------------------------------------------------ */}
      <section className="shell py-14 md:py-20" aria-label="Articles">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-display text-2xl text-bone">Nothing published on that yet.</p>
            <p className="max-w-[42ch] text-[0.95rem] text-bone-dim">
              Try another topic, or clear the search and browse the whole journal.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All')
                setQuery('')
              }}
              className="btn btn-ghost mt-2"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {(showFeatured ? rest : filtered).map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i, 8) * 0.05} className="h-full">
                <li className="h-full list-none">
                  <article className="group flex h-full flex-col">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="relative block overflow-hidden rounded-[1.4rem] border border-line/50"
                    >
                      <Media
                        src={post.image}
                        alt={post.imageAlt}
                        ratio="4 / 3"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        imgClassName="group-hover-fine:scale-[1.06]"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-bone/0 transition-all duration-500 group-hover-fine:ring-ember/35" />
                    </Link>

                    <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-ember">
                      {shortLabel(post.category)}
                    </p>

                    <h2 className="mt-3 font-display text-[1.32rem] leading-snug text-bone">
                      <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-ember">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 line-clamp-3 flex-1 text-[0.9rem] leading-relaxed text-bone-dim">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/50 pt-4 font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                      <span>{post.date}</span>
                      <span>{post.author}</span>
                      <span className="inline-flex items-center gap-1.5 tabular">
                        <Eye size={11} strokeWidth={1.8} aria-hidden="true" />
                        {formatIndian(post.views)}
                      </span>
                    </div>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      {/* --- Contribute ------------------------------------------------------ */}
      <section className="border-t border-line/50 bg-ink-soft/30 py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow="Write with us"
            title="Your field notes belong here."
            description="We publish what our volunteers and programme leads learn on the ground. If you have a story worth telling — from a drive, a classroom, a shelter or a ward — send it in."
          />
          <Reveal delay={0.1}>
            <div className="rounded-[1.5rem] border border-line/55 bg-ink/55 p-8">
              <ul className="space-y-4 font-mono text-[0.66rem] uppercase tracking-widest text-bone-dim">
                <li className="flex items-center justify-between gap-4 border-b border-line/50 pb-4">
                  <span>Pitch a topic</span>
                  <a
                    href="mailto:support@inamigosfoundation.org.in?subject=Journal%20pitch"
                    className="text-ember transition-colors hover:text-ember-soft"
                  >
                    Email the editor
                  </a>
                </li>
                <li className="flex items-center justify-between gap-4 border-b border-line/50 pb-4">
                  <span>Join the field team</span>
                  <Link to="/volunteer" className="text-ember transition-colors hover:text-ember-soft">
                    Apply to volunteer
                  </Link>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span>Fund the next story</span>
                  <a
                    href="https://rzp.io/l/kWQ87HP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ember transition-colors hover:text-ember-soft"
                  >
                    Donate
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
