import { branches, salon } from '../data/salon.js'
import { crews } from '../data/masters.js'
import { cases, tiles } from '../data/works.js'
import { story, promises, honest } from '../data/story.js'
import { esc, img } from '../lib/util.js'

export function renderSections() {
  fill('[data-story]', storyHTML())
  fill('[data-promises]', promisesHTML())
  fill('[data-honest]', honestHTML())
  fill('[data-crews]', crewsHTML())
  fill('[data-cases]', casesHTML())
  fill('[data-tiles]', tilesHTML())
  fill('[data-places]', placesHTML())
}

function fill(selector, html) {
  const node = document.querySelector(selector)
  if (node) node.innerHTML = html
}

function storyHTML() {
  return `
    <blockquote class="pull">
      <p>«${esc(story.quote)}»</p>
      <footer>
        ${esc(story.source.who)}.
        <a href="${story.source.href}" target="_blank" rel="noopener">${esc(story.source.text)}</a>
      </footer>
    </blockquote>
    <dl class="ladder">
      ${story.steps
        .map((s) => `<div><dt>${esc(s.k)}</dt><dd>${esc(s.v)}</dd></div>`)
        .join('')}
    </dl>`
}

function promisesHTML() {
  return `
    <h3>Что салон обещает</h3>
    <dl class="facts">
      ${promises.map((p) => `<div><dt>${esc(p.t)}</dt><dd>${esc(p.d)}</dd></div>`).join('')}
    </dl>`
}

function honestHTML() {
  return `
    <h3>О чём честно предупредить</h3>
    <dl class="facts facts--muted">
      ${honest.map((p) => `<div><dt>${esc(p.t)}</dt><dd>${esc(p.d)}</dd></div>`).join('')}
    </dl>`
}

function crewsHTML() {
  return crews
    .map(
      (crew) => `
      <div class="crew">
        <h3 class="crew__title">${esc(crew.title)} <span>${esc(crew.count)}</span></h3>
        ${crew.people
          .map(
            (p) => `
          <div class="crew__row">
            <span class="crew__name">${esc(p.name)}</span>
            <span class="crew__skill"
              >${esc(p.skill)}${p.note ? ` <span class="crew__note">${esc(p.note)}</span>` : ''}</span
            >
          </div>`,
          )
          .join('')}
      </div>`,
    )
    .join('')
}

function casesHTML() {
  return cases
    .map(
      (item) => `
      <figure class="case${item.shots.length === 1 ? ' case--single' : ''}">
        <div class="case__shots">
          ${item.shots
            .map(
              (shot) => `
            <span class="shot">
              ${img(shot.image, {
                alt: shot.alt,
                sizes: shot.wide
                  ? '(max-width: 900px) 92vw, 46vw'
                  : '(max-width: 900px) 46vw, 23vw',
              })}
              <i class="shot__tag">${esc(shot.tag)}</i>
            </span>`,
            )
            .join('')}
        </div>
        <figcaption>
          <p class="case__label">
            ${esc(item.label)} · <b>${esc(item.master)}</b> · ${esc(item.where)} · ${esc(item.date)}
          </p>
          <h3 class="case__title">${esc(item.title)}</h3>
          <p class="case__text">${esc(item.text)}</p>
          <blockquote class="case__quote"><p>«${esc(item.quote)}»</p></blockquote>
        </figcaption>
      </figure>`,
    )
    .join('')
}

function tilesHTML() {
  return tiles
    .map(
      (tile) => `
      <figure class="tile${tile.span === 'tall' ? ' tile--tall' : ''}">
        ${img(tile.image, {
          alt: tile.alt,
          sizes: '(max-width: 620px) 50vw, (max-width: 900px) 46vw, 24vw',
          style: tile.pos ? `object-position:${tile.pos}` : '',
        })}
        <figcaption class="tile__cap">
          <b>${esc(tile.label)}</b>
          <span>${esc(tile.master || tile.where || '')}</span>
        </figcaption>
      </figure>`,
    )
    .join('')
}

function placesHTML() {
  return branches
    .map(
      (b, i) => `
      <article class="place ${i === 0 ? 'place--main' : 'place--small'}" id="place-${b.id}">
        <div class="place__media">
          ${img(b.image, {
            alt: b.alt,
            sizes: i === 0 ? '(max-width: 900px) 92vw, 46vw' : '(max-width: 900px) 70vw, 34vw',
          })}
        </div>
        <div class="place__body">
          <p class="place__role">${esc(b.role)}</p>
          <h3 class="place__title">${esc(b.title)}<small>${esc(b.sub)}</small></h3>
          <p class="place__lead">${esc(b.lead)}</p>
          ${
            b.quote
              ? `<blockquote class="quote quote--place">
                   <p>«${esc(b.quote.text)}»</p>
                   <footer>${esc(b.quote.meta)}</footer>
                 </blockquote>`
              : ''
          }
          <dl class="place__facts">
            ${b.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
          </dl>
          <p class="place__how">${esc(b.how)}</p>
          <div class="place__links">
            <a href="${b.map}" target="_blank" rel="noopener">Посмотреть на карте</a>
            <a href="${salon.phoneHref}">Позвонить и записаться</a>
          </div>
        </div>
      </article>`,
    )
    .join('')
}
