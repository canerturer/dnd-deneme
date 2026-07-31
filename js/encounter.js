/**
 * D&D 5e Nexus - DM Combat Encounter & Initiative Tracker Module
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.encounterList = window.DnDNexus.encounterList || [];
window.DnDNexus.partyMembers = window.DnDNexus.partyMembers || {};
window.DnDNexus.activeTurnIndex = window.DnDNexus.activeTurnIndex || 0;

window.DnDNexus.syncPartyToEncounter = function() {
  window.DnDNexus.encounterList = window.DnDNexus.encounterList || [];
  window.DnDNexus.partyMembers = window.DnDNexus.partyMembers || {};
  const party = Object.values(window.DnDNexus.partyMembers);
  party.forEach(p => {
    let existing = window.DnDNexus.encounterList.find(e => e.id === p['char-id']);
    let dexMod = Math.floor(((parseInt(p['dex-score']) || 10) - 10) / 2);
    if (!existing) {
      window.DnDNexus.encounterList.push({
        id: p['char-id'],
        name: p['char-name'] || 'Oyuncu',
        type: 'player',
        initiative: 10 + dexMod,
        ac: parseInt(p['ac-score']) || 10,
        hpCur: parseInt(p['hp-current']) || 10,
        hpMax: parseInt(p['hp-max']) || 10
      });
    } else {
      existing.name = p['char-name'];
      existing.ac = parseInt(p['ac-score']) || 10;
      existing.hpCur = parseInt(p['hp-current']) || 10;
      existing.hpMax = parseInt(p['hp-max']) || 10;
    }
  });

  window.DnDNexus.renderEncounterTable();
};

window.DnDNexus.addEnemyToEncounter = function() {
  const enemyName = prompt('Canavar / Düşman Adı:', 'Goblin ' + (window.DnDNexus.encounterList.filter(e => e.type === 'enemy').length + 1));
  if (!enemyName) return;

  const hp = parseInt(prompt('Maksimum HP:', '7')) || 7;
  const ac = parseInt(prompt('Zırh Sınıfı (AC):', '15')) || 15;
  const initBonus = parseInt(prompt('İnisiyatif Bonusu:', '+2')) || 2;

  const enemyId = 'enemy-' + Date.now();
  window.DnDNexus.encounterList.push({
    id: enemyId,
    name: enemyName,
    type: 'enemy',
    initBonus: initBonus,
    initiative: Math.floor(Math.random() * 20) + 1 + initBonus,
    ac: ac,
    hpCur: hp,
    hpMax: hp
  });

  window.DnDNexus.rollSortEncounterInitiative();
};

window.DnDNexus.rollSortEncounterInitiative = function() {
  window.DnDNexus.encounterList.forEach(e => {
    if (e.type === 'enemy') {
      let roll = Math.floor(Math.random() * 20) + 1;
      e.initiative = roll + (e.initBonus || 0);
    }
  });

  window.DnDNexus.encounterList.sort((a, b) => b.initiative - a.initiative);
  window.DnDNexus.renderEncounterTable();
};

window.DnDNexus.nextTurnEncounter = function() {
  if (window.DnDNexus.encounterList.length === 0) return;
  const newIndex = (window.DnDNexus.activeTurnIndex + 1) % window.DnDNexus.encounterList.length;
  window.DnDNexus.activeTurnIndex = newIndex;
  if (newIndex === 0) {
    const roundElem = document.getElementById('encounter-round-num');
    let r = parseInt(roundElem.textContent) || 1;
    roundElem.textContent = r + 1;
  }
  window.DnDNexus.renderEncounterTable(newIndex);
};

window.DnDNexus.renderEncounterTable = function(overrideIndex = null) {
  const tbody = document.getElementById('encounter-tbody');
  const activeBannerName = document.getElementById('active-combatant-name');
  if (!tbody) return;

  let currentIndex = overrideIndex !== null ? overrideIndex : window.DnDNexus.activeTurnIndex;

  if (window.DnDNexus.encounterList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#c084fc; padding:20px;">Savaş listesi boş. Partideki oyuncular veya yeni canavarlar burada görünecektir.</td></tr>`;
    if (activeBannerName) activeBannerName.textContent = 'Henüz Savaş Başlamadı';
    return;
  }

  const combatant = window.DnDNexus.encounterList[currentIndex];
  if (activeBannerName) {
    if (combatant) {
      activeBannerName.textContent = `${combatant.name} (İnisiyatif: ${combatant.initiative})`;
    } else {
      activeBannerName.textContent = 'Henüz Savaş Başlamadı';
    }
  }

  tbody.innerHTML = '';
  window.DnDNexus.encounterList.forEach((c, idx) => {
    const tr = document.createElement('tr');
    if (idx === currentIndex) tr.className = 'active-turn-row';
    const typeBadge = c.type === 'player' ? `<span class="combatant-type type-player">Oyuncu</span>` : `<span class="combatant-type type-monster">Canavar</span>`;

    tr.innerHTML = `
      <td style="font-weight:bold; font-size:1.1rem; color:var(--accent-purple-light);">${idx === currentIndex ? '▶' : ''}</td>
      <td><strong>${c.name}</strong></td>
      <td>${typeBadge}</td>
      <td><input type="number" class="enc-init-input" value="${c.initiative}" style="width:50px; text-align:center;"></td>
      <td style="font-weight:bold; font-family:var(--font-header);">${c.ac}</td>
      <td><span class="enc-hp-text">${c.hpCur} / ${c.hpMax} HP</span></td>
      <td>
        <div style="display:flex; gap:4px;">
          <button class="hp-btn hp-sub enc-hp-sub" data-idx="${idx}" data-amt="-5">-5</button>
          <button class="hp-btn hp-sub enc-hp-sub" data-idx="${idx}" data-amt="-1">-1</button>
          <button class="hp-btn hp-add enc-hp-add" data-idx="${idx}" data-amt="+1">+1</button>
          <button class="hp-btn hp-add enc-hp-add" data-idx="${idx}" data-amt="+5">+5</button>
        </div>
      </td>
      <td><button class="btn-del-weapon btn-del-enc" data-idx="${idx}">&times;</button></td>
    `;

    tr.querySelector('.enc-init-input').addEventListener('change', (e) => {
      c.initiative = parseInt(e.target.value) || 0;
    });

    tr.querySelectorAll('.enc-hp-sub, .enc-hp-add').forEach(b => {
      b.addEventListener('click', () => {
        let amt = parseInt(b.getAttribute('data-amt')) || 0;
        c.hpCur = Math.max(0, Math.min(c.hpMax, c.hpCur + amt));
        window.DnDNexus.renderEncounterTable(currentIndex);
      });
    });

    tr.querySelector('.btn-del-enc').addEventListener('click', () => {
      window.DnDNexus.encounterList.splice(idx, 1);
      window.DnDNexus.renderEncounterTable(0);
    });

    tbody.appendChild(tr);
  });
};

window.DnDNexus.resetEncounter = function() {
  if (confirm('Savaşı sıfırlamak istediğinize emin misiniz? Düşmanlar temizlenecek ve raund 1 olacak.')) {
    window.DnDNexus.encounterList = [];
    window.DnDNexus.activeTurnIndex = 0;
    const roundElem = document.getElementById('encounter-round-num');
    if (roundElem) roundElem.textContent = '1';
    window.DnDNexus.syncPartyToEncounter();
  }
};
