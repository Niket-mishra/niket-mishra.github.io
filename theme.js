// theme.js
export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // create accessible inner icon wrapper
  if (!toggle.querySelector('.theme-icon')) {
    toggle.innerHTML = `<span class="theme-icon" aria-hidden="true"></span><div class="toggle-thumb"></div>`;
  }

  const icon = toggle.querySelector('.theme-icon');
  const thumb = toggle.querySelector('.toggle-thumb');

  const setLight = () => {
    document.body.classList.add('light-mode');
    icon.innerHTML = '<i class="fas fa-sun"></i>';
    thumb.style.background = 'var(--primary)';
    localStorage.setItem('theme','light');
  };
  const setDark = () => {
    document.body.classList.remove('light-mode');
    icon.innerHTML = '<i class="fas fa-moon"></i>';
    thumb.style.background = 'var(--primary)';
    localStorage.setItem('theme','dark');
  };

  // restore
  if (localStorage.getItem('theme') === 'light') setLight(); else setDark();

  toggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) setDark(); else setLight();
    // small gsap flip if available
    if (window.gsap) {
      gsap.fromTo(thumb, { scale: 0.8 }, { scale: 1, duration: 0.25, ease: 'power2.out' });
    }
  });
}
