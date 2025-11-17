// particles.js
export function initFloatingParticles({
  total = 8,
  icons = [
    `<i class="fab fa-html5" aria-hidden="true"></i>`,
    `<i class="fab fa-css3-alt" aria-hidden="true"></i>`,
    `<i class="fab fa-js" aria-hidden="true"></i>`,
    `<i class="fab fa-react" aria-hidden="true"></i>`,
    `<i class="fas fa-code" aria-hidden="true"></i>`,
    `<i class="fas fa-rocket" aria-hidden="true"></i>`
  ]
} = {}) {
  const container = document.querySelector('.floating-icons');
  if (!container) return;

  // ensure container does not block pointer events
  container.style.pointerEvents = 'none';
  container.innerHTML = '';

  for (let i = 0; i < total; i++) {
    const div = document.createElement('div');
    div.className = 'particle';
    div.innerHTML = icons[i % icons.length];

    // random position/size/animation timing
    const top = 8 + Math.random() * 80;
    const left = 4 + Math.random() * 92;
    const size = 20 + Math.round(Math.random() * 36);
    const delay = Math.random() * 4;

    div.style.top = `${top}%`;
    div.style.left = `${left}%`;
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.animationDelay = `${delay}s`;
    div.style.opacity = 0.95;
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';

    container.appendChild(div);

    // optional GSAP orbit
    if (window.gsap) {
      const amplitude = 6 + Math.random() * 16;
      gsap.to(div, {
        y: `-=${amplitude}`,
        duration: 4 + Math.random() * 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay
      });
      gsap.to(div, {
        rotation: Math.random() * 30 - 15,
        duration: 8 + Math.random() * 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }
  }
}
