// gsapAnimations.js
// Requires global gsap, and ScrollTrigger & Observer loaded before this module imports.

export function initGSAP() {
  if (typeof gsap === 'undefined' || !gsap.ScrollTrigger) {
    console.warn('GSAP or ScrollTrigger not loaded yet.');
    return;
  }

  const { ScrollTrigger } = gsap;
  gsap.registerPlugin(ScrollTrigger, gsap.Observer);

  // Parallax layers (multi-layer β)
  // layers: floating-icons (particles), hero-image, hero-text
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroText = hero.querySelector('.hero-text');
  const heroImage = hero.querySelector('.hero-image');
  const particlesLayer = hero.querySelector('.floating-icons');

  // subtle scroll-based parallax for layers
  gsap.to(heroText, {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  });
  gsap.to(heroImage, {
    yPercent: -14,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  });
  if (particlesLayer) {
    gsap.to(particlesLayer, {
      yPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7
      }
    });
  }

  // Hero parallax by pointer (deeper + layered movement)
  const heroImg = heroImage ? heroImage.querySelector('img') : null;
  hero.addEventListener('pointermove', (e) => {
    const rx = (e.clientX / innerWidth - 0.5) * 18;
    const ry = (e.clientY / innerHeight - 0.5) * -10;
    // headshot moves most
    if (heroImg) gsap.to(heroImg, { x: rx * 0.7, y: ry * 0.6, rotation: rx * 0.02, duration: 0.9, ease: 'power3.out' });
    if (heroText) gsap.to(heroText, { x: rx * 0.32, y: ry * 0.18, duration: 0.9, ease: 'power3.out' });
    if (particlesLayer) gsap.to(particlesLayer, { x: rx * 0.12, y: ry * 0.06, duration: 1.1, ease: 'sine.out' });
  });
  hero.addEventListener('pointerleave', () => {
    if (heroImg) gsap.to(heroImg, { x: 0, y: 0, rotation: 0, duration: 0.9, ease: 'power3.out' });
    if (heroText) gsap.to(heroText, { x: 0, y: 0, duration: 0.9, ease: 'power3.out' });
    if (particlesLayer) gsap.to(particlesLayer, { x: 0, y: 0, duration: 0.9, ease: 'sine.out' });
  });

  // Enhanced reveals (ScrollTrigger powered) for .reveal elements
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el, { y: 36, autoAlpha: 0, filter: 'blur(6px)' }, {
      y: 0,
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: 0.75,
      ease: 'power3.out',
      delay: i * 0.03,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  // Animate progress bars
  gsap.utils.toArray('.progress-fill').forEach(fill => {
    gsap.set(fill, { width: 0 });
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(fill, { width: `${fill.dataset.progress}%`, duration: 1.2, ease: 'power2.out' });
      }
    });
  });

  // Counters
  gsap.utils.toArray('.stat-box h3[data-target]').forEach(node => {
    const target = parseInt(node.dataset.target, 10) || 0;
    let played = false;
    ScrollTrigger.create({
      trigger: node,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        if (played) return;
        played = true;
        gsap.fromTo({ v: 0 }, { v: target, duration: 1.6, ease: 'power1.out',
          onUpdate() { node.textContent = Math.ceil(this.targets()[0].v) + '+'; }
        });
      }
    });
  });

  // slightly reduce tick rate for performance (optional)
  if (gsap.ticker) gsap.ticker.fps(60);
}
