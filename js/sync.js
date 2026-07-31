/**
 * D&D 5e Nexus - BroadcastChannel & Live Campaign Sync Module
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.syncChannel = null;
window.DnDNexus.partyMembers = window.DnDNexus.partyMembers || {};
window.DnDNexus.currentCampaignCode = localStorage.getItem('dnd_campaign_code') || 'CAMP-8F92A';

window.DnDNexus.initSync = function() {
  if ('BroadcastChannel' in window) {
    window.DnDNexus.syncChannel = new BroadcastChannel('dnd_campaign_channel');
    window.DnDNexus.syncChannel.onmessage = (event) => window.DnDNexus.handleIncomingSyncMessage(event.data);
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'dnd_party_update_signal') {
      window.DnDNexus.loadPartyFromLocalStorage();
      if (window.DnDNexus.renderPartyRoster) window.DnDNexus.renderPartyRoster();
      if (window.DnDNexus.syncPartyToEncounter) window.DnDNexus.syncPartyToEncounter();
    } else if (e.key === 'dnd_audio_sync_signal') {
      try {
        const data = JSON.parse(e.newValue);
        if (window.DnDNexus.handleIncomingAudioSync) window.DnDNexus.handleIncomingAudioSync(data);
      } catch(err) {}
    }
  });
};

window.DnDNexus.broadcastCharacterToParty = function(campaignCode = window.DnDNexus.currentCampaignCode) {
  const charData = window.DnDNexus.getFormData();
  if (!charData['char-id']) {
    charData['char-id'] = 'char-' + Date.now();
    localStorage.setItem('dnd_char_id', charData['char-id']);
  }

  const payload = { type: 'CHARACTER_UPDATE', campaignCode: campaignCode, character: charData };
  if (window.DnDNexus.syncChannel) window.DnDNexus.syncChannel.postMessage(payload);
  
  window.DnDNexus.partyMembers[charData['char-id']] = charData;
  window.DnDNexus.savePartyToLocalStorage();
  if (window.DnDNexus.renderPartyRoster) window.DnDNexus.renderPartyRoster();
  if (window.DnDNexus.syncPartyToEncounter) window.DnDNexus.syncPartyToEncounter();
};

window.DnDNexus.broadcastRollEvent = function(rollName, total, detailText) {
  const charName = document.getElementById('char-name').value || 'Oyuncu';
  const payload = { type: 'ROLL_EVENT', charName: charName, rollName: rollName, total: total, detailText: detailText };
  if (window.DnDNexus.syncChannel) window.DnDNexus.syncChannel.postMessage(payload);
  window.DnDNexus.addRollFeedEntry(charName, rollName, total, detailText);
};

window.DnDNexus.addRollFeedEntry = function(charName, rollName, total, detailText) {
  const list = document.getElementById('feed-body-list');
  if (!list) return;

  const item = document.createElement('div');
  item.className = 'feed-item';
  item.innerHTML = `
    <strong>${charName}</strong> &bull; ${rollName}: <span class="roll-highlight">${total}</span>
    <div style="font-size:0.75rem; color:#c084fc;">${detailText}</div>
  `;
  list.prepend(item);

  const drawer = document.getElementById('roll-feed-drawer');
  if (drawer && drawer.classList.contains('collapsed')) {
    drawer.classList.remove('collapsed');
    setTimeout(() => drawer.classList.add('collapsed'), 3500);
  }
};

window.DnDNexus.handleIncomingSyncMessage = function(data) {
  if (!data) return;
  if (data.type === 'CHARACTER_UPDATE') {
    if (data.character && data.character['char-id']) {
      window.DnDNexus.partyMembers[data.character['char-id']] = data.character;
      window.DnDNexus.savePartyToLocalStorage();
      if (window.DnDNexus.renderPartyRoster) window.DnDNexus.renderPartyRoster();
      if (window.DnDNexus.syncPartyToEncounter) window.DnDNexus.syncPartyToEncounter();
    }
  } else if (data.type === 'DM_UPDATE') {
    const myCharId = localStorage.getItem('dnd_char_id');
    if (data.targetCharId === myCharId && data.updates) {
      if ('inspiration' in data.updates) {
        document.getElementById('inspiration').checked = data.updates.inspiration;
        if (window.DnDNexus.calculateAll) window.DnDNexus.calculateAll();
        if (window.DnDNexus.triggerAutosave) window.DnDNexus.triggerAutosave();
      }
    }
  } else if (data.type === 'ROLL_EVENT') {
    window.DnDNexus.addRollFeedEntry(data.charName, data.rollName, data.total, data.detailText);
  } else if (data.type === 'AUDIO_EVENT') {
    if (window.DnDNexus.handleIncomingAudioSync) {
      window.DnDNexus.handleIncomingAudioSync(data);
    }
  }
};

window.DnDNexus.savePartyToLocalStorage = function() {
  localStorage.setItem('dnd_party_members', JSON.stringify(window.DnDNexus.partyMembers));
  localStorage.setItem('dnd_party_update_signal', Date.now().toString());
};

window.DnDNexus.loadPartyFromLocalStorage = function() {
  const saved = localStorage.getItem('dnd_party_members');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(window.DnDNexus.partyMembers, parsed);
    } catch (e) {}
  }
};

window.DnDNexus.setCampaignCode = function(code) {
  window.DnDNexus.currentCampaignCode = code;
  localStorage.setItem('dnd_campaign_code', code);
};
