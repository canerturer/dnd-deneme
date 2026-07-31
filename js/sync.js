/**
 * D&D 5e Nexus - BroadcastChannel & WebRTC Remote Campaign Sync Module
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.syncChannel = null;
window.DnDNexus.partyMembers = window.DnDNexus.partyMembers || {};
window.DnDNexus.currentCampaignCode = localStorage.getItem('dnd_campaign_code') || 'CAMP-8F92A';

// WebRTC State
window.DnDNexus.peer = null;
window.DnDNexus.peerConnections = {};
window.DnDNexus.isPeerHost = false;

window.DnDNexus.initSync = function() {
  // 1. BroadcastChannel API for local tab-to-tab communication
  if ('BroadcastChannel' in window) {
    try {
      window.DnDNexus.syncChannel = new BroadcastChannel('dnd_campaign_channel');
      window.DnDNexus.syncChannel.onmessage = (event) => window.DnDNexus.handleIncomingSyncMessage(event.data);
    } catch (err) {
      console.warn('BroadcastChannel initialization error:', err);
    }
  }

  // 2. Storage event listener for cross-tab storage updates
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

  // 3. WebRTC PeerJS remote sync initialization
  window.DnDNexus.initWebRTC();
};

window.DnDNexus.initWebRTC = function() {
  if (typeof Peer === 'undefined') {
    console.warn('PeerJS library not available. Operating on Local BroadcastChannel Sync.');
    window.DnDNexus.updateSyncStatusBadge('Yerel Sekme Sync (Offline)', 'yellow');
    return;
  }

  // Clean up previous peer instance if any
  if (window.DnDNexus.peer) {
    try { window.DnDNexus.peer.destroy(); } catch(e) {}
    window.DnDNexus.peer = null;
    window.DnDNexus.peerConnections = {};
  }

  const campaignCode = window.DnDNexus.currentCampaignCode || 'CAMP-8F92A';
  const myCharId = localStorage.getItem('dnd_char_id') || ('char-' + Date.now());
  localStorage.setItem('dnd_char_id', myCharId);

  const isDMViewActive = document.getElementById('tab-dm-view')?.classList.contains('active');
  const peerHostId = 'dnd-nexus-' + campaignCode.toUpperCase();

  if (isDMViewActive) {
    // DM Host Mode
    window.DnDNexus.isPeerHost = true;
    try {
      window.DnDNexus.peer = new Peer(peerHostId, { debug: 1 });

      window.DnDNexus.peer.on('open', (id) => {
        window.DnDNexus.updateSyncStatusBadge(`WebRTC Sunucu (${campaignCode})`, 'green');
      });

      window.DnDNexus.peer.on('connection', (conn) => {
        window.DnDNexus.peerConnections[conn.peer] = conn;

        conn.on('open', () => {
          const peerCount = Object.keys(window.DnDNexus.peerConnections).length;
          window.DnDNexus.updateSyncStatusBadge(`WebRTC Live (${peerCount} Oyuncu)`, 'green');
          window.DnDNexus.broadcastCharacterToParty();
        });

        conn.on('data', (data) => {
          window.DnDNexus.handleIncomingSyncMessage(data);
          // Relay message to all other connected peers (Hub & Spoke architecture)
          Object.entries(window.DnDNexus.peerConnections).forEach(([peerId, otherConn]) => {
            if (peerId !== conn.peer && otherConn && otherConn.open) {
              try { otherConn.send(data); } catch(e) {}
            }
          });
        });

        conn.on('close', () => {
          delete window.DnDNexus.peerConnections[conn.peer];
          const count = Object.keys(window.DnDNexus.peerConnections).length;
          window.DnDNexus.updateSyncStatusBadge(count > 0 ? `WebRTC Live (${count} Oyuncu)` : `WebRTC Sunucu (${campaignCode})`, 'green');
        });

        conn.on('error', (err) => console.warn('Peer connection error:', err));
      });

      window.DnDNexus.peer.on('error', (err) => {
        if (err.type === 'unavailable-id') {
          // Id is taken by another host, connect as client peer
          window.DnDNexus.initWebRTCClient(peerHostId);
        } else {
          console.warn('PeerJS Host error:', err);
          window.DnDNexus.updateSyncStatusBadge('WebRTC Beklemede', 'yellow');
        }
      });
    } catch(err) {
      console.warn('PeerJS Host init error:', err);
    }
  } else {
    // Player Client Mode
    window.DnDNexus.isPeerHost = false;
    window.DnDNexus.initWebRTCClient(peerHostId);
  }
};

window.DnDNexus.initWebRTCClient = function(targetHostId) {
  try {
    window.DnDNexus.peer = new Peer({ debug: 1 });

    window.DnDNexus.peer.on('open', (id) => {
      const conn = window.DnDNexus.peer.connect(targetHostId, { reliable: true });

      conn.on('open', () => {
        window.DnDNexus.peerConnections[targetHostId] = conn;
        window.DnDNexus.updateSyncStatusBadge('WebRTC Canlı Bağlantı', 'green');
        window.DnDNexus.broadcastCharacterToParty();
      });

      conn.on('data', (data) => {
        window.DnDNexus.handleIncomingSyncMessage(data);
      });

      conn.on('close', () => {
        delete window.DnDNexus.peerConnections[targetHostId];
        window.DnDNexus.updateSyncStatusBadge('Yerel Sekme Sync', 'yellow');
      });

      conn.on('error', (err) => {
        console.warn('PeerJS client connection error:', err);
        window.DnDNexus.updateSyncStatusBadge('Yerel Sekme Sync', 'yellow');
      });
    });

    window.DnDNexus.peer.on('error', (err) => {
      console.warn('PeerJS Client error:', err);
      window.DnDNexus.updateSyncStatusBadge('Yerel Sekme Sync', 'yellow');
    });
  } catch(err) {
    console.warn('WebRTC client init failed:', err);
  }
};

window.DnDNexus.sendWebRTCPayload = function(payload) {
  Object.values(window.DnDNexus.peerConnections).forEach(conn => {
    if (conn && conn.open) {
      try {
        conn.send(payload);
      } catch(e) {
        console.warn('WebRTC send error:', e);
      }
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
  
  if (window.DnDNexus.syncChannel) {
    try { window.DnDNexus.syncChannel.postMessage(payload); } catch(e) {}
  }
  window.DnDNexus.sendWebRTCPayload(payload);

  window.DnDNexus.partyMembers[charData['char-id']] = charData;
  window.DnDNexus.savePartyToLocalStorage();
  if (window.DnDNexus.renderPartyRoster) window.DnDNexus.renderPartyRoster();
  if (window.DnDNexus.syncPartyToEncounter) window.DnDNexus.syncPartyToEncounter();
};

window.DnDNexus.broadcastRollEvent = function(rollName, total, detailText) {
  const charName = document.getElementById('char-name').value || 'Oyuncu';
  const payload = { type: 'ROLL_EVENT', charName: charName, rollName: rollName, total: total, detailText: detailText };

  if (window.DnDNexus.syncChannel) {
    try { window.DnDNexus.syncChannel.postMessage(payload); } catch(e) {}
  }
  window.DnDNexus.sendWebRTCPayload(payload);

  window.DnDNexus.addRollFeedEntry(charName, rollName, total, detailText);
};

window.DnDNexus.broadcastDMUpdate = function(targetCharId, updates) {
  const payload = { type: 'DM_UPDATE', targetCharId: targetCharId, updates: updates };

  if (window.DnDNexus.syncChannel) {
    try { window.DnDNexus.syncChannel.postMessage(payload); } catch(e) {}
  }
  window.DnDNexus.sendWebRTCPayload(payload);
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

window.DnDNexus.updateSyncStatusBadge = function(text, state = 'green') {
  const badgeText = document.getElementById('webrtc-status-text');
  const badgeContainer = document.getElementById('webrtc-status-badge');
  const pulseDot = badgeContainer ? badgeContainer.querySelector('.pulse-dot') : null;
  const dmSyncIndicator = document.getElementById('sync-status-indicator');

  if (badgeText) badgeText.textContent = text;
  if (pulseDot) {
    pulseDot.style.backgroundColor = state === 'green' ? '#22c55e' : state === 'yellow' ? '#eab308' : '#ef4444';
  }
  if (dmSyncIndicator) {
    dmSyncIndicator.innerHTML = `<span class="pulse-dot" style="background-color:${state === 'green' ? '#22c55e' : '#eab308'};"></span> ${text}`;
  }
};

window.DnDNexus.copyInviteLink = function() {
  const code = window.DnDNexus.currentCampaignCode || 'CAMP-8F92A';
  const url = `${window.location.origin}${window.location.pathname}?join=${code}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      alert(`📋 Kampanya Davet Linki Kopyalandı!\n\nDavet Linki: ${url}\n\nOyuncular bu linki açarak WebRTC ve canlı sekme üzerinden doğrudan kampanyanıza katılır!`);
    }).catch(() => {
      prompt('Kampanya Davet Linki:', url);
    });
  } else {
    prompt('Kampanya Davet Linki:', url);
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
  window.DnDNexus.initWebRTC();
};

