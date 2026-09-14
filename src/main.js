import "./style.css";

const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const check = document.querySelector("[data-check]");

const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

if (check) {
  const steps = [...check.querySelectorAll("[data-step]")];
  const price = check.querySelector("[data-price]");
  const labels = [
    "снятие",
    "опил формы",
    "лёгкий ремонт",
    "укрепление гелем",
    "покрытие цветом",
  ];

  const activate = (index) => {
    steps.forEach((step, i) => {
      step.classList.toggle("is-on", i <= index);
    });
    if (price) {
      price.textContent = index === labels.length - 1 ? "2 100 ₽" : "в комплексе";
    }
  };

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      activate(Number(step.dataset.step));
    });
  });

  let i = 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    const timer = window.setInterval(() => {
      i = (i + 1) % labels.length;
      activate(i);
    }, 2200);
    check.addEventListener(
      "pointerenter",
      () => {
        window.clearInterval(timer);
      },
      { once: true }
    );
  }
}
