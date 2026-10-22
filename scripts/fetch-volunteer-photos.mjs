#!/usr/bin/env node
/**
 * Downloads the official volunteer portraits published on
 * https://www.inamigosfoundation.org.in/volunteers and optimises them for the
 * web (resize + WebP), emitting blur-up LQIP placeholders in src/data/lqip.ts.
 *
 * The portraits are portrait photographs, so they are kept at their original
 * aspect ratio and cropped in the browser (object-fit: cover).
 *
 * Run: node scripts/fetch-volunteer-photos.mjs
 */
import { execFile } from 'node:child_process'
import { mkdir, writeFile, rm, readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const exec = promisify(execFile)
const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const IMG_DIR = resolve(ROOT, 'public/img')
const TMP_DIR = resolve(ROOT, '.tmp-vol')
const LQIP_FILE = resolve(ROOT, 'src/data/lqip.ts')
const BASE = 'https://www.inamigosfoundation.org.in/public/storage'

/** @type {{id:string,src:string,max:number}[]} */
const ASSETS = [
  { id: 'vol-govind-shukla', src: 'volunteers/1738077310.png', max: 640 },
  { id: 'vol-sagarika-jaiswal', src: 'volunteers/1738077444.jpg', max: 640 },
  { id: 'vol-khush-gupta', src: 'volunteers/1738077677.jpg', max: 640 },
  { id: 'vol-iniya-radhakrishnan', src: 'volunteers/1738077748.jpg', max: 640 },
  { id: 'vol-shiwani', src: 'volunteers/1738077915.jpg', max: 640 },
  { id: 'vol-shaik-shahira-bhanu', src: 'volunteers/1738078064.jpg', max: 640 },
  { id: 'vol-vignesh-n', src: 'volunteers/1738078173.jpg', max: 640 },
  { id: 'vol-padmasri', src: 'volunteers/1738078247.jpg', max: 640 },
  { id: 'vol-anusha', src: 'volunteers/1738078410.jpg', max: 640 },
  { id: 'vol-madhusoodan-m', src: 'volunteers/1738078519.jpg', max: 640 },
  { id: 'vol-raman-swarnakar', src: 'volunteers/1738078606.jpg', max: 640 },
  { id: 'vol-anam-fatima', src: 'volunteers/1738078664.jpg', max: 640 },
  { id: 'vol-vedanshi-chaudhari', src: 'volunteers/1738078733.jpg', max: 640 },
  { id: 'vol-riddhima-barthwal', src: 'volunteers/1738078891.jpg', max: 640 },
  { id: 'vol-roshi', src: 'volunteers/1738079012.jpg', max: 640 },
  { id: 'vol-tannu-sharma', src: 'volunteers/1738079069.jpg', max: 640 },
  { id: 'vol-anchal', src: 'volunteers/1738079126.jpg', max: 640 },
  { id: 'vol-jai-chandela', src: 'volunteers/1738079176.jpg', max: 640 },
  { id: 'vol-simranjeet', src: 'volunteers/1738079264.jpg', max: 640 },
  { id: 'vol-gloria-fredy-carvalho', src: 'volunteers/1738079427.jpg', max: 640 },
  { id: 'vol-khushi-rai', src: 'volunteers/1738079490.jpg', max: 640 },
  { id: 'vol-paree-nagpal', src: 'volunteers/1738079564.jpg', max: 640 },
  { id: 'vol-bhavya', src: 'volunteers/1738079613.jpg', max: 640 },
  { id: 'vol-vivek', src: 'volunteers/1738079692.jpg', max: 640 },
  { id: 'vol-megha-kelvi', src: 'volunteers/1738079799.jpg', max: 640 },
  { id: 'vol-sagar-solanki', src: 'volunteers/1738079917.jpg', max: 640 },
  { id: 'vol-dr-akash', src: 'volunteers/1738080182.jpg', max: 640 },
  { id: 'vol-adil-ali', src: 'volunteers/1738080378.jpg', max: 640 },
  { id: 'vol-komal-kushwaha', src: 'volunteers/1738080460.jpg', max: 640 },
  { id: 'vol-suhaliya-khan', src: 'volunteers/1738080526.jpg', max: 640 },
  { id: 'vol-sonam-singh', src: 'volunteers/1738080620.jpg', max: 640 },
  { id: 'vol-akash', src: 'volunteers/1738080678.jpg', max: 640 },
  { id: 'vol-manavi-jaiswal', src: 'volunteers/1738127845.jpg', max: 640 },
  { id: 'vol-faiz-khan', src: 'volunteers/1738081237.jpg', max: 640 },
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

/** Keeps LQIP entries written by other scripts (e.g. fetch-images.mjs). */
async function readExistingLqip() {
  try {
    const raw = await readFile(LQIP_FILE, 'utf8')
    const entries = {}
    for (const m of raw.matchAll(/"([^"]+)":\s*"(data:[^"]*)"/g)) entries[m[1]] = m[2]
    return entries
  } catch {
    return {}
  }
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

    // Resize to target size using sips (preserves aspect ratio, never upscales)
    const resized = resolve(TMP_DIR, `${asset.id}.res`)
    const dims = await sh('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', raw])
    const w = Number(dims.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0)
    const h = Number(dims.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0)
    const source = Math.max(w, h) > asset.max ? resized : raw
    if (source === resized) await sh('sips', ['-Z', String(asset.max), raw, '--out', resized])

    const out = resolve(IMG_DIR, `${asset.id}.webp`)
    await sh('cwebp', ['-quiet', '-q', '84', '-m', '6', '-sharp_yuv', source, '-o', out])

    // 20px LQIP for blur-up placeholders
    const tiny = resolve(TMP_DIR, `${asset.id}.tiny`)
    await sh('sips', ['-Z', '20', source, '--out', tiny])
    const tinyWebp = resolve(TMP_DIR, `${asset.id}.tiny.webp`)
    await sh('cwebp', ['-quiet', '-q', '40', tiny, '-o', tinyWebp])
    const { stdout: b64 } = await exec('base64', ['-i', tinyWebp])
    lqip[asset.id] = `data:image/webp;base64,${b64.replace(/\s+/g, '')}`

    const size = await sh('sh', ['-c', `stat -f%z ${out}`])
    totalOut += Number(size)
    console.log(`✓ ${asset.id.padEnd(28)} ${asset.src}`)
  }

  const merged = { ...(await readExistingLqip()), ...lqip }
  await writeFile(
    LQIP_FILE,
    `// Auto-generated by scripts/fetch-images.mjs and scripts/fetch-volunteer-photos.mjs — 20px WebP blur-up placeholders.\n` +
      `export const LQIP: Record<string, string> = ${JSON.stringify(merged, null, 2)}\n`
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
