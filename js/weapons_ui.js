/**
 * D&D 5e Nexus - Weapon Catalog UI Module
 * Handles the PHB 2024 Weapon Selector modal (search, category filter, add-to-Attacks-table).
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  let currentCategoryFilter = 'all';
  let searchQuery = '';

  const DAMAGE_TYPE_TR = {
    slashing: 'Kesici',
    piercing: 'Delici',
    bludgeoning: 'Ezici'
  };

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.DnDNexus.initWeaponsUI = function() {
    const btnOpenModal = document.getElementById('btn-open-weapons-modal');
    const btnCloseModal = document.getElementById('btn-close-weapons-modal');
    const modal = document.getElementById('modal-weapon-selector');
    const searchInput = document.getElementById('weapons-search-input');
    const categoryTabs = document.querySelectorAll('.weapon-category-tab');

    btnOpenModal?.addEventListener('click', window.DnDNexus.openWeaponsModal);
    btnCloseModal?.addEventListener('click', window.DnDNexus.closeWeaponsModal);

    modal?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-weapon-selector') {
        window.DnDNexus.closeWeaponsModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.DnDNexus.closeWeaponsModal();
      }
    });

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      window.DnDNexus.renderWeaponSelectorList();
    });

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategoryFilter = tab.getAttribute('data-category') || 'all';
        window.DnDNexus.renderWeaponSelectorList();
      });
    });
  };

  window.DnDNexus.openWeaponsModal = function() {
    const modal = document.getElementById('modal-weapon-selector');
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      searchQuery = '';
      const searchInput = document.getElementById('weapons-search-input');
      if (searchInput) searchInput.value = '';
      window.DnDNexus.renderWeaponSelectorList();
    }
  };

  window.DnDNexus.closeWeaponsModal = function() {
    const modal = document.getElementById('modal-weapon-selector');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  window.DnDNexus.renderWeaponSelectorList = function() {
    const container = document.getElementById('weapons-catalog-grid');
    if (!container) return;

    const catalog = window.DnDNexus.WEAPONS_LIST || [];

    const filtered = catalog.filter(w => {
      const matchesCategory = currentCategoryFilter === 'all' || w.category === currentCategoryFilter;
      const matchesSearch = !searchQuery ||
        w.name.toLowerCase().includes(searchQuery) ||
        (w.properties || []).some(p => p.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-feats-msg">Aramanızla eşleşen silah bulunamadı.</div>`;
      return;
    }

    container.innerHTML = filtered.map(w => {
      const propsText = (w.properties || []).join(', ') || '—';
      const damageTypeTR = DAMAGE_TYPE_TR[(w.damageType || '').toLowerCase()] || w.damageType;
      return `
        <div class="feat-catalog-card">
          <div class="feat-card-header">
            <h4 class="feat-card-title">${escapeHTML(w.name)}</h4>
            <span class="feat-badge badge-general">${escapeHTML(w.category)}</span>
          </div>
          <div class="feat-prereq"><strong>Hasar:</strong> ${escapeHTML(w.damageDice)} ${escapeHTML(damageTypeTR)}</div>
          <div class="feat-card-desc">
            <strong>Özellikler:</strong> ${escapeHTML(propsText)}<br>
            <strong>Mastery:</strong> ${escapeHTML(w.mastery || '—')} &nbsp; <strong>Ağırlık:</strong> ${escapeHTML(w.weight || '—')} &nbsp; <strong>Fiyat:</strong> ${escapeHTML(w.cost || '—')}
          </div>
          <div class="feat-card-actions">
            <button class="btn btn-accent btn-sm btn-add-weapon-action" data-weapon-id="${w.id}">+ Karaktere Ekle</button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-add-weapon-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const weapon = catalog.find(w => w.id === btn.getAttribute('data-weapon-id'));
        if (weapon) window.DnDNexus.addWeaponFromCatalog(weapon);
      });
    });
  };

  window.DnDNexus.addWeaponFromCatalog = function(weapon) {
    const tbody = document.getElementById('weapons-tbody');
    if (!tbody) return;

    const strScore = parseInt(document.getElementById('str-score')?.value) || 10;
    const dexScore = parseInt(document.getElementById('dex-score')?.value) || 10;
    const strMod = Math.floor((strScore - 10) / 2);
    const dexMod = Math.floor((dexScore - 10) / 2);

    const classLevelInput = document.getElementById('char-class-level')?.value || '';
    let totalLevel = 1;
    const numMatches = classLevelInput.match(/\d+/g);
    if (numMatches) totalLevel = numMatches.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    const profBonus = Math.max(2, Math.min(6, Math.ceil(1 + (totalLevel / 4))));

    const props = weapon.properties || [];
    const isFinesse = props.some(p => p.toLowerCase().includes('finesse'));
    const isRanged = (weapon.category || '').toLowerCase().includes('ranged');

    let modToUse = strMod;
    if (isRanged) modToUse = dexMod;
    else if (isFinesse) modToUse = Math.max(strMod, dexMod);

    const totalAtk = profBonus + modToUse;
    const bonusStr = totalAtk >= 0 ? `+${totalAtk}` : `${totalAtk}`;

    const dmgTR = DAMAGE_TYPE_TR[(weapon.damageType || '').toLowerCase()] || weapon.damageType;
    const damageStr = `${weapon.damageDice} ${dmgTR}`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" value="${escapeHTML(weapon.name)}"></td>
      <td><input type="text" value="${bonusStr}"></td>
      <td><input type="text" value="${damageStr}"></td>
      <td class="no-print"><button class="btn-tiny btn-danger" onclick="this.closest('tr').remove()">&times;</button></td>
    `;
    tbody.appendChild(tr);

    window.DnDNexus.closeWeaponsModal();
    window.DnDNexus.triggerAutosave();
  };
})();
