import { IMAGE_VARIANTS } from '@/data/images'

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Resolves a public asset path against the deployment base path, so the site
 * works both at the domain root and from a sub-folder (GitHub Pages project
 * sites) without touching every call site.
 */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

/**
 * Builds a `srcset` for an image in public/img from the generated responsive
 * variants. Returns undefined when the asset has no variants (e.g. PNG marks).
 */
export function srcSetFor(path: string): string | undefined {
  if (!/\.webp$/.test(path)) return undefined
  const key = path.replace('/img/', '').replace('.webp', '')
  const variant = IMAGE_VARIANTS[key]
  if (!variant) return undefined
  return [
    ...variant.widths.map((w) => `${asset(path.replace('.webp', `-${w}.webp`))} ${w}w`),
    `${asset(path)} ${variant.master}w`,
  ].join(', ')
}

/** Formats a number with Indian-style grouping (1,20,000). */
export function formatIndian(n: number): string {
  return new Intl.NumberFormat('en-IN').format(n)
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Splits a string into words, preserving the spaces for staggered animation. */
export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((t) => t.length > 0)
}
