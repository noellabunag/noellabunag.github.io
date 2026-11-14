/* ==========================================================================
   NOELLA BUNAG — PORTFOLIO · main.js
   Shared behaviour for every page:
   1. Site settings (resume file path)   <- the only thing you normally edit
   2. Sticky navigation state
   3. Mobile menu (focus trap, Esc to close, scroll lock)
   4. Active-section highlighting
   5. Scroll reveal (IntersectionObserver)
   6. Back-to-top button
   7. Resume link (only shown as a download once the PDF really exists)
   8. Footer year, draft mode, pointer highlight on project cards
   ========================================================================== */
(function () {
  'use strict';

  /* 1. SITE SETTINGS -------------------------------------------------------
     To publish your resume: save it as a PDF with exactly this name inside
     assets/resume/ . The site checks whether the file exists; until it does,
     the resume buttons stay as "Request Resume" email links, so there is
     never a broken download link. */
  var SITE = {
    resumeFile: 'assets/resume/Noella-Bunag-Resume.pdf'
  };

  var root = document.documentElement;
  var basePath = root.getAttribute('data-root') || '';   // '' on the homepage, '../' on case studies
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* 2. STICKY NAVIGATION ---------------------------------------------------- */
  var nav = $('.nav');
  var toTop = $('.to-top');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('is-scrolled', y > 24);
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* 3. MOBILE MENU ---------------------------------------------------------- */
  var toggle = $('.nav__toggle');
  var menu = $('#mobile-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    nav.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { menu.removeAttribute('inert'); } else { menu.setAttribute('inert', ''); }
  }

  if (toggle && menu) {
    setMenu(false);
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      setMenu(open);
      if (open) { var first = $('a', menu); if (first) first.focus(); }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setMenu(false); toggle.focus(); return; }
      if (e.key === 'Tab') {            // keep focus inside toggle + menu
        var items = [toggle].concat($$('a, button', menu));
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* 4. ACTIVE SECTION HIGHLIGHT ---------------------------------------------
     Sections declare which nav item they belong to with data-nav="about" etc. */
  var navSections = $$('[data-nav]');
  var navLinks = $$('[data-nav-link]');

  function setActive(name) {
    navLinks.forEach(function (link) {
      var on = link.getAttribute('data-nav-link') === name;
      link.classList.toggle('is-active', on);
      if (on) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
    });
  }

  if (navSections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.getAttribute('data-nav'));
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    navSections.forEach(function (s) { spy.observe(s); });
  }

  /* Case-study table of contents highlight */
  var tocLinks = $$('.cs-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var tocSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    $$('.cs-section[id]').forEach(function (s) { tocSpy.observe(s); });
  }

  /* 5. SCROLL REVEAL --------------------------------------------------------
     Elements with [data-reveal] fade up once. Children of [data-reveal-group]
     are staggered automatically. Without JS (or IntersectionObserver) all
     content is simply visible. */
  $$('[data-reveal-group]').forEach(function (group) {
    $$('[data-reveal]', group).forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', Math.min(i * 80, 400) + 'ms');
    });
  });

  var revealEls = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { revealer.observe(el); });
  }

  /* 6. BACK TO TOP ---------------------------------------------------------- */
  $$('[data-to-top]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var skip = $('.skip-link'); if (skip) skip.focus({ preventScroll: true });
    });
  });

  /* 7. RESUME LINK ----------------------------------------------------------
     Default HTML = "Request Resume" (mailto). If the PDF exists, upgrade the
     buttons to real View / Download links. */
  var resumeLinks = $$('[data-resume]');
  if (resumeLinks.length && window.fetch && location.protocol !== 'file:') {
    var url = basePath + SITE.resumeFile;
    fetch(url, { method: 'HEAD' }).then(function (res) {
      if (!res.ok) return;
      resumeLinks.forEach(function (link) {
        var mode = link.getAttribute('data-resume');          // "view" or "download"
        var label = $('[data-resume-label]', link);
        link.href = url;
        if (mode === 'download') {
          link.setAttribute('download', '');
          if (label) label.textContent = 'Download Resume';
        } else {
          link.target = '_blank'; link.rel = 'noopener';
          if (label) label.textContent = 'View Resume';
        }
      });
    }).catch(function () { /* keep the email fallback */ });
  }

  /* 8. SMALL THINGS --------------------------------------------------------- */
  // Footer year
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Draft mode: add ?draft to any URL to reveal the editing placeholders
  if (/[?&]draft\b/.test(location.search)) root.classList.add('is-draft');

  // Pointer-following highlight on project cards (desktop pointers only)
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.project-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
})();
