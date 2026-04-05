const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const yearEl = document.getElementById('year');
const logoEls = document.querySelectorAll('.logo-phoenix');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (yearEl) yearEl.textContent = new Date().getFullYear();

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (!reduceMotion && logoEls.length) {
  let ticking = false;
  let lastY = window.scrollY || window.pageYOffset;
  let boostTimer;
  let flapTimer;

  const animateLogoOnScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const delta = Math.abs(scrollY - lastY);
    const boost = Math.min(10, delta * 0.35);
    lastY = scrollY;

    logoEls.forEach((logo) => {
      logo.style.setProperty('--flap-boost', `${boost.toFixed(2)}deg`);
      logo.classList.add('is-flapping');
    });

    window.clearTimeout(boostTimer);
    boostTimer = window.setTimeout(() => {
      logoEls.forEach((logo) => logo.style.setProperty('--flap-boost', '0deg'));
    }, 180);
    window.clearTimeout(flapTimer);
    flapTimer = window.setTimeout(() => {
      logoEls.forEach((logo) => logo.classList.remove('is-flapping'));
    }, 520);

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(animateLogoOnScroll);
      ticking = true;
    }
  }, { passive: true });
}

const revealTargets = document.querySelectorAll('.card, .feature-image, .page-head');

if (!reduceMotion && revealTargets.length && 'IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));
}
