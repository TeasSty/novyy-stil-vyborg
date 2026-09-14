/**
 * Downloads the two self-hosted webfonts (latin + cyrillic subsets) and emits
 * public/fonts/fonts.css. Run once; the results are committed.
 */
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'public', 'fonts')
fs.mkdirSync(OUT, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const FAMILIES = [
  { css: 'Golos+Text:wght@400;500;600;700', family: 'Golos Text', slug: 'golos' },
  { css: 'JetBrains+Mono:wght@400;500', family: 'JetBrains Mono', slug: 'jbmono' },
]

const WANT = ['cyrillic', 'latin']

const blocks = []

for (const f of FAMILIES) {
  const url = `https://fonts.googleapis.com/css2?family=${f.css}&display=swap`
  const css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text()

  // Google returns /* subset */ comments followed by @font-face blocks
  const faces = css.split('/*').slice(1)
  for (const chunk of faces) {
    const subset = chunk.slice(0, chunk.indexOf('*/')).trim()
    if (!WANT.includes(subset)) continue
    const weight = /font-weight:\s*(\d+)/.exec(chunk)?.[1]
    const src = /url\((https:[^)]+\.woff2)\)/.exec(chunk)?.[1]
    const range = /unicode-range:\s*([^;]+);/.exec(chunk)?.[1]
    if (!weight || !src) continue

    const name = `${f.slug}-${weight}-${subset}.woff2`
    const buf = Buffer.from(await (await fetch(src, { headers: { 'User-Agent': UA } })).arrayBuffer())
    fs.writeFileSync(path.join(OUT, name), buf)
    console.log('OK', name, Math.round(buf.length / 1024) + 'KB')

    blocks.push(
      [
        '@font-face {',
        `  font-family: '${f.family}';`,
        `  font-style: normal;`,
        `  font-weight: ${weight};`,
        `  font-display: swap;`,
        `  src: url('./${name}') format('woff2');`,
        range ? `  unicode-range: ${range};` : '',
        '}',
      ]
        .filter(Boolean)
        .join('\n')
    )
  }
}

fs.writeFileSync(path.join(OUT, 'fonts.css'), blocks.join('\n\n') + '\n')
console.log('wrote fonts.css with', blocks.length, 'faces')
