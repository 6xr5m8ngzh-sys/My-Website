/* ============================================================
   CASA SPIRIT – JavaScript
   ============================================================ */

// ── Navigation: Scroll-Effekt ──
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile Burger Menü ──
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Menü schließen bei Link-Klick
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Fade-In Animation beim Scrollen ──
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

// ── Aktiver Nav-Link beim Scrollen ──
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

// ── Kontaktformular ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Gesendet ✓';
    btn.style.background = '#2a6e4a';
    btn.disabled = true;

    // Mailto-Fallback
    const name    = form.name.value;
    const email   = form.email.value;
    const service = form.service.value;
    const message = form.message.value;

    const subject = encodeURIComponent(`Anfrage von ${name} – ${service || 'Allgemein'}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\nLeistung: ${service}\n\nNachricht:\n${message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:karina.knapp@web.de?subject=${subject}&body=${body}`;
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 800);
  });
}
