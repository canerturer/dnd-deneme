/**
 * D&D 5e Nexus - Campaign Lobby & Room Matching Micro-Service
 * Decoupled Campaign Discovery Service supporting real-time WebRTC room listings and DM campaign hosting.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  class LobbyService {
    constructor() {
      this.rooms = new Map(); // roomCode -> roomData
      this.lobbyChannel = null;
      this.heartbeatTimer = null;
      this.currentCampaignName = 'Phandelver Madenleri';
    }

    init() {
      // 1. Initialize Lobby Discovery Channel
      if ('BroadcastChannel' in window) {
        try {
          this.lobbyChannel = new BroadcastChannel('dnd_nexus_lobby_channel');
          this.lobbyChannel.onmessage = (e) => this.handleLobbyMessage(e.data);
        } catch(err) {
          console.warn('Lobby BroadcastChannel error:', err);
        }
      }

      // 2. Start heartbeat timer if acting as DM
      this.startHeartbeat();

      // 3. Bind UI listeners
      this.bindUI();
    }

    startHeartbeat() {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = setInterval(() => {
        const isDM = document.getElementById('tab-dm-view')?.classList.contains('active');
        if (isDM) {
          this.announceRoom();
        }
      }, 4000);
    }

    announceRoom() {
      const code = window.DnDNexus.currentCampaignCode || 'CAMP-8F92A';
      const user = window.DnDNexus.AuthService ? window.DnDNexus.AuthService.getUser() : { username: 'DM' };
      const party = Object.keys(window.DnDNexus.partyMembers || {}).length;
      const campaignTitle = this.currentCampaignName ? `${this.currentCampaignName} (${code})` : `Phandelver Madenleri (${code})`;

      const payload = {
        type: 'LOBBY_ANNOUNCE',
        code: code,
        name: campaignTitle,
        dmName: user.username,
        dmAvatar: user.avatar || '👑',
        playerCount: Math.max(1, party),
        maxPlayers: 6,
        status: 'open',
        timestamp: Date.now()
      };

      if (this.lobbyChannel) {
        try { this.lobbyChannel.postMessage(payload); } catch(e) {}
      }

      this.handleLobbyMessage(payload);
    }

    handleLobbyMessage(data) {
      if (!data || data.type !== 'LOBBY_ANNOUNCE') return;

      this.rooms.set(data.code, {
        code: data.code,
        name: data.name,
        dmName: data.dmName,
        dmAvatar: data.dmAvatar || '👑',
        playerCount: data.playerCount || 1,
        maxPlayers: data.maxPlayers || 6,
        status: data.status || 'open',
        lastSeen: Date.now()
      });

      // Prune inactive rooms older than 12 seconds
      const now = Date.now();
      this.rooms.forEach((room, code) => {
        if (now - room.lastSeen > 12000) {
          this.rooms.delete(code);
        }
      });

      this.renderLobbyList();
    }

    createCampaign(campaignName = 'Yeni D&D Kampanyası', roomCode = '') {
      const code = (roomCode || 'CAMP-' + Math.random().toString(36).substring(2, 7).toUpperCase()).toUpperCase();
      this.currentCampaignName = campaignName;

      if (window.DnDNexus.setCampaignCode) {
        window.DnDNexus.setCampaignCode(code);
      }

      const codeElem = document.getElementById('dm-campaign-code');
      if (codeElem) codeElem.textContent = code;

      this.closeLobbyModal();
      this.closeCreateCampaignModal();

      const dmTab = document.getElementById('tab-dm-view');
      if (dmTab) dmTab.click();

      this.announceRoom();
      alert(`✨ "${campaignName}" Kampanyası (${code}) Zindan Efendisi (DM) olarak başarıyla başlatıldı!`);
    }

    openLobbyModal() {
      const modal = document.getElementById('lobby-modal');
      if (modal) {
        modal.style.display = 'flex';
        this.renderLobbyList();
      }
    }

    closeLobbyModal() {
      const modal = document.getElementById('lobby-modal');
      if (modal) modal.style.display = 'none';
    }

    openCreateCampaignModal() {
      const modal = document.getElementById('create-campaign-modal');
      if (modal) modal.style.display = 'flex';
    }

    closeCreateCampaignModal() {
      const modal = document.getElementById('create-campaign-modal');
      if (modal) modal.style.display = 'none';
    }

    renderLobbyList() {
      const tbody = document.getElementById('lobby-rooms-tbody');
      if (!tbody) return;

      if (this.rooms.size === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" style="text-align:center; color:#c084fc; padding:24px;">
              🔍 Henüz aktif kampanya odası bulunamadı. "✨ Yeni Kampanya Kur" butonundan kendi kampanyanızı kurabilirsiniz!
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = '';
      this.rooms.forEach((room) => {
        const tr = document.createElement('tr');
        const isFull = room.playerCount >= room.maxPlayers;
        tr.innerHTML = `
          <td>
            <strong style="color:#f8fafc; font-size:0.95rem;">${room.name}</strong><br>
            <span style="font-size:0.75rem; color:#c084fc;">Oda Kodu: <code>${room.code}</code></span>
          </td>
          <td>${room.dmAvatar} <strong>${room.dmName}</strong></td>
          <td><span class="badge" style="background:#a855f7;">${room.playerCount} / ${room.maxPlayers}</span></td>
          <td>
            <span class="status-indicator" style="color: ${room.status === 'open' ? '#22c55e' : '#eab308'}; font-weight:700;">
              ${room.status === 'open' ? '🟢 Katılıma Açık' : '⚔️ Savaşta'}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="btn btn-accent btn-sm btn-join-room" data-code="${room.code}" ${isFull ? 'disabled' : ''}>
              ⚔️ ${isFull ? 'Oda Dolu' : 'Katıl'}
            </button>
          </td>
        `;

        tr.querySelector('.btn-join-room')?.addEventListener('click', () => {
          this.joinRoom(room.code);
        });

        tbody.appendChild(tr);
      });
    }

    joinRoom(roomCode) {
      if (window.DnDNexus.setCampaignCode) {
        window.DnDNexus.setCampaignCode(roomCode);
        window.DnDNexus.broadcastCharacterToParty(roomCode);
        alert(`🎉 ${roomCode} Kampanyasına Oyuncu olarak başarıyla katıldınız!`);
        this.closeLobbyModal();

        const playerTab = document.getElementById('tab-player-view');
        if (playerTab) playerTab.click();
      }
    }

    bindUI() {
      document.getElementById('btn-open-lobby')?.addEventListener('click', () => this.openLobbyModal());
      document.getElementById('btn-close-lobby')?.addEventListener('click', () => this.closeLobbyModal());
      document.getElementById('lobby-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'lobby-modal') this.closeLobbyModal();
      });

      document.getElementById('btn-open-create-campaign')?.addEventListener('click', () => this.openCreateCampaignModal());
      document.getElementById('btn-close-create-campaign')?.addEventListener('click', () => this.closeCreateCampaignModal());
      document.getElementById('create-campaign-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'create-campaign-modal') this.closeCreateCampaignModal();
      });

      document.getElementById('btn-submit-create-campaign')?.addEventListener('click', () => {
        const name = document.getElementById('create-campaign-name-input')?.value;
        const code = document.getElementById('create-campaign-code-input')?.value;
        this.createCampaign(name, code);
      });
    }
  }

  const instance = new LobbyService();
  if (window.DnDNexus.Services) {
    window.DnDNexus.Services.register('lobby', instance);
  }
  window.DnDNexus.LobbyService = instance;
})();
