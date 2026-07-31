/**
 * D&D 5e Nexus - Magic Item Catalog UI Module
 * Handles the Magic Item Selector modal (search, rarity filter, add-to-Equipment-textarea).
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  let currentRarityFilter = 'all';
  let searchQuery = '';

  const RARITY_BADGE_CLASS = {
    common: 'badge-origin',
    uncommon: 'badge-general',
    rare: 'badge-fighting',
    'very rare': 'badge-epic',
    legendary: 'badge-epic'
  };

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.DnDNexus.initMagicItemsUI = function() {
    const btnOpenModal = document.getElementById('btn-open-magic-items-modal');
    const btnCloseModal = document.getElementById('btn-close-magic-items-modal');
    const modal = document.getElementById('modal-magic-item-selector');
    const searchInput = document.getElementById('magic-items-search-input');
    const rarityTabs = document.querySelectorAll('.magic-item-rarity-tab');

    btnOpenModal?.addEventListener('click', window.DnDNexus.openMagicItemsModal);
    btnCloseModal?.addEventListener('click', window.DnDNexus.closeMagicItemsModal);

    modal?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-magic-item-selector') {
        window.DnDNexus.closeMagicItemsModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.DnDNexus.closeMagicItemsModal();
      }
    });

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      window.DnDNexus.renderMagicItemSelectorList();
    });

    rarityTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        rarityTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentRarityFilter = tab.getAttribute('data-rarity') || 'all';
        window.DnDNexus.renderMagicItemSelectorList();
      });
    });
  };

  window.DnDNexus.openMagicItemsModal = function() {
    const modal = document.getElementById('modal-magic-item-selector');
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      searchQuery = '';
      const searchInput = document.getElementById('magic-items-search-input');
      if (searchInput) searchInput.value = '';
      window.DnDNexus.renderMagicItemSelectorList();
    }
  };

  window.DnDNexus.closeMagicItemsModal = function() {
    const modal = document.getElementById('modal-magic-item-selector');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  window.DnDNexus.renderMagicItemSelectorList = function() {
    const container = document.getElementById('magic-items-catalog-grid');
    if (!container) return;

    const catalog = window.DnDNexus.MAGIC_ITEMS_LIST || [];

    const filtered = catalog.filter(it => {
      const matchesRarity = currentRarityFilter === 'all' || it.rarity === currentRarityFilter;
      const matchesSearch = !searchQuery ||
        it.name.toLowerCase().includes(searchQuery) ||
        (it.description || '').toLowerCase().includes(searchQuery);
      return matchesRarity && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-feats-msg">Aramanızla eşleşen büyülü eşya bulunamadı.</div>`;
      return;
    }

    container.innerHTML = filtered.map(it => {
      const badgeClass = RARITY_BADGE_CLASS[(it.rarity || '').toLowerCase()] || 'badge-general';
      return `
        <div class="feat-catalog-card">
          <div class="feat-card-header">
            <h4 class="feat-card-title">${escapeHTML(it.name)}</h4>
            <span class="feat-badge ${badgeClass}">${escapeHTML(it.rarity)}</span>
          </div>
          <div class="feat-prereq"><strong>Tür:</strong> ${escapeHTML(it.category)} ${it.attunement ? ' &nbsp; <strong>Uyum Gerekli</strong>' : ''}</div>
          <div class="feat-card-desc">${escapeHTML(it.description)}</div>
          <div class="feat-card-actions">
            <button class="btn btn-accent btn-sm btn-add-magic-item-action" data-item-id="${it.id}">+ Karaktere Ekle</button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-add-magic-item-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = catalog.find(it => it.id === btn.getAttribute('data-item-id'));
        if (item) window.DnDNexus.addMagicItemToEquipment(item);
      });
    });
  };

  window.DnDNexus.addMagicItemToEquipment = function(item) {
    const textarea = document.getElementById('equipment-list');
    if (!textarea) return;
    const attunementNote = item.attunement ? ' (Uyum Gerekli)' : '';
    const line = `✨ ${item.name} [${item.rarity}]${attunementNote}: ${item.description}`;
    textarea.value = textarea.value ? `${textarea.value}\n${line}` : line;
    window.DnDNexus.triggerAutosave();
    window.DnDNexus.closeMagicItemsModal();
  };
})();
