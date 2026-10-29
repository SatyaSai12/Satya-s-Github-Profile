'use strict';
// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); burger.setAttribute('aria-expanded', false);
}));

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav link + back-to-top button
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const top = document.getElementById('top');
function onScroll() {
  const y = window.scrollY + 120;
  let current = null;
  sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === current));
  top.classList.toggle('show', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form validation (does not send email; see note in the page)
const form = document.getElementById('form');
const status = document.getElementById('status');
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your name.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
  subject: v => v.trim().length >= 3 || 'Enter a subject.',
  message: v => v.trim().length >= 10 || 'Write at least 10 characters.'
};
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  for (const f in rules) {
    const input = form.elements[f];
    const r = rules[f](input.value);
    document.getElementById('e-' + f).textContent = r === true ? '' : r;
    input.setAttribute('aria-invalid', r !== true);
    if (r !== true) { if (ok) input.focus(); ok = false; }
  }
  status.textContent = ok
    ? 'Looks good. Connect a backend or form service to deliver this message.'
    : '';
});

document.getElementById('year').textContent = new Date().getFullYear();
