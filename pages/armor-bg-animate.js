// Solo Leveling animated background effects for armor.html
(function() {
  // === Animated Stars ===
  const stars = document.querySelector('.system-bg-stars');
  if (stars) {
    for (let i = 0; i < 36; i++) {
      const s = document.createElement('div');
      s.className = 'bg-star';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.width = s.style.height = (Math.random() * 2.5 + 1.5) + 'px';
      s.style.opacity = Math.random() * 0.7 + 0.3;
      s.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
      stars.appendChild(s);
    }
  }
  // === Animated Rays ===
  const rays = document.querySelector('.system-bg-rays');
  if (rays) {
    for (let i = 0; i < 7; i++) {
      const r = document.createElement('div');
      r.className = 'bg-ray';
      r.style.top = (i * 14 + 10) + 'vh';
      r.style.animationDelay = (i * 0.7) + 's';
      rays.appendChild(r);
    }
  }
  // === Animated Orbs ===
  const orbs = document.querySelector('.system-bg-orbs');
  if (orbs) {
    for (let i = 0; i < 5; i++) {
      const o = document.createElement('div');
      o.className = 'bg-orb';
      o.style.left = Math.random() * 100 + 'vw';
      o.style.top = Math.random() * 100 + 'vh';
      o.style.width = o.style.height = (Math.random() * 60 + 40) + 'px';
      o.style.animationDuration = (Math.random() * 3 + 5) + 's';
      orbs.appendChild(o);
    }
  }
  // === Animated Particles ===
  const particles = document.querySelector('.system-bg-particles');
  if (particles) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'bg-particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
      particles.appendChild(p);
    }
  }
  // === Random Glitch Effects ===
  const glitchLayer = document.createElement('div');
  glitchLayer.className = 'system-bg-glitches';
  glitchLayer.style.position = 'fixed';
  glitchLayer.style.left = '0';
  glitchLayer.style.top = '0';
  glitchLayer.style.width = '100vw';
  glitchLayer.style.height = '100vh';
  glitchLayer.style.pointerEvents = 'none';
  glitchLayer.style.zIndex = '3';
  document.body.appendChild(glitchLayer);
  function spawnGlitch() {
    const g = document.createElement('div');
    g.className = 'bg-glitch';
    g.style.left = Math.random() * 100 + 'vw';
    g.style.top = Math.random() * 100 + 'vh';
    g.style.width = (Math.random() * 80 + 40) + 'px';
    g.style.height = (Math.random() * 6 + 2) + 'px';
    g.style.background = 'linear-gradient(90deg, #00d4ff 0%, #7b2fff 100%)';
    g.style.opacity = Math.random() * 0.25 + 0.15;
    g.style.position = 'absolute';
    g.style.filter = 'blur(0.5px)';
    g.style.animation = 'glitch-move 0.32s linear forwards';
    glitchLayer.appendChild(g);
    setTimeout(() => { g.remove(); }, 320);
  }
  setInterval(() => {
    if (Math.random() < 0.5) spawnGlitch();
  }, 220);
})();
