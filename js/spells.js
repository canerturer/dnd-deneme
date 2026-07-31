/**
 * D&D 5e Nexus - Visual Spell Slots & Spellbook Module
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.initSpellSlotBubbles = function() {
  for (let lvl = 1; lvl <= 9; lvl++) {
    const maxInput = document.getElementById(`slots-${lvl}-max`);
    if (maxInput) {
      maxInput.addEventListener('input', () => {
        window.DnDNexus.renderSpellSlotBubbles(lvl, true);
        window.DnDNexus.triggerAutosave();
      });
    }
    window.DnDNexus.renderSpellSlotBubbles(lvl);
  }
};

/**
 * Universal Auto Spell Slot Calculation Engine for 2024 PHB Classes and Subclasses (Levels 1 to 20)
 */
window.DnDNexus.autoUpdateSpellSlots = function(classLower, subclassLower, totalLevel, spellAbilitySelect) {
  const isBard = classLower.includes('bard') || classLower.includes('ozan');
  const isCleric = classLower.includes('cleric') || classLower.includes('ruhban');
  const isDruid = classLower.includes('druid');
  const isSorcerer = classLower.includes('sorcerer') || classLower.includes('soysoylu');
  const isWizard = classLower.includes('wizard') || classLower.includes('bilgin') || classLower.includes('büyücü') || classLower.includes('buyucu');

  const isFullCaster = isBard || isCleric || isDruid || isSorcerer || isWizard;
  
  const isPaladin = classLower.includes('paladin') || classLower.includes('şövalye') || classLower.includes('sovalye');
  const isRanger = classLower.includes('ranger') || classLower.includes('korucu');
  const isHalfCaster = isPaladin || isRanger;

  const isWarlock = classLower.includes('warlock') || classLower.includes('efsunbaz');

  const isEldritchKnight = subclassLower.includes('eldritch') || subclassLower.includes('büyülü şövalye') || subclassLower.includes('buyulu');
  const isArcaneTrickster = subclassLower.includes('arcane') || subclassLower.includes('düzenbaz') || subclassLower.includes('hırsız');
  const isThirdCaster = isEldritchKnight || isArcaneTrickster;

  // Auto-set default spellcasting stat if user hasn't locked it
  if (spellAbilitySelect && !spellAbilitySelect.dataset.userChanged) {
    if (isBard || isSorcerer || isWarlock || isPaladin) {
      spellAbilitySelect.value = 'cha';
    } else if (isCleric || isDruid || isRanger) {
      spellAbilitySelect.value = 'wis';
    } else if (isWizard || isThirdCaster) {
      spellAbilitySelect.value = 'int';
    }
  }

  let calculatedSlots = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const safeLvl = Math.max(1, Math.min(20, parseInt(totalLevel) || 1));

  if (isFullCaster) {
    const fullCasterTable = {
      1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
      2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
      3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
      4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
      5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
      6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
      7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
      8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
      9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
      10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
      11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
      12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
      13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
      14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
      15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
      16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
      17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
      18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
      19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
      20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
    };
    calculatedSlots = fullCasterTable[safeLvl] || [4, 3, 3, 3, 3, 2, 2, 1, 1];
  } else if (isHalfCaster) {
    const halfCasterTable = {
      1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
      2:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
      3:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
      4:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
      5:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
      6:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
      7:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
      8:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
      9:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
      10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
      11: [4, 3, 3, 0, 0, 0, 0, 0, 0],
      12: [4, 3, 3, 0, 0, 0, 0, 0, 0],
      13: [4, 3, 3, 1, 0, 0, 0, 0, 0],
      14: [4, 3, 3, 1, 0, 0, 0, 0, 0],
      15: [4, 3, 3, 2, 0, 0, 0, 0, 0],
      16: [4, 3, 3, 2, 0, 0, 0, 0, 0],
      17: [4, 3, 3, 3, 1, 0, 0, 0, 0],
      18: [4, 3, 3, 3, 1, 0, 0, 0, 0],
      19: [4, 3, 3, 3, 2, 0, 0, 0, 0],
      20: [4, 3, 3, 3, 2, 0, 0, 0, 0]
    };
    calculatedSlots = halfCasterTable[safeLvl] || [4, 3, 3, 3, 2, 0, 0, 0, 0];
  } else if (isThirdCaster) {
    const thirdCasterTable = {
      1:  [0, 0, 0, 0, 0, 0, 0, 0, 0],
      2:  [0, 0, 0, 0, 0, 0, 0, 0, 0],
      3:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
      4:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
      5:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
      6:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
      7:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
      8:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
      9:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
      10: [4, 3, 0, 0, 0, 0, 0, 0, 0],
      11: [4, 3, 0, 0, 0, 0, 0, 0, 0],
      12: [4, 3, 0, 0, 0, 0, 0, 0, 0],
      13: [4, 3, 2, 0, 0, 0, 0, 0, 0],
      14: [4, 3, 2, 0, 0, 0, 0, 0, 0],
      15: [4, 3, 2, 0, 0, 0, 0, 0, 0],
      16: [4, 3, 3, 0, 0, 0, 0, 0, 0],
      17: [4, 3, 3, 0, 0, 0, 0, 0, 0],
      18: [4, 3, 3, 0, 0, 0, 0, 0, 0],
      19: [4, 3, 3, 1, 0, 0, 0, 0, 0],
      20: [4, 3, 3, 1, 0, 0, 0, 0, 0]
    };
    calculatedSlots = thirdCasterTable[safeLvl] || [4, 3, 3, 1, 0, 0, 0, 0, 0];
  } else if (isWarlock) {
    const warlockTable = {
      1:  [1, 0, 0, 0, 0, 0, 0, 0, 0],
      2:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
      3:  [0, 2, 0, 0, 0, 0, 0, 0, 0],
      4:  [0, 2, 0, 0, 0, 0, 0, 0, 0],
      5:  [0, 0, 2, 0, 0, 0, 0, 0, 0],
      6:  [0, 0, 2, 0, 0, 0, 0, 0, 0],
      7:  [0, 0, 0, 2, 0, 0, 0, 0, 0],
      8:  [0, 0, 0, 2, 0, 0, 0, 0, 0],
      9:  [0, 0, 0, 0, 2, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 2, 0, 0, 0, 0],
      11: [0, 0, 0, 0, 3, 0, 0, 0, 0],
      12: [0, 0, 0, 0, 3, 0, 0, 0, 0],
      13: [0, 0, 0, 0, 3, 0, 0, 0, 0],
      14: [0, 0, 0, 0, 3, 0, 0, 0, 0],
      15: [0, 0, 0, 0, 3, 0, 0, 0, 0],
      16: [0, 0, 0, 0, 3, 0, 0, 0, 0],
      17: [0, 0, 0, 0, 4, 0, 0, 0, 0],
      18: [0, 0, 0, 0, 4, 0, 0, 0, 0],
      19: [0, 0, 0, 0, 4, 0, 0, 0, 0],
      20: [0, 0, 0, 0, 4, 0, 0, 0, 0]
    };
    calculatedSlots = warlockTable[safeLvl] || [0, 0, 0, 0, 4, 0, 0, 0, 0];
  }

  // Apply calculated slot values to inputs and re-render bubbles for levels 1 to 9
  for (let lvl = 1; lvl <= 9; lvl++) {
    const slotInput = document.getElementById(`slots-${lvl}-max`);
    if (slotInput) {
      slotInput.value = calculatedSlots[lvl - 1];
      if (window.DnDNexus.renderSpellSlotBubbles) {
        window.DnDNexus.renderSpellSlotBubbles(lvl);
      }
    }
  }
};

window.DnDNexus.renderSpellSlotBubbles = function(lvl, resetState = false) {
  const maxInput = document.getElementById(`slots-${lvl}-max`);
  const container = document.getElementById(`slot-bubbles-${lvl}`);
  const badge = document.getElementById(`slot-badge-${lvl}`);
  if (!container || !maxInput) return;

  let max = Math.max(0, parseInt(maxInput.value) || 0);
  
  if (resetState || !window.DnDNexus.spellSlotStates[lvl] || window.DnDNexus.spellSlotStates[lvl].length !== max) {
    window.DnDNexus.spellSlotStates[lvl] = Array(max).fill(true);
  }

  let availableCount = window.DnDNexus.spellSlotStates[lvl].filter(Boolean).length;
  if (badge) badge.textContent = `${availableCount}/${max}`;

  container.innerHTML = '';
  if (max === 0) {
    container.innerHTML = `<span style="font-size:0.75rem; color:#c084fc;">Slot yok</span>`;
    return;
  }

  for (let i = 0; i < max; i++) {
    const bubble = document.createElement('div');
    const isAvail = window.DnDNexus.spellSlotStates[lvl][i];
    bubble.className = `slot-bubble ${isAvail ? 'active' : 'spent'}`;
    bubble.title = isAvail ? 'Slot Kullanılabilir (Kullanmak için tıkla)' : 'Slot Harcandı (Yenilemek için tıkla)';
    bubble.innerHTML = isAvail ? '●' : '○';

    bubble.addEventListener('click', () => {
      window.DnDNexus.spellSlotStates[lvl][i] = !window.DnDNexus.spellSlotStates[lvl][i];
      window.DnDNexus.renderSpellSlotBubbles(lvl);
      window.DnDNexus.triggerAutosave();
    });

    container.appendChild(bubble);
  }
};

window.DnDNexus.initSpellsTable = function() {
  const tbody = document.getElementById('spells-tbody');
  if (tbody && tbody.children.length === 0) {
    window.DnDNexus.addSpellRow(true, 'Fire Bolt', '0', '36m / 1d10 Ateş');
    window.DnDNexus.addSpellRow(true, 'Magic Missile', '1', '36m / 3x 1d4+1');
  }
};

window.DnDNexus.addSpellRow = function(prep = true, name = '', level = '1', range = '') {
  const tbody = document.getElementById('spells-tbody');
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td style="text-align:center;"><input type="checkbox" class="custom-checkbox spell-prep-check" ${prep ? 'checked' : ''}></td>
    <td><input type="text" class="spell-name" placeholder="Büyü Adı" value="${name}"></td>
    <td><input type="text" class="spell-level" placeholder="1" value="${level}" style="width:40px; text-align:center;"></td>
    <td><input type="text" class="spell-range" placeholder="36m" value="${range}"></td>
    <td class="no-print">
      <button class="btn-cast-spell" title="Büyüyü At / Atış Yap">🎲 At</button>
      <button class="btn-del-weapon btn-del-spell" title="Sil">&times;</button>
    </td>
  `;
  tbody.appendChild(tr);

  tr.querySelector('.btn-del-spell').addEventListener('click', () => {
    tr.remove();
    window.DnDNexus.triggerAutosave();
  });

  tr.querySelector('.btn-cast-spell').addEventListener('click', () => {
    const sName = tr.querySelector('.spell-name').value || 'Büyü';
    let sLvl = parseInt(tr.querySelector('.spell-level').value) || 0;

    if (sLvl > 0 && sLvl <= 6) {
      let states = window.DnDNexus.spellSlotStates[sLvl] || [];
      let firstAvailableIdx = states.findIndex(s => s === true);

      if (firstAvailableIdx !== -1) {
        states[firstAvailableIdx] = false;
        window.DnDNexus.renderSpellSlotBubbles(sLvl);
        window.DnDNexus.triggerAutosave();
      } else {
        alert(`${sLvl}. Seviye büyü slotunuz kalmadı!`);
      }
    }

    let atkBonusText = document.getElementById('spell-attack-bonus').textContent;
    let mod = parseInt(atkBonusText.replace('+', '')) || 0;
    window.DnDNexus.openDiceModal(20, 1, mod, `Büyü Atışı: ${sName}`);
  });

  tr.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', window.DnDNexus.triggerAutosave);
  });
};
