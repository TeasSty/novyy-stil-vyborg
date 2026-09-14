/** Полноэкранное меню и подсветка текущего раздела. */
export function initNav() {
  const burger = document.querySelector('.burger')
  const menu = document.getElementById('menu')
  if (!burger || !menu) return

  const label = burger.querySelector('.burger__label')

  const close = () => {
    burger.setAttribute('aria-expanded', 'false')
    menu.hidden = true
    document.body.classList.remove('is-locked')
    if (label) label.textContent = 'Меню'
  }

  const open = () => {
    burger.setAttribute('aria-expanded', 'true')
    menu.hidden = false
    document.body.classList.add('is-locked')
    if (label) label.textContent = 'Закрыть'
    const first = menu.querySelector('a')
    if (first) first.focus({ preventScroll: true })
  }

  burger.addEventListener('click', () => {
    burger.getAttribute('aria-expanded') === 'true' ? close() : open()
  })

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) close()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      close()
      burger.focus()
    }
  })

  /* Меню — только мобильный сценарий: на широком экране его не должно остаться открытым. */
  const wide = window.matchMedia('(min-width: 961px)')
  wide.addEventListener('change', (e) => {
    if (e.matches) close()
  })

  initSpy()
}

function initSpy() {
  const links = [...document.querySelectorAll('.nav a[href^="#"]')]
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean)
  if (!sections.length || !('IntersectionObserver' in window)) return

  const seen = new Map()
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) seen.set(entry.target.id, entry.intersectionRatio)

      let best = null
      let ratio = 0
      for (const [id, value] of seen) {
        if (value > ratio) {
          ratio = value
          best = id
        }
      }

      for (const link of links) {
        const active = ratio > 0.08 && link.getAttribute('href') === `#${best}`
        active ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current')
      }
    },
    { threshold: [0, 0.1, 0.25, 0.5, 0.75], rootMargin: '-72px 0px -35% 0px' },
  )

  sections.forEach((section) => io.observe(section))
}
