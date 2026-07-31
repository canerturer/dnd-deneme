/**
 * D&D 5e Nexus - Storage & JSON Engine
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.autosaveTimer = null;

window.DnDNexus.getFormData = function() {
  const data = {};
  let charId = localStorage.getItem('dnd_char_id');
  if (!charId) {
    charId = 'char-' + Date.now();
    localStorage.setItem('dnd_char_id', charId);
  }
  data['char-id'] = charId;

  document.querySelectorAll('input[id], textarea[id], select[id]').forEach(el => {
    if (el.type === 'checkbox') data[el.id] = el.checked;
    else data[el.id] = el.value;
  });

  document.querySelectorAll('.skill-prof-toggle').forEach(btn => {
    data[btn.id] = parseInt(btn.getAttribute('data-state')) || 0;
  });

  for (let lvl = 1; lvl <= 6; lvl++) {
    data[`spellSlotStates-${lvl}`] = window.DnDNexus.spellSlotStates[lvl] || [];
  }

  window.DnDNexus.SAVING_THROWS_DATA.forEach(save => {
    const badge = document.getElementById(`${save.id}-val`);
    if (badge) data[`${save.id}-val`] = badge.textContent;
  });

  window.DnDNexus.SKILLS_DATA.forEach(skill => {
    const badge = document.getElementById(`${skill.id}-val`);
    if (badge) data[`${skill.id}-val`] = badge.textContent;
  });

  const weapons = [];
  document.querySelectorAll('#weapons-tbody tr').forEach(tr => {
    weapons.push({
      name: tr.querySelector('.weapon-name').value,
      bonus: tr.querySelector('.weapon-bonus').value,
      damage: tr.querySelector('.weapon-damage').value
    });
  });
  data.weapons = weapons;

  const spells = [];
  document.querySelectorAll('#spells-tbody tr').forEach(tr => {
    spells.push({
      prep: tr.querySelector('.spell-prep-check').checked,
      name: tr.querySelector('.spell-name').value,
      level: tr.querySelector('.spell-level').value,
      range: tr.querySelector('.spell-range').value
    });
  });
  data.spells = spells;

  data.feats = window.DnDNexus.characterFeats || [];
  data.trackers = window.DnDNexus.characterTrackers || [];

  return data;
};

window.DnDNexus.triggerAutosave = function() {
  clearTimeout(window.DnDNexus.autosaveTimer);
  window.DnDNexus.autosaveTimer = setTimeout(() => {
    const data = window.DnDNexus.getFormData();
    localStorage.setItem('dnd5e_character_data', JSON.stringify(data));
    window.DnDNexus.showAutosaveBadge();
    if (window.DnDNexus.broadcastCharacterToParty) {
      window.DnDNexus.broadcastCharacterToParty();
    }
  }, 400);
};

window.DnDNexus.showAutosaveBadge = function() {
  const badge = document.getElementById('autosave-badge');
  if (badge) {
    badge.style.opacity = '1';
    setTimeout(() => { badge.style.opacity = '0.7'; }, 1500);
  }
};

window.DnDNexus.exportCharacterJSON = function() {
  const data = window.DnDNexus.getFormData();
  const jsonStr = JSON.stringify(data, null, 2);
  const charName = (document.getElementById('char-name').value || 'character').toLowerCase().replace(/\s+/g, '_');
  
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${charName}_dnd5e.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.DnDNexus.importCharacterJSON = function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (window.DnDNexus.loadPreset) window.DnDNexus.loadPreset(data);
      alert('Karakter başarıyla yüklendi!');
    } catch (err) {
      alert('Geçersiz JSON karakter dosyası!');
    }
  };
  reader.readAsText(file);
};
