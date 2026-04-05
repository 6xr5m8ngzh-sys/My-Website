/* ============================================================
   CASA SPIRIT â€“ JavaScript
   ============================================================ */

// â”€â”€ Maps-Link: Apple vs. Google abhÃ¤ngig vom GerÃ¤t â”€â”€
const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) &&
  ('ontouchend' in document || navigator.maxTouchPoints > 0 ||
   /Macintosh/.test(navigator.userAgent));

const appleLink = document.getElementById('mapsLinkApple');
const googleLink = document.getElementById('mapsLinkGoogle');

if (appleLink && googleLink) {
  if (isApple) {
    appleLink.removeAttribute('hidden');
  } else {
    googleLink.removeAttribute('hidden');
  }
}

// â”€â”€ Navigation: Scroll-Effekt â”€â”€
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
};
window.addEventListener('scroll', onScroll, { passive: true });

// â”€â”€ Mobile Burger MenÃ¼ â”€â”€
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// MenÃ¼ schlieÃŸen bei Link-Klick
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// â”€â”€ Fade-In Animation beim Scrollen â”€â”€
const fadeElements = document.querySelectorAll(
  '.service-card, .method, .about__grid, .contact__grid, .price-row, .section__header'
);

fadeElements.forEach((el, i) => {
  el.classList.add('fade-in');
  if (i % 6 > 0) el.classList.add(`fade-in-delay-${i % 5 + 1}`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeElements.forEach(el => observer.observe(el));

// â”€â”€ Aktiver Nav-Link beim Scrollen â”€â”€
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--color-primary)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
