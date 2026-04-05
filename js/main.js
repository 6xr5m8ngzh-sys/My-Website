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

// -- Kontaktformular: AJAX-Versand + Weiterleitung auf Danke-Seite --
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var btn = contactForm.querySelector('button[type="submit"]');
    var originalText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Wird gesendet...'; btn.disabled = true; }

    var data = new FormData(contactForm);

    fetch('https://formsubmit.co/ajax/karina.knapp@web.de', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if (json && json.success === 'true') {
        window.location.href = 'danke.html';
      } else {
        throw new Error('Senden fehlgeschlagen');
      }
    })
    .catch(function(err) {
      console.error('Formular-Fehler:', err);
      if (btn) { btn.textContent = originalText; btn.disabled = false; }
      alert('Es gab einen Fehler. Bitte sende deine Anfrage direkt an karina.knapp@web.de');
    });
  });
}
