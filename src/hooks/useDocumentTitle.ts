import { useEffect } from 'react'
import { asset } from '@/lib/utils'

const SITE = 'https://ayush007naik.github.io/inamigos-foundation'

function setMeta(selector: string, content: string) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

/**
 * Keeps the document title, meta description and social cards in sync with the
 * page. The static values in index.html act as the defaults for the home route.
 */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title

    const url = `${SITE}${window.location.pathname.replace(/^\/inamigos-foundation/, '')}`
    const image = `${window.location.origin}${asset('/img/g-01.webp')}`

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    setMeta('meta[property="og:title"]', title)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:image"]', image)
    setMeta('meta[name="twitter:image"]', image)

    if (!description) return
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:description"]', description)
  }, [title, description])
}
