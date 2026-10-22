import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { GALLERY } from '@/data/gallery'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Spotlight } from '@/components/Spotlight'
import { useEscapeKey, useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { asset } from '@/lib/utils'

export function GalleryStrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const strip = GALLERY.slice(0, 8)

  useLockBodyScroll(openIndex !== null)
  useEscapeKey(() => setOpenIndex(null), openIndex !== null)

  const open = openIndex !== null ? GALLERY[openIndex] : null

  const step = (dir: 1 | -1) => {
    setOpenIndex((i) => {
      if (i === null) return i
      return (i + dir + GALLERY.length) % GALLERY.length
    })
  }

  return (
    <section className="relative py-24 md:py-32" aria-labelledby="gallery-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="From the field"
          title="The work, as it actually looks."
          description="Photographs from our drives, camps and community days — the unglamorous middle of every project."
          action={
            <Link to="/gallery" className="btn btn-ghost">
              Full gallery
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          }
        />
      </div>

      <div className="no-scrollbar mt-14 flex snap-x-mandatory gap-4 overflow-x-auto px-5 md:px-10">
        {strip.map((image, i) => (
          <Reveal
            key={image.id}
            delay={i * 0.04}
            direction="right"
            className="w-[74vw] shrink-0 snap-start-always sm:w-[46vw] lg:w-[26rem]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full overflow-hidden rounded-[1.5rem] border border-line/50 text-left"
              aria-label={`View ${image.alt} larger`}
            >
              <Spotlight className="h-full w-full overflow-hidden rounded-[1.5rem]">
                <Media
                  src={image.src}
                  alt={image.alt}
                  ratio={image.width > image.height ? '16 / 10' : '3 / 4'}
                  imgClassName="group-hover:scale-[1.07]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-bone/0 transition-all duration-500 group-hover:ring-ember/40" />
              </Spotlight>
            </button>
          </Reveal>
        ))}
        <div className="w-1 shrink-0 md:w-10" aria-hidden="true" />
      </div>

      {/* Lightbox */}
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
              alt={open.alt}
              className="max-h-[78vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[0.64rem] uppercase tracking-widest text-bone-dim">
              <span>{open.alt}</span>
              <span className="tabular">
                {(openIndex ?? 0) + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
