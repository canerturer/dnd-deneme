/**
 * D&D 5e Nexus - Application Main Entry Point
 */
window.DnDNexus = window.DnDNexus || {};

document.addEventListener('DOMContentLoaded', () => {
  // Boot Core Event-Driven Micro-Services
  if (window.DnDNexus.ServiceRegistry) {
    window.DnDNexus.ServiceRegistry.initAll();
  }

  // Initialize UI components
  window.DnDNexus.initSavingThrows();
  window.DnDNexus.initSkills();
  window.DnDNexus.initWeaponsTable();
  window.DnDNexus.initSpellsTable();
  window.DnDNexus.initSpellSlotBubbles();
  if (window.DnDNexus.initFeatsUI) window.DnDNexus.initFeatsUI();
  if (window.DnDNexus.initWeaponsUI) window.DnDNexus.initWeaponsUI();
  if (window.DnDNexus.initMagicItemsUI) window.DnDNexus.initMagicItemsUI();
  if (window.DnDNexus.initClassesUI) window.DnDNexus.initClassesUI();
  if (window.DnDNexus.initSubclassesUI) window.DnDNexus.initSubclassesUI();
  if (window.DnDNexus.initResourceTrackers) window.DnDNexus.initResourceTrackers();

  // Initialize Sync & DM View
  window.DnDNexus.initSync();
  window.DnDNexus.loadPartyFromLocalStorage();
  window.DnDNexus.initDMView();

  // Bind Global Event Listeners
  bindEvents();

  // Check URL params & load saved character data
  checkInviteURL();
  loadAutosave();

  // View Navigation
  const tabPlayerView = document.getElementById('tab-player-view');
  const tabDmView = document.getElementById('tab-dm-view');
  const playerSheetView = document.getElementById('player-sheet-view');
  const dmDashboardView = document.getElementById('dm-dashboard-view');
  const presetSelectorBox = document.getElementById('preset-selector-box');

  function switchMainView(viewName) {
    if (viewName === 'player') {
      tabPlayerView?.classList.add('active');
      tabDmView?.classList.remove('active');
      if (playerSheetView) {
        playerSheetView.classList.add('active');
        playerSheetView.style.display = 'block';
      }
      if (dmDashboardView) {
        dmDashboardView.classList.remove('active');
        dmDashboardView.style.display = 'none';
      }
      if (presetSelectorBox) presetSelectorBox.style.display = 'block';
      if (window.DnDNexus.initWebRTC) window.DnDNexus.initWebRTC();
    } else if (viewName === 'dm') {
      tabDmView?.classList.add('active');
      tabPlayerView?.classList.remove('active');
      if (playerSheetView) {
        playerSheetView.classList.remove('active');
        playerSheetView.style.display = 'none';
      }
      if (dmDashboardView) {
        dmDashboardView.classList.add('active');
        dmDashboardView.style.display = 'block';
      }
      if (presetSelectorBox) presetSelectorBox.style.display = 'none';

      try {
        if (window.DnDNexus.initDMView) window.DnDNexus.initDMView();
        if (window.DnDNexus.initWebRTC) window.DnDNexus.initWebRTC();
        if (window.DnDNexus.broadcastCharacterToParty) window.DnDNexus.broadcastCharacterToParty();
        if (window.DnDNexus.renderPartyRoster) window.DnDNexus.renderPartyRoster();
        if (window.DnDNexus.syncPartyToEncounter) window.DnDNexus.syncPartyToEncounter();
      } catch (err) {
        console.error('DM View switch rendering error:', err);
      }
    }
  }

  tabPlayerView?.addEventListener('click', () => switchMainView('player'));
  tabDmView?.addEventListener('click', () => switchMainView('dm'));

  // Player Sheet 2-Page Sub-Tab Navigation
  const btnSubPage1 = document.getElementById('btn-sub-page1');
  const btnSubPage2 = document.getElementById('btn-sub-page2');
  const playerPage1 = document.getElementById('player-page-1');
  const playerPage2 = document.getElementById('player-page-2');

  btnSubPage1?.addEventListener('click', () => {
    btnSubPage1.classList.add('active');
    btnSubPage2?.classList.remove('active');
    playerPage1?.classList.add('active');
    playerPage2?.classList.remove('active');
  });

  btnSubPage2?.addEventListener('click', () => {
    btnSubPage2.classList.add('active');
    btnSubPage1?.classList.remove('active');
    playerPage2?.classList.add('active');
    playerPage1?.classList.remove('active');
  });

  // Roll Feed Drawer Toggle
  const feedHeaderToggle = document.getElementById('feed-header-toggle');
  const rollFeedDrawer = document.getElementById('roll-feed-drawer');
  const btnToggleFeedIcon = document.getElementById('btn-toggle-feed-icon');

  feedHeaderToggle?.addEventListener('click', () => {
    rollFeedDrawer.classList.toggle('collapsed');
    btnToggleFeedIcon.textContent = rollFeedDrawer.classList.contains('collapsed') ? '▲' : '▼';
  });
});

window.DnDNexus.initWeaponsTable = function() {
  const tbody = document.getElementById('weapons-tbody');
  if (tbody && tbody.children.length === 0) {
    addWeaponRow('Longsword (Uzun Kılıç)', '+4', '1d8+2 Kesici');
    addWeaponRow('Shortbow (Kısa Yay)', '+3', '1d6+1 Delici');
  }
};

function addWeaponRow(name = '', bonus = '', damage = '') {
  const tbody = document.getElementById('weapons-tbody');
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="weapon-name" placeholder="Silah Adı" value="${name}"></td>
    <td><input type="text" class="weapon-bonus" placeholder="+4" value="${bonus}" style="width:55px; text-align:center;"></td>
    <td><input type="text" class="weapon-damage" placeholder="1d8+2" value="${damage}"></td>
    <td class="no-print"><button class="btn-del-weapon" title="Sil">&times;</button></td>
  `;
  tbody.appendChild(tr);

  tr.querySelector('.btn-del-weapon').addEventListener('click', () => {
    tr.remove();
    window.DnDNexus.triggerAutosave();
  });

  tr.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', window.DnDNexus.triggerAutosave);
  });
}

window.DnDNexus.addWeaponFromCatalog = function(weapon) {
  const DAMAGE_TYPE_TR = { slashing: 'Kesici', piercing: 'Delici', bludgeoning: 'Ezici' };
  const damageTypeTR = DAMAGE_TYPE_TR[(weapon.damageType || '').toLowerCase()] || weapon.damageType || '';
  addWeaponRow(weapon.name, '', `${weapon.damageDice} ${damageTypeTR}`.trim());
  window.DnDNexus.triggerAutosave();
  if (window.DnDNexus.closeWeaponsModal) window.DnDNexus.closeWeaponsModal();
};

function bindEvents() {
  document.querySelectorAll('input, textarea, select').forEach(el => {
    const handleUpdate = () => {
      if (['initiative-score', 'hp-max', 'prof-bonus-override', 'hitdice-total'].includes(el.id)) {
        el.dataset.manualOverride = "true";
      }
      if (el.id === 'spell-ability-select') {
        el.dataset.userChanged = "true";
      }
      window.DnDNexus.calculateAll();
      window.DnDNexus.triggerAutosave();
    };

    el.addEventListener('input', handleUpdate);
    if (el.tagName.toLowerCase() === 'select') {
      el.addEventListener('change', handleUpdate);
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('save-prof-check') || e.target.classList.contains('custom-checkbox') || e.target.classList.contains('spell-prep-check')) {
      window.DnDNexus.calculateAll();
      window.DnDNexus.triggerAutosave();
    }
  });

  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.skill-prof-toggle');
    if (toggle) {
      let currentState = parseInt(toggle.getAttribute('data-state')) || 0;
      let newState = (currentState + 1) % 3;
      toggle.setAttribute('data-state', newState);

      const indicator = toggle.querySelector('.prof-indicator');
      if (newState === 0) indicator.textContent = '○';
      else if (newState === 1) indicator.textContent = '●';
      else if (newState === 2) indicator.textContent = '✪';

      window.DnDNexus.calculateAll();
      window.DnDNexus.triggerAutosave();
    }
  });

  document.getElementById('btn-add-weapon')?.addEventListener('click', () => {
    addWeaponRow();
    window.DnDNexus.triggerAutosave();
  });

  document.getElementById('btn-add-spell')?.addEventListener('click', () => {
    window.DnDNexus.addSpellRow();
    window.DnDNexus.triggerAutosave();
  });

  document.getElementById('btn-short-rest')?.addEventListener('click', window.DnDNexus.performShortRest);
  document.getElementById('btn-long-rest')?.addEventListener('click', window.DnDNexus.performLongRest);

  document.querySelectorAll('.hp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = parseInt(btn.getAttribute('data-amount')) || 0;
      const curHpInput = document.getElementById('hp-current');
      let current = parseInt(curHpInput.value) || 0;
      curHpInput.value = Math.max(0, current + amount);
      window.DnDNexus.updateHPBar();
      window.DnDNexus.triggerAutosave();
    });
  });

  // Roll Buttons Listener
  document.addEventListener('click', (e) => {
    const rollBtn = e.target.closest('.roll-stat-btn, .roll-inline-btn, #btn-roll-initiative');
    if (rollBtn) {
      let rollName = rollBtn.getAttribute('data-name') || 'Roll';
      let modifier = 0;

      if (rollBtn.id === 'btn-roll-initiative') {
        rollName = 'İnisiyatif (Initiative)';
        let initVal = document.getElementById('initiative-score').value;
        modifier = parseInt(initVal.replace('+', '')) || 0;
      } else if (rollBtn.hasAttribute('data-mod-id')) {
        let modText = document.getElementById(rollBtn.getAttribute('data-mod-id')).textContent;
        modifier = parseInt(modText.replace('+', '')) || 0;
      } else if (rollBtn.hasAttribute('data-val-id')) {
        let valText = document.getElementById(rollBtn.getAttribute('data-val-id')).textContent;
        modifier = parseInt(valText.replace('+', '')) || 0;
      }

      window.DnDNexus.openDiceModal(20, 1, modifier, rollName);
    }
  });

  // Control Bar Actions
  document.getElementById('btn-dice-modal')?.addEventListener('click', () => window.DnDNexus.openDiceModal(20, 1, 0, 'Serbest Zar'));
  document.getElementById('btn-close-dice')?.addEventListener('click', window.DnDNexus.closeDiceModal);
  document.getElementById('dice-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'dice-modal') window.DnDNexus.closeDiceModal();
  });

  document.getElementById('btn-save-json')?.addEventListener('click', window.DnDNexus.exportCharacterJSON);
  document.getElementById('btn-load-json')?.addEventListener('click', () => document.getElementById('file-input-json').click());
  document.getElementById('file-input-json')?.addEventListener('change', (e) => window.DnDNexus.importCharacterJSON(e));

  document.getElementById('btn-print')?.addEventListener('click', () => window.print());
  document.getElementById('btn-reset')?.addEventListener('click', window.DnDNexus.resetSheet);
  document.getElementById('btn-copy-invite')?.addEventListener('click', window.DnDNexus.copyInviteLink);

  document.getElementById('preset-select')?.addEventListener('change', (e) => {
    const presetKey = e.target.value;
    if (presetKey && window.DnDNexus.PRESETS[presetKey]) {
      window.DnDNexus.loadPreset(window.DnDNexus.PRESETS[presetKey]);
    }
  });

  document.querySelectorAll('.dice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sides = parseInt(btn.getAttribute('data-sides'));
      document.getElementById('d20-options-box').style.display = (sides === 20) ? 'block' : 'none';
    });
  });

  document.getElementById('btn-roll-action')?.addEventListener('click', window.DnDNexus.executeModalRoll);
}

window.DnDNexus.resetSheet = function(confirmReset = true) {
  if (confirmReset && !confirm('Karakter kağıdını temizlemek istediğinize emin misiniz?')) return;

  document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(el => {
    if (['str-score', 'dex-score', 'con-score', 'int-score', 'wis-score', 'cha-score'].includes(el.id)) el.value = 10;
    else if (el.id === 'prof-bonus-override') el.value = '+2';
    else if (el.id === 'ac-score') el.value = 10;
    else if (el.id === 'hp-max' || el.id === 'hp-current') el.value = 10;
    else el.value = '';
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(ch => ch.checked = false);

  document.querySelectorAll('.skill-prof-toggle').forEach(btn => {
    btn.setAttribute('data-state', 0);
    btn.querySelector('.prof-indicator').textContent = '○';
  });

  for (let lvl = 1; lvl <= 6; lvl++) {
    window.DnDNexus.spellSlotStates[lvl] = [];
  }

  document.getElementById('weapons-tbody').innerHTML = '';
  addWeaponRow();

  document.getElementById('spells-tbody').innerHTML = '';
  window.DnDNexus.addSpellRow();

  window.DnDNexus.characterFeats = [];
  if (window.DnDNexus.renderCharacterFeatsList) window.DnDNexus.renderCharacterFeatsList();

  window.DnDNexus.characterTrackers = [];
  if (window.DnDNexus.renderResourceTrackers) window.DnDNexus.renderResourceTrackers();

  window.DnDNexus.calculateAll();
  window.DnDNexus.triggerAutosave();
};

function checkInviteURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const joinCode = urlParams.get('join');
  if (joinCode) {
    window.DnDNexus.setCampaignCode(joinCode);
    const banner = document.getElementById('campaign-join-banner');
    if (banner) banner.style.display = 'block';
    const nameElem = document.getElementById('banner-campaign-name');
    if (nameElem) nameElem.textContent = `[${joinCode}]`;
    const joinBtn = document.getElementById('btn-join-campaign');
    if (joinBtn) {
      joinBtn.onclick = () => {
        window.DnDNexus.setCampaignCode(joinCode);
        window.DnDNexus.broadcastCharacterToParty(joinCode);
        alert(`Karakteriniz ${joinCode} kampanyasına WebRTC & Canlı Sekme üzerinden başarıyla bağlandı!`);
        banner.style.display = 'none';
      };
    }
  }
}

function loadAutosave() {
  const saved = localStorage.getItem('dnd5e_character_data');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      window.DnDNexus.loadPreset(data);
    } catch (e) { window.DnDNexus.calculateAll(); }
  } else {
    window.DnDNexus.calculateAll();
  }
  if (window.DnDNexus.broadcastCharacterToParty) window.DnDNexus.broadcastCharacterToParty();
}
