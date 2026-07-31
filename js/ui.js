/**
 * D&D 5e Nexus - UI Renderer & Calculation Engine
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.getSavingThrowsData = function() {
  const i18n = window.DnDNexus.i18n;
  return [
    { id: 'save-str', stat: 'str', label: i18n ? i18n.getText('save_str') : 'Güç (STR)' },
    { id: 'save-dex', stat: 'dex', label: i18n ? i18n.getText('save_dex') : 'El Çabukluğu (DEX)' },
    { id: 'save-con', stat: 'con', label: i18n ? i18n.getText('save_con') : 'Dayanıklılık (CON)' },
    { id: 'save-int', stat: 'int', label: i18n ? i18n.getText('save_int') : 'Zeka (INT)' },
    { id: 'save-wis', stat: 'wis', label: i18n ? i18n.getText('save_wis') : 'Bilgelik (WIS)' },
    { id: 'save-cha', stat: 'cha', label: i18n ? i18n.getText('save_cha') : 'Karizma (CHA)' }
  ];
};

window.DnDNexus.getSkillsData = function() {
  return [
    { id: 'skill-acrobatics', stat: 'dex', labelKey: 'skill_acrobatics' },
    { id: 'skill-animal-handling', stat: 'wis', labelKey: 'skill_animal_handling' },
    { id: 'skill-arcana', stat: 'int', labelKey: 'skill_arcana' },
    { id: 'skill-athletics', stat: 'str', labelKey: 'skill_athletics' },
    { id: 'skill-deception', stat: 'cha', labelKey: 'skill_deception' },
    { id: 'skill-history', stat: 'int', labelKey: 'skill_history' },
    { id: 'skill-insight', stat: 'wis', labelKey: 'skill_insight' },
    { id: 'skill-intimidation', stat: 'cha', labelKey: 'skill_intimidation' },
    { id: 'skill-investigation', stat: 'int', labelKey: 'skill_investigation' },
    { id: 'skill-medicine', stat: 'wis', labelKey: 'skill_medicine' },
    { id: 'skill-nature', stat: 'int', labelKey: 'skill_nature' },
    { id: 'skill-perception', stat: 'wis', labelKey: 'skill_perception' },
    { id: 'skill-performance', stat: 'cha', labelKey: 'skill_performance' },
    { id: 'skill-persuasion', stat: 'cha', labelKey: 'skill_persuasion' },
    { id: 'skill-religion', stat: 'int', labelKey: 'skill_religion' },
    { id: 'skill-sleight-of-hand', stat: 'dex', labelKey: 'skill_sleight_of_hand' },
    { id: 'skill-stealth', stat: 'dex', labelKey: 'skill_stealth' },
    { id: 'skill-survival', stat: 'wis', labelKey: 'skill_survival' }
  ];
};

// Backwards compatibility aliases
window.DnDNexus.SAVING_THROWS_DATA = window.DnDNexus.getSavingThrowsData();
window.DnDNexus.SKILLS_DATA = window.DnDNexus.getSkillsData().map(s => ({ id: s.id, stat: s.stat, label: s.labelKey }));

window.DnDNexus.initSavingThrows = function() {
  const container = document.getElementById('saving-throws-list');
  if (!container) return;

  const savedChecks = {};
  container.querySelectorAll('.save-prof-check').forEach(chk => {
    savedChecks[chk.id] = chk.checked;
  });

  container.innerHTML = '';
  const saves = window.DnDNexus.getSavingThrowsData();
  saves.forEach(save => {
    const item = document.createElement('div');
    item.className = 'check-item';
    const isChecked = savedChecks[`${save.id}-prof`] ? 'checked' : '';
    item.innerHTML = `
      <input type="checkbox" id="${save.id}-prof" class="custom-checkbox save-prof-check" data-stat="${save.stat}" data-save-id="${save.id}" ${isChecked}>
      <span class="val-badge" id="${save.id}-val">+0</span>
      <span class="item-label">${save.label}</span>
      <button class="roll-inline-btn" data-roll-type="save" data-name="${save.label}" data-val-id="${save.id}-val" title="Zar At">🎲</button>
    `;
    container.appendChild(item);
  });
};

window.DnDNexus.initSkills = function() {
  const container = document.getElementById('skills-list');
  if (!container) return;

  const savedStates = {};
  container.querySelectorAll('.skill-prof-toggle').forEach(tgl => {
    savedStates[tgl.id] = tgl.getAttribute('data-state') || '0';
  });

  container.innerHTML = '';
  const skills = window.DnDNexus.getSkillsData();
  const i18n = window.DnDNexus.i18n;

  skills.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'check-item';
    const state = savedStates[`${skill.id}-prof`] || '0';
    let indicatorChar = '○';
    if (state === '1') indicatorChar = '●';
    else if (state === '2') indicatorChar = '✪';

    const translatedLabel = i18n ? i18n.getText(skill.labelKey) : skill.labelKey;

    item.innerHTML = `
      <button class="skill-prof-toggle" id="${skill.id}-prof" data-state="${state}" data-stat="${skill.stat}" data-skill-id="${skill.id}" title="0: None, 1: Proficient, 2: Expert">
        <span class="prof-indicator">${indicatorChar}</span>
      </button>
      <span class="val-badge" id="${skill.id}-val">+0</span>
      <span class="item-label">${translatedLabel} <span class="stat-tag">(${skill.stat.toUpperCase()})</span></span>
      <button class="roll-inline-btn" data-roll-type="skill" data-name="${translatedLabel}" data-val-id="${skill.id}-val" title="Zar At">🎲</button>
    `;
    container.appendChild(item);
  });
};

window.DnDNexus.calculateAll = function() {
  const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const mods = {};

  stats.forEach(stat => {
    const scoreInput = document.getElementById(`${stat}-score`);
    if (scoreInput) {
      let score = parseInt(scoreInput.value) || 10;
      let mod = Math.floor((score - 10) / 2);
      mods[stat] = mod;
      const modDisplay = document.getElementById(`${stat}-mod-display`);
      if (modDisplay) modDisplay.textContent = mod >= 0 ? `+${mod}` : `${mod}`;
    }
  });

  // 1. Level & Class Parsing
  const classLevelInput = document.getElementById('char-class-level')?.value || '';
  const classLower = classLevelInput.toLowerCase();
  
  let totalLevel = 0;
  const numMatches = classLower.match(/\d+/g);
  if (numMatches) {
    totalLevel = numMatches.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
  }
  if (totalLevel <= 0) totalLevel = 1;

  // 2. Automated Proficiency Bonus
  const profInput = document.getElementById('prof-bonus-override');
  let autoProfBonus = Math.max(2, Math.min(6, Math.ceil(1 + (totalLevel / 4))));
  
  let profBonus = autoProfBonus;
  if (profInput) {
    if (!profInput.dataset.manualOverride) {
      profInput.value = `+${autoProfBonus}`;
    } else {
      profBonus = parseInt(profInput.value.replace('+', '')) || autoProfBonus;
    }
  }

  // 3. Automated Hit Die & Max HP Calculation
  let hitDieSides = 8; // default d8
  if (classLower.includes('barbarian') || classLower.includes('barbar')) {
    hitDieSides = 12;
  } else if (classLower.includes('fighter') || classLower.includes('savaşçı') || classLower.includes('savasci') || classLower.includes('paladin') || classLower.includes('şövalye') || classLower.includes('ranger') || classLower.includes('korucu')) {
    hitDieSides = 10;
  } else if (classLower.includes('wizard') || classLower.includes('büyücü') || classLower.includes('buyucu') || classLower.includes('sorcerer')) {
    hitDieSides = 6;
  }

  const conMod = mods['con'] || 0;
  let avgPerLevel = Math.floor(hitDieSides / 2) + 1; // 12 -> 7, 10 -> 6, 8 -> 5, 6 -> 4
  let baseMaxHP = (hitDieSides + conMod) + Math.max(0, totalLevel - 1) * (avgPerLevel + conMod);

  // Check Tough Feat (+2 HP per level)
  const activeFeats = window.DnDNexus.characterFeats || [];
  const hasToughFeat = activeFeats.some(f => (f.id || '').includes('tough') || (f.name || '').toLowerCase().includes('tough'));
  if (hasToughFeat) {
    baseMaxHP += (2 * totalLevel);
  }

  const maxHpInput = document.getElementById('hp-max');
  if (maxHpInput && !maxHpInput.dataset.manualOverride) {
    maxHpInput.value = Math.max(1, baseMaxHP);
  }

  // Hit Dice Auto Text
  const hitdiceTotalInput = document.getElementById('hitdice-total');
  if (hitdiceTotalInput && !hitdiceTotalInput.dataset.manualOverride) {
    hitdiceTotalInput.value = `${totalLevel}d${hitDieSides}`;
  }

  // 4. Saving Throws & Skills
  const savesList = window.DnDNexus.getSavingThrowsData();
  savesList.forEach(save => {
    const isProf = document.getElementById(`${save.id}-prof`)?.checked;
    let total = mods[save.stat] + (isProf ? profBonus : 0);
    const valBadge = document.getElementById(`${save.id}-val`);
    if (valBadge) valBadge.textContent = total >= 0 ? `+${total}` : `${total}`;
  });

  const skillsList = window.DnDNexus.getSkillsData();
  skillsList.forEach(skill => {
    const toggleBtn = document.getElementById(`${skill.id}-prof`);
    const state = parseInt(toggleBtn?.getAttribute('data-state')) || 0;
    let multiplier = state === 1 ? 1 : state === 2 ? 2 : 0;
    let total = mods[skill.stat] + (profBonus * multiplier);
    const valBadge = document.getElementById(`${skill.id}-val`);
    if (valBadge) valBadge.textContent = total >= 0 ? `+${total}` : `${total}`;
  });

  const perceptionValBadge = document.getElementById('skill-perception-val');
  let percBonus = parseInt(perceptionValBadge ? perceptionValBadge.textContent : '0') || 0;
  const passiveBox = document.getElementById('passive-perception-val');
  if (passiveBox) passiveBox.textContent = 10 + percBonus;

  // 5. Initiative (DEX Mod + Alert Feat PB Bonus)
  const hasAlertFeat = activeFeats.some(f => (f.id || '').includes('alert') || (f.name || '').toLowerCase().includes('alert'));
  const initInput = document.getElementById('initiative-score');
  if (initInput && !initInput.dataset.manualOverride) {
    let dexMod = mods['dex'] || 0;
    let totalInit = dexMod + (hasAlertFeat ? profBonus : 0);
    initInput.value = totalInit >= 0 ? `+${totalInit}` : `${totalInit}`;
  }

  const spellAbilitySelect = document.getElementById('spell-ability-select');
  const subclassLower = (document.getElementById('char-subclass')?.value || '').toLowerCase();

  // Universal Auto Spell Slot & Spellcasting Stat Engine
  if (window.DnDNexus.autoUpdateSpellSlots) {
    window.DnDNexus.autoUpdateSpellSlots(classLower, subclassLower, totalLevel, spellAbilitySelect);
  }

  let spellAbility = spellAbilitySelect ? spellAbilitySelect.value : 'int';
  let spellMod = mods[spellAbility] || 0;
  let spellSaveDC = 8 + profBonus + spellMod;
  let spellAtk = profBonus + spellMod;

  const dcBox = document.getElementById('spell-save-dc');
  if (dcBox) dcBox.textContent = spellSaveDC;
  const atkBox = document.getElementById('spell-attack-bonus');
  if (atkBox) atkBox.textContent = spellAtk >= 0 ? `+${spellAtk}` : `${spellAtk}`;

  let strScore = parseInt(document.getElementById('str-score')?.value) || 10;
  const capBox = document.getElementById('carrying-capacity-val');
  if (capBox) capBox.textContent = `${strScore * 15} lbs`;

  window.DnDNexus.updateHPBar();

  if (window.DnDNexus.autoSyncRulebookResources) {
    window.DnDNexus.autoSyncRulebookResources();
  }

  if (window.DnDNexus.updateFeatsCapacityBadge) {
    window.DnDNexus.updateFeatsCapacityBadge();
  }

  if (window.DnDNexus.renderSubclassAttacksInSheet) {
    window.DnDNexus.renderSubclassAttacksInSheet();
  }
};

window.DnDNexus.updateHPBar = function() {
  const maxHp = parseInt(document.getElementById('hp-max')?.value) || 1;
  const curHp = parseInt(document.getElementById('hp-current')?.value) || 0;
  const fill = document.getElementById('hp-bar-fill');
  if (!fill) return;

  let pct = Math.max(0, Math.min(100, (curHp / maxHp) * 100));
  fill.style.width = `${pct}%`;

  if (pct > 50) fill.style.background = 'linear-gradient(90deg, #2dd4bf, #06b6d4)';
  else if (pct > 20) fill.style.background = 'linear-gradient(90deg, #c084fc, #a855f7)';
  else fill.style.background = 'linear-gradient(90deg, #fb7185, #f43f5e)';
};

window.DnDNexus.performShortRest = function() {
  const conMod = Math.floor(((parseInt(document.getElementById('con-score').value) || 10) - 10) / 2);
  let roll = Math.floor(Math.random() * 8) + 1;
  let healAmount = Math.max(1, roll + conMod);

  const curHpInput = document.getElementById('hp-current');
  const maxHp = parseInt(document.getElementById('hp-max').value) || 20;
  let oldHp = parseInt(curHpInput.value) || 0;
  let newHp = Math.min(maxHp, oldHp + healAmount);
  curHpInput.value = newHp;

  if (window.DnDNexus.resetTrackersOnRest) {
    window.DnDNexus.resetTrackersOnRest('short');
  }

  window.DnDNexus.updateHPBar();
  window.DnDNexus.triggerAutosave();

  alert(`☕ KISA DİNLENME TAMAMLANDI!\n\n• Atılan Can Zarı: ${roll} (+${conMod} CON)\n• İyileşilen Can: +${healAmount} HP\n• Yeni Can: ${newHp} / ${maxHp} HP\n• Kısa Dinlenme kaynakları (Ki Points, Manevralar) tazelendi!`);
};

window.DnDNexus.performLongRest = function() {
  const maxHp = parseInt(document.getElementById('hp-max').value) || 20;
  document.getElementById('hp-current').value = maxHp;
  document.getElementById('hp-temp').value = 0;

  for (let lvl = 1; lvl <= 6; lvl++) {
    let maxInput = document.getElementById(`slots-${lvl}-max`);
    let max = parseInt(maxInput ? maxInput.value : '0') || 0;
    window.DnDNexus.spellSlotStates[lvl] = Array(max).fill(true);
    window.DnDNexus.renderSpellSlotBubbles(lvl);
  }

  for (let i = 1; i <= 3; i++) {
    let s = document.getElementById(`death-success-${i}`);
    let f = document.getElementById(`death-fail-${i}`);
    if (s) s.checked = false;
    if (f) f.checked = false;
  }

  if (window.DnDNexus.resetTrackersOnRest) {
    window.DnDNexus.resetTrackersOnRest('long');
  }

  window.DnDNexus.updateHPBar();
  window.DnDNexus.triggerAutosave();

  alert(`🌙 UZUN DİNLENME TAMAMLANDI!\n\n• Canınız tamamen yenilendi (${maxHp}/${maxHp} HP).\n• Tüm Büyü Slotlarınız ve Sınıf Kaynaklarınız (Ki, Rage, Feat Hakları) doldu.`);
};

window.DnDNexus.initDMView = function() {
  const codeElem = document.getElementById('dm-campaign-code');
  if (codeElem) codeElem.textContent = window.DnDNexus.currentCampaignCode;
  
  window.DnDNexus.initCheatSheet();

  document.getElementById('btn-copy-invite')?.addEventListener('click', () => {
    const inviteURL = `${window.location.origin}${window.location.pathname}?join=${window.DnDNexus.currentCampaignCode}`;
    navigator.clipboard.writeText(inviteURL).then(() => {
      alert(`Davet Linki Kopyalandı!\n\n${inviteURL}\n\nOyunculara bu linki göndererek kampanyaya ekleyebilirsiniz.`);
    });
  });

  document.getElementById('btn-load-sample-party')?.addEventListener('click', window.DnDNexus.loadSampleParty);

  document.getElementById('btn-new-campaign')?.addEventListener('click', () => {
    const newCode = 'CAMP-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    window.DnDNexus.setCampaignCode(newCode);
    if (codeElem) codeElem.textContent = newCode;
    Object.keys(window.DnDNexus.partyMembers).forEach(k => delete window.DnDNexus.partyMembers[k]);
    window.DnDNexus.savePartyToLocalStorage();
    window.DnDNexus.renderPartyRoster();
    alert(`Yeni Kampanya Oluşturuldu! Kodu: ${newCode}`);
  });

  document.getElementById('btn-add-enemy')?.addEventListener('click', window.DnDNexus.addEnemyToEncounter);
  document.getElementById('btn-roll-sort-initiative')?.addEventListener('click', window.DnDNexus.rollSortEncounterInitiative);
  document.getElementById('btn-next-turn')?.addEventListener('click', window.DnDNexus.nextTurnEncounter);
  document.getElementById('btn-reset-encounter')?.addEventListener('click', window.DnDNexus.resetEncounter);

  document.getElementById('btn-gen-npc')?.addEventListener('click', window.DnDNexus.generateRandomNPC);
  document.getElementById('btn-gen-loot')?.addEventListener('click', window.DnDNexus.generateRandomLoot);

  document.getElementById('btn-dm-group-perception')?.addEventListener('click', () => {
    const party = Object.values(window.DnDNexus.partyMembers);
    if (party.length === 0) return alert('Partide henüz oyuncu yok!');
    let msg = '👁️ GRUBUN PASİF ALGI SKORLARI:\n\n';
    party.forEach(p => {
      let perc = 10 + (parseInt(p['skill-perception-val']) || 0);
      msg += `• ${p['char-name']} (${p['char-player-name'] || 'Oyuncu'}): ${perc}\n`;
    });
    alert(msg);
  });

  document.getElementById('btn-dm-group-initiative')?.addEventListener('click', () => {
    const party = Object.values(window.DnDNexus.partyMembers);
    if (party.length === 0) return alert('Partide henüz oyuncu yok!');
    let results = party.map(p => {
      let dexMod = Math.floor(((parseInt(p['dex-score']) || 10) - 10) / 2);
      let roll = Math.floor(Math.random() * 20) + 1;
      return { name: p['char-name'], roll: roll + dexMod, details: `${roll} + ${dexMod}` };
    });
    results.sort((a, b) => b.roll - a.roll);

    let msg = '🎲 GRUP İNİSİYATİF ATIŞLARI:\n\n';
    results.forEach((r, idx) => {
      msg += `${idx + 1}. ${r.name}: ${r.roll} (${r.details})\n`;
    });
    alert(msg);
  });
};

window.DnDNexus.renderPartyRoster = function() {
  const grid = document.getElementById('party-roster-grid');
  if (!grid) return;

  const party = Object.values(window.DnDNexus.partyMembers);
  const badgeElem = document.getElementById('party-count-badge');
  if (badgeElem) badgeElem.textContent = party.length;

  if (party.length === 0) {
    if (window.DnDNexus.loadSampleParty && !window.DnDNexus._isAutoLoadingSample) {
      window.DnDNexus._isAutoLoadingSample = true;
      window.DnDNexus.loadSampleParty();
      window.DnDNexus._isAutoLoadingSample = false;
    } else {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: #c084fc; padding: 40px; background: rgba(0,0,0,0.2); border-radius: 8px;">
          <span style="font-size: 2rem;">🏰</span><br>
          <strong>Kampanyada henüz oyuncu yok.</strong><br>
          Sağ üstteki "⚔️ Örnek Partiyi Yükle" butonuna basarak oyuncuları ekleyebilirsiniz.
        </div>
      `;
    }
    return;
  }

  grid.innerHTML = '';
  party.forEach(char => {
    const card = document.createElement('div');
    card.className = 'party-card';

    const maxHp = parseInt(char['hp-max']) || 1;
    const curHp = parseInt(char['hp-current']) || 0;
    const pct = Math.max(0, Math.min(100, (curHp / maxHp) * 100));

    const strMod = Math.floor(((parseInt(char['str-score']) || 10) - 10) / 2);
    const dexMod = Math.floor(((parseInt(char['dex-score']) || 10) - 10) / 2);
    const conMod = Math.floor(((parseInt(char['con-score']) || 10) - 10) / 2);
    const intMod = Math.floor(((parseInt(char['int-score']) || 10) - 10) / 2);
    const wisMod = Math.floor(((parseInt(char['wis-score']) || 10) - 10) / 2);
    const chaMod = Math.floor(((parseInt(char['cha-score']) || 10) - 10) / 2);

    const passivePerc = 10 + (parseInt(char['skill-perception-val']) || 0);

    let spellSlotBadges = [];
    for (let lvl = 1; lvl <= 6; lvl++) {
      let max = parseInt(char[`slots-${lvl}-max`]) || 0;
      let states = char[`spellSlotStates-${lvl}`] || [];
      if (max > 0) {
        let avail = states.length > 0 ? states.filter(Boolean).length : max;
        spellSlotBadges.push(`<span class="dm-slot-badge">L${lvl}: ${avail}/${max}</span>`);
      }
    }
    let spellSlotsHTML = spellSlotBadges.length > 0 ? `
      <div class="party-spell-slots-summary">
        <span>🔮 Büyü Slotları:</span> ${spellSlotBadges.join(' ')}
      </div>
    ` : '';

    let activeConds = [];
    ['poisoned', 'blinded', 'charmed', 'frightened', 'invisible', 'prone', 'stunned', 'concentrating'].forEach(c => {
      if (char[`cond-${c}`]) activeConds.push(c.toUpperCase());
    });
    let condHTML = activeConds.length > 0 ? `<div style="font-size:0.75rem; color:#f43f5e; font-weight:bold; margin-top:2px;">⚠️ Durumlar: ${activeConds.join(', ')}</div>` : '';

    card.innerHTML = `
      <div class="party-card-header">
        <div>
          <div class="party-char-name">${char['char-name'] || 'İsimsiz Karakter'}</div>
          <div class="party-char-meta">${char['char-class-level'] || 'Level 1'} &bull; ${char['char-race'] || 'Bilinmiyor'}</div>
          <div class="party-player-name">Oyuncu: ${char['char-player-name'] || 'Oyuncu'}</div>
          ${condHTML}
        </div>
        <div class="dm-card-actions">
          <button class="btn-inspiration-toggle ${char.inspiration ? 'active' : ''}" data-char-id="${char['char-id']}" title="İlhamlık Ver/Al">
            ✨ İlham
          </button>
          <button class="btn-kick-char" data-char-id="${char['char-id']}" title="Partiden Çıkar">&times;</button>
        </div>
      </div>

      <div class="party-vitals-row">
        <div class="vital-box"><div class="vital-label">ZIRH SINIFI</div><div class="vital-value">🛡️ ${char['ac-score'] || '10'}</div></div>
        <div class="vital-box"><div class="vital-label">HIZ</div><div class="vital-value" style="font-size: 0.95rem;">⚡ ${char['speed-score'] || '9m'}</div></div>
        <div class="vital-box"><div class="vital-label">PASİF ALGI</div><div class="vital-value">👁️ ${passivePerc}</div></div>
      </div>

      <div class="party-hp-block">
        <div class="party-hp-header">
          <span>CAN (HP): ${curHp} / ${maxHp}</span>
          <span style="color: ${pct < 25 ? '#f43f5e' : '#2dd4bf'}">%${Math.round(pct)}</span>
        </div>
        <div class="hp-bar-bg">
          <div class="hp-bar-fill" style="width: ${pct}%; background: ${pct > 50 ? 'linear-gradient(90deg, #2dd4bf, #06b6d4)' : pct > 20 ? 'linear-gradient(90deg, #c084fc, #a855f7)' : 'linear-gradient(90deg, #fb7185, #f43f5e)'}"></div>
        </div>
      </div>

      ${spellSlotsHTML}

      ${char.feats && char.feats.length > 0 ? `
        <div class="party-feats-row" style="margin-top: 4px; font-size: 0.78rem; color: #c084fc;">
          <strong>✨ Feat'ler:</strong> ${char.feats.map(f => f.name).join(', ')}
        </div>
      ` : ''}

      ${char.trackers && char.trackers.length > 0 ? `
        <div class="party-trackers-row" style="margin-top: 2px; font-size: 0.78rem; color: #22d3ee;">
          <strong>⚡ Kaynaklar:</strong> ${char.trackers.map(t => `${t.name}: ${t.current}/${t.max}`).join(' | ')}
        </div>
      ` : ''}

      <div class="party-stats-grid">
        <div class="mini-stat"><div class="mini-stat-title">STR</div><div class="mini-stat-val">${strMod >= 0 ? '+' + strMod : strMod}</div></div>
        <div class="mini-stat"><div class="mini-stat-title">DEX</div><div class="mini-stat-val">${dexMod >= 0 ? '+' + dexMod : dexMod}</div></div>
        <div class="mini-stat"><div class="mini-stat-title">CON</div><div class="mini-stat-val">${conMod >= 0 ? '+' + conMod : conMod}</div></div>
        <div class="mini-stat"><div class="mini-stat-title">INT</div><div class="mini-stat-val">${intMod >= 0 ? '+' + intMod : intMod}</div></div>
        <div class="mini-stat"><div class="mini-stat-title">WIS</div><div class="mini-stat-val">${wisMod >= 0 ? '+' + wisMod : wisMod}</div></div>
        <div class="mini-stat"><div class="mini-stat-title">CHA</div><div class="mini-stat-val">${chaMod >= 0 ? '+' + chaMod : chaMod}</div></div>
      </div>

      <button class="btn-inspect-sheet" data-char-id="${char['char-id']}">
        👁️ Tam Karakter Kağıdını Gör / İncele
      </button>

      <textarea class="party-notes-area" placeholder="DM Gizli Notları (Oyuncuya görünmez)...">${char.dmNotes || ''}</textarea>
    `;

    card.querySelector('.btn-inspiration-toggle').addEventListener('click', () => {
      char.inspiration = !char.inspiration;
      window.DnDNexus.savePartyToLocalStorage();
      window.DnDNexus.renderPartyRoster();
      if (window.DnDNexus.syncChannel) {
        window.DnDNexus.syncChannel.postMessage({
          type: 'DM_UPDATE',
          targetCharId: char['char-id'],
          updates: { inspiration: char.inspiration }
        });
      }
    });

    card.querySelector('.btn-kick-char').addEventListener('click', () => {
      delete window.DnDNexus.partyMembers[char['char-id']];
      window.DnDNexus.savePartyToLocalStorage();
      window.DnDNexus.renderPartyRoster();
      window.DnDNexus.syncPartyToEncounter();
    });

    card.querySelector('.btn-inspect-sheet').addEventListener('click', () => {
      window.DnDNexus.openInspectCharModal(char['char-id']);
    });

    card.querySelector('.party-notes-area').addEventListener('input', (e) => {
      char.dmNotes = e.target.value;
      window.DnDNexus.savePartyToLocalStorage();
    });

    grid.appendChild(card);
  });
};

window.DnDNexus.openInspectCharModal = function(charId) {
  const modal = document.getElementById('modal-inspect-char');
  const closeBtn = document.getElementById('btn-close-inspect-modal');
  if (!modal) return;

  const char = window.DnDNexus.partyMembers[charId];
  if (!char) return;

  document.getElementById('inspect-char-name').textContent = char['char-name'] || 'İsimsiz Karakter';
  document.getElementById('inspect-char-meta').textContent = `${char['char-class-level'] || 'Level 1'} • ${char['char-race'] || 'Bilinmeyen Irk'} • Oyuncu: ${char['char-player-name'] || 'Oyuncu'}`;

  // Vitals
  document.getElementById('inspect-ac').textContent = char['ac-score'] || '10';
  document.getElementById('inspect-hp').textContent = `${char['hp-current'] || '0'} / ${char['hp-max'] || '10'}`;
  document.getElementById('inspect-speed').textContent = char['speed-score'] || '9m';
  
  const percVal = parseInt(char['skill-perception-val']) || 0;
  document.getElementById('inspect-passive-perc').textContent = 10 + percVal;
  document.getElementById('inspect-pb').textContent = `+${char['prof-bonus'] || '2'}`;

  // Ability Scores
  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
    let score = parseInt(char[`${stat}-score`]) || 10;
    let mod = Math.floor((score - 10) / 2);
    document.getElementById(`inspect-${stat}`).textContent = `${score} (${mod >= 0 ? '+' + mod : mod})`;
  });

  // Weapons & Attacks
  const weaponsContainer = document.getElementById('inspect-weapons-container');
  if (weaponsContainer) {
    if (char.weapons && char.weapons.length > 0) {
      let rows = char.weapons.map(w => `<div class="inspect-item-pill"><strong>⚔️ ${w.name || 'Silah'}:</strong> Bonus: ${w.bonus || '+0'} | Hasar: ${w.damage || '1d6'}</div>`).join('');
      weaponsContainer.innerHTML = `<div style="display:flex; flex-direction:column; gap:6px;">${rows}</div>`;
    } else {
      weaponsContainer.innerHTML = `<span style="color:#c084fc; font-style:italic;">Silah eklenmemiş.</span>`;
    }
  }

  // Feats & Traits
  const featsContainer = document.getElementById('inspect-feats-container');
  if (featsContainer) {
    if (char.feats && char.feats.length > 0) {
      let rows = char.feats.map(f => `<div class="inspect-item-pill"><strong>✨ ${f.name}</strong> <span style="font-size:0.8rem; color:#c084fc;">(${f.type || 'Feat'})</span>: ${f.desc || ''}</div>`).join('');
      featsContainer.innerHTML = `<div style="display:flex; flex-direction:column; gap:6px;">${rows}</div>`;
    } else {
      featsContainer.innerHTML = `<span style="color:#c084fc; font-style:italic;">Feat eklenmemiş.</span>`;
    }
  }

  // Resource Trackers
  const trackersContainer = document.getElementById('inspect-trackers-container');
  if (trackersContainer) {
    if (char.trackers && char.trackers.length > 0) {
      let rows = char.trackers.map(t => `<div class="inspect-item-pill"><strong>⚡ ${t.name}:</strong> ${t.current} / ${t.max} (Yenilenme: ${t.reset})</div>`).join('');
      trackersContainer.innerHTML = `<div style="display:flex; flex-direction:column; gap:6px;">${rows}</div>`;
    } else {
      trackersContainer.innerHTML = `<span style="color:#c084fc; font-style:italic;">Özel kaynak eklenmemiş.</span>`;
    }
  }

  // Equipment & Coins
  const eqContainer = document.getElementById('inspect-equipment-container');
  if (eqContainer) {
    let coins = `💰 CP: ${char['coin-cp'] || '0'} | SP: ${char['coin-sp'] || '0'} | EP: ${char['coin-ep'] || '0'} | GP: ${char['coin-gp'] || '0'} | PP: ${char['coin-pp'] || '0'}`;
    let items = char['equipment-text'] ? char['equipment-text'].replace(/\n/g, '<br>') : 'Ekipman yazılmamış.';
    eqContainer.innerHTML = `
      <div style="font-weight:bold; color:#facc15; margin-bottom:6px;">${coins}</div>
      <div class="inspect-item-pill">${items}</div>
    `;
  }

  // Spellbook
  const spellsContainer = document.getElementById('inspect-spells-container');
  if (spellsContainer) {
    let spellInfo = [];
    if (char.spells && char.spells.length > 0) {
      spellInfo.push(char.spells.map(s => `<div class="inspect-item-pill">🔮 <strong>${s.name}</strong> (L${s.level}): ${s.effect} ${s.prep ? '✅ [Hazır]' : ''}</div>`).join(''));
    } else {
      spellInfo.push('<span style="color:#c084fc; font-style:italic;">Büyü eklenmemiş.</span>');
    }
    spellsContainer.innerHTML = `<div style="display:flex; flex-direction:column; gap:6px;">${spellInfo.join('')}</div>`;
  }

  // DM Notes
  const dmNotesInput = document.getElementById('inspect-dm-notes');
  if (dmNotesInput) {
    dmNotesInput.value = char.dmNotes || '';
    dmNotesInput.oninput = (e) => {
      char.dmNotes = e.target.value;
      window.DnDNexus.savePartyToLocalStorage();
    };
  }

  modal.classList.add('active');
  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }
};

window.DnDNexus.loadPreset = function(data) {
  if (window.DnDNexus.resetSheet) window.DnDNexus.resetSheet(false);
  if (data['char-id']) localStorage.setItem('dnd_char_id', data['char-id']);

  Object.keys(data).forEach(key => {
    if (key === 'weapons' || key === 'spells' || key.startsWith('spellSlotStates-')) return;
    const el = document.getElementById(key);
    if (el) {
      if (el.type === 'checkbox') el.checked = !!data[key];
      else el.value = data[key];
    }

    if (key.endsWith('-prof') && key.startsWith('skill-')) {
      const toggle = document.getElementById(key);
      if (toggle) {
        let state = parseInt(data[key]) || 0;
        toggle.setAttribute('data-state', state);
        const indicator = toggle.querySelector('.prof-indicator');
        if (state === 0) indicator.textContent = '○';
        else if (state === 1) indicator.textContent = '●';
        else if (state === 2) indicator.textContent = '✪';
      }
    }
  });

  for (let lvl = 1; lvl <= 6; lvl++) {
    if (data[`spellSlotStates-${lvl}`] && Array.isArray(data[`spellSlotStates-${lvl}`])) {
      window.DnDNexus.spellSlotStates[lvl] = data[`spellSlotStates-${lvl}`];
    } else {
      let maxInput = document.getElementById(`slots-${lvl}-max`);
      let max = parseInt(maxInput ? maxInput.value : '0') || 0;
      window.DnDNexus.spellSlotStates[lvl] = Array(max).fill(true);
    }
    window.DnDNexus.renderSpellSlotBubbles(lvl);
  }

  if (Array.isArray(data.feats)) {
    window.DnDNexus.characterFeats = data.feats;
  } else {
    window.DnDNexus.characterFeats = [];
  }
  if (window.DnDNexus.renderCharacterFeatsList) {
    window.DnDNexus.renderCharacterFeatsList();
  }

  if (Array.isArray(data.trackers)) {
    window.DnDNexus.characterTrackers = data.trackers;
  } else {
    window.DnDNexus.characterTrackers = [];
  }
  if (window.DnDNexus.renderResourceTrackers) {
    window.DnDNexus.renderResourceTrackers();
  }

  window.DnDNexus.calculateAll();
  window.DnDNexus.triggerAutosave();
};

window.DnDNexus.loadSampleParty = function() {
  const sampleHeroes = {
    'sample-1': {
      'char-id': 'sample-1',
      'char-name': 'Thorin Ironshield',
      'char-class-level': 'Fighter Level 3',
      'char-race': 'Human',
      'char-player-name': 'Caner',
      'hp-max': 28,
      'hp-current': 28,
      'ac-score': 18,
      'speed-score': '9m',
      'str-score': 16,
      'dex-score': 12,
      'con-score': 15,
      'int-score': 10,
      'wis-score': 12,
      'cha-score': 8,
      'skill-perception-val': 1
    },
    'sample-2': {
      'char-id': 'sample-2',
      'char-name': 'Elara Moonwhisper',
      'char-class-level': 'Wizard Level 3',
      'char-race': 'High Elf',
      'char-player-name': 'Ayla',
      'hp-max': 18,
      'hp-current': 18,
      'ac-score': 13,
      'speed-score': '9m',
      'str-score': 8,
      'dex-score': 14,
      'con-score': 12,
      'int-score': 17,
      'wis-score': 13,
      'cha-score': 10,
      'skill-perception-val': 4,
      'slots-1-max': 4,
      'spellSlotStates-1': [true, true, true, true],
      'slots-2-max': 2,
      'spellSlotStates-2': [true, true]
    },
    'sample-3': {
      'char-id': 'sample-3',
      'char-name': 'Shadow Vance',
      'char-class-level': 'Rogue Level 3',
      'char-race': 'Tiefling',
      'char-player-name': 'Mert',
      'hp-max': 24,
      'hp-current': 24,
      'ac-score': 15,
      'speed-score': '9m',
      'str-score': 10,
      'dex-score': 17,
      'con-score': 14,
      'int-score': 12,
      'wis-score': 10,
      'cha-score': 14,
      'skill-perception-val': 5
    },
    'sample-4': {
      'char-id': 'sample-4',
      'char-name': 'Brother Marcus',
      'char-class-level': 'Cleric Level 3',
      'char-race': 'Dwarf',
      'char-player-name': 'Emre',
      'hp-max': 25,
      'hp-current': 25,
      'ac-score': 18,
      'speed-score': '7.5m',
      'str-score': 14,
      'dex-score': 10,
      'con-score': 16,
      'int-score': 10,
      'wis-score': 16,
      'cha-score': 12,
      'skill-perception-val': 5,
      'slots-1-max': 4,
      'spellSlotStates-1': [true, true, true, true],
      'slots-2-max': 2,
      'spellSlotStates-2': [true, true]
    }
  };

  Object.assign(window.DnDNexus.partyMembers, sampleHeroes);
  window.DnDNexus.savePartyToLocalStorage();
  window.DnDNexus.renderPartyRoster();
  window.DnDNexus.syncPartyToEncounter();
};
