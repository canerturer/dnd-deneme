/**
 * D&D 5e Nexus - Feats UI & CSV Management Module
 * Handles Feat selector modal, category filters, search, ASI stat boosts, CSV import/export, and Custom Feat Editor.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  window.DnDNexus.characterFeats = window.DnDNexus.characterFeats || [];

  let currentCategoryFilter = 'all';
  let searchQuery = '';

  /**
   * Initializes Feats UI listeners, modal events, CSV actions, and Custom Feat form
   */
  window.DnDNexus.initFeatsUI = function() {
    const btnOpenModal = document.getElementById('btn-open-feats-modal');
    const btnCloseModal = document.getElementById('btn-close-feats-modal');
    const modal = document.getElementById('modal-feat-selector');
    const searchInput = document.getElementById('feats-search-input');
    const categoryTabs = document.querySelectorAll('.feat-category-tab');

    const btnExportCSV = document.getElementById('btn-export-feats-csv');
    const btnImportCSV = document.getElementById('btn-import-feats-csv');
    const fileInputCSV = document.getElementById('file-input-feats-csv');

    const btnToggleCustomForm = document.getElementById('btn-toggle-custom-feat-form');
    const customFormPanel = document.getElementById('custom-feat-form-panel');
    const btnSaveCustomFeat = document.getElementById('btn-save-custom-feat');
    const btnCancelCustomFeat = document.getElementById('btn-cancel-custom-feat');

    btnOpenModal?.addEventListener('click', window.DnDNexus.openFeatsModal);
    btnCloseModal?.addEventListener('click', window.DnDNexus.closeFeatsModal);

    modal?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-feat-selector') {
        window.DnDNexus.closeFeatsModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.DnDNexus.closeFeatsModal();
      }
    });

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      window.DnDNexus.renderFeatSelectorList();
    });

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategoryFilter = tab.getAttribute('data-category') || 'all';
        window.DnDNexus.renderFeatSelectorList();
      });
    });

    // --- CSV Export Action ---
    btnExportCSV?.addEventListener('click', () => {
      const allFeats = window.DnDNexus.getAllFeats ? window.DnDNexus.getAllFeats() : (window.DnDNexus.FEATS_2024 || []);
      if (!window.DnDNexus.exportFeatsToCSV) return;

      const csvContent = window.DnDNexus.exportFeatsToCSV(allFeats);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dnd5e_feats_catalog.csv';
      a.click();
      URL.revokeObjectURL(url);
    });

    // --- CSV Import Action ---
    btnImportCSV?.addEventListener('click', () => {
      fileInputCSV?.click();
    });

    fileInputCSV?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csvText = event.target.result;
          const importedFeats = window.DnDNexus.parseCSV(csvText);

          if (!importedFeats || importedFeats.length === 0) {
            alert('Geçersiz veya boş CSV dosyası!');
            return;
          }

          const existingCustom = window.DnDNexus.getCustomFeats ? window.DnDNexus.getCustomFeats() : [];
          const map = new Map();

          existingCustom.forEach(f => map.set(f.id, f));
          importedFeats.forEach(f => map.set(f.id, f));

          const mergedCustom = Array.from(map.values());
          if (window.DnDNexus.saveCustomFeats) {
            window.DnDNexus.saveCustomFeats(mergedCustom);
          }

          window.DnDNexus.renderFeatSelectorList();
          alert(`Başarıyla ${importedFeats.length} adet Feat içe aktarıldı!`);
          fileInputCSV.value = '';
        } catch (err) {
          alert('CSV dosyası ayrıştırılırken hata oluştu: ' + err.message);
        }
      };
      reader.readAsText(file, 'UTF-8');
    });

    // --- Custom Feat Form Actions ---
    btnToggleCustomForm?.addEventListener('click', () => {
      if (customFormPanel) {
        const isHidden = customFormPanel.style.display === 'none';
        customFormPanel.style.display = isHidden ? 'block' : 'none';
      }
    });

    btnCancelCustomFeat?.addEventListener('click', () => {
      if (customFormPanel) customFormPanel.style.display = 'none';
    });

    btnSaveCustomFeat?.addEventListener('click', () => {
      const nameInput = document.getElementById('custom-feat-name');
      const catSelect = document.getElementById('custom-feat-category');
      const prereqInput = document.getElementById('custom-feat-prereq');
      const asiSelect = document.getElementById('custom-feat-asi');
      const detailsInput = document.getElementById('custom-feat-details');

      const name = nameInput?.value.trim();
      if (!name) {
        alert('Lütfen bir Feat ismi girin!');
        return;
      }

      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const category = catSelect?.value || 'Custom Feat';
      const prerequisite = prereqInput?.value.trim() || 'Yok';
      
      const chosenAsis = [];
      if (asiSelect) {
        Array.from(asiSelect.selectedOptions).forEach(opt => chosenAsis.push(opt.value));
      }

      const details = detailsInput?.value.trim() || name;

      const newCustomFeat = {
        id,
        name,
        category,
        prerequisite,
        asiOptions: chosenAsis,
        description: details.slice(0, 200) + (details.length > 200 ? '...' : ''),
        fullDetails: details
      };

      const existingCustom = window.DnDNexus.getCustomFeats ? window.DnDNexus.getCustomFeats() : [];
      const updatedCustom = existingCustom.filter(f => f.id !== id);
      updatedCustom.push(newCustomFeat);

      if (window.DnDNexus.saveCustomFeats) {
        window.DnDNexus.saveCustomFeats(updatedCustom);
      }

      // Reset form
      if (nameInput) nameInput.value = '';
      if (prereqInput) prereqInput.value = '';
      if (detailsInput) detailsInput.value = '';
      if (customFormPanel) customFormPanel.style.display = 'none';

      window.DnDNexus.renderFeatSelectorList();
      alert(`"${name}" feat'i başarıyla kataloğa eklendi!`);
    });
  };

  /**
   * Opens the Feat Picker Modal
   */
  window.DnDNexus.openFeatsModal = function() {
    const modal = document.getElementById('modal-feat-selector');
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      searchQuery = '';
      const searchInput = document.getElementById('feats-search-input');
      if (searchInput) searchInput.value = '';
      window.DnDNexus.renderFeatSelectorList();
    }
  };

  /**
   * Closes the Feat Picker Modal
   */
  window.DnDNexus.closeFeatsModal = function() {
    const modal = document.getElementById('modal-feat-selector');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  /**
   * Renders the filtered list of available feats in the modal grid
   */
  window.DnDNexus.renderFeatSelectorList = function() {
    const container = document.getElementById('feats-catalog-grid');
    if (!container) return;

    const catalog = window.DnDNexus.getAllFeats ? window.DnDNexus.getAllFeats() : (window.DnDNexus.FEATS_2024 || []);

    const filtered = catalog.filter(feat => {
      const matchesCategory = currentCategoryFilter === 'all' || 
        feat.category.toLowerCase().includes(currentCategoryFilter.toLowerCase());
      const matchesSearch = !searchQuery || 
        feat.name.toLowerCase().includes(searchQuery) || 
        (feat.fullDetails && feat.fullDetails.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-feats-msg">Aramanızla eşleşen Feat bulunamadı.</div>`;
      return;
    }

    container.innerHTML = filtered.map(feat => {
      const isAlreadyAdded = window.DnDNexus.characterFeats.some(f => f.id === feat.id);
      const categoryBadgeClass = getCategoryBadgeClass(feat.category);

      let asiSelectHTML = '';
      if (feat.asiOptions && feat.asiOptions.length > 0) {
        const options = feat.asiOptions.map(opt => 
          `<option value="${opt}">+1 ${opt.toUpperCase()}</option>`
        ).join('');
        asiSelectHTML = `
          <div class="feat-asi-select-box">
            <label>ASI Seçimi (+1 Stat):</label>
            <select class="feat-asi-picker" id="asi-picker-${feat.id}">
              ${options}
            </select>
          </div>
        `;
      }

      const fullText = feat.fullDetails || feat.description;

      return `
        <div class="feat-catalog-card ${isAlreadyAdded ? 'added' : ''}">
          <div class="feat-card-header">
            <h4 class="feat-card-title">${escapeHTML(feat.name)}</h4>
            <span class="feat-badge ${categoryBadgeClass}">${escapeHTML(feat.category)}</span>
          </div>
          <div class="feat-prereq"><strong>Gereksinim:</strong> ${escapeHTML(feat.prerequisite)}</div>
          <div class="feat-card-desc">${escapeHTML(fullText).replace(/\n/g, '<br>')}</div>
          ${asiSelectHTML}
          <div class="feat-card-actions">
            ${isAlreadyAdded ? 
              `<button class="btn btn-secondary btn-sm" disabled>✓ Eklendi</button>` : 
              `<button class="btn btn-accent btn-sm btn-add-feat-action" onclick="window.DnDNexus.addFeatToCharacter('${feat.id}')">+ Karaktere Ekle</button>`
            }
          </div>
        </div>
      `;
    }).join('');
  };

  /**
   * Adds a feat to the character sheet state
   */
  window.DnDNexus.addFeatToCharacter = function(featId) {
    const catalog = window.DnDNexus.getAllFeats ? window.DnDNexus.getAllFeats() : (window.DnDNexus.FEATS_2024 || []);
    const featObj = catalog.find(f => f.id === featId);
    if (!featObj) return;

    if (window.DnDNexus.characterFeats.some(f => f.id === featId)) return;

    let chosenASI = null;
    const asiPicker = document.getElementById(`asi-picker-${featId}`);
    if (asiPicker) {
      chosenASI = asiPicker.value;
      const statInput = document.getElementById(`${chosenASI}-score`);
      if (statInput) {
        let currentVal = parseInt(statInput.value) || 10;
        statInput.value = currentVal + 1;
        window.DnDNexus.calculateAll();
      }
    }

    const newFeat = {
      id: featObj.id,
      name: featObj.name,
      category: featObj.category,
      prerequisite: featObj.prerequisite,
      chosenASI: chosenASI,
      description: featObj.description,
      fullDetails: featObj.fullDetails || featObj.description
    };

    window.DnDNexus.characterFeats.push(newFeat);
    window.DnDNexus.renderCharacterFeatsList();
    window.DnDNexus.renderFeatSelectorList();
    if (window.DnDNexus.autoSyncRulebookResources) window.DnDNexus.autoSyncRulebookResources();
    window.DnDNexus.triggerAutosave();
  };

  /**
   * Removes a feat from the character sheet state
   */
  window.DnDNexus.removeFeatFromCharacter = function(featId) {
    const index = window.DnDNexus.characterFeats.findIndex(f => f.id === featId);
    if (index === -1) return;

    const removedFeat = window.DnDNexus.characterFeats[index];
    if (removedFeat.chosenASI) {
      const statInput = document.getElementById(`${removedFeat.chosenASI}-score`);
      if (statInput) {
        let currentVal = parseInt(statInput.value) || 10;
        statInput.value = Math.max(1, currentVal - 1);
        window.DnDNexus.calculateAll();
      }
    }

    window.DnDNexus.characterFeats.splice(index, 1);
    window.DnDNexus.renderCharacterFeatsList();
    if (window.DnDNexus.autoSyncRulebookResources) window.DnDNexus.autoSyncRulebookResources();
    window.DnDNexus.triggerAutosave();
  };

  /**
   * Renders active character feats in Column 3 section
   */
  window.DnDNexus.renderCharacterFeatsList = function() {
    const listContainer = document.getElementById('active-feats-list');
    if (!listContainer) return;

    if (window.DnDNexus.characterFeats.length === 0) {
      listContainer.innerHTML = `<div class="empty-active-feats">Henüz hiç Feat eklenmedi. ("+ Feat Ekle" butonuna basarak 2024 Feat'lerini seçebilirsiniz.)</div>`;
      return;
    }

    listContainer.innerHTML = window.DnDNexus.characterFeats.map(feat => {
      const badgeClass = getCategoryBadgeClass(feat.category);
      const asiBadge = feat.chosenASI ? `<span class="asi-badge">+1 ${feat.chosenASI.toUpperCase()}</span>` : '';
      const fullText = feat.fullDetails || feat.description;

      return `
        <div class="active-feat-item">
          <div class="feat-item-top">
            <span class="feat-item-name">✨ ${escapeHTML(feat.name)}</span>
            <div class="feat-badges-box">
              ${asiBadge}
              <span class="feat-badge ${badgeClass}">${escapeHTML(feat.category)}</span>
              <button class="btn-del-feat" title="Feat'i Sil" onclick="window.DnDNexus.removeFeatFromCharacter('${feat.id}')">&times;</button>
            </div>
          </div>
          <div class="feat-item-desc">${escapeHTML(fullText).replace(/\n/g, '<br>')}</div>
        </div>
      `;
    }).join('');

    if (window.DnDNexus.updateFeatsCapacityBadge) {
      window.DnDNexus.updateFeatsCapacityBadge();
    }
  };

  /**
   * Calculates total allowed feats based on character class & level (PHB 2024 rules)
   */
  window.DnDNexus.calculateAllowedFeats = function() {
    const classLevelInput = document.getElementById('char-class-level')?.value || '';
    const classLower = classLevelInput.toLowerCase();

    let totalLevel = 0;
    const numMatches = classLower.match(/\d+/g);
    if (numMatches) {
      totalLevel = numMatches.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    }
    if (totalLevel <= 0) totalLevel = 1;

    // Origin Feat at Level 1 for all characters
    let allowedCount = 1;

    const isFighter = classLower.includes('fighter') || classLower.includes('savaşçı') || classLower.includes('savasci');
    const isRogue = classLower.includes('rogue') || classLower.includes('hırsız') || classLower.includes('hirsiz');

    const standardFeatLevels = [4, 8, 12, 16, 19];
    const fighterFeatLevels = [4, 6, 8, 12, 14, 16, 19];
    const rogueFeatLevels = [4, 8, 10, 12, 16, 19];

    const targetLevels = isFighter ? fighterFeatLevels : (isRogue ? rogueFeatLevels : standardFeatLevels);

    targetLevels.forEach(lvl => {
      if (totalLevel >= lvl) {
        allowedCount++;
      }
    });

    return { allowedCount, totalLevel };
  };

  /**
   * Updates Feat Capacity Badges on main sheet and modal
   */
  window.DnDNexus.updateFeatsCapacityBadge = function() {
    const { allowedCount, totalLevel } = window.DnDNexus.calculateAllowedFeats();
    const currentFeatsCount = (window.DnDNexus.characterFeats || []).length;

    const panelBadge = document.getElementById('feats-capacity-badge');
    const modalBadge = document.getElementById('feats-modal-capacity-badge');

    let bannerHTML = '';
    if (currentFeatsCount < allowedCount) {
      const missing = allowedCount - currentFeatsCount;
      bannerHTML = `
        <div class="capacity-banner warning" title="Seviyenize göre henüz seçmediğiniz Feat hakkınız var!">
          ⚠️ ${missing} Feat seçimi hakkınız var! (${currentFeatsCount} / ${allowedCount} Feat)
        </div>
      `;
    } else if (currentFeatsCount === allowedCount) {
      bannerHTML = `
        <div class="capacity-banner success">
          ✅ Feat seçimleri tamamlandı (${currentFeatsCount} / ${allowedCount} Feat)
        </div>
      `;
    } else {
      bannerHTML = `
        <div class="capacity-banner info">
          ✨ Feat Kontenjanı: ${currentFeatsCount} / ${allowedCount} (Özel Feat'ler Dahil)
        </div>
      `;
    }

    if (panelBadge) panelBadge.innerHTML = bannerHTML;
    if (modalBadge) modalBadge.innerHTML = bannerHTML;
  };

  function getCategoryBadgeClass(category) {
    const cat = (category || '').toLowerCase();
    if (cat.includes('origin')) return 'badge-origin';
    if (cat.includes('fighting')) return 'badge-fighting';
    if (cat.includes('epic') || cat.includes('boon')) return 'badge-epic';
    return 'badge-general';
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
