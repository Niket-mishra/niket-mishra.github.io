// gsapAnimations.js
// Requires global `gsap`, and ScrollTrigger plugin loaded before this module runs.

export function initGSAP() {
  if (typeof gsap === 'undefined') return console.warn('GSAP not found.');

  gsap.registerPlugin(gsap.ScrollTrigger, gsap.Observer);

  // subtle hero parallax on mouse move
  const hero = document.querySelector('.hero');
  const heroImg = document.querySelector('.hero-image img');

  if (hero && heroImg) {
    hero.addEventListener('pointermove', (e) => {
      const rX = (e.clientX / window.innerWidth - 0.5) * 12;
      const rY = (e.clientY / window.innerHeight - 0.5) * -8;
      gsap.to(heroImg, { x: rX, y: rY, duration: 0.8, ease: 'power3.out' });
    });

    hero.addEventListener('pointerleave', () => {
      gsap.to(heroImg, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
    });
  }

  // Floating subtle background blobs (non-DOM heavy)
  gsap.to('.hero::before', { /* cannot target pseudo via GSAP easily; keep css for blobs */ });

  // Enhanced reveal animations using ScrollTrigger
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    // skip if already visible
    gsap.fromTo(el,
      { autoAlpha: 0, y: 30, filter: 'blur(6px)' },
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      });
  });

  // Animate progress bars when skills section enters
  const progressFills = document.querySelectorAll('.progress-fill');
  progressFills.forEach(fill => {
    gsap.set(fill, { width: 0 });
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(fill, { width: `${fill.dataset.progress}%`, duration: 1.3, ease: 'power2.out' });
      }
    });
  });

  // Counters using GSAP ticker
  const counters = document.querySelectorAll('.stat-box h3[data-target]');
  counters.forEach(node => {
    const target = parseInt(node.dataset.target, 10);
    let done = false;
    ScrollTrigger.create({
      trigger: node,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        if (done) return;
        done = true;
        // animate number
        gsap.fromTo(
          { val: 0 },
          { val: target, duration: 1.6, ease: 'power1.out',
            onUpdate() { node.textContent = Math.ceil(this.targets()[0].val) + '+'; }
          }
        );
      }
    });
  });

  // small performance hint: throttle heavy listeners
  gsap.ticker.fps(60);
}
