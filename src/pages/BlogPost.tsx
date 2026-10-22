import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, Copy, Eye, Link2 } from 'lucide-react'
import { POSTS, getPost, type PostBlock } from '@/data/posts'
import { ORG } from '@/data/organization'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { formatIndian } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** Groups consecutive list items so they render as a single <ul>. */
function groupBlocks(blocks: PostBlock[]): (PostBlock | PostBlock[])[] {
  const grouped: (PostBlock | PostBlock[])[] = []
  let buffer: PostBlock[] = []

  for (const block of blocks) {
    if (block.t === 'li') {
      buffer.push(block)
      continue
    }
    if (buffer.length) {
      grouped.push(buffer)
      buffer = []
    }
    grouped.push(block)
  }
  if (buffer.length) grouped.push(buffer)
  return grouped
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined
  const [copied, setCopied] = useState(false)

  const related = useMemo(() => {
    if (!post) return []
    return POSTS.filter((p) => p.slug !== post.slug && p.category === post.category)
      .concat(POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category))
      .slice(0, 3)
  }, [post])

  useDocumentTitle(
    post ? `${post.title} — InAmigos Foundation` : 'Article not found — InAmigos Foundation',
    post?.excerpt
  )

  if (!post) {
    return (
      <section className="shell flex min-h-[70vh] flex-col items-center justify-center gap-6 py-32 text-center">
        <p className="eyebrow">404 · Article not found</p>
        <h1 className="display text-[clamp(2.2rem,1.4rem+3vw,4rem)] text-bone">
          That story has moved on.
        </h1>
        <p className="lede max-w-[46ch]">
          The article you are looking for is no longer published under this address.
        </p>
        <Link to="/blog" className="btn btn-primary">
          Back to the journal
          <ArrowUpRight size={15} strokeWidth={2} />
        </Link>
      </section>
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://www.inamigosfoundation.org.in/blog/${post.slug}`
  )}`

  return (
    <>
      {/* --- Article header ------------------------------------------------ */}
      <article>
        <header className="relative isolate overflow-hidden pb-14 pt-32 md:pt-44">
          <Media
            src={post.image}
            alt={post.imageAlt}
            plain
            priority
            sizes="100vw"
            className="absolute inset-0 -z-10 h-full w-full"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(115deg, rgb(var(--c-ink) / 0.96) 0%, rgb(var(--c-ink) / 0.87) 46%, rgb(var(--c-ink) / 0.66) 100%)',
            }}
          />
          <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

          <div className="shell">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint transition-colors hover:text-ember"
            >
              <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
              Journal
            </Link>

            <p className="eyebrow mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
              {post.category.split(',')[0].trim()}
            </p>

            <h1 className="display mt-6 max-w-[22ch] text-[clamp(2.2rem,1.4rem+3.6vw,4.5rem)] text-bone">
              <SplitText text={post.title} delay={0.06} duration={0.95} />
            </h1>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
                <span className="text-bone-dim">{post.author}</span>
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-1.5 tabular">
                  <Eye size={12} strokeWidth={1.8} aria-hidden="true" />
                  {formatIndian(post.views)} reads
                </span>
              </div>
            </Reveal>
          </div>
        </header>

        {/* --- Body --------------------------------------------------------- */}
        <div className="shell grid gap-12 pb-20 lg:grid-cols-[minmax(0,44rem)_16rem] lg:justify-center lg:gap-16">
          <div className="prose-in">
            {groupBlocks(post.body).map((block, i) => {
              if (Array.isArray(block)) {
                return (
                  <ul key={`ul-${i}`}>
                    {block.map((item, j) => (
                      <li key={`li-${i}-${j}`}>{item.x}</li>
                    ))}
                  </ul>
                )
              }
              if (block.t === 'h3') return <h3 key={`h-${i}`}>{block.x}</h3>
              if (block.t === 'h4') return <h4 key={`h4-${i}`}>{block.x}</h4>
              return <p key={`p-${i}`}>{block.x}</p>
            })}
          </div>

          {/* --- Side rail ------------------------------------------------- */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[1.4rem] border border-line/55 bg-ink-soft/40 p-6">
              <p className="eyebrow">Share this</p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center justify-between gap-3 rounded-full border border-line px-4 py-2.5 text-left font-mono text-[0.62rem] uppercase tracking-widest text-bone-dim transition-colors hover:border-ember/60 hover:text-ember"
                >
                  <span className="inline-flex items-center gap-2">
                    {copied ? (
                      <Check size={13} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Copy size={13} strokeWidth={1.9} aria-hidden="true" />
                    )}
                    {copied ? 'Link copied' : 'Copy link'}
                  </span>
                  <Link2 size={13} strokeWidth={1.9} aria-hidden="true" />
                </button>

                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 rounded-full border border-line px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-widest text-bone-dim transition-colors hover:border-ember/60 hover:text-ember"
                >
                  Facebook
                  <ArrowUpRight size={13} strokeWidth={1.9} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mt-4 rounded-[1.4rem] border border-line/55 bg-ink-soft/40 p-6">
              <p className="eyebrow">Written by</p>
              <p className="mt-3 font-display text-[1.15rem] text-bone">{post.author}</p>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-bone-dim">
                Part of the InAmigos Foundation team and volunteer network.
              </p>
              <a
                href={`mailto:${ORG.email}?subject=Re: ${post.title}`}
                className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-ember transition-colors hover:text-ember-soft"
              >
                Reply to the author
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </article>

      {/* --- Related -------------------------------------------------------- */}
      <section className="border-t border-line/50 bg-ink-soft/30 py-20 md:py-24" aria-labelledby="related-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Keep reading"
            title="More from the journal."
            action={
              <Link to="/blog" className="btn btn-ghost">
                All articles
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            }
          />

          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.06} className="h-full">
                <li className="h-full list-none">
                  <article className="group flex h-full flex-col">
                    <Link
                      to={`/blog/${item.slug}`}
                      className="relative block overflow-hidden rounded-[1.4rem] border border-line/50"
                    >
                      <Media
                        src={item.image}
                        alt={item.imageAlt}
                        ratio="4 / 3"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        imgClassName="group-hover:scale-[1.06]"
                      />
                    </Link>
                    <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-ember">
                      {item.category.split(',')[0].trim()}
                    </p>
                    <h3 className="mt-3 font-display text-[1.28rem] leading-snug text-bone">
                      <Link to={`/blog/${item.slug}`} className="transition-colors hover:text-ember">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-2 flex-1 text-[0.9rem] leading-relaxed text-bone-dim">
                      {item.excerpt}
                    </p>
                    <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-bone-faint">
                      {item.date}
                    </p>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
