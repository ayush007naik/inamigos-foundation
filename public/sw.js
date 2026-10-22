/*
 * InAmigos Foundation — offline shell + soft-404.
 *
 * GitHub Pages serves the project 404.html (a copy of index.html) for unknown
 * paths, so deep links boot the app but with an HTTP 404 status. This worker
 * rewrites those navigations to 200 once it is in control, and caches static
 * assets so repeat visits are instant and work offline.
 */
const CACHE = 'inamigos-foundation-v1'
const SHELL = new URL('./index.html', self.registration.scope).href

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll([SHELL]).catch(() => undefined))
      .catch(() => undefined)
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

const isHtml = (res) => (res.headers.get('content-type') || '').includes('text/html')

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // --- Navigations: always try the network first so a fresh deploy is picked
  //     up immediately, then fall back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res && res.status === 404 && isHtml(res)) {
            // GitHub Pages served our 404.html (the app shell) with a 404
            // status — serve the same body with a 200 instead.
            return res
              .clone()
              .text()
              .then((html) => new Response(html, { status: 200, headers: res.headers }))
          }
          if (res && res.ok && isHtml(res)) {
            const copy = res.clone()
            caches.open(CACHE).then((cache) => cache.put(SHELL, copy)).catch(() => undefined)
          }
          return res
        })
        .catch(() =>
          caches
            .match(SHELL)
            .then((cached) => cached || new Response('Offline', { status: 503 }))
        )
    )
    return
  }

  // --- Static assets: cache-first, refreshed in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          if (res && res.ok && res.type === 'basic') {
            const copy = res.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined)
          }
          return res
        })
        .catch(() => cached)
      return cached || network
    })
  )
})
