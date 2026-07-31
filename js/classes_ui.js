/**
 * D&D 5e Nexus - Core Class UI & Selection Module
 * Handles 12 Core D&D 5e Classes modal, level selection, auto saving throw proficiencies, hit die, and spell slots.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  let selectedLevel = 3;

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.DnDNexus.initClassesUI = function() {
    const btnOpenModal = document.getElementById('btn-open-class-modal');
    const btnCloseModal = document.getElementById('btn-close-class-modal');
    const modal = document.getElementById('modal-class-selector');

    btnOpenModal?.addEventListener('click', window.DnDNexus.openClassModal);
    btnCloseModal?.addEventListener('click', window.DnDNexus.closeClassModal);

    modal?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-class-selector') {
        window.DnDNexus.closeClassModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.DnDNexus.closeClassModal();
      }
    });
  };

  window.DnDNexus.openClassModal = function() {
    const modal = document.getElementById('modal-class-selector');
    if (!modal) return;

    // Read current level from input if possible
    const classLevelVal = document.getElementById('char-class-level')?.value || '';
    const numMatches = classLevelVal.match(/\d+/g);
    if (numMatches) {
      selectedLevel = Math.max(1, Math.min(20, parseInt(numMatches[0]) || 3));
    }

    modal.classList.add('active');
    modal.style.display = 'flex';
    window.DnDNexus.renderClassSelectorList();
  };

  window.DnDNexus.closeClassModal = function() {
    const modal = document.getElementById('modal-class-selector');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  window.DnDNexus.renderClassSelectorList = function() {
    const container = document.getElementById('classes-catalog-grid');
    const levelInput = document.getElementById('class-select-level-input');
    if (!container) return;

    if (levelInput) {
      levelInput.value = selectedLevel;
      levelInput.oninput = (e) => {
        selectedLevel = Math.max(1, Math.min(20, parseInt(e.target.value) || 1));
      };
    }

    const currentClassVal = (document.getElementById('char-class-level')?.value || '').toLowerCase();

    let html = '';
    window.DnDNexus.CLASSES_DATA.forEach(c => {
      const isSelected = currentClassVal.includes(c.id) || currentClassVal.includes(c.name.toLowerCase());

      html += `
        <div class="feat-catalog-card" style="border: 1.5px solid ${isSelected ? '#34d399' : 'rgba(168,85,247,0.35)'}; background: ${isSelected ? 'rgba(5,150,105,0.15)' : 'rgba(28,18,47,0.85)'};">
          <div class="feat-card-header">
            <h4 class="feat-card-title">${c.icon} ${escapeHTML(c.name)}</h4>
            <span class="feat-badge ${isSelected ? 'badge-origin' : 'badge-general'}">${c.hitDieStr} Can Zarı</span>
          </div>
          <div class="feat-prereq">
            <strong>Ana Stat:</strong> ${escapeHTML(c.primaryStats.join(', '))} &nbsp; | &nbsp;
            <strong>Saving Throws:</strong> ${escapeHTML(c.savingThrowsStr)}
          </div>
          <div class="feat-card-desc" style="margin-bottom: 12px;">
            ${escapeHTML(c.shortDesc)}
          </div>
          <div class="feat-card-actions">
            <button class="btn btn-accent btn-sm btn-select-class-action" data-class-id="${c.id}" style="${isSelected ? 'background:#059669; border-color:#34d399;' : ''}">
              ${isSelected ? '✅ Seçili (Seviyeyi Güncelle)' : '⚔️ Bu Sınıfı Seç'}
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.btn-select-class-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-class-id');
        const c = window.DnDNexus.CLASSES_DATA.find(cls => cls.id === cId);
        if (c) {
          window.DnDNexus.applyClassToCharacter(c, selectedLevel);
        }
      });
    });
  };

  window.DnDNexus.applyClassToCharacter = function(classObj, level) {
    const classLevelInput = document.getElementById('char-class-level');
    if (classLevelInput) {
      classLevelInput.value = `${classObj.name.split(' ')[0]} ${level}`;
    }

    // 1. Auto Check Saving Throw Proficiencies
    const savesList = ['save-str', 'save-dex', 'save-con', 'save-int', 'save-wis', 'save-cha'];
    savesList.forEach(sId => {
      const chk = document.getElementById(`${sId}-prof`);
      if (chk) {
        chk.checked = classObj.savingThrows.includes(sId);
      }
    });

    // 2. Set Spellcasting Ability if Caster
    if (classObj.spellAbility) {
      const spellAbilitySelect = document.getElementById('spell-ability-select');
      if (spellAbilitySelect) {
        spellAbilitySelect.value = classObj.spellAbility;
      }
    }

    // 3. Recalculate stats & spell slots
    window.DnDNexus.calculateAll();

    window.DnDNexus.closeClassModal();
    window.DnDNexus.triggerAutosave();

    // 4. If Level >= 3, automatically open Subclass selector modal!
    if (level >= 3 && window.DnDNexus.openSubclassModal) {
      setTimeout(() => {
        window.DnDNexus.openSubclassModal(classObj.id);
      }, 300);
    } else {
      alert(`✅ Sınıf Seçildi: ${classObj.name} (Seviye ${level})\nSaving Throw yetkinlikleri ve istatistikler otomatik ayarlandı!`);
    }
  };
})();
