// cursor.js
export function initCursor() {
  // create cursor elements
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');

  cursor.className = 'cursor-trail';
  cursorDot.className = 'cursor-dot';

  // basic styles (you may want to move these to your CSS file)
  const css = `
  .cursor-trail, .cursor-dot { position: fixed; pointer-events:none; z-index:2147483647; mix-blend-mode:normal; }
  .cursor-dot { width:10px; height:10px; border-radius:50%; transform:translate(-50%,-50%); background:var(--primary); transition: width .18s, height .18s, opacity .18s; }
  .cursor-trail { width:40px; height:40px; border-radius:50%; transform:translate(-50%,-50%); border:1px solid rgba(255,255,255,.06); display:flex; align-items:center; justify-content:center; opacity:.9; }
  .cursor-hover { transform:translate(-50%,-50%) scale(1.4); }
  `;
  if (!document.getElementById('cursor-styles')) {
    const s = document.createElement('style'); s.id = 'cursor-styles'; s.innerHTML = css; document.head.appendChild(s);
  }

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  let pos = { x: mouse.x, y: mouse.y };

  // follow with lerp
  function render() {
    pos.x += (mouse.x - pos.x) * 0.18;
    pos.y += (mouse.y - pos.y) * 0.18;
    cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    cursorDot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    requestAnimationFrame(render);
  }
  render();

  window.addEventListener('pointermove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    cursorDot.style.opacity = 1;
  });

  window.addEventListener('pointerdown', () => { cursorDot.style.transform += ' scale(.85)'; });
  window.addEventListener('pointerup', () => { cursorDot.style.transform = cursorDot.style.transform.replace(' scale(.85)', ''); });

  // magnetic for buttons
  const magnets = document.querySelectorAll('.btn, .filter-btn, .project-card a, .nav-btns button, .theme-toggle');
  magnets.forEach(el => {
    el.addEventListener('pointerenter', () => {
      cursor.classList.add('cursor-hover');
      cursorDot.style.width = '6px';
      cursorDot.style.height = '6px';
    });
    el.addEventListener('pointerleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorDot.style.width = '10px';
      cursorDot.style.height = '10px';
    });
  });

  // hide on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
  }
}
