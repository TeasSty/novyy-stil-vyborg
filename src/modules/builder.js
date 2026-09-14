import { tracks, services, serviceById, presets } from '../data/services.js'
import { salon, branches } from '../data/salon.js'
import { visitQuotes } from '../data/works.js'
import { esc, minutes, rub, plural } from '../lib/util.js'

const picked = new Set()
let branchChoice = 'lenina'

const TRACK_HINT = {
  hair: 'один мастер ведёт вас по очереди',
  hands: 'свой мастер, можно параллельно с волосами',
  feet: 'отдельный мастер, параллельно с руками — нет',
  face: 'быстрые услуги, встают в паузы',
}

export function initBuilder() {
  const root = document.querySelector('[data-builder]')
  if (!root) return

  const plan = root.querySelector('[data-plan]')
  const body = root.querySelector('[data-plan-body]')
  const status = root.querySelector('[data-status]')

  renderPicks(root)

  const draw = () => {
    body.innerHTML = planHTML()
    root.toggleAttribute('data-picked', picked.size > 0)
    document.body.classList.toggle('is-sheet', picked.size > 0)
    if (!picked.size) plan.removeAttribute('data-open')
    if (status) status.textContent = statusText()
  }

  root.addEventListener('change', (e) => {
    const input = e.target
    if (input.matches('[data-svc]')) {
      input.checked ? picked.add(input.value) : picked.delete(input.value)
      draw()
    }
    if (input.matches('[data-branch]')) {
      branchChoice = input.value
      draw()
    }
  })

  root.addEventListener('click', (e) => {
    const preset = e.target.closest('[data-preset]')
    if (preset) {
      applyPreset(root, preset.dataset.preset)
      draw()
      return
    }

    const drop = e.target.closest('[data-drop]')
    if (drop) {
      const id = drop.dataset.drop
      picked.delete(id)
      const input = root.querySelector(`[data-svc][value="${id}"]`)
      if (input) input.checked = false
      draw()
      plan.focus({ preventScroll: true })
      return
    }

    const toggle = e.target.closest('[data-sheet-toggle]')
    if (toggle) {
      const open = plan.hasAttribute('data-open')
      open ? plan.removeAttribute('data-open') : plan.setAttribute('data-open', '')
      toggle.setAttribute('aria-expanded', String(!open))
      return
    }

    const copy = e.target.closest('[data-copy]')
    if (copy) copyPlan(root)
  })

  draw()
}

/* ── разметка выбора ──────────────────────────────────────── */

function renderPicks(root) {
  const presetBox = root.querySelector('[data-preset-list]')
  if (presetBox) {
    presetBox.innerHTML = presets
      .map((p) => `<button type="button" class="chip" data-preset="${p.id}">${esc(p.label)}</button>`)
      .join('')
  }

  const list = root.querySelector('[data-track-list]')
  if (!list) return

  list.innerHTML = tracks
    .map((track) => {
      const items = services.filter((s) => s.track === track.id)
      return `
        <div class="track">
          <div class="track__head">
            <span class="track__label">${esc(track.label)}</span>
            <span class="track__hint">${esc(TRACK_HINT[track.id] || '')}</span>
          </div>
          <div class="chips">
            ${items
              .map(
                (s) => `
              <label class="chip">
                <input type="checkbox" data-svc value="${s.id}">
                <span>${esc(s.title)}</span>
                <span class="chip__dur">${s.min}–${s.max}&nbsp;мин</span>
              </label>`,
              )
              .join('')}
          </div>
        </div>`
    })
    .join('')
}

function applyPreset(root, id) {
  const preset = presets.find((p) => p.id === id)
  if (!preset) return

  const same = preset.ids.length === picked.size && preset.ids.every((x) => picked.has(x))
  picked.clear()
  if (!same) preset.ids.forEach((x) => picked.add(x))

  root.querySelectorAll('[data-svc]').forEach((input) => {
    input.checked = picked.has(input.value)
  })
  branchChoice = 'lenina'
}

/* ── расчёт ───────────────────────────────────────────────── */

function compute() {
  const items = [...picked].map((id) => serviceById[id]).filter(Boolean)

  const lanes = tracks
    .map((track) => {
      const own = items.filter((s) => s.track === track.id)
      return {
        ...track,
        items: own,
        min: own.reduce((sum, s) => sum + s.min, 0),
        max: own.reduce((sum, s) => sum + s.max, 0),
      }
    })
    .filter((lane) => lane.items.length)

  const seqMin = lanes.reduce((sum, l) => sum + l.min, 0)
  const seqMax = lanes.reduce((sum, l) => sum + l.max, 0)
  const parMin = Math.max(0, ...lanes.map((l) => l.min))
  const parMax = Math.max(0, ...lanes.map((l) => l.max))

  const priced = items.filter((s) => s.price)
  const from = priced.reduce((sum, s) => sum + s.price[0], 0)
  const to = priced.reduce((sum, s) => sum + s.price[1], 0)
  const promo = items.find((s) => s.promo)

  const canAkulova = items.length > 0 && items.every((s) => s.branches.includes('akulova'))
  const leninaOnly = items.filter((s) => !s.branches.includes('akulova'))

  return {
    items,
    lanes,
    seqMin,
    seqMax,
    parMin,
    parMax,
    saveMax: Math.max(0, seqMax - parMax),
    from,
    to,
    unpriced: items.length - priced.length,
    promo,
    canAkulova,
    leninaOnly,
    branch: canAkulova ? branchChoice : 'lenina',
  }
}

function statusText() {
  if (!picked.size) return ''
  const c = compute()
  const n = c.items.length
  return `В визите ${n} ${plural(n, ['услуга', 'услуги', 'услуг'])}, около ${minutes(c.parMax)} на месте.`
}

/* ── разметка плана ───────────────────────────────────────── */

function planHTML() {
  if (!picked.size) return emptyHTML()

  const c = compute()
  const branch = branches.find((b) => b.id === c.branch)

  return `
    <button class="sheet__bar" type="button" data-sheet-toggle aria-expanded="false" aria-controls="plan-scroll">
      <span class="sheet__sum">
        <b>${c.items.length} ${plural(c.items.length, ['услуга', 'услуги', 'услуг'])} · ${minutes(c.parMax)}</b>
        <span>${c.from ? `ориентир от ${rub(c.from)} ₽` : 'цену считает мастер'}</span>
      </span>
      <span class="sheet__chev" aria-hidden="true">▾</span>
    </button>

    <div class="plan__scroll" id="plan-scroll">
      ${ganttHTML(c)}
      ${sumsHTML(c)}
      ${pickedHTML(c)}
      ${whereHTML(c, branch)}
      ${actsHTML(c, branch)}
    </div>`
}

function emptyHTML() {
  return `
    <div class="plan__empty">
      <p>
        Отметьте услуги — покажу, кто из мастеров это делает, что входит в работу,
        сколько времени займёт визит, если мастеров свести на одно время, и во что он примерно обойдётся.
      </p>
      <div class="plan__proof">
        <p class="where__q">Так уже приходят</p>
        ${visitQuotes
          .map(
            (q) => `
          <blockquote class="quote">
            <p>«${esc(q.text)}»</p>
            <footer>${esc(q.meta)}</footer>
          </blockquote>`,
          )
          .join('')}
      </div>
    </div>`
}

function ganttHTML(c) {
  const scale = Math.max(60, Math.ceil(c.parMax / 30) * 30)
  const hours = Math.ceil(scale / 60)
  const longest = Math.max(...c.lanes.map((l) => l.max))

  const ruler = Array.from({ length: hours }, (_, i) => {
    const width = Math.min(60, scale - i * 60)
    return `<span class="ruler__cell" style="flex-grow:${width}">${i === 0 ? '0' : `${i} ч`}</span>`
  }).join('')

  const rows = c.lanes
    .map(
      (lane) => `
      <div class="gantt__row">
        <span class="gantt__who">${esc(lane.short)}</span>
        <span class="gantt__bars">
          ${lane.items
            .map(
              (s) => `
            <span class="gantt__seg${lane.max === longest ? ' gantt__seg--accent' : ''}"
                  style="--w:${((s.max / scale) * 100).toFixed(2)}%" title="${esc(s.title)}: ${s.min}–${s.max} мин">
              ${s.max / scale > 0.16 ? minutes(s.max) : ''}
            </span>`,
            )
            .join('')}
        </span>
      </div>`,
    )
    .join('')

  return `
    <div class="ruler" aria-hidden="true">${ruler}</div>
    <div class="gantt">${rows}</div>`
}

function sumsHTML(c) {
  const parallel = c.lanes.length > 1

  return `
    <div class="sums">
      ${
        parallel
          ? `<span class="sums__row"><span>Если свести мастеров</span><b>${minutes(c.parMax)}</b></span>
             <span class="sums__row"><span>Одна услуга за другой</span><b>${minutes(c.seqMax)}</b></span>
             ${
               c.saveMax >= 20
                 ? `<span class="sums__row sums__row--save"><span>Экономия времени</span><b>−${minutes(c.saveMax)}</b></span>`
                 : ''
             }`
          : `<span class="sums__row"><span>Время на месте</span><b>${minutes(c.parMin)}–${minutes(c.parMax)}</b></span>`
      }
      <span class="sums__row sums__row--price">
        <span>${c.from ? 'Ориентир по цене' : 'Цена'}</span>
        <b>${
          c.from
            ? c.from === c.to
              ? `${rub(c.from)} ₽`
              : `${rub(c.from)}–${rub(c.to)} ₽`
            : 'по консультации'
        }</b>
      </span>
      <p class="sums__note">
        ${
          c.unpriced
            ? `${c.unpriced} ${plural(c.unpriced, ['услуга', 'услуги', 'услуг'])} в этом наборе считает мастер: расход материала зависит от длины и густоты волос. `
            : ''
        }${
          c.promo
            ? `В первый визит маникюр — ${rub(c.promo.promo)} ₽ вместо ${rub(c.promo.price[0])} ₽ по промокоду «−25 %». `
            : ''
        }${
          parallel
            ? 'Параллельно идёт то, что физически можно совместить: пока держится цвет, мастер работает с руками. Точную сетку соберёт администратор.'
            : ''
        }
      </p>
    </div>`
}

function pickedHTML(c) {
  return `
    <div class="picked">
      ${c.items
        .map(
          (s) => `
        <div class="picked__item">
          <p class="picked__top">
            <span class="picked__name">${esc(s.title)}</span>
            <span class="picked__price">${
              s.price
                ? s.price[0] === s.price[1]
                  ? `${rub(s.price[0])} ₽`
                  : `${rub(s.price[0])}–${rub(s.price[1])} ₽`
                : 'по консультации'
            }</span>
            <button class="picked__drop" type="button" data-drop="${s.id}" aria-label="Убрать «${esc(s.title)}» из визита">×</button>
          </p>
          <p class="picked__meta"><b>Входит:</b> ${esc(s.includes.join(' · '))}</p>
          <p class="picked__meta"><b>Делают:</b> ${esc(s.masters.slice(0, 4).join(', '))}${
            s.masters.length > 4 ? ' и другие' : ''
          }</p>
        </div>`,
        )
        .join('')}
    </div>`
}

function whereHTML(c, branch) {
  if (!c.canAkulova) {
    const reason = c.leninaOnly.map((s) => s.title.toLowerCase()).slice(0, 2).join(', ')
    return `
      <div class="where">
        <p class="where__q">Где это сделают</p>
        <div class="where__opts">
          <span class="where__opt" data-static>
            <span class="where__name">Проспект Ленина, 7</span>
            <span class="where__note">Цокольный этаж, ежедневно 10:00–20:00</span>
          </span>
        </div>
        <p class="where__warn">${esc(reason)} — только здесь, поэтому весь визит на Ленина, 7.</p>
      </div>`
  }

  return `
    <div class="where">
      <p class="where__q">Где вам удобнее</p>
      <div class="where__opts">
        ${branches
          .map(
            (b) => `
          <label class="where__opt">
            <input type="radio" name="branch" data-branch value="${b.id}" ${b.id === branch.id ? 'checked' : ''}>
            <span class="where__name">${esc(b.title)}</span>
            <span class="where__note">${esc(b.sub)}</span>
          </label>`,
          )
          .join('')}
      </div>
    </div>`
}

function actsHTML(c, branch) {
  return `
    <div class="acts">
      <button class="btn btn--solid" type="button" data-copy>Скопировать состав визита</button>
      <a class="btn" href="${salon.phoneHref}">Позвонить: ${esc(salon.phone)}</a>
      <a class="btn" href="${salon.vkMessage}" target="_blank" rel="noopener">Открыть сообщения салона</a>
      <span class="acts__said" data-said role="status"></span>
    </div>`
}

/* ── копирование ──────────────────────────────────────────── */

function planText() {
  const c = compute()
  const branch = branches.find((b) => b.id === c.branch)

  const lines = [
    `Здравствуйте! Хочу записаться в «Новый стиль», ${branch.title}.`,
    `Услуги: ${c.items.map((s) => s.title.toLowerCase()).join('; ')}.`,
  ]

  if (c.lanes.length > 1) {
    lines.push(
      `Если мастеров можно свести на одно время — это около ${minutes(c.parMax)} вместо ${minutes(c.seqMax)} по очереди.`,
    )
  } else {
    lines.push(`По времени — примерно ${minutes(c.parMax)}.`)
  }

  if (c.from) {
    lines.push(
      `Ориентир по цене с сайта: ${c.from === c.to ? `${rub(c.from)} ₽` : `от ${rub(c.from)} ₽`}${
        c.unpriced ? ' плюс услуги, которые считает мастер' : ''
      }.`,
    )
  }

  lines.push('Удобное время: ')
  return lines.join('\n')
}

async function copyPlan(root) {
  const said = root.querySelector('[data-said]')
  const text = planText()

  try {
    await navigator.clipboard.writeText(text)
    if (said) said.textContent = 'Скопировано — вставьте в сообщение салону'
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
    document.body.append(area)
    area.select()
    const ok = document.execCommand?.('copy')
    area.remove()
    if (said) said.textContent = ok ? 'Скопировано' : 'Не получилось скопировать — позвоните нам'
  }

  if (said) setTimeout(() => (said.textContent = ''), 4000)
}
