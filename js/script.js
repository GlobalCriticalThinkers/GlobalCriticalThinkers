/**
 * Global Critical Thinkers — script.js
 *
 * Scope, by design: CSS handles every animation it can (hover states,
 * the scroll cue float, reveal transitions, the CTA lift). JavaScript is
 * used only for the three things CSS genuinely cannot do on its own:
 *
 *   1. Detecting scroll position to fill the progress thread
 *   2. Toggling the header's scrolled state (no CSS scroll-position selector exists)
 *   3. Triggering the scene reveal class via IntersectionObserver
 *
 * Plus one trivial content task: writing the current year into the footer.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1 & 2. Scroll progress thread + header scrolled state
     Combined into a single scroll listener, throttled with
     requestAnimationFrame so it never runs more than once per frame.
     ------------------------------------------------------------------ */
  var progressFill = document.getElementById('progressFill');
  var siteHeader = document.getElementById('siteHeader');
  var ticking = false;

  function updateOnScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressFill) {
      progressFill.style.height = Math.min(progress, 100) + '%';
    }

    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', scrollTop > 40);
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load in case the page loads mid-scroll (e.g. back navigation)
  updateOnScroll();

  /* ------------------------------------------------------------------
     3. Scene reveal on scroll into view
     Respects prefers-reduced-motion: if the visitor has that set,
     CSS already shows content at full opacity, so the observer is
     skipped entirely to save a bit of work.
     ------------------------------------------------------------------ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var scenes = document.querySelectorAll('.scene');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // reveal once, don't re-trigger
        }
      });
    }, {
      threshold: 0.25
    });

    scenes.forEach(function (scene) {
      observer.observe(scene);
    });
  } else {
    // No IntersectionObserver support or reduced motion: show everything immediately
    document.querySelectorAll('.scene').forEach(function (scene) {
      scene.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  var yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
