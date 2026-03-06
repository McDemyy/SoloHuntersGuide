// ---- Dungeon Card Glow & Map Modal ----
document.addEventListener('DOMContentLoaded', function() {
  // Recommendation logic: highlight recommended dungeon
  function setRecommendedDungeon(dungeonName) {
    document.querySelectorAll('.dungeon-card').forEach(card => {
      card.classList.remove('recommended');
      const header = card.querySelector('.dungeon-header');
      if (header && header.textContent.includes(dungeonName)) {
        card.classList.add('recommended');
      }
    });
  }

  // Example: set recommended dungeon after form submit
  const recommendForm = document.getElementById('recommend-form');
  if (recommendForm) {
    recommendForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simple logic: recommend based on power
      const power = parseInt(document.getElementById('player-power').value, 10);
      let dungeon = '';
      if (power < 20_000) dungeon = 'Subway';
      else if (power < 80_000) dungeon = 'Caves';
      else if (power < 200_000) dungeon = 'Jungle';
      else if (power < 300_000) dungeon = 'Desert';
      else if (power < 380_000) dungeon = 'Snow Forest';
      else dungeon = 'Spider Cave';
      setRecommendedDungeon(dungeon);
      // Optionally show result text
      const result = document.getElementById('recommend-result');
      if (result) result.textContent = `Recommended: ${dungeon}`;
    });
  }

  // Dungeon map modal logic
  const mapModal = document.getElementById('dungeon-map-modal');
  const mapImg = document.getElementById('dungeon-map-img');
  const closeMapBtn = mapModal ? mapModal.querySelector('.close-map-modal') : null;
  // Map images for each dungeon
  const dungeonMaps = {
    'Subway': 'images/MAP/map.png',
    'Caves': 'images/MAP/map.png',
    'Jungle': 'images/MAP/map.png',
    'Desert': 'images/MAP/map.png',
    'Snow Forest': 'images/MAP/map.png',
    'Spider Cave': 'images/MAP/map.png',
  };
  document.querySelectorAll('.dungeon-card').forEach(card => {
    card.addEventListener('click', function() {
      const header = card.querySelector('.dungeon-header');
      if (!header) return;
      // Find dungeon name
      let dungeon = header.textContent.split('Lv')[0].trim();
      // Map dungeon names to anchor IDs or hash fragments
      const anchorMap = {
        'Subway': '#subway',
        'Caves': '#caves',
        'Jungle': '#jungle',
        'Desert': '#desert',
        'Snow Forest': '#snowforest',
        'Spider Cave': '#spidercave',
      };
      const anchor = anchorMap[dungeon] || '';
      window.location.href = `levelguide.html${anchor}`;
    });
  });
  if (closeMapBtn) {
    closeMapBtn.addEventListener('click', function() {
      mapModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }
  // Close modal on background click
  if (mapModal) {
    mapModal.addEventListener('click', function(e) {
      if (e.target === mapModal) {
        mapModal.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    });
  }
});
// ---- Artifact Materials Modal ----
function initArtifactMaterialsModal() {
  const modal = document.getElementById('materials-modal');
  const modalContent = document.getElementById('materials-modal-content');
  const closeBtn = document.getElementById('close-materials-modal');
  if (!modal || !modalContent || !closeBtn) return;
  // Attach click to all Materials buttons
  document.querySelectorAll('.item-card .system-btn-system').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      // Find artifact name
      const card = btn.closest('.item-card');
      const name = card ? card.querySelector('.card-name').textContent.trim() : '';
      // Custom content for each artifact
      let html = `<h2 style="color:#00d4ff;margin-bottom:0.7em;">${name} Materials</h2>`;
      let locations = '';
      switch (name) {
        case 'ShadowFang':
          locations = 'Caves, Spider Cave, and Bloodmoons';
          break;
        case 'Deathwing':
          locations = 'Subway and Desert';
          break;
        case 'Conqurers':
          locations = 'Caves and Desert';
          break;
        case 'Guardian':
          locations = 'Spider Cave and Jungle';
          break;
        case 'HeartBound':
          locations = 'Snow Forest and Jungle';
          break;
        default:
          locations = 'Material locations and requirements coming soon.';
      }
      html += `<div style="font-size:1.1em;"><b>Locations:</b> ${locations}</div>`;
      modalContent.innerHTML = html;
      modal.style.display = 'flex';
    });
  });
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  // Close on background click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) modal.style.display = 'none';
  });
}

// ---- Prevent background scroll when modal is open ----
(function() {
  function setModalOpen(open) {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }
  // Patch all modal open/close logic
  document.addEventListener('click', function(e) {
    // If a modal is opened
    if (e.target.classList && e.target.classList.contains('system-modal')) {
      if (e.target.style.display === 'flex' || getComputedStyle(e.target).display === 'flex') {
        setModalOpen(true);
      }
    }
    // If a modal is closed by clicking overlay or close button
    if (
      (e.target.classList && e.target.classList.contains('system-modal-close')) ||
      (e.target.classList && e.target.classList.contains('system-modal'))
    ) {
      setTimeout(function() {
        // If no modals are open, remove modal-open
        var anyOpen = !!document.querySelector('.system-modal[style*="display: flex"]');
        if (!anyOpen) setModalOpen(false);
      }, 100);
    }
  });
  // Also patch all code that sets display:flex on .system-modal
  const origSetProperty = CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty = function(prop, value) {
    origSetProperty.apply(this, arguments);
    if (prop === 'display' && value === 'flex' && this.parentRule == null) {
      setModalOpen(true);
    }
    if (prop === 'display' && value === 'none' && this.parentRule == null) {
      setTimeout(function() {
        var anyOpen = !!document.querySelector('.system-modal[style*="display: flex"]');
        if (!anyOpen) setModalOpen(false);
      }, 100);
    }
  };
})();

// ---- Dungeon Card Click-to-Dropdown ----
function initDungeonCardDropdowns() {
  const cards = document.querySelectorAll('.dungeon-card.clickable');
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Only one open at a time
      cards.forEach(c => {
        if (c !== card) c.classList.remove('active');
      });
      card.classList.toggle('active');
    });
  });
}

// ---- Dungeon Recommendation Logic ----
function recommendDungeon(power) {
  // Updated dungeon tables from user
  const dungeonTable = [
    // Subway
    { dungeon: 'Subway', rank: 'F', power: 0, exp: 320 },
    { dungeon: 'Subway', rank: 'F+', power: 250, exp: 467 },
    { dungeon: 'Subway', rank: 'E', power: 550, exp: 639 },
    { dungeon: 'Subway', rank: 'E+', power: 1000, exp: 898 },
    { dungeon: 'Subway', rank: 'D', power: 1400, exp: 1267 },
    { dungeon: 'Subway', rank: 'D+', power: 1900, exp: 1825 },
    { dungeon: 'Subway', rank: 'C', power: 2300, exp: 2295 },
    { dungeon: 'Subway', rank: 'C+', power: 2600, exp: 2636 },
    { dungeon: 'Subway', rank: 'B', power: 16000, exp: 37100 },
    { dungeon: 'Subway', rank: 'B+', power: 22000, exp: 56771 },
    { dungeon: 'Subway', rank: 'A', power: 30000, exp: 116488 },
    { dungeon: 'Subway', rank: 'A+', power: 40000, exp: 203232 },
    { dungeon: 'Subway', rank: 'S', power: 55000, exp: 351642 },
    { dungeon: 'Subway', rank: 'S+', power: 115000, exp: 602870 },
    { dungeon: 'Subway', rank: 'S++', power: 175000, exp: 1363650 },
    { dungeon: 'Subway', rank: 'S+++', power: 405000, exp: 3699496 },
    // Caves
    { dungeon: 'Caves', rank: 'F', power: 2600, exp: 2080 },
    { dungeon: 'Caves', rank: 'F+', power: 3800, exp: 3354 },
    { dungeon: 'Caves', rank: 'E', power: 5000, exp: 5250 },
    { dungeon: 'Caves', rank: 'E+', power: 6200, exp: 8104 },
    { dungeon: 'Caves', rank: 'D', power: 7400, exp: 11346 },
    { dungeon: 'Caves', rank: 'D+', power: 8600, exp: 11820 },
    { dungeon: 'Caves', rank: 'C', power: 9800, exp: 16480 },
    { dungeon: 'Caves', rank: 'C+', power: 11000, exp: 18396 },
    { dungeon: 'Caves', rank: 'B', power: 25000, exp: 68333 },
    { dungeon: 'Caves', rank: 'B+', power: 50000, exp: 300704 },
    { dungeon: 'Caves', rank: 'A', power: 90000, exp: 500960 },
    { dungeon: 'Caves', rank: 'A+', power: 160000, exp: 1181650 },
    { dungeon: 'Caves', rank: 'S', power: 275000, exp: 2752145 },
    { dungeon: 'Caves', rank: 'S+', power: 380000, exp: 3570586 },
    { dungeon: 'Caves', rank: 'S++', power: 480000, exp: 5200800 },
    // S+++ omitted (no data)
    // Jungle
    { dungeon: 'Jungle', rank: 'F', power: 11000, exp: 18160 },
    { dungeon: 'Jungle', rank: 'F+', power: 14000, exp: 28815 },
    { dungeon: 'Jungle', rank: 'E', power: 17000, exp: 40192 },
    { dungeon: 'Jungle', rank: 'E+', power: 20000, exp: 49505 },
    { dungeon: 'Jungle', rank: 'D', power: 23000, exp: 60224 },
    { dungeon: 'Jungle', rank: 'D+', power: 26000, exp: 72530 },
    { dungeon: 'Jungle', rank: 'C', power: 29000, exp: 85256 },
    { dungeon: 'Jungle', rank: 'C+', power: 32000, exp: 125476 },
    { dungeon: 'Jungle', rank: 'B', power: 52000, exp: 320288 },
    { dungeon: 'Jungle', rank: 'B+', power: 85000, exp: 480794 },
    { dungeon: 'Jungle', rank: 'A', power: 140000, exp: 950520 },
    { dungeon: 'Jungle', rank: 'A+', power: 230000, exp: 2400840 },
    { dungeon: 'Jungle', rank: 'S', power: 355000, exp: 3463160 },
    { dungeon: 'Jungle', rank: 'S+', power: 435000, exp: 5000528 },
    { dungeon: 'Jungle', rank: 'S++', power: 520000, exp: 5200836 },
    // S+++ omitted (no data)
    // Desert
    { dungeon: 'Desert', rank: 'F', power: 32000, exp: 125240 },
    { dungeon: 'Desert', rank: 'F+', power: 39000, exp: 193663 },
    { dungeon: 'Desert', rank: 'E', power: 46000, exp: 261954 },
    { dungeon: 'Desert', rank: 'E+', power: 53000, exp: 330390 },
    { dungeon: 'Desert', rank: 'D', power: 59000, exp: 390756 },
    { dungeon: 'Desert', rank: 'D+', power: 66000, exp: 451536 },
    { dungeon: 'Desert', rank: 'C', power: 73000, exp: 456197 },
    { dungeon: 'Desert', rank: 'C+', power: 80000, exp: 460986 },
    { dungeon: 'Desert', rank: 'B', power: 110000, exp: 581116 },
    { dungeon: 'Desert', rank: 'B+', power: 155000, exp: 1120988 },
    { dungeon: 'Desert', rank: 'A', power: 220000, exp: 2241800 },
    { dungeon: 'Desert', rank: 'A+', power: 310000, exp: 3042058 },
    { dungeon: 'Desert', rank: 'S', power: 420000, exp: 5201672 },
    { dungeon: 'Desert', rank: 'S+', power: 440000, exp: 5202162 },
    // S++, S+++ omitted (no data)
    // Snow Forest
    { dungeon: 'Snow Forest', rank: 'F', power: 80000, exp: 460020 },
    { dungeon: 'Snow Forest', rank: 'F+', power: 87000, exp: 488242 },
    { dungeon: 'Snow Forest', rank: 'E', power: 94000, exp: 516288 },
    { dungeon: 'Snow Forest', rank: 'E+', power: 101000, exp: 544000 },
    { dungeon: 'Snow Forest', rank: 'D', power: 108000, exp: 572588 },
    { dungeon: 'Snow Forest', rank: 'D+', power: 116000, exp: 604030 },
    { dungeon: 'Snow Forest', rank: 'C', power: 123000, exp: 632928 },
    { dungeon: 'Snow Forest', rank: 'C+', power: 130000, exp: 661020 },
    { dungeon: 'Snow Forest', rank: 'B', power: 170000, exp: 1301044 },
    { dungeon: 'Snow Forest', rank: 'B+', power: 205000, exp: 2000456 },
    { dungeon: 'Snow Forest', rank: 'A', power: 255000, exp: 2594924 },
    { dungeon: 'Snow Forest', rank: 'A+', power: 320000, exp: 3306441 },
    { dungeon: 'Snow Forest', rank: 'S', power: 395000, exp: 3629650 },
    // S+, S++, S+++ omitted (no data)
    // Spider Cave
    { dungeon: 'Spider Cave', rank: 'F', power: 145000, exp: 1000240 },
    { dungeon: 'Spider Cave', rank: 'F+', power: 162000, exp: 1060022 },
    { dungeon: 'Spider Cave', rank: 'E', power: 179000, exp: 1180000 },
    { dungeon: 'Spider Cave', rank: 'E+', power: 196000, exp: 1300026 },
    { dungeon: 'Spider Cave', rank: 'D', power: 218000, exp: 1420000 },
    { dungeon: 'Spider Cave', rank: 'D+', power: 238000, exp: 1520690 },
    { dungeon: 'Spider Cave', rank: 'C', power: 250000, exp: 2400672 },
    { dungeon: 'Spider Cave', rank: 'C+', power: 265000, exp: 2540748 },
    { dungeon: 'Spider Cave', rank: 'B', power: 300000, exp: 2680036 },
    { dungeon: 'Spider Cave', rank: 'B+', power: 340000, exp: 2820836 },
    { dungeon: 'Spider Cave', rank: 'A', power: 385000, exp: 2970440 },
    { dungeon: 'Spider Cave', rank: 'A+', power: 440000, exp: 3040000 },
    { dungeon: 'Spider Cave', rank: 'S', power: 490000, exp: 3400000 },
    { dungeon: 'Spider Cave', rank: 'S+', power: 530000, exp: 3600000 },
    { dungeon: 'Spider Cave', rank: 'S++', power: 565000, exp: 3651768 },
    { dungeon: 'Spider Cave', rank: 'S+++', power: 600000, exp: 5001792 },
  ];

  // Find the highest gate power less than or equal to the player's power
  let best = null;
  let next = null;
  dungeonTable.forEach(d => {
    if (d.power <= power && (!best || d.power > best.power)) {
      best = d;
    }
    if (d.power > power && (!next || d.power < next.power)) {
      next = d;
    }
  });
  if (!best) return 'No dungeon available. Increase your power!';
  // Highlight the recommended portal card
  setTimeout(() => {
    document.querySelectorAll('.dungeon-card').forEach(card => {
      card.classList.remove('recommended-glow');
      const header = card.querySelector('.dungeon-header');
      if (!header) return;
      const name = header.textContent.split('Lv')[0].trim();
      if (name === best.dungeon) {
        card.classList.add('recommended-glow');
      }
    });
  }, 10);
  let result = `
    <div style="background:linear-gradient(90deg,#0e1a2a 60%,#102a4a 100%);border-radius:1em;box-shadow:0 0 16px #00d4ff55,0 0 2px #7b2fff44;padding:1.1em 1.2em 1.2em 1.2em;text-align:center;margin-bottom:0.5em;max-width:340px;margin-left:auto;margin-right:auto;">
      <div style="font-size:1.18em;font-family:'Orbitron','Segoe UI',monospace;color:#00d4ff;text-shadow:0 0 8px #00d4ffcc,0 0 2px #fff;margin-bottom:0.4em;">Recommended Gate</div>
      <div style="font-size:1.08em;color:#eaf6ff;margin-bottom:0.2em;">Farm <b>${best.dungeon} <span style='color:#ffaa00;'>(${best.rank})</span></b></div>
      <div style="font-size:1em;color:#b3eaff;margin-bottom:0.1em;">Power: <b>${best.power}</b> &nbsp;|&nbsp; EXP: <b>${best.exp}</b></div>
    </div>`;
  if (next) {
    result += `
      <div style="background:linear-gradient(90deg,#101a2a 60%,#1a2e4a 100%);border-radius:1em;box-shadow:0 0 12px #00d4ff33,0 0 2px #7b2fff22;padding:0.8em 1em 1em 1em;text-align:center;max-width:320px;margin-left:auto;margin-right:auto;">
        <div style="font-size:1.08em;color:#b3eaff;margin-bottom:0.2em;">Next Gate: <b>${next.dungeon} <span style='color:#ffaa00;'>(${next.rank})</span></b></div>
        <div style="font-size:1em;color:#eaf6ff;">Power: <b>${next.power}</b> &nbsp;|&nbsp; EXP: <b>${next.exp}</b></div>
      </div>`;
  }
  return result;
}

function initRecommendForm() {
  const form = document.getElementById('recommend-form');
  const result = document.getElementById('recommend-result') || document.querySelector('.clean-recommend-result');
  if (!form || !result) return;
  form.addEventListener('submit', function(e) {
    console.log('[DEBUG] Recommend form submitted');
    e.preventDefault();
    result.innerHTML = '';
    const input = document.getElementById('player-power');
    if (!input) {
      result.innerHTML = '<span style="color:#ff4444">Error: Power input not found.</span>';
      return;
    }
    const power = parseInt(input.value, 10);
    if (isNaN(power) || power < 0) {
      result.innerHTML = '<span style="color:#ff4444">Please enter a valid power value.</span>';
      return;
    }
    const output = recommendDungeon(power);
    result.innerHTML = output || '<span style="color:#ff4444">No recommendation found.</span>';
  });
}

// ---- Spinning Portals: (handled by CSS animation) ----

/* =============================================
   SOLO LEVELING SYSTEM DATABASE - Main Script
   ============================================= */

'use strict';

// (Portal expand/collapse logic removed for portals.html)

/* ---- Filter buttons ---- */
function initFilters() {
  // Only run on weapons.html
  if (!window.location.pathname.includes('weapons.html')) return;
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;
  const buttons = filterBar.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.item-card[data-type]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.type;
      cards.forEach(card => {
        if (type === 'all') {
          card.style.display = '';
        } else {
          card.style.display = (card.dataset.type === type) ? '' : 'none';
        }
      });
    });
  });
}

/* ---- Staggered card animation on load ---- */
function initCardAnimations() {
  const cards = document.querySelectorAll('.item-card, .build-card, .drop-card, .portal-entry');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
  });
}

/* ---- Active nav link highlighting ---- */
function initNavHighlight() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ---- Typing effect for hero title (optional) ---- */
function initTypingEffect() {
  const el = document.querySelector('.hero-system-text');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 60);
}

/* ---- Init ---- */

document.addEventListener('DOMContentLoaded', () => {
  initDungeonCardDropdowns();
  initRecommendForm();
  initArtifactMaterialsModal();
  initShinyToggle();
  initFilters();
  initCardAnimations();
  initNavHighlight();
  initWeaponModal();
});

// ---- Weapon Modal Logic ----
function initWeaponModal() {
  // For Solo Leveling style GUI overlay
  const overlay = document.getElementById('weapon-gui-overlay');
  const content = document.getElementById('weapon-gui-content');
  const closeBtn = overlay ? overlay.querySelector('.weapon-gui-close') : null;
  if (!overlay || !content || !closeBtn) return;
  document.querySelectorAll('.weapon-info-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Optionally, fetch weapon info via AJAX or static HTML
      // For now, just show a placeholder or load the linked page in an iframe
      const href = btn.getAttribute('href');
      content.innerHTML = `<iframe src="${href}" style="width:100%;height:60vh;border:none;background:#10131e;"></iframe>`;
      overlay.style.display = 'flex';
    });
  });
  closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
    content.innerHTML = '';
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      content.innerHTML = '';
    }
  });
}

function initShinyToggle() {
  const shinyBtn = document.getElementById('shiny-toggle');
  if (!shinyBtn) return;
  let shiny = false;
  shinyBtn.addEventListener('click', function() {
    shiny = !shiny;
    shinyBtn.classList.toggle('active', shiny);
    shinyBtn.textContent = shiny ? 'Shiny (On)' : 'Shiny';
    document.querySelectorAll('.card-desc[data-artifact]').forEach(desc => {
      const base = desc.getAttribute('data-base') || '';
      const shinyStat = desc.getAttribute('data-shiny') || '';
      const statSpan = desc.querySelector('.artifact-stats');
      if (statSpan) {
        statSpan.textContent = shiny ? shinyStat : base;
      }
    });
  });
}

// ---- Mobile Side Nav Logic ----
document.addEventListener('DOMContentLoaded', function() {
  const navBtn = document.getElementById('nav-mobile-btn');
  const sidepanel = document.getElementById('nav-sidepanel');
  const overlay = document.getElementById('nav-sidepanel-overlay');
  const closeBtn = document.getElementById('nav-sidepanel-close');
  if (navBtn && sidepanel && overlay) {
    navBtn.style.display = '';
    navBtn.addEventListener('click', function() {
      sidepanel.classList.add('open');
      overlay.classList.add('active');
    });
    overlay.addEventListener('click', function() {
      sidepanel.classList.remove('open');
      overlay.classList.remove('active');
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        sidepanel.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  }
});
