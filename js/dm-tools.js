/**
 * D&D 5e Nexus - DM Random Generators & Rules Module
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.switchDMSubTab = function(tabId) {
  document.querySelectorAll('.dm-subtab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.dm-tab-panel').forEach(p => p.style.display = 'none');

  const targetBtn = document.getElementById(`dm-subtab-${tabId}`);
  const targetPanel = document.getElementById(`dm-tab-panel-${tabId}`);

  if (targetBtn) targetBtn.classList.add('active');
  if (targetPanel) targetPanel.style.display = 'block';

  localStorage.setItem('dnd_active_dm_subtab', tabId);
};

window.DnDNexus.generateRandomNPC = function() {
  const names = ['Brimm', 'Eldrin', 'Kaelen', 'Vespera', 'Garrick', 'Lyra', 'Thorne', 'Zephyr', 'Orin', 'Taz'];
  const races = ['İnsan', 'Cüce', 'Yüksek Elf', 'Buçukluk', 'Ejderdoğan', 'Yarı-Orc', 'Tiefling'];
  const professions = ['Tüccar', 'Simyacı', 'Kiralık Savaşçı', 'Hancı', 'Kütüphaneci', 'Kaçakçı', 'Tapınak Rahibi'];
  const traits = ['Sürekli parmaklarını masaya vurur.', 'Aşırı derece şüphecidir.', 'Gözlerinin içine bakarak konuşur.'];
  const secrets = ['Kayıp bir haritanın parçasına sahip.', 'Eski bir suç çetesine borcu var.', 'Aslında gizli bir ajan.'];

  const name = names[Math.floor(Math.random() * names.length)];
  const race = races[Math.floor(Math.random() * races.length)];
  const prof = professions[Math.floor(Math.random() * professions.length)];
  const trait = traits[Math.floor(Math.random() * traits.length)];
  const secret = secrets[Math.floor(Math.random() * secrets.length)];

  const resBox = document.getElementById('gen-result-box');
  if (resBox) {
    resBox.innerHTML = `
      <strong style="color:var(--magenta-primary); font-size:1rem;">👤 ${name} (${race} ${prof})</strong><br>
      • <strong>Mizaç / Tavır:</strong> ${trait}<br>
      • <strong>Sırrı / Motivasyonu:</strong> ${secret}
    `;
  }
};

window.DnDNexus.generateRandomLoot = function() {
  const gp = Math.floor(Math.random() * 50) + 10;
  const sp = Math.floor(Math.random() * 100) + 20;
  const items = ['İyileşme İksiri (Potion of Healing)', 'Magic Missile Parşömeni', 'Büyülü Kristal Kolye (+1 Spell Focus)', 'Gümüş Maymuncuk Seti', 'Görünmezlik İksiri'];
  const item = items[Math.floor(Math.random() * items.length)];

  const resBox = document.getElementById('gen-result-box');
  if (resBox) {
    resBox.innerHTML = `
      <strong style="color:var(--accent-purple-light); font-size:1rem;">💰 RASTGELE HAZİNE:</strong><br>
      • <strong>Sikkeler:</strong> ${gp} GP, ${sp} SP<br>
      • <strong>Büyülü Eşya:</strong> ${item}
    `;
  }
};

window.DnDNexus.initCheatSheet = function() {
  const box = document.getElementById('rule-content-box');
  if (!box) return;
  if (window.DnDNexus.RULES_DATA && window.DnDNexus.RULES_DATA['conditions']) {
    box.innerHTML = window.DnDNexus.RULES_DATA['conditions'];
  } else {
    box.innerHTML = '<b>Durumlar:</b> Blinded, Charmed, Deafened, Frightened, Grappled, Incapacitated, Invisible, Paralysed, Petrified, Poisoned, Prone, Restrained, Stunned, Unconscious.';
  }

  document.querySelectorAll('.rule-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rule-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const ruleKey = btn.getAttribute('data-rule');
      if (window.DnDNexus.RULES_DATA) {
        box.innerHTML = window.DnDNexus.RULES_DATA[ruleKey] || '';
      }
    });
  });
};

/* ==========================================================================
   FEATURE 1: 🐉 5E MONSTER BESTIARY & ENCOUNTER INJECTOR ENGINE
   ========================================================================== */
window.DnDNexus.renderMonstersBestiary = function(query = '') {
  const container = document.getElementById('monster-results-container');
  if (!container) return;

  const list = window.DnDNexus.monstersList || [];
  const filtered = list.filter(m => {
    const q = query.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q) || m.cr.includes(q);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; color:#c084fc; text-align:center; padding:20px;">Arama kriterine uygun canavar bulunamadı.</div>`;
    return;
  }

  container.innerHTML = '';
  filtered.forEach(m => {
    const card = document.createElement('div');
    card.className = 'monster-card';
    card.innerHTML = `
      <div class="monster-card-header">
        <div>
          <div class="monster-name">${m.name}</div>
          <div class="monster-meta">${m.type}</div>
        </div>
        <span class="monster-cr-badge">CR ${m.cr}</span>
      </div>
      <div class="monster-stats-row">
        <span>🛡️ AC: ${m.ac}</span>
        <span>❤️ HP: ${m.hp}</span>
        <span>⚡ Hız: ${m.speed}</span>
      </div>
      <div style="font-size:0.75rem; color:#e9d5ff; display:flex; justify-content:space-between; background:rgba(0,0,0,0.2); padding:4px 6px; border-radius:4px;">
        <span>STR: ${m.str}</span><span>DEX: ${m.dex}</span><span>CON: ${m.con}</span>
        <span>INT: ${m.int}</span><span>WIS: ${m.wis}</span><span>CHA: ${m.cha}</span>
      </div>
      <div class="monster-actions-text">
        <strong>✨ Özellikler:</strong> ${m.traits}<br>
        <strong>⚔️ Saldırılar:</strong> ${m.actions}
      </div>
      <button class="btn-add-monster-enc" data-monster-id="${m.id}">⚔️ Savaş Takipçisine Ekle</button>
    `;

    card.querySelector('.btn-add-monster-enc').addEventListener('click', () => {
      window.DnDNexus.addMonsterToEncounter(m);
    });

    container.appendChild(card);
  });
};

window.DnDNexus.addMonsterToEncounter = function(monster) {
  window.DnDNexus.encounterList = window.DnDNexus.encounterList || [];
  let count = window.DnDNexus.encounterList.filter(e => e.name.startsWith(monster.name)).length + 1;
  let dexMod = Math.floor((monster.dex - 10) / 2);
  let initRoll = Math.floor(Math.random() * 20) + 1 + dexMod;

  let newEntry = {
    id: `monster-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    name: count > 1 ? `${monster.name} #${count}` : monster.name,
    type: 'monster',
    initiative: initRoll,
    ac: monster.ac,
    hpCur: monster.hp,
    hpMax: monster.hp
  };

  window.DnDNexus.encounterList.push(newEntry);
  if (window.DnDNexus.renderEncounterTable) window.DnDNexus.renderEncounterTable();
  alert(`⚔️ ${newEntry.name} (İnisiyatif: ${initRoll}, HP: ${monster.hp}, AC: ${monster.ac}) Savaş Takipçisine eklendi!`);
};

/* ==========================================================================
   FEATURE 2: 🎲 UNIVERSAL GROUP CHECK & SAVES ENGINE
   ========================================================================== */
window.DnDNexus.selectedGCType = 'save';
window.DnDNexus.selectedGCKey = 'str-save';
window.DnDNexus.selectedGCLabel = 'Güç Kurtarma (STR Save)';

window.DnDNexus.openGroupCheckModal = function() {
  const modal = document.getElementById('modal-group-check');
  if (modal) modal.style.display = 'flex';
};

window.DnDNexus.closeGroupCheckModal = function() {
  const modal = document.getElementById('modal-group-check');
  if (modal) modal.style.display = 'none';
};

window.DnDNexus.switchGCTab = function(tabName) {
  document.querySelectorAll('.gc-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.gc-panel-content').forEach(p => p.style.display = 'none');

  const activeTabBtn = document.getElementById(`gc-tab-${tabName}`);
  const activePanel = document.getElementById(`gc-panel-${tabName}`);

  if (activeTabBtn) activeTabBtn.classList.add('active');
  if (activePanel) activePanel.style.display = 'block';

  window.DnDNexus.selectedGCType = tabName;
};

window.DnDNexus.selectGCOption = function(btnElem, type, key, label) {
  const parentPanel = btnElem.closest('.gc-panel-content');
  if (parentPanel) {
    parentPanel.querySelectorAll('.gc-opt-btn').forEach(b => b.classList.remove('active'));
  }
  btnElem.classList.add('active');

  window.DnDNexus.selectedGCType = type;
  window.DnDNexus.selectedGCKey = key;
  window.DnDNexus.selectedGCLabel = label;

  const labelElem = document.getElementById('selected-gc-label');
  if (labelElem) labelElem.textContent = `Seçilen: ${label}`;
};

window.DnDNexus.executeUniversalGroupCheck = function() {
  const dcInput = document.getElementById('gc-dc-input');
  const targetDC = parseInt(dcInput ? dcInput.value : 15) || 15;

  const party = Object.values(window.DnDNexus.partyMembers || {});
  if (party.length === 0) {
    alert('Partide henüz oyuncu karakteri yok! Önce ana sayfada Örnek Partiyi Yükleyin veya oyuncu bağlayın.');
    return;
  }

  const type = window.DnDNexus.selectedGCType;
  const key = window.DnDNexus.selectedGCKey;
  const label = window.DnDNexus.selectedGCLabel;

  let passCount = 0;
  let totalCount = party.length;

  let html = `<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid var(--border-purple); padding-bottom:6px; margin-bottom:10px;">
    <strong style="color:var(--accent-purple-light); font-size:1.05rem;">🎲 ${label.toUpperCase()} (HEDEF DC: ${targetDC})</strong>
    <span id="gc-pass-rate-badge" style="background:var(--purple-gradient); color:#fff; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:0.82rem;">...</span>
  </div>`;

  html += `<table style="width:100%; border-collapse:collapse; font-size:0.88rem;">`;
  html += `<tr style="border-bottom:1px solid var(--border-purple); text-align:left; color:#c084fc;">
    <th>OYUNCU</th>
    <th>MODIFIER</th>
    <th>ZAR (d20)</th>
    <th>SONUÇ</th>
    <th>DURUM</th>
  </tr>`;

  party.forEach(p => {
    let mod = 0;
    const str = parseInt(p['str-score']) || 10;
    const dex = parseInt(p['dex-score']) || 10;
    const con = parseInt(p['con-score']) || 10;
    const int = parseInt(p['int-score']) || 10;
    const wis = parseInt(p['wis-score']) || 10;
    const cha = parseInt(p['cha-score']) || 10;
    const prof = parseInt(p['prof-bonus']) || 2;

    const strMod = Math.floor((str - 10) / 2);
    const dexMod = Math.floor((dex - 10) / 2);
    const conMod = Math.floor((con - 10) / 2);
    const intMod = Math.floor((int - 10) / 2);
    const wisMod = Math.floor((wis - 10) / 2);
    const chaMod = Math.floor((cha - 10) / 2);

    if (type === 'save') {
      if (key === 'str-save') mod = strMod + (p['save-str-prof'] ? prof : 0);
      else if (key === 'dex-save') mod = dexMod + (p['save-dex-prof'] ? prof : 0);
      else if (key === 'con-save') mod = conMod + (p['save-con-prof'] ? prof : 0);
      else if (key === 'int-save') mod = intMod + (p['save-int-prof'] ? prof : 0);
      else if (key === 'wis-save') mod = wisMod + (p['save-wis-prof'] ? prof : 0);
      else if (key === 'cha-save') mod = chaMod + (p['save-cha-prof'] ? prof : 0);
    } else if (type === 'ability') {
      if (key === 'str') mod = strMod;
      else if (key === 'dex') mod = dexMod;
      else if (key === 'con') mod = conMod;
      else if (key === 'int') mod = intMod;
      else if (key === 'wis') mod = wisMod;
      else if (key === 'cha') mod = chaMod;
    } else if (type === 'skill') {
      const skillAttrMap = {
        acrobatics: dexMod, athletics: strMod, stealth: dexMod, sleight_of_hand: dexMod,
        arcana: intMod, history: intMod, investigation: intMod, nature: intMod, religion: intMod,
        animal_handling: wisMod, insight: wisMod, medicine: wisMod, perception: wisMod, survival: wisMod,
        deception: chaMod, intimidation: chaMod, performance: chaMod, persuasion: chaMod
      };
      const baseMod = skillAttrMap[key] !== undefined ? skillAttrMap[key] : wisMod;
      const skillValKey = `skill-${key.replace('_', '-')}-val`;
      const addedVal = parseInt(p[skillValKey]) || 0;
      mod = baseMod + addedVal;
    }

    let d20 = Math.floor(Math.random() * 20) + 1;
    let total = d20 + mod;
    let isSuccess = total >= targetDC;
    if (isSuccess) passCount++;

    let highlight = d20 === 20 ? 'color:#2dd4bf; font-weight:bold;' : d20 === 1 ? 'color:#f43f5e; font-weight:bold;' : '';
    let statusBadge = isSuccess ? `<span class="gc-pass-badge">✅ BAŞARILI</span>` : `<span class="gc-fail-badge">❌ BAŞARISIZ</span>`;

    html += `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); height:32px;">
      <td><strong>${p['char-name'] || 'Oyuncu'}</strong></td>
      <td>${mod >= 0 ? '+' + mod : mod}</td>
      <td style="${highlight}">${d20}</td>
      <td style="font-weight:bold; font-size:1.05rem; color:#fff;">${total}</td>
      <td>${statusBadge}</td>
    </tr>`;
  });

  html += `</table>`;

  const resultsModalBox = document.getElementById('gc-modal-results');
  const resultsCardBox = document.getElementById('group-check-results-box');

  if (resultsModalBox) {
    resultsModalBox.innerHTML = html;
    resultsModalBox.style.display = 'block';
    const rateBadge = document.getElementById('gc-pass-rate-badge');
    if (rateBadge) rateBadge.textContent = `${passCount} / ${totalCount} Oyuncu Başarılı`;
  }

  if (resultsCardBox) {
    resultsCardBox.innerHTML = html;
    resultsCardBox.style.display = 'block';
  }

  // Broadcast roll event to player screens
  if (window.DnDNexus.broadcastRollEvent) {
    window.DnDNexus.broadcastRollEvent(`Toplu ${label} (DC ${targetDC})`, `${passCount}/${totalCount} Başarılı`, `Toplu zar DM tarafından atıldı.`);
  }
};

window.DnDNexus.rollSecretDMDice = function() {
  const d20 = Math.floor(Math.random() * 20) + 1;
  const box = document.getElementById('group-check-results-box');
  if (box) {
    box.innerHTML = `
      <strong style="color:var(--magenta-primary); font-size:1.1rem;">🎲 GİZLİ DM ZARI (SADECE DM GÖRÜR):</strong><br>
      <span style="font-size:1.8rem; font-family:var(--font-header); font-weight:800; color:#fff;">d20 Zarı: ${d20}</span> ${d20 === 20 ? '🔥 [NATURAL 20!]' : d20 === 1 ? '💀 [NATURAL 1!]' : ''}
    `;
    box.style.display = 'block';
  }
};

/* ==========================================================================
   FEATURE 3: 🎵 CUSTOM SOUNDBOARD SIDE DRAWER & PERSISTENT STORAGE ENGINE
   ========================================================================== */
window.DnDNexus.activeAudioObj = null;
window.DnDNexus.activeAudioId = null;

window.DnDNexus.toggleSoundboardDrawer = function() {
  const drawer = document.getElementById('soundboard-side-drawer');
  if (drawer) {
    drawer.classList.toggle('active');
  }
};

window.DnDNexus.toggleSoundSourceMode = function(mode) {
  const fileInput = document.getElementById('sound-file-input');
  const urlInput = document.getElementById('sound-url-input');
  if (mode === 'url') {
    if (fileInput) fileInput.style.display = 'none';
    if (urlInput) urlInput.style.display = 'block';
  } else {
    if (fileInput) fileInput.style.display = 'block';
    if (urlInput) urlInput.style.display = 'none';
  }
};

window.DnDNexus.loadCustomSounds = function() {
  try {
    const saved = localStorage.getItem('dnd_custom_soundboard');
    if (saved) return JSON.parse(saved);
  } catch(e) {}

  // Default seed sample sounds
  return [
    { id: 'snd-1', name: '⛈️ Şiddetli Fırtına', type: 'ambient', src: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg', volume: 0.5 },
    { id: 'snd-2', name: '🏰 Zindan Damlaması', type: 'ambient', src: 'https://actions.google.com/sounds/v1/ambiences/subterranean_drip.ogg', volume: 0.5 },
    { id: 'snd-3', name: '🐉 Ejderha Kükremesi', type: 'sfx', src: 'https://actions.google.com/sounds/v1/animals/monster_growl.ogg', volume: 0.8 },
    { id: 'snd-4', name: '⚔️ Kılıç Çarpışması', type: 'sfx', src: 'https://actions.google.com/sounds/v1/impacts/metal_clang.ogg', volume: 0.8 }
  ];
};

window.DnDNexus.customSoundsList = window.DnDNexus.loadCustomSounds();

window.DnDNexus.saveCustomSounds = function() {
  try {
    localStorage.setItem('dnd_custom_soundboard', JSON.stringify(window.DnDNexus.customSoundsList));
  } catch(e) {
    console.warn('LocalStorage save error (sound file might be large):', e);
  }
};

window.DnDNexus.addCustomSound = function() {
  const nameInput = document.getElementById('sound-name-input');
  const typeSelect = document.getElementById('sound-type-select');
  const modeSelect = document.getElementById('sound-mode-select');
  const fileInput = document.getElementById('sound-file-input');
  const urlInput = document.getElementById('sound-url-input');

  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    alert('Lütfen sese bir isim verin (ör: Taverna Müziği, Kılıç Sesi).');
    return;
  }

  const type = typeSelect ? typeSelect.value : 'ambient';
  const mode = modeSelect ? modeSelect.value : 'file';

  if (mode === 'url') {
    const url = urlInput ? urlInput.value.trim() : '';
    if (!url) {
      alert('Lütfen geçerli bir ses bağlantısı (URL) girin.');
      return;
    }
    const newSound = {
      id: `snd-${Date.now()}`,
      name: name,
      type: type,
      src: url,
      volume: 0.6
    };
    window.DnDNexus.customSoundsList.push(newSound);
    window.DnDNexus.saveCustomSounds();
    window.DnDNexus.renderCustomSoundboard();
    if (nameInput) nameInput.value = '';
    if (urlInput) urlInput.value = '';
    alert(`🎵 "${name}" başarıyla eklendi ve kaydedildi!`);
  } else {
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;
    if (!file) {
      alert('Lütfen bilgisayarınızdan bir ses dosyası (.mp3, .wav, .ogg) seçin.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Src = e.target.result;
      const newSound = {
        id: `snd-${Date.now()}`,
        name: name,
        type: type,
        src: base64Src,
        volume: 0.6
      };
      window.DnDNexus.customSoundsList.push(newSound);
      window.DnDNexus.saveCustomSounds();
      window.DnDNexus.renderCustomSoundboard();
      if (nameInput) nameInput.value = '';
      if (fileInput) fileInput.value = '';
      alert(`🎵 "${name}" dosyanız yüklendi ve kaydedildi!`);
    };
    reader.readAsDataURL(file);
  }
};

window.DnDNexus.broadcastAudioEvent = function(payload) {
  const msg = { type: 'AUDIO_EVENT', ...payload, senderId: localStorage.getItem('dnd_char_id') };
  if (window.DnDNexus.syncChannel) {
    window.DnDNexus.syncChannel.postMessage(msg);
  }
  localStorage.setItem('dnd_audio_sync_signal', JSON.stringify({ ...msg, timestamp: Date.now() }));
};

window.DnDNexus.syncedPlayerAudio = null;

window.DnDNexus.handleIncomingAudioSync = function(data) {
  if (!data) return;
  const myCharId = localStorage.getItem('dnd_char_id');
  if (data.senderId && data.senderId === myCharId) {
    return;
  }

  if (data.action === 'stop') {
    if (window.DnDNexus.syncedPlayerAudio) {
      try {
        window.DnDNexus.syncedPlayerAudio.pause();
        window.DnDNexus.syncedPlayerAudio.currentTime = 0;
      } catch(e) {}
      window.DnDNexus.syncedPlayerAudio = null;
    }
  } else if (data.action === 'play' && data.sound) {
    if (window.DnDNexus.syncedPlayerAudio) {
      try {
        window.DnDNexus.syncedPlayerAudio.pause();
      } catch(e) {}
    }

    const audio = new Audio(data.sound.src);
    audio.loop = data.sound.type === 'ambient';
    audio.volume = data.sound.volume !== undefined ? data.sound.volume : 0.6;
    audio.play().catch(err => console.warn('Player audio autoplay pending user gesture:', err));
    window.DnDNexus.syncedPlayerAudio = audio;

    window.DnDNexus.showAudioToast(`🎵 DM Ses Başlattı: ${data.sound.name}`);
  }
};

window.DnDNexus.showAudioToast = function(msgText) {
  let toastBox = document.getElementById('audio-sync-toast');
  if (!toastBox) {
    toastBox = document.createElement('div');
    toastBox.id = 'audio-sync-toast';
    toastBox.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #7e22ce 0%, #3b0764 100%);
      border: 1.5px solid #c084fc; color: #fff; padding: 10px 20px; border-radius: 30px;
      font-family: var(--font-header); font-size: 0.88rem; font-weight: 800;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6); z-index: 9999; transition: opacity 0.3s;
    `;
    document.body.appendChild(toastBox);
  }
  toastBox.textContent = msgText;
  toastBox.style.opacity = '1';
  toastBox.style.display = 'block';
  setTimeout(() => {
    toastBox.style.opacity = '0';
    setTimeout(() => toastBox.style.display = 'none', 300);
  }, 4000);
};

window.DnDNexus.stopAmbientSound = function() {
  if (window.DnDNexus.activeAudioObj) {
    try {
      window.DnDNexus.activeAudioObj.pause();
      window.DnDNexus.activeAudioObj.currentTime = 0;
    } catch(e) {}
    window.DnDNexus.activeAudioObj = null;
    window.DnDNexus.activeAudioId = null;
  }
  document.querySelectorAll('.btn-play-custom').forEach(b => {
    b.classList.remove('playing');
    b.textContent = b.getAttribute('data-type') === 'ambient' ? '▶️ Çal' : '💥 Çal';
  });

  window.DnDNexus.broadcastAudioEvent({ action: 'stop' });
};

window.DnDNexus.togglePlayCustomSound = function(soundId) {
  const sound = window.DnDNexus.customSoundsList.find(s => s.id === soundId);
  if (!sound) return;

  const btn = document.getElementById(`btn-play-${soundId}`);

  if (window.DnDNexus.activeAudioId === soundId && window.DnDNexus.activeAudioObj) {
    window.DnDNexus.stopAmbientSound();
    return;
  }

  window.DnDNexus.stopAmbientSound();

  const audio = new Audio(sound.src);
  audio.loop = sound.type === 'ambient';
  audio.volume = sound.volume !== undefined ? sound.volume : 0.6;

  audio.play().then(() => {
    window.DnDNexus.activeAudioObj = audio;
    window.DnDNexus.activeAudioId = soundId;
    if (btn) {
      btn.classList.add('playing');
      btn.textContent = '⏸️ Durdur';
    }
    window.DnDNexus.broadcastAudioEvent({ action: 'play', sound: sound });
  }).catch(err => {
    alert('Ses çalınamadı. Dosya formatı veya link geçersiz olabilir.');
    console.error('Audio play error:', err);
  });

  audio.onended = () => {
    if (sound.type !== 'ambient') {
      window.DnDNexus.activeAudioObj = null;
      window.DnDNexus.activeAudioId = null;
      if (btn) {
        btn.classList.remove('playing');
        btn.textContent = '💥 Çal';
      }
      window.DnDNexus.broadcastAudioEvent({ action: 'stop' });
    }
  };
};

window.DnDNexus.deleteCustomSound = function(soundId) {
  if (window.DnDNexus.activeAudioId === soundId) {
    window.DnDNexus.stopAmbientSound();
  }
  window.DnDNexus.customSoundsList = window.DnDNexus.customSoundsList.filter(s => s.id !== soundId);
  window.DnDNexus.saveCustomSounds();
  window.DnDNexus.renderCustomSoundboard();
};

window.DnDNexus.updateSoundVolume = function(soundId, volVal) {
  const sound = window.DnDNexus.customSoundsList.find(s => s.id === soundId);
  if (sound) {
    sound.volume = parseFloat(volVal);
    window.DnDNexus.saveCustomSounds();
    if (window.DnDNexus.activeAudioId === soundId && window.DnDNexus.activeAudioObj) {
      window.DnDNexus.activeAudioObj.volume = sound.volume;
    }
  }
};

window.DnDNexus.renderCustomSoundboard = function() {
  const ambientContainer = document.getElementById('custom-ambient-list');
  const sfxContainer = document.getElementById('custom-sfx-list');
  if (!ambientContainer || !sfxContainer) return;

  const ambients = window.DnDNexus.customSoundsList.filter(s => s.type === 'ambient');
  const sfxs = window.DnDNexus.customSoundsList.filter(s => s.type === 'sfx');

  if (ambients.length === 0) {
    ambientContainer.innerHTML = `<div style="font-size:0.8rem; color:#c084fc; font-style:italic;">Henüz ambient ses eklenmedi.</div>`;
  } else {
    ambientContainer.innerHTML = ambients.map(s => `
      <div class="custom-sound-item">
        <div class="custom-sound-header">
          <span class="custom-sound-title">${s.name}</span>
          <button class="btn-del-custom" onclick="window.DnDNexus.deleteCustomSound('${s.id}')" title="Sesi Sil">&times;</button>
        </div>
        <div class="custom-sound-controls">
          <button id="btn-play-${s.id}" data-type="ambient" class="btn-play-custom ${window.DnDNexus.activeAudioId === s.id ? 'playing' : ''}" onclick="window.DnDNexus.togglePlayCustomSound('${s.id}')">
            ${window.DnDNexus.activeAudioId === s.id ? '⏸️ Durdur' : '▶️ Çal'}
          </button>
          <span>🔊</span>
          <input type="range" min="0" max="1" step="0.05" value="${s.volume !== undefined ? s.volume : 0.6}" oninput="window.DnDNexus.updateSoundVolume('${s.id}', this.value)">
        </div>
      </div>
    `).join('');
  }

  if (sfxs.length === 0) {
    sfxContainer.innerHTML = `<div style="font-size:0.8rem; color:#c084fc; font-style:italic;">Henüz ses efekti eklenmedi.</div>`;
  } else {
    sfxContainer.innerHTML = sfxs.map(s => `
      <div class="custom-sound-item">
        <div class="custom-sound-header">
          <span class="custom-sound-title">${s.name}</span>
          <button class="btn-del-custom" onclick="window.DnDNexus.deleteCustomSound('${s.id}')" title="Sesi Sil">&times;</button>
        </div>
        <div class="custom-sound-controls">
          <button id="btn-play-${s.id}" data-type="sfx" class="btn-play-custom ${window.DnDNexus.activeAudioId === s.id ? 'playing' : ''}" onclick="window.DnDNexus.togglePlayCustomSound('${s.id}')">
            ${window.DnDNexus.activeAudioId === s.id ? '⏸️ Durdur' : '💥 Çal'}
          </button>
          <span>🔊</span>
          <input type="range" min="0" max="1" step="0.05" value="${s.volume !== undefined ? s.volume : 0.6}" oninput="window.DnDNexus.updateSoundVolume('${s.id}', this.value)">
        </div>
      </div>
    `).join('');
  }
};

/* ==========================================================================
   FEATURE 4: 📖 CAMPAIGN JOURNAL & QUEST TRACKER ENGINE
   ========================================================================== */
window.DnDNexus.initCampaignJournal = function() {
  const sessionInput = document.getElementById('dm-session-notes');
  const questInput = document.getElementById('dm-quest-log');

  if (sessionInput) {
    sessionInput.value = localStorage.getItem('dnd_session_notes') || '';
    sessionInput.oninput = () => {
      localStorage.setItem('dnd_session_notes', sessionInput.value);
    };
  }

  if (questInput) {
    questInput.value = localStorage.getItem('dnd_quest_log') || '';
    questInput.oninput = () => {
      localStorage.setItem('dnd_quest_log', questInput.value);
    };
  }
};

/* ==========================================================================
   MASTER DM VIEW INITIALIZER
   ========================================================================== */
window.DnDNexus.initDMView = function() {
  window.DnDNexus.initCheatSheet();
  if (window.DnDNexus.renderMonstersBestiary) window.DnDNexus.renderMonstersBestiary('');
  if (window.DnDNexus.initCampaignJournal) window.DnDNexus.initCampaignJournal();

  const savedSubtab = localStorage.getItem('dnd_active_dm_subtab') || 'party';
  window.DnDNexus.switchDMSubTab(savedSubtab);

  // Search input
  const monsterSearchInput = document.getElementById('monster-search-input');
  if (monsterSearchInput) {
    monsterSearchInput.oninput = (e) => {
      window.DnDNexus.renderMonstersBestiary(e.target.value);
    };
  }

  // Group check buttons
  const btnGroupStealth = document.getElementById('btn-group-stealth');
  if (btnGroupStealth) btnGroupStealth.onclick = () => window.DnDNexus.runGroupCheck('stealth', 'Gizlilik (Stealth)');

  const btnGroupPerc = document.getElementById('btn-group-perception');
  if (btnGroupPerc) btnGroupPerc.onclick = () => window.DnDNexus.runGroupCheck('perception', 'Algı (Perception)');

  const btnGroupAth = document.getElementById('btn-group-athletics');
  if (btnGroupAth) btnGroupAth.onclick = () => window.DnDNexus.runGroupCheck('athletics', 'Atletizm (Athletics)');

  const btnGroupCon = document.getElementById('btn-group-con-save');
  if (btnGroupCon) btnGroupCon.onclick = () => window.DnDNexus.runGroupCheck('con-save', 'CON Kurtarma Zarı');

  const btnSecretDm = document.getElementById('btn-secret-dm-roll');
  if (btnSecretDm) btnSecretDm.onclick = window.DnDNexus.rollSecretDMDice;

  // Custom Soundboard
  window.DnDNexus.renderCustomSoundboard();

  // Generator buttons
  const btnGenNpc = document.getElementById('btn-gen-npc');
  if (btnGenNpc) btnGenNpc.onclick = window.DnDNexus.generateRandomNPC;

  const btnGenLoot = document.getElementById('btn-gen-loot');
  if (btnGenLoot) btnGenLoot.onclick = window.DnDNexus.generateRandomLoot;
};
