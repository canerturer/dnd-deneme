/**
 * D&D 5e Nexus - Supabase Cloud Database & Realtime Micro-Service
 * Decoupled Cloud Persistence, Authentication, and WebSocket Sync Service.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  class SupabaseService {
    constructor() {
      this.client = null;
      this.isConnected = false;
      this.campaignChannel = null;
      this.lobbyChannel = null;
      
      // Load saved Supabase credentials or use default fallback configuration
      this.config = this.loadConfig();
    }

    init() {
      // 1. Always bind UI click listeners first so modal can be opened anytime
      this.bindUI();
      this.subscribeEventBus();

      if (typeof window.supabase === 'undefined') {
        console.warn('Supabase SDK not loaded. Operating in Local/WebRTC mode.');
        this.updateStatusBadge('⚡ Supabase (Konfigürasyon)', 'yellow');
        return;
      }

      if (this.config.url && this.config.anonKey) {
        this.initClient(this.config.url, this.config.anonKey);
      } else {
        this.updateStatusBadge('⚡ Supabase (Konfigüre Edilmedi)', 'yellow');
      }
    }

    loadConfig() {
      try {
        const saved = localStorage.getItem('dnd_supabase_config');
        if (saved) return JSON.parse(saved);
      } catch(e) {}
      return { url: '', anonKey: '' };
    }

    saveConfig(url, anonKey) {
      this.config = { url: url.trim(), anonKey: anonKey.trim() };
      localStorage.setItem('dnd_supabase_config', JSON.stringify(this.config));
      if (this.config.url && this.config.anonKey) {
        this.initClient(this.config.url, this.config.anonKey);
      }
    }

    initClient(url, anonKey) {
      try {
        this.client = window.supabase.createClient(url, anonKey);
        this.isConnected = true;
        this.updateStatusBadge('⚡ Supabase Cloud Aktif', 'green');

        // Initialize Realtime Lobby channel
        this.initRealtimeLobby();

        // Subscribe to current campaign channel if code exists
        if (window.DnDNexus.currentCampaignCode) {
          this.subscribeCampaignChannel(window.DnDNexus.currentCampaignCode);
        }
      } catch(err) {
        console.warn('Supabase client initialization error:', err);
        this.isConnected = false;
        this.updateStatusBadge('⚡ Supabase Bağlantı Hatası', 'red');
      }
    }

    async signUpUser(emailOrId, password, username, avatar) {
      if (!this.client) return { success: false, message: 'Supabase bulut aktif değil.' };

      const email = emailOrId.includes('@') ? emailOrId : `${emailOrId.toLowerCase().trim()}@dndnexus.local`;

      try {
        const { data, error } = await this.client.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              avatar: avatar
            }
          }
        });

        if (error) return { success: false, message: error.message };

        return { success: true, user: data.user, message: 'Supabase Cloud hesabı başarıyla oluşturuldu!' };
      } catch(err) {
        return { success: false, message: err.message };
      }
    }

    async signInUser(emailOrId, password) {
      if (!this.client) return { success: false, message: 'Supabase bulut aktif değil.' };

      const email = emailOrId.includes('@') ? emailOrId : `${emailOrId.toLowerCase().trim()}@dndnexus.local`;

      try {
        const { data, error } = await this.client.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) return { success: false, message: error.message };

        return { success: true, user: data.user, session: data.session, message: 'Supabase Cloud hesabına giriş yapıldı!' };
      } catch(err) {
        return { success: false, message: err.message };
      }
    }

    subscribeEventBus() {
      const bus = window.DnDNexus.EventBus;
      const EVENTS = window.DnDNexus.EVENTS;
      if (!bus || !EVENTS) return;

      bus.subscribe(EVENTS.CHARACTER_UPDATED, (payload) => {
        if (this.isConnected) {
          this.saveCharacterToCloud(payload?.character || window.DnDNexus.getFormData());
          this.broadcastRealtimePayload({ type: 'CHARACTER_UPDATE', character: payload?.character || window.DnDNexus.getFormData() });
        }
      });

      bus.subscribe(EVENTS.DICE_ROLLED, (payload) => {
        if (this.isConnected && payload) {
          this.broadcastRealtimePayload({ type: 'ROLL_EVENT', ...payload });
        }
      });

      bus.subscribe(EVENTS.INSPIRATION_CHANGED, (payload) => {
        if (this.isConnected && payload) {
          this.broadcastRealtimePayload({ type: 'DM_UPDATE', ...payload });
        }
      });
    }

    initRealtimeLobby() {
      if (!this.client) return;
      try {
        this.lobbyChannel = this.client.channel('dnd_nexus_global_lobby');
        this.lobbyChannel
          .on('broadcast', { event: 'LOBBY_ANNOUNCE' }, ({ payload }) => {
            if (window.DnDNexus.LobbyService && window.DnDNexus.LobbyService.handleLobbyMessage) {
              window.DnDNexus.LobbyService.handleLobbyMessage(payload);
            }
          })
          .subscribe();
      } catch(e) {
        console.warn('Supabase Realtime Lobby error:', e);
      }
    }

    subscribeCampaignChannel(campaignCode) {
      if (!this.client || !campaignCode) return;

      if (this.campaignChannel) {
        try { this.campaignChannel.unsubscribe(); } catch(e) {}
      }

      try {
        const channelName = `campaign:${campaignCode.toUpperCase()}`;
        this.campaignChannel = this.client.channel(channelName);

        this.campaignChannel
          .on('broadcast', { event: 'SYNC_PAYLOAD' }, ({ payload }) => {
            if (window.DnDNexus.handleIncomingSyncMessage) {
              window.DnDNexus.handleIncomingSyncMessage(payload);
            }
          })
          .subscribe();
      } catch(e) {
        console.warn('Supabase Realtime Campaign Channel error:', e);
      }
    }

    broadcastRealtimePayload(payload) {
      if (this.campaignChannel) {
        try {
          this.campaignChannel.send({
            type: 'broadcast',
            event: 'SYNC_PAYLOAD',
            payload: payload
          });
        } catch(e) {
          console.warn('Supabase Realtime send error:', e);
        }
      }
    }

    async saveCharacterToCloud(charData) {
      if (!this.client || !charData || !charData['char-id']) return;
      const code = window.DnDNexus.currentCampaignCode || 'CAMP-8F92A';

      try {
        await this.client.from('characters').upsert({
          id: charData['char-id'],
          campaign_code: code,
          char_name: charData['char-name'] || 'Karakter',
          character_data: charData,
          updated_at: new Date().toISOString()
        });
      } catch(e) {
        // Fallback silently if table not created
      }
    }

    updateStatusBadge(text, color = 'green') {
      const badgeText = document.getElementById('supabase-status-text');
      const badgeElem = document.getElementById('supabase-status-badge');
      const pulseDot = badgeElem ? badgeElem.querySelector('.pulse-dot') : null;

      if (badgeText) badgeText.textContent = text;
      if (pulseDot) {
        pulseDot.style.backgroundColor = color === 'green' ? '#22c55e' : color === 'yellow' ? '#eab308' : '#ef4444';
      }
    }

    openConfigModal() {
      const modal = document.getElementById('supabase-config-modal');
      if (modal) {
        modal.style.display = 'flex';
        const urlInput = document.getElementById('sb-url-input');
        const keyInput = document.getElementById('sb-key-input');
        if (urlInput) urlInput.value = this.config.url || '';
        if (keyInput) keyInput.value = this.config.anonKey || '';
      }
    }

    closeConfigModal() {
      const modal = document.getElementById('supabase-config-modal');
      if (modal) modal.style.display = 'none';
    }

    bindUI() {
      document.getElementById('supabase-status-badge')?.addEventListener('click', () => this.openConfigModal());
      document.getElementById('btn-close-sb-config')?.addEventListener('click', () => this.closeConfigModal());
      document.getElementById('supabase-config-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'supabase-config-modal') this.closeConfigModal();
      });

      document.getElementById('btn-save-sb-config')?.addEventListener('click', () => {
        const url = document.getElementById('sb-url-input')?.value || '';
        const key = document.getElementById('sb-key-input')?.value || '';
        this.saveConfig(url, key);
        this.closeConfigModal();
        alert('⚡ Supabase bulut konfigürasyonu kaydedildi ve istemci yeniden başlatıldı!');
      });
    }
  }

  const instance = new SupabaseService();
  if (window.DnDNexus.Services) {
    window.DnDNexus.Services.register('supabase', instance);
  }
  window.DnDNexus.SupabaseService = instance;
})();
