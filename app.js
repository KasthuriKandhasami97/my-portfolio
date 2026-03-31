// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 50
    ? '0 4px 24px rgba(0,0,0,0.5)'
    : 'none';
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  if (navLinks.style.display === 'flex') {
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0'; navLinks.style.right = '0';
    navLinks.style.background = '#0D0D0D';
    navLinks.style.padding = '1.5rem';
    navLinks.style.gap = '1rem';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth <= 900) navLinks.style.display = 'none';
  });
});

// ===== INTERSECTION OBSERVER (fade-in sections) =====
const observerOpts = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOpts);

document.querySelectorAll('.highlight-card, .timeline-card, .edu-card, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✅ Message Sent!';
  btn.style.background = '#4CAF50';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ===== TYPING EFFECT in hero subtitle =====
const subtitles = ['Full Stack Developer', 'Software Engineer', 'Django Developer', 'Angular Developer'];
let si = 0, ci = 0, deleting = false;
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
  function type() {
    const current = subtitles[si];
    subtitleEl.textContent = deleting
      ? current.substring(0, ci--)
      : current.substring(0, ci++);
    if (!deleting && ci > current.length) { deleting = true; setTimeout(type, 1500); return; }
    if (deleting && ci < 0) { deleting = false; si = (si + 1) % subtitles.length; }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}
