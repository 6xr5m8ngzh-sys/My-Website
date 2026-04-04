const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const yearEl = document.getElementById('year');
const logoEls = document.querySelectorAll('.logo-img');
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

  const animateLogoOnScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const move = Math.min(scrollY * 0.08, 10);
    const rotate = Math.sin(scrollY * 0.01) * 5;

    logoEls.forEach((logo) => {
      logo.style.transform = `translateY(${move}px) rotate(${rotate}deg) scale(1.02)`;
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(animateLogoOnScroll);
      ticking = true;
    }
  }, { passive: true });

  animateLogoOnScroll();
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
