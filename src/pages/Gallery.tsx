import { useMemo, useState } from 'react'
import { ArrowUpRight, Images, X } from 'lucide-react'
import { GALLERY, GALLERY_GROUPS } from '@/data/gallery'
import { PageHero } from '@/components/PageHero'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CtaBand } from '@/components/sections/CtaBand'
import { useEscapeKey, useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn, asset, srcSetFor } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Gallery() {
  useDocumentTitle(
    'Gallery — InAmigos Foundation',
    'Photographs from InAmigos Foundation drives, camps, school sessions and community days.'
  )
  const [group, setGroup] = useState<string>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const images = useMemo(
    () => (group === 'All' ? GALLERY : GALLERY.filter((g) => g.group === group)),
    [group]
  )

  useLockBodyScroll(openIndex !== null)
  useEscapeKey(() => setOpenIndex(null), openIndex !== null)

  const open = openIndex !== null ? images[openIndex] : null

  const step = (dir: 1 | -1) => {
    setOpenIndex((i) => {
      if (i === null) return i
      return (i + dir + images.length) % images.length
    })
  }

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Photographs of the work."
        description="Twenty-three frames from drives, camps, school sessions and community days — the unglamorous middle of every project, which is where the work actually lives."
        image="/img/g-13.webp"
        imageAlt="InAmigos Foundation community gathering"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
        meta={
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.64rem] uppercase tracking-widest text-bone-faint">
            <span>{GALLERY.length} photographs</span>
            <span>{GALLERY_GROUPS.length - 1} collections</span>
            <span>Field · Community · Volunteers</span>
          </div>
        }
      />

      {/* --- Filter rail ---------------------------------------------------- */}
      <div className="sticky top-[4.5rem] z-30 border-y border-line/50 bg-ink/85 backdrop-blur-xl md:top-20">
        <div className="shell flex items-center gap-4 py-4">
          <div className="no-scrollbar flex flex-1 gap-1 overflow-x-auto">
            {GALLERY_GROUPS.map((g) => {
              const count = g === 'All' ? GALLERY.length : GALLERY.filter((i) => i.group === g).length
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setGroup(g)
                    setOpenIndex(null)
                  }}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-2 font-mono text-[0.68rem] uppercase tracking-widest transition-colors duration-300',
                    group === g
                      ? 'bg-ember/12 text-ember ring-1 ring-ember/35'
                      : 'text-bone-dim hover:text-bone'
                  )}
                >
                  {g}
                  <span className="ml-2 opacity-50 tabular">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* --- Masonry -------------------------------------------------------- */}
      <section className="shell py-14 md:py-20" aria-label="Photograph collection">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {images.map((image, i) => (
            <Reveal key={image.id} delay={Math.min(i, 8) * 0.04} duration={0.7}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full overflow-hidden rounded-[1.25rem] border border-line/50 text-left"
                aria-label={`Open ${image.alt}`}
              >
                <Media
                  src={image.src}
                  alt={image.alt}
                  ratio={`${image.width} / ${image.height}`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  imgClassName="group-hover-fine:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover-fine:bg-ink/25" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between px-4 pb-3 font-mono text-[0.58rem] uppercase tracking-widest text-bone opacity-0 transition-all duration-500 group-hover-fine:translate-y-0 group-hover-fine:opacity-100">
                  <span>{image.group}</span>
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {images.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-line/60 text-bone-faint">
              <Images size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="font-display text-2xl text-bone">Nothing here yet.</p>
          </div>
        )}
      </section>

      {/* --- A note on the archive ------------------------------------------ */}
      <section className="border-t border-line/50 bg-ink-soft/30 py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="The archive"
            title="Every frame has a recipient behind it."
            description="We keep the photography honest — faces, hands and places, with names where consent allows and privacy where it does not."
          />
          <Reveal delay={0.1}>
            <dl className="grid gap-6 sm:grid-cols-3">
              {[
                ['Drives', 'Food, clothing and blanket distribution'],
                ['Camps', 'Plantation, medical and awareness camps'],
                ['Sessions', 'School and workshop teaching hours'],
              ].map(([term, detail]) => (
                <div key={term} className="rounded-[1.25rem] border border-line/55 bg-ink/50 p-6">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-ember">{term}</dt>
                  <dd className="mt-3 text-[0.92rem] leading-relaxed text-bone-dim">{detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* --- Lightbox -------------------------------------------------------- */}
      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-line/70 text-bone transition-colors hover:border-ember/60 hover:text-ember md:right-8 md:top-8"
          >
            <X size={18} strokeWidth={1.7} />
          </button>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line/70 text-bone transition-colors hover:border-ember/60 hover:text-ember md:left-8"
          >
            <ArrowUpRight size={17} strokeWidth={1.7} className="rotate-[-90deg]" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line/70 text-bone transition-colors hover:border-ember/60 hover:text-ember md:right-8"
          >
            <ArrowUpRight size={17} strokeWidth={1.7} className="rotate-90" />
          </button>

          <figure className="max-h-full w-full max-w-4xl">
            <img
              src={asset(open.src)}
              srcSet={srcSetFor(open.src)}
              sizes="(max-width: 896px) 100vw, 896px"
              alt={open.alt}
              className="max-h-[76vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[0.64rem] uppercase tracking-widest text-bone-dim">
              <span>{open.group}</span>
              <span className="tabular">
                {(openIndex ?? 0) + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}

      <CtaBand />
    </>
  )
}
