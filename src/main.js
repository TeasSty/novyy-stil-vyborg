const reloadStates = [
  {
    label: 'Волосы',
    line: 'Тотал блонд без желтизны, брондирование, омбре, стрижки — женские, мужские, детские.',
    img: './images/alisa.jpg',
    alt: 'Алиса Бюрг — стилист салона Новый стиль',
  },
  {
    label: 'Ногти',
    line: 'Комплекс маникюра 2100 ₽: снятие, форма, ремонт, укрепление гелем и цвет — без доплат за укрепление.',
    img: './images/svc-manicure.jpg',
    alt: 'Маникюр с покрытием — работа салона',
  },
  {
    label: 'Брови',
    line: 'Коррекция, окрашивание, перманент бровей; ламинирование и наращивание ресниц. Можно в один визит с волосами.',
    img: './images/work-4.jpg',
    alt: 'Оформление бровей и ресниц',
  },
]

const header = document.querySelector('[data-header]')
const menuBtn = document.querySelector('[data-menu]')
const mobileNav = document.querySelector('[data-mobile-nav]')
const reloadRoot = document.querySelector('[data-reload]')

let reloadIndex = 0
let spinning = false

function onScroll() {
  if (!header) return
  header.classList.toggle('is-scrolled', window.scrollY > 12)
}

function closeMenu() {
  if (!menuBtn || !mobileNav) return
  menuBtn.setAttribute('aria-expanded', 'false')
  mobileNav.hidden = true
}

function toggleMenu() {
  if (!menuBtn || !mobileNav) return
  const open = menuBtn.getAttribute('aria-expanded') === 'true'
  menuBtn.setAttribute('aria-expanded', String(!open))
  mobileNav.hidden = open
}

function setReload(index, { spin = false } = {}) {
  if (!reloadRoot || spinning) return
  reloadIndex = (index + reloadStates.length) % reloadStates.length
  const state = reloadStates[reloadIndex]
  const label = reloadRoot.querySelector('[data-reload-label]')
  const line = reloadRoot.querySelector('[data-reload-line]')
  const img = reloadRoot.querySelector('[data-reload-img]')
  const visual = reloadRoot.querySelector('.reload-visual')
  const disk = reloadRoot.querySelector('[data-reload-btn]')
  const tabs = reloadRoot.querySelectorAll('[data-reload-tab]')

  const apply = () => {
    if (label) label.textContent = state.label
    if (line) line.textContent = state.line
    if (img) {
      img.src = state.img
      img.alt = state.alt
    }
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === reloadIndex))
    })
    visual?.classList.remove('is-swapping')
  }

  if (spin && disk) {
    spinning = true
    disk.classList.add('is-spinning')
    visual?.classList.add('is-swapping')
    window.setTimeout(() => {
      apply()
      disk.classList.remove('is-spinning')
      spinning = false
    }, 360)
  } else {
    visual?.classList.add('is-swapping')
    window.setTimeout(apply, 160)
  }
}

function initReload() {
  if (!reloadRoot) return
  const disk = reloadRoot.querySelector('[data-reload-btn]')
  const tabs = reloadRoot.querySelectorAll('[data-reload-tab]')

  disk?.addEventListener('click', () => setReload(reloadIndex + 1, { spin: true }))
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const i = Number(tab.getAttribute('data-reload-tab') || '0')
      setReload(i, { spin: true })
    })
  })
}

function initReveals() {
  const nodes = document.querySelectorAll(
    '.proof, .reload, .manicure, .services, .works, .places, .final-cta',
  )
  nodes.forEach((node) => node.classList.add('reveal'))

  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-in'))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  nodes.forEach((node) => io.observe(node))
}

menuBtn?.addEventListener('click', toggleMenu)
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()
initReload()
initReveals()
