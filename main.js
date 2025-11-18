// main.js — module bootstrap for the site
import { initCursor } from './cursor.js';
import { initGSAP } from './gsapAnimations.js';
import { initFloatingParticles } from './particles.js';
import { initTheme } from './theme.js';

function safe(fn) {
  try { fn(); } catch (e) { console.warn('Init failed:', e); }
}

window.addEventListener('DOMContentLoaded', () => {
  // Initialize theme first so CSS variables and classes are applied
  safe(initTheme);

  // Optional: initialize custom cursor (will no-op on touch devices)
  safe(initCursor);

  // Floating particles (if container exists)
  safe(() => initFloatingParticles({ total: 8 }));

  // GSAP-driven animations require GSAP + plugins to be loaded (we load them before this module)
  safe(initGSAP);
});
