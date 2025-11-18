// gsapAnimations.js
export function initGSAP() {
  if (!window.gsap || !gsap.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth <= 768;

  /* -------------------------------
     1. MOBILE-SAFE SCROLLTRIGGER
  --------------------------------*/
  const revealStart = isMobile ? "top 98%" : "top 90%";
  const barStart = isMobile ? "top 96%" : "top 90%";

  /* -------------------------------
     2. PARALLAX (SCROLL)
  --------------------------------*/
  const hero = document.querySelector('.hero');
  const heroText = hero?.querySelector('.hero-text');
  const heroImgBox = hero?.querySelector('.hero-image');
  const heroImg = heroImgBox?.querySelector('img');
  const particles = hero?.querySelector('.floating-icons');

  if (hero) {
    gsap.to(heroText, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    });

    gsap.to(heroImgBox, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    });

    if (particles) {
      gsap.to(particles, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7
        }
      });
    }
  }

  /* ----------------------------------------
       3. POINTER PARALLAX (DESKTOP ONLY)
  -----------------------------------------*/
  if (!isMobile && hero) {
    hero.addEventListener("pointermove", (e) => {
      const rx = (e.clientX / innerWidth - 0.5) * 16;
      const ry = (e.clientY / innerHeight - 0.5) * -12;

      if (heroImg) gsap.to(heroImg, { x: rx, y: ry, duration: 0.9 });
      if (heroText) gsap.to(heroText, { x: rx * 0.4, y: ry * 0.2, duration: 0.9 });
      if (particles) gsap.to(particles, { x: rx * 0.15, y: ry * 0.08, duration: 1.1 });
    });

    hero.addEventListener("pointerleave", () => {
      gsap.to([heroImg, heroText, particles], { x: 0, y: 0, duration: 0.8 });
    });
  }

  /* ----------------------------------------
      4. MOBILE PARALLAX (GYROSCOPE)
  -----------------------------------------*/
  if (isMobile && heroImg) {
    window.addEventListener("deviceorientation", (e) => {
      const rx = e.gamma * 0.7;
      const ry = e.beta * -0.4;

      gsap.to(heroImg, { x: rx, y: ry, duration: 1 });
    });
  }

  /* -------------------------------
     5. REVEAL ANIMATIONS
  --------------------------------*/
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(
      el,
      { y: 30, autoAlpha: 0, filter: "blur(4px)" },
      {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power2.out",
        delay: i * 0.04,
        scrollTrigger: {
          trigger: el,
          start: revealStart,
        }
      }
    );
  });

  /* -------------------------------
     6. PROGRESS BARS
  --------------------------------*/
  gsap.utils.toArray('.progress-fill').forEach((fill) => {
    gsap.set(fill, { width: 0 });

    ScrollTrigger.create({
      trigger: fill,
      start: barStart,
      onEnter: () => {
        gsap.to(fill, {
          width: `${fill.dataset.progress}%`,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    });
  });

  /* -------------------------------
     7. COUNTERS
  --------------------------------*/
  gsap.utils.toArray('.stat-box h3[data-target]').forEach((node) => {
    const target = +node.dataset.target || 0;

    ScrollTrigger.create({
      trigger: node,
      start: barStart,
      once: true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          {
            val: target,
            duration: 1.6,
            ease: "power1.out",
            onUpdate() {
              node.textContent = Math.ceil(this.targets()[0].val) + "+";
            }
          }
        );
      }
    });
  });

  /* Improve performance */
  gsap.ticker.fps(60);
}
