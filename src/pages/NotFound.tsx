import { Link } from 'react-router-dom'
import { ArrowUpRight, Compass } from 'lucide-react'
import { NAV_LINKS } from '@/data/organization'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle(
    'Page not found — InAmigos Foundation',
    'The page you were looking for does not exist.'
  )
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70rem 34rem at 72% 8%, rgb(var(--c-ember) / 0.14), transparent 60%), radial-gradient(50rem 30rem at 10% 90%, rgb(var(--c-moss) / 0.1), transparent 60%)',
        }}
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
            Error 404
          </p>
        </Reveal>

        <h1 className="display mt-6 text-[clamp(4rem,2rem+12vw,11rem)] leading-[0.85] text-bone">
          <SplitText text="Lost." delay={0.05} duration={1} />
        </h1>

        <Reveal delay={0.2}>
          <p className="lede mt-8 max-w-[48ch]">
            This address does not lead anywhere on the foundation&rsquo;s site. The pages below do.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line/50 pt-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-bone-dim transition-colors hover:text-ember"
                >
                  {link.label}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Link to="/" className="btn btn-primary">
              Back to the beginning
              <Compass size={15} strokeWidth={2} />
            </Link>
            <p className="font-mono text-[0.62rem] uppercase tracking-widest text-bone-faint">
              Or write to support@inamigosfoundation.org.in
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
