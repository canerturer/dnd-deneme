/**
 * D&D 5e Nexus - Class Resources & Feature Trackers Engine
 * Manages Monk Ki Points, Fighter Maneuvers, Barbarian Rage, Sorcery Points, Feat Trackers,
 * Short/Long Rest automatic recovery, PHB 2024 Rulebook Auto-Calculator, and DM live synchronization.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  window.DnDNexus.characterTrackers = window.DnDNexus.characterTrackers || [];

  /**
   * Pre-configured Quick Presets for common 5e (2024) Class Features and Feats
   */
  window.DnDNexus.RESOURCE_PRESETS = [
    {
      id: 'monk-ki',
      name: '☯️ Ki / Focus Points (Monk)',
      max: 3,
      current: 3,
      reset: 'short',
      category: 'Monk'
    },
    {
      id: 'fighter-maneuvers',
      name: '⚔️ Superiority / Manevra Zarı (Fighter)',
      max: 4,
      current: 4,
      reset: 'short',
      category: 'Fighter'
    },
    {
      id: 'barbarian-rage',
      name: '😡 Rage / Öfke Hakları (Barbarian)',
      max: 3,
      current: 3,
      reset: 'long',
      category: 'Barbarian'
    },
    {
      id: 'bardic-inspiration',
      name: '🎵 Bardic Inspiration (Bard)',
      max: 3,
      current: 3,
      reset: 'short',
      category: 'Bard'
    },
    {
      id: 'sorcery-points',
      name: '⚡ Sorcery Points (Sorcerer)',
      max: 3,
      current: 3,
      reset: 'long',
      category: 'Sorcerer'
    },
    {
      id: 'channel-divinity',
      name: '✝️ Channel Divinity (Cleric / Paladin)',
      max: 2,
      current: 2,
      reset: 'short',
      category: 'Cleric/Paladin'
    },
    {
      id: 'feat-lucky',
      name: '🎲 Feat: Lucky Points',
      max: 2,
      current: 2,
      reset: 'long',
      category: 'Feats'
    },
    {
      id: 'feat-magic-initiate',
      name: '🔮 Feat: Magic Initiate (Level 1 Free Cast)',
      max: 1,
      current: 1,
      reset: 'long',
      category: 'Feats'
    }
  ];

  /**
   * Initializes Resource Trackers UI components and listeners
   */
  window.DnDNexus.initResourceTrackers = function() {
    const btnAddPresetSelect = document.getElementById('preset-resource-select');
    const btnOpenCustomModal = document.getElementById('btn-open-custom-resource-modal');
    const modal = document.getElementById('modal-custom-resource');
    const btnCloseModal = document.getElementById('btn-close-resource-modal');
    const btnSaveCustomResource = document.getElementById('btn-save-custom-resource');

    btnAddPresetSelect?.addEventListener('change', (e) => {
      const presetId = e.target.value;
      if (!presetId) return;

      const presetObj = window.DnDNexus.RESOURCE_PRESETS.find(p => p.id === presetId);
      if (presetObj) {
        window.DnDNexus.addResourceTracker(presetObj);
      }
      e.target.value = '';
    });

    btnOpenCustomModal?.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
      }
    });

    btnCloseModal?.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
      }
    });

    modal?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-custom-resource') {
        modal.classList.remove('active');
        modal.style.display = 'none';
      }
    });

    btnSaveCustomResource?.addEventListener('click', () => {
      const nameInput = document.getElementById('custom-res-name');
      const maxInput = document.getElementById('custom-res-max');
      const resetSelect = document.getElementById('custom-res-reset');

      const name = nameInput?.value.trim();
      const maxVal = parseInt(maxInput?.value) || 1;
      const resetType = resetSelect?.value || 'long';

      if (!name) {
        alert('Lütfen kaynak için bir isim girin!');
        return;
      }

      const id = 'res-' + Date.now();
      window.DnDNexus.addResourceTracker({
        id,
        name,
        max: maxVal,
        current: maxVal,
        reset: resetType,
        category: 'Custom'
      });

      if (nameInput) nameInput.value = '';
      if (maxInput) maxInput.value = '3';
      if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
      }
    });

    window.DnDNexus.autoSyncRulebookResources();
  };

  /**
   * Automatically parses Class/Level & Feats, calculating 2024 PHB official resource amounts.
   */
  window.DnDNexus.autoSyncRulebookResources = function() {
    const classLevelInput = document.getElementById('char-class-level')?.value || '';
    const profInput = document.getElementById('prof-bonus-override');
    const profBonus = parseInt(profInput ? profInput.value.replace('+', '') : '2') || 2;

    // Stat Mods
    const chaMod = Math.floor(((parseInt(document.getElementById('cha-score')?.value) || 10) - 10) / 2);

    // Active Feats
    const activeFeats = window.DnDNexus.characterFeats || [];

    // Parse Class Levels (supports Turkish & English class names)
    const classLower = classLevelInput.toLowerCase();

    function parseLevelForClass(keywords) {
      let totalLvl = 0;
      keywords.forEach(kw => {
        const reg = new RegExp(`(?:${kw})\\s*(\\d+)`, 'i');
        const m = classLower.match(reg);
        if (m) {
          totalLvl += parseInt(m[1]) || 0;
        }
      });
      // Fallback: If class name is present without number (e.g. "Monk"), default to Level 1
      if (totalLvl === 0) {
        const containsClass = keywords.some(kw => classLower.includes(kw));
        if (containsClass) {
          const numMatch = classLower.match(/\d+/);
          totalLvl = numMatch ? (parseInt(numMatch[0]) || 1) : 1;
        }
      }
      return totalLvl;
    }

    const monkLvl = parseLevelForClass(['monk', 'keşiş', 'kesis']);
    const fighterLvl = parseLevelForClass(['fighter', 'savaşçı', 'savasci']);
    const barbLvl = parseLevelForClass(['barbarian', 'barbar']);
    const bardLvl = parseLevelForClass(['bard', 'ozan']);
    const sorcererLvl = parseLevelForClass(['sorcerer', 'büyücü', 'buyucu']);
    const clericLvl = parseLevelForClass(['cleric', 'ruhban']);
    const paladinLvl = parseLevelForClass(['paladin', 'şövalye', 'sovalye']);

    const autoResources = [];

    // 1. MONK (2024 PHB: Focus Points = Monk Level at L2+)
    if (monkLvl >= 2) {
      autoResources.push({
        id: 'auto-monk-focus',
        name: '☯️ Ki / Focus Points (Monk)',
        max: monkLvl,
        reset: 'short',
        category: 'Monk'
      });
      autoResources.push({
        id: 'auto-monk-metabolism',
        name: '🧘 Uncanny Metabolism (Monk)',
        max: 1,
        reset: 'long',
        category: 'Monk'
      });
    }

    // 2. FIGHTER (2024 PHB: Second Wind uses, Action Surge at L2+, Superiority Dice if Battle Master)
    if (fighterLvl >= 1) {
      let secondWindMax = fighterLvl >= 10 ? 4 : (fighterLvl >= 4 ? 3 : 2);
      autoResources.push({
        id: 'auto-fighter-second-wind',
        name: '🛡️ Second Wind (Fighter)',
        max: secondWindMax,
        reset: 'short',
        category: 'Fighter'
      });
    }
    if (fighterLvl >= 2) {
      let actionSurgeMax = fighterLvl >= 17 ? 2 : 1;
      autoResources.push({
        id: 'auto-fighter-action-surge',
        name: '⚡ Action Surge (Fighter)',
        max: actionSurgeMax,
        reset: 'short',
        category: 'Fighter'
      });
    }
    if (fighterLvl >= 3 || classLower.includes('battle master') || classLower.includes('manevra')) {
      let diceCount = fighterLvl >= 15 ? 6 : (fighterLvl >= 7 ? 5 : 4);
      autoResources.push({
        id: 'auto-fighter-maneuvers',
        name: '⚔️ Superiority / Manevra Zarı',
        max: diceCount,
        reset: 'short',
        category: 'Fighter'
      });
    }

    // 3. BARBARIAN (2024 PHB: Rage charges)
    if (barbLvl >= 1) {
      let rageMax = barbLvl >= 20 ? 99 : (barbLvl >= 17 ? 6 : (barbLvl >= 12 ? 5 : (barbLvl >= 6 ? 4 : (barbLvl >= 3 ? 3 : 2))));
      autoResources.push({
        id: 'auto-barbarian-rage',
        name: '😡 Rage / Öfke Hakları',
        max: rageMax,
        reset: 'long',
        category: 'Barbarian'
      });
    }

    // 4. BARD (2024 PHB: Bardic Inspiration = CHA Mod, min 1)
    if (bardLvl >= 1) {
      let bardicMax = Math.max(1, chaMod);
      autoResources.push({
        id: 'auto-bardic-inspiration',
        name: '🎵 Bardic Inspiration',
        max: bardicMax,
        reset: bardLvl >= 5 ? 'short' : 'long',
        category: 'Bard'
      });
    }

    // 5. SORCERER (2024 PHB: Sorcery Points = Level at L2+, Innate Sorcery)
    if (sorcererLvl >= 1) {
      autoResources.push({
        id: 'auto-innate-sorcery',
        name: '✨ Innate Sorcery',
        max: 2,
        reset: 'long',
        category: 'Sorcerer'
      });
    }
    if (sorcererLvl >= 2) {
      autoResources.push({
        id: 'auto-sorcery-points',
        name: '⚡ Sorcery Points',
        max: sorcererLvl,
        reset: 'long',
        category: 'Sorcerer'
      });
    }

    // 6. CLERIC / PALADIN (Channel Divinity)
    let channelLvl = (clericLvl >= 2 ? clericLvl : 0) + (paladinLvl >= 2 ? paladinLvl : 0);
    if (channelLvl >= 2) {
      let channelMax = channelLvl >= 18 ? 4 : (channelLvl >= 6 ? 3 : 2);
      autoResources.push({
        id: 'auto-channel-divinity',
        name: '✝️ Channel Divinity',
        max: channelMax,
        reset: 'short',
        category: 'Cleric/Paladin'
      });
    }

    // 7. FEATS AUTO-RESOURCES
    activeFeats.forEach(feat => {
      const fId = (feat.id || '').toLowerCase();
      const fName = (feat.name || '').toLowerCase();

      if (fId.includes('lucky') || fName.includes('lucky')) {
        autoResources.push({
          id: 'auto-feat-lucky',
          name: '🎲 Feat: Lucky Points',
          max: profBonus,
          reset: 'long',
          category: 'Feats'
        });
      }

      if (fId.includes('magic-initiate') || fName.includes('magic initiate')) {
        autoResources.push({
          id: 'auto-feat-magic-initiate',
          name: '🔮 Feat: Magic Initiate (Free Spell)',
          max: 1,
          reset: 'long',
          category: 'Feats'
        });
      }

      if (fId.includes('musician') || fName.includes('musician')) {
        autoResources.push({
          id: 'auto-feat-musician',
          name: '🎶 Feat: Musician (Heroic Insp)',
          max: profBonus,
          reset: 'short',
          category: 'Feats'
        });
      }

      if (fId.includes('healer') || fName.includes('healer')) {
        autoResources.push({
          id: 'auto-feat-healer',
          name: '🩹 Feat: Healer (Battle Medic)',
          max: profBonus,
          reset: 'long',
          category: 'Feats'
        });
      }
    });

    // Sync autoResources into window.DnDNexus.characterTrackers
    autoResources.forEach(autoRes => {
      const existing = window.DnDNexus.characterTrackers.find(t => t.id === autoRes.id);
      if (existing) {
        if (existing.max !== autoRes.max) {
          let diff = autoRes.max - existing.max;
          existing.max = autoRes.max;
          existing.current = Math.min(existing.max, Math.max(0, existing.current + diff));
        }
        existing.name = autoRes.name;
        existing.reset = autoRes.reset;
      } else {
        window.DnDNexus.characterTrackers.push({
          id: autoRes.id,
          name: autoRes.name,
          max: autoRes.max,
          current: autoRes.max,
          reset: autoRes.reset,
          category: autoRes.category,
          isRulebookAuto: true
        });
      }
    });

    // Clean up auto rulebook trackers if class/feat was removed
    const validAutoIds = new Set(autoResources.map(r => r.id));
    window.DnDNexus.characterTrackers = window.DnDNexus.characterTrackers.filter(t => {
      if (t.isRulebookAuto || t.id.startsWith('auto-')) {
        return validAutoIds.has(t.id);
      }
      return true;
    });

    window.DnDNexus.renderResourceTrackers();
  };

  /**
   * Adds a new resource tracker to character state
   */
  window.DnDNexus.addResourceTracker = function(resourceObj) {
    const existingIndex = window.DnDNexus.characterTrackers.findIndex(t => t.id === resourceObj.id);
    if (existingIndex !== -1) {
      window.DnDNexus.characterTrackers[existingIndex].current = window.DnDNexus.characterTrackers[existingIndex].max;
    } else {
      window.DnDNexus.characterTrackers.push({
        id: resourceObj.id || ('res-' + Date.now()),
        name: resourceObj.name,
        max: parseInt(resourceObj.max) || 1,
        current: parseInt(resourceObj.current) !== undefined ? parseInt(resourceObj.current) : (parseInt(resourceObj.max) || 1),
        reset: resourceObj.reset || 'long',
        category: resourceObj.category || 'General'
      });
    }

    window.DnDNexus.renderResourceTrackers();
    window.DnDNexus.triggerAutosave();
  };

  /**
   * Modifies current value of a resource tracker
   */
  window.DnDNexus.modifyTrackerValue = function(id, delta) {
    const tracker = window.DnDNexus.characterTrackers.find(t => t.id === id);
    if (!tracker) return;

    tracker.current = Math.min(tracker.max, Math.max(0, tracker.current + delta));
    window.DnDNexus.renderResourceTrackers();
    window.DnDNexus.triggerAutosave();
  };

  /**
   * Sets max value of a resource tracker
   */
  window.DnDNexus.setTrackerMax = function(id, newMax) {
    const tracker = window.DnDNexus.characterTrackers.find(t => t.id === id);
    if (!tracker) return;

    const parsedMax = Math.max(1, parseInt(newMax) || 1);
    tracker.max = parsedMax;
    tracker.current = Math.min(tracker.current, parsedMax);
    window.DnDNexus.renderResourceTrackers();
    window.DnDNexus.triggerAutosave();
  };

  /**
   * Deletes a resource tracker
   */
  window.DnDNexus.deleteResourceTracker = function(id) {
    window.DnDNexus.characterTrackers = window.DnDNexus.characterTrackers.filter(t => t.id !== id);
    window.DnDNexus.renderResourceTrackers();
    window.DnDNexus.triggerAutosave();
  };

  /**
   * Resets trackers on Short or Long Rest
   */
  window.DnDNexus.resetTrackersOnRest = function(restType) {
    window.DnDNexus.characterTrackers.forEach(tracker => {
      if (restType === 'long') {
        tracker.current = tracker.max;
      } else if (restType === 'short') {
        if (tracker.reset === 'short' || tracker.reset === 'both') {
          tracker.current = tracker.max;
        }
      }
    });

    window.DnDNexus.renderResourceTrackers();
  };

  /**
   * Renders Resource Trackers in Column 2 panel
   */
  window.DnDNexus.renderResourceTrackers = function() {
    const container = document.getElementById('resource-trackers-list');
    if (!container) return;

    if (!window.DnDNexus.characterTrackers || window.DnDNexus.characterTrackers.length === 0) {
      container.innerHTML = `
        <div class="empty-resources-msg">
          Henüz sınıf veya yetenek kaynağı eklenmedi. Sınıfınızı ve Seviyenizi yukarıya girdiğinizde (örn: "Monk 4", "Savaşçı 5") kural kitabına göre otomatik eklenecektir.
        </div>
      `;
      return;
    }

    container.innerHTML = window.DnDNexus.characterTrackers.map(tracker => {
      const resetBadgeText = tracker.reset === 'short' ? '☕ Kısa Dinlenme' : (tracker.reset === 'long' ? '🌙 Uzun Dinlenme' : '⚙️ Manuel');
      const resetBadgeClass = tracker.reset === 'short' ? 'badge-short-rest' : 'badge-long-rest';

      // Generate clickable counter bubbles
      let pipsHTML = '';
      for (let i = 1; i <= tracker.max; i++) {
        const isFilled = i <= tracker.current;
        pipsHTML += `
          <button class="resource-pip ${isFilled ? 'filled' : 'empty'}" 
                  title="${isFilled ? 'Harca' : 'Doldur'}" 
                  onclick="window.DnDNexus.modifyTrackerValue('${tracker.id}', ${isFilled ? -1 : 1})">
            ${isFilled ? '●' : '○'}
          </button>
        `;
      }

      return `
        <div class="resource-tracker-card">
          <div class="resource-card-top">
            <div class="resource-title-group">
              <span class="resource-name">${escapeHTML(tracker.name)}</span>
              <span class="resource-reset-badge ${resetBadgeClass}">${resetBadgeText}</span>
            </div>
            <button class="btn-del-resource" title="Kaynağı Sil" onclick="window.DnDNexus.deleteResourceTracker('${tracker.id}')">&times;</button>
          </div>

          <div class="resource-pips-row">
            ${pipsHTML}
          </div>

          <div class="resource-card-bottom">
            <div class="resource-count-label">
              Kalan: <strong>${tracker.current}</strong> / 
              Max: <input type="number" value="${tracker.max}" min="1" max="99" class="resource-max-input" onchange="window.DnDNexus.setTrackerMax('${tracker.id}', this.value)">
            </div>
            <div class="resource-quick-buttons">
              <button class="btn-res-action sub" onclick="window.DnDNexus.modifyTrackerValue('${tracker.id}', -1)">-1 Harca</button>
              <button class="btn-res-action add" onclick="window.DnDNexus.modifyTrackerValue('${tracker.id}', 1)">+1 Ekle</button>
              <button class="btn-res-action reset" onclick="window.DnDNexus.modifyTrackerValue('${tracker.id}', ${tracker.max})">🔄 Yenile</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
