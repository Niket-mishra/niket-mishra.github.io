// theme.js
export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Ensure icon wrapper exists
  if (!toggle.querySelector('.theme-icon')) {
    toggle.insertAdjacentHTML("afterbegin",
      `<span class="theme-icon" aria-hidden="true"></span>`
    );
  }

  const icon = toggle.querySelector('.theme-icon');
  const thumb = toggle.querySelector('.toggle-thumb');

  const setLight = () => {
    document.body.classList.add('light-mode');
    icon.innerHTML = '<i class="fas fa-sun"></i>';
    thumb.style.transform = 'translateX(24px)';
    localStorage.setItem('theme', 'light');
  };

  const setDark = () => {
    document.body.classList.remove('light-mode');
    icon.innerHTML = '<i class="fas fa-moon"></i>';
    thumb.style.transform = 'translateX(0px)';
    localStorage.setItem('theme', 'dark');
  };

  // Load saved theme
  if (localStorage.getItem('theme') === 'light') setLight();
  else setDark();

  toggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) setDark();
    else setLight();

    // GSAP pulse
    if (window.gsap) {
      gsap.fromTo(thumb, { scale: 0.8 }, { scale: 1, duration: 0.25 });
    }
  });
}
