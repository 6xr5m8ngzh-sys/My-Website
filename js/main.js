/* ============================================================
   CASA SPIRIT - JavaScript
   ============================================================ */

// -- Maps-Link: Apple vs. Google abhaengig vom Geraet --
const isApple = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 0) ||
  /Macintosh/.test(navigator.userAgent);

const appleLink  = document.getElementById('mapsLinkApple');
const googleLink = document.getElementById('mapsLinkGoogle');

if (appleLink && googleLink) {
  if (isApple) {
    appleLink.removeAttribute('hidden');
  } else {
    googleLink.removeAttribute('hidden');
  }
}

// -- Navigation: Scroll-Effekt --
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// -- Mobile Burger Menu --
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Menue schliessen bei Link-Klick
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Menue schliessen bei Klick ausserhalb
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !burger.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// -- Fade-In Animation beim Scrollen --
const fadeElements = document.querySelectorAll(
  '.service-card, .method, .about__grid, .contact__grid, .price-row, .section__header'
);

fadeElements.forEach((el, i) => {
  el.classList.add('fade-in');
  if (i % 6 > 0) el.classList.add('fade-in-delay-' + (i % 5 + 1));
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

// -- Aktiver Nav-Link beim Scrollen --
const sections     = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'var(--color-primary)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// -- Kontaktformular: kein doppeltes Submit --
const form = document.getElementById('contactForm');
if (form && !form.getAttribute('action').includes('formsubmit')) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Gesendet';
    btn.disabled = true;
  });
}
