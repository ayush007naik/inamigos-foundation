#!/usr/bin/env node
/**
 * Downloads the official InAmigos Foundation photography and optimises it for
 * the web (resize + WebP), emitting a blur-up LQIP manifest in src/data/lqip.ts.
 *
 * Run: node scripts/fetch-images.mjs
 */
import { execFile } from 'node:child_process'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { promisify } from 'node:util'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const exec = promisify(execFile)
const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const IMG_DIR = resolve(ROOT, 'public/img')
const TMP_DIR = resolve(ROOT, '.tmp-img')
const BASE = 'https://www.inamigosfoundation.org.in/public/storage'

/** @type {{id:string,src:string,max:number,group:string}[]} */
const ASSETS = [
  // Brand
  { id: 'logo', src: 'settings/174421468011.jpg', max: 640, group: 'brand' },
  { id: 'logo-footer', src: 'settings/1744214680113.jpg', max: 640, group: 'brand' },

  // Feature cards
  { id: 'feature-donate', src: 'features/1738044328.png', max: 900, group: 'feature' },
  { id: 'feature-volunteer', src: 'features/1566219854.png', max: 900, group: 'feature' },
  { id: 'feature-join', src: 'features/1566220280.png', max: 900, group: 'feature' },

  // Events
  { id: 'event-water-day', src: 'events/1738238109.jpg', max: 1400, group: 'event' },
  { id: 'event-happiness', src: 'events/1738135259.jpeg', max: 1400, group: 'event' },
  { id: 'event-women-science', src: 'events/1738134836.jpeg', max: 1400, group: 'event' },

  // Blog covers
  { id: 'post-vikas', src: 'post/1740818641.jpg', max: 1400, group: 'post' },
  { id: 'post-mission-life', src: 'post/1738237948.jpeg', max: 1400, group: 'post' },
  { id: 'post-save-water', src: 'post/1738237965.jpg', max: 1400, group: 'post' },
  { id: 'post-healthy-lifestyle', src: 'post/1738237853.jpg', max: 1400, group: 'post' },
  { id: 'post-udaan', src: 'post/1738237839.jpeg', max: 1400, group: 'post' },
  { id: 'post-jeev', src: 'post/1738237826.jpg', max: 1400, group: 'post' },
  { id: 'post-embracing-life', src: 'post/1738237744.jpg', max: 1400, group: 'post' },
  { id: 'post-transforming-lives', src: 'post/1738237675.jpg', max: 1400, group: 'post' },
  { id: 'post-bachpanshala', src: 'post/1738237659.jpeg', max: 1400, group: 'post' },
  { id: 'post-animal-protection', src: 'post/1738236598.jpg', max: 1400, group: 'post' },

  // Gallery
  { id: 'g-01', src: 'gallery/1743051485.jpg', max: 1600, group: 'gallery' },
  { id: 'g-02', src: 'gallery/1743051466.jpg', max: 1600, group: 'gallery' },
  { id: 'g-03', src: 'gallery/1743051449.jpg', max: 1600, group: 'gallery' },
  { id: 'g-04', src: 'gallery/1743051438.jpg', max: 1600, group: 'gallery' },
  { id: 'g-05', src: 'gallery/1743051382.jpg', max: 1600, group: 'gallery' },
  { id: 'g-06', src: 'gallery/1738299164.jpg', max: 1600, group: 'gallery' },
  { id: 'g-07', src: 'gallery/1738238755.JPG', max: 1600, group: 'gallery' },
  { id: 'g-08', src: 'gallery/1738238744.jpg', max: 1600, group: 'gallery' },
  { id: 'g-09', src: 'gallery/1738238725.jpg', max: 1600, group: 'gallery' },
  { id: 'g-10', src: 'gallery/1738238698.jpg', max: 1600, group: 'gallery' },
  { id: 'g-11', src: 'gallery/1738054473.jpg', max: 1600, group: 'gallery' },
  { id: 'g-12', src: 'gallery/1738054458.jpg', max: 1600, group: 'gallery' },
  { id: 'g-13', src: 'gallery/1738054440.jpg', max: 1600, group: 'gallery' },
  { id: 'g-14', src: 'gallery/1738048982.jpg', max: 1600, group: 'gallery' },
  { id: 'g-15', src: 'gallery/1690908498.jpg', max: 1600, group: 'gallery' },
  { id: 'g-16', src: 'gallery/1690908483.jpg', max: 1600, group: 'gallery' },
  { id: 'g-17', src: 'gallery/1690908403.jpg', max: 1600, group: 'gallery' },
  { id: 'g-18', src: 'gallery/1690908391.jpg', max: 1600, group: 'gallery' },
  { id: 'g-19', src: 'gallery/1690908380.jpg', max: 1600, group: 'gallery' },
  { id: 'g-20', src: 'gallery/1690908369.jpg', max: 1600, group: 'gallery' },
  { id: 'g-21', src: 'gallery/1690908359.jpg', max: 1600, group: 'gallery' },
  { id: 'g-22', src: 'gallery/1690908350.jpg', max: 1600, group: 'gallery' },
  { id: 'g-23', src: 'gallery/1690908247.jpeg', max: 1600, group: 'gallery' },
]

async function sh(cmd, args) {
  const { stdout } = await exec(cmd, args, { maxBuffer: 1024 * 1024 * 32 })
  return stdout.trim()
}

async function download(url, dest) {
  let lastErr
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'InamigosFoundationSiteBuilder/1.0' },
        signal: AbortSignal.timeout(60_000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      await writeFile(dest, buf)
      return buf
    } catch (err) {
      lastErr = err
      await new Promise((r) => setTimeout(r, 800 * attempt))
    }
  }
  throw new Error(`Failed to download ${url}: ${lastErr?.message ?? lastErr}`)
}

async function run() {
  await rm(TMP_DIR, { recursive: true, force: true })
  await mkdir(TMP_DIR, { recursive: true })
  await mkdir(IMG_DIR, { recursive: true })

  const lqip = {}
  let totalIn = 0
  let totalOut = 0

  for (const asset of ASSETS) {
    const url = `${BASE}/${asset.src}`
    const raw = resolve(TMP_DIR, `${asset.id}.raw`)
    totalIn += (await download(url, raw)).length

    // Resize to target width using sips (preserves aspect ratio)
    const resized = resolve(TMP_DIR, `${asset.id}.res`)
    await sh('sips', ['-Z', String(asset.max), raw, '--out', resized])

    const out = resolve(IMG_DIR, `${asset.id}.webp`)
    await sh('cwebp', ['-quiet', '-q', '84', '-m', '6', resized, '-o', out])

    // 20px LQIP for blur-up placeholders
    const tiny = resolve(TMP_DIR, `${asset.id}.tiny`)
    await sh('sips', ['-Z', '20', resized, '--out', tiny])
    const tinyWebp = resolve(TMP_DIR, `${asset.id}.tiny.webp`)
    await sh('cwebp', ['-quiet', '-q', '40', tiny, '-o', tinyWebp])
    const { stdout: b64 } = await exec('base64', ['-i', tinyWebp])
    lqip[asset.id] = `data:image/webp;base64,${b64.replace(/\s+/g, '')}`

    const { size } = await sh('sh', ['-c', `stat -f%z ${out}`])
    totalOut += Number(size)
    console.log(`✓ ${asset.id.padEnd(26)} ${asset.src}`)
  }

  await writeFile(
    resolve(ROOT, 'src/data/lqip.ts'),
    `// Auto-generated by scripts/fetch-images.mjs — 20px WebP blur-up placeholders.\n` +
      `export const LQIP: Record<string, string> = ${JSON.stringify(lqip, null, 2)}\n`
  )

  await rm(TMP_DIR, { recursive: true, force: true })
  console.log(
    `\nDownloaded ${(totalIn / 1024 / 1024).toFixed(1)} MB → ${(totalOut / 1024 / 1024).toFixed(1)} MB optimised`
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
