/* =============================================
   SOLO LEVELING SYSTEM DATABASE - Main Script
   ============================================= */

'use strict';

/* ---- Portal expand / collapse ---- */
function initPortals() {
  const entries = document.querySelectorAll('.portal-entry');
  entries.forEach(entry => {
    const header = entry.querySelector('.portal-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const wasExpanded = entry.classList.contains('expanded');
      // Collapse all
      entries.forEach(e => e.classList.remove('expanded'));
      // Toggle clicked
      if (!wasExpanded) {
        entry.classList.add('expanded');
      }
    });
  });
}

/* ---- Filter buttons ---- */
function initFilters() {
  const filterBars = document.querySelectorAll('.filter-bar');
  filterBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.filter-btn');
    const target = bar.dataset.target;
    const cards = document.querySelectorAll(target);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        cards.forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            const cardFilter = card.dataset.filter || '';
            card.style.display = cardFilter === filter ? '' : 'none';
          }
        });
      });
    });
  });
}

/* ---- Staggered card animation on load ---- */
function initCardAnimations() {
  const cards = document.querySelectorAll('.item-card, .build-card, .drop-card, .portal-entry');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
  });
}

/* ---- Active nav link highlighting ---- */
function initNavHighlight() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ---- Typing effect for hero title (optional) ---- */
function initTypingEffect() {
  const el = document.querySelector('.hero-system-text');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 60);
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initPortals();
  initFilters();
  initCardAnimations();
  initNavHighlight();
  initTypingEffect();
});
