'use strict'

ScrollReveal().reveal('.element', {
  delay: 300,
  distance: '1px',
  duration: 900,
  easing: 'cubic-bezier(.5s, 0, 0, 1)',
  interval: 1,
  opacity: .5,
  origin: 'left',
  rotate: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: .8,
  cleanup: true,
  container: document.documentElement,
  desktop: true,
  mobile: true,
  reset: true,
  useDelay: 'always',
  viewFactor: 0.0,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  afterReset: function (el) { },
  afterReveal: function (el) {
    // ScrollReveal().clean('.element');
  },
  beforeReset: function (el) { },
  beforeReveal: function (el) { },
})