/**
 * Собирает адаптивные webp из исходников, которые клиенты приложили к своим
 * отзывам. Исходники лежат в .tmp-research/photos и не коммитятся,
 * результат в public/images — коммитится.
 *
 * Атрибуция каждого файла проверена по тексту отзыва, к которому он приложен
 * (.tmp-research/photo-index.json).
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'public', 'images')
const SRC = path.join(ROOT, '.tmp-research', 'photos')

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const TILE = [420, 820]
const CASE = [480, 900]
const PLACE = [660, 1200]

/** crop — доли кадра, которые отрезаются до ресайза. */
const JOBS = [
  { src: 'r36.jpg', out: 'place-lenina', widths: PLACE, crop: { bottom: 0.06 } },
  { src: 'r55.jpg', out: 'place-akulova', widths: [520, 960], q: 60 },

  { src: 'r03.jpg', out: 'case-cut-before', widths: CASE, crop: { top: 0.04, bottom: 0.04 } },
  { src: 'r04.jpg', out: 'case-cut-after', widths: CASE, crop: { top: 0.04, bottom: 0.04 } },
  { src: 'r18.jpg', out: 'case-color', widths: [760, 1300], crop: { bottom: 0.08 } },

  { src: 'r41.jpg', out: 'w-barber', widths: TILE },
  { src: 'r13.jpg', out: 'w-blonde', widths: TILE },
  { src: 'r53.jpg', out: 'w-shag', widths: TILE },
  { src: 'r57.jpg', out: 'w-combo', widths: TILE, crop: { bottom: 0.26 } },
  { src: 'r39.jpg', out: 'w-lashes', widths: TILE },
  { src: 'r06.jpg', out: 'w-nails-pink', widths: TILE },
  { src: 'r09.jpg', out: 'w-nails-nude', widths: TILE },
  { src: 'r20.jpg', out: 'w-nails-blue', widths: TILE },
  { src: 'r22.jpg', out: 'w-nails-red', widths: TILE },
  { src: 'r26.jpg', out: 'w-kids', widths: TILE },
]

const manifest = {}

for (const job of JOBS) {
  const file = path.join(SRC, job.src)
  if (!fs.existsSync(file)) {
    console.log('MISSING', job.src)
    continue
  }

  let img = sharp(file).rotate()
  const meta = await img.metadata()

  if (job.crop) {
    const c = { top: 0, right: 0, bottom: 0, left: 0, ...job.crop }
    img = img.extract({
      left: Math.round(meta.width * c.left),
      top: Math.round(meta.height * c.top),
      width: Math.round(meta.width * (1 - c.left - c.right)),
      height: Math.round(meta.height * (1 - c.top - c.bottom)),
    })
  }

  const buf = await img.toBuffer()
  const sizes = []

  for (const w of job.widths) {
    const name = `${job.out}-${w}.webp`
    const info = await sharp(buf)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: job.q ?? 76, effort: 6 })
      .toFile(path.join(OUT, name))
    sizes.push({ w: info.width, h: info.height, file: name })
    console.log(job.out.padEnd(18), `${info.width}x${info.height}`, Math.round(info.size / 1024) + 'KB')
  }

  manifest[job.out] = sizes
}

/* Картинка для мессенджеров: кирпич с неоном из зала на Ленина, 7. */
await sharp(path.join(SRC, 'r36.jpg'))
  .rotate()
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'og.jpg'))

fs.writeFileSync(
  path.join(ROOT, 'src', 'data', 'images.json'),
  JSON.stringify(manifest, null, 1) + '\n',
)
console.log('\nfiles:', fs.readdirSync(OUT).length)
