/* ==========================================================================
   NOELLA BUNAG — PORTFOLIO · projects.js
   Project filtering on the homepage.

   How it works
   - Each filter button has  data-filter="data-analytics"  (or "all").
   - Each project card has   data-category="data-analytics machine-learning"
     (one or more categories, separated by spaces).
   To add a new category: add a button in index.html and use the same word in
   the data-category of the relevant cards. No JavaScript changes needed.
   ========================================================================== */
(function () {
  'use strict';

  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.project-card[data-category]'));
  var status = document.getElementById('filter-status');
  var empty = document.getElementById('projects-empty');
  if (!buttons.length || !cards.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FADE_MS = reduceMotion ? 0 : 220;
  var timer = null;

  function matches(card, filter) {
    return filter === 'all' || card.getAttribute('data-category').split(/\s+/).indexOf(filter) !== -1;
  }

  function applyFilter(filter, label) {
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-filter') === filter));
    });

    // 1) fade everything out, 2) swap which cards exist in the layout, 3) fade back in
    cards.forEach(function (card) { card.classList.add('is-fading'); });
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      var shown = 0;
      cards.forEach(function (card) {
        var show = matches(card, filter);
        card.hidden = !show;
        if (show) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
      // force a reflow so the fade-in transition runs
      void document.body.offsetWidth;
      cards.forEach(function (card) { card.classList.remove('is-fading'); });
      if (status) {
        status.textContent = 'Showing ' + shown + (shown === 1 ? ' project' : ' projects') +
          (filter === 'all' ? '' : ' in ' + label);
      }
    }, FADE_MS);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-pressed') === 'true') return;
      applyFilter(btn.getAttribute('data-filter'), btn.textContent.trim());
    });
  });
})();
