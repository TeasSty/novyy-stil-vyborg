import manifest from '../data/images.json'

const BASE = import.meta.env.BASE_URL

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Собирает <img> с srcset по манифесту, который пишет scripts/build-images.mjs.
 * width/height проставляются всегда, чтобы не было сдвига вёрстки при загрузке.
 */
export function img(name, { alt, sizes = '100vw', eager = false, className, style } = {}) {
  const variants = manifest[name]
  if (!variants) return ''

  const largest = variants[variants.length - 1]
  const srcset = variants.map((v) => `${BASE}images/${v.file} ${v.w}w`).join(', ')

  return `<img
    src="${BASE}images/${largest.file}"
    srcset="${srcset}"
    sizes="${esc(sizes)}"
    width="${largest.w}"
    height="${largest.h}"
    alt="${esc(alt)}"
    ${className ? `class="${esc(className)}"` : ''}
    ${style ? `style="${esc(style)}"` : ''}
    loading="${eager ? 'eager' : 'lazy'}"
    decoding="async"
    ${eager ? 'fetchpriority="high"' : ''}
  >`
}

/** 215 → «3 ч 35 мин» */
export function minutes(total) {
  const h = Math.floor(total / 60)
  const m = total % 60
  if (!h) return `${m} мин`
  if (!m) return `${h} ч`
  return `${h} ч ${m} мин`
}

/** 1575 → «1 575» */
export function rub(value) {
  return value.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')
}

export function plural(n, forms) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
