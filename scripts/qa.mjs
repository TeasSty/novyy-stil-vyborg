/**
 * Локальный аудит собранной страницы: консоль, переполнения по ширине,
 * битые ссылки, поведение сборки визита и скриншоты под три композиции.
 * Запускать поверх `npm run preview`.
 */
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const URL = process.env.QA_URL || 'http://localhost:4173/novyy-stil-vyborg/'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const SHOTS = path.join(process.cwd(), '.tmp-qa')
fs.mkdirSync(SHOTS, { recursive: true })

const VIEWS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1180, height: 820 },
  { name: 'tablet', width: 820, height: 1100 },
  { name: 'phone', width: 390, height: 844, mobile: true },
  { name: 'phone-small', width: 320, height: 640, mobile: true },
]

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--hide-scrollbars', '--no-sandbox', '--font-render-hinting=none'],
})

const problems = []

for (const view of VIEWS) {
  const page = await browser.newPage()
  await page.setViewport({
    width: view.width,
    height: view.height,
    deviceScaleFactor: 2,
    isMobile: !!view.mobile,
    hasTouch: !!view.mobile,
  })

  const logs = []
  page.on('console', (m) => {
    if (['error', 'warning'].includes(m.type())) logs.push(`${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`))
  page.on('requestfailed', (r) => logs.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`))

  await page.goto(URL, { waitUntil: 'networkidle2' })
  await page.evaluate(async () => {
    /* прокрутка, чтобы отработал lazy-load всех картинок */
    for (let y = 0; y < document.body.scrollHeight; y += 350) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    for (let i = 0; i < 60; i++) {
      if ([...document.images].every((im) => im.complete)) break
      await new Promise((r) => setTimeout(r, 150))
    }
  })

  const audit = await page.evaluate(() => {
    const out = { overflow: [], images: [], small: [], scrollW: 0, clientW: 0 }
    out.scrollW = document.documentElement.scrollWidth
    out.clientW = document.documentElement.clientWidth

    /* элементы внутри намеренной горизонтальной ленты не считаются переполнением */
    const inScroller = (el) => {
      for (let p = el.parentElement; p; p = p.parentElement) {
        const ox = getComputedStyle(p).overflowX
        if (ox === 'auto' || ox === 'scroll') return true
      }
      return false
    }

    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || inScroller(el)) continue
      if (r.right > out.clientW + 1 || r.left < -1) {
        out.overflow.push(`${el.tagName.toLowerCase()}.${el.className || ''}`.slice(0, 70))
      }
    }

    for (const im of document.images) {
      if (!im.complete || im.naturalWidth === 0) out.images.push(im.currentSrc || im.src)
    }

    for (const el of document.querySelectorAll('a[href], button')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.height < 40 && !el.closest('.foot, .pull, .kicker, .picked')) {
        out.small.push(`${el.tagName.toLowerCase()} «${el.textContent.trim().slice(0, 24)}» ${Math.round(r.height)}px`)
      }
    }

    return out
  })

  if (audit.overflow.length) problems.push(`[${view.name}] выход за ширину: ${[...new Set(audit.overflow)].join(' | ')}`)
  if (audit.images.length) problems.push(`[${view.name}] не загрузились картинки: ${audit.images.join(' | ')}`)
  if (audit.small.length) problems.push(`[${view.name}] мелкие кнопки: ${[...new Set(audit.small)].join(' | ')}`)
  if (audit.scrollW > audit.clientW + 1) {
    problems.push(`[${view.name}] горизонтальный скролл: ${audit.scrollW} > ${audit.clientW}`)
  }

  await page.screenshot({ path: path.join(SHOTS, `${view.name}-top.png`) })
  await page.screenshot({ path: path.join(SHOTS, `${view.name}-full.png`), fullPage: true })

  /* сценарий: собрать визит */
  await page.evaluate(() => document.querySelector('[data-preset="all-in"]').click())
  await new Promise((r) => setTimeout(r, 400))

  const planText = await page.evaluate(() => {
    const open = document.querySelector('[data-sheet-toggle]')
    if (open && getComputedStyle(open).display !== 'none') open.click()
    return document.querySelector('[data-plan-body]').innerText.replace(/\s+/g, ' ').slice(0, 400)
  })
  await new Promise((r) => setTimeout(r, 500))
  await page.screenshot({ path: path.join(SHOTS, `${view.name}-plan.png`) })

  if (!/услуг/.test(planText)) problems.push(`[${view.name}] план визита не собрался: ${planText}`)

  const afterLogs = await page.evaluate(() => document.querySelectorAll('[data-drop]').length)
  if (afterLogs !== 4) problems.push(`[${view.name}] в плане ${afterLogs} услуг вместо 4`)

  if (view.name === 'phone') {
    await page.evaluate(() => document.querySelector('.burger').click())
    await new Promise((r) => setTimeout(r, 350))
    const menu = await page.evaluate(() => {
      const m = document.getElementById('menu')
      const r = m.getBoundingClientRect()
      return { top: r.top, left: r.left, w: r.width, h: r.height, vw: innerWidth, vh: innerHeight }
    })
    if (menu.top > 0.5 || menu.left > 0.5 || menu.w < menu.vw - 0.5 || menu.h < menu.vh - 0.5) {
      problems.push(`[phone] меню не полноэкранное: ${JSON.stringify(menu)}`)
    }
    await page.screenshot({ path: path.join(SHOTS, 'phone-menu.png') })
    await page.evaluate(() => document.querySelector('.burger').click())
  }

  if (logs.length) problems.push(`[${view.name}] консоль: ${[...new Set(logs)].join(' | ')}`)

  console.log(`${view.name}: ok, план — ${planText.slice(0, 90)}…`)
  await page.close()
}

/* ссылки */
const page = await browser.newPage()
await page.goto(URL, { waitUntil: 'networkidle2' })
const links = await page.evaluate(() =>
  [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.href, text: a.textContent.trim().slice(0, 30) })),
)
const seen = new Set()
for (const link of links) {
  if (seen.has(link.href)) continue
  seen.add(link.href)
  if (link.href.startsWith('tel:')) continue
  if (link.href.includes('#')) {
    const id = link.href.split('#')[1]
    const exists = await page.evaluate((x) => !x || !!document.getElementById(x), id)
    if (!exists) problems.push(`битый якорь: #${id} («${link.text}»)`)
    continue
  }
  if (link.href.startsWith('http') && !link.href.includes('localhost')) {
    console.log('внешняя ссылка:', link.href)
    continue
  }
}
await page.close()
await browser.close()

console.log('\n=== ИТОГ ===')
if (!problems.length) console.log('проблем не найдено')
else problems.forEach((p) => console.log('!', p))
