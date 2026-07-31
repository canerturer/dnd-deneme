/**
 * D&D 5e Nexus - Sync Micro-Service
 * Decoupled WebRTC & BroadcastChannel networking service driven by EventBus.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  class SyncService {
    init() {
      const bus = window.DnDNexus.EventBus;
      const EVENTS = window.DnDNexus.EVENTS;

      // Subscribe to internal application events to broadcast externally over network
      if (bus && EVENTS) {
        bus.subscribe(EVENTS.CHARACTER_UPDATED, (payload) => {
          if (window.DnDNexus.broadcastCharacterToParty) {
            window.DnDNexus.broadcastCharacterToParty(payload?.campaignCode);
          }
        });

        bus.subscribe(EVENTS.DICE_ROLLED, (payload) => {
          if (payload && window.DnDNexus.broadcastRollEvent) {
            window.DnDNexus.broadcastRollEvent(payload.name, payload.total, payload.detailText);
          }
        });

        bus.subscribe(EVENTS.INSPIRATION_CHANGED, (payload) => {
          if (payload && window.DnDNexus.broadcastDMUpdate) {
            window.DnDNexus.broadcastDMUpdate(payload.targetCharId, { inspiration: payload.inspiration });
          }
        });
      }

      // Initialize lower-level networking (BroadcastChannel & PeerJS WebRTC)
      if (window.DnDNexus.initSync) {
        window.DnDNexus.initSync();
      }
    }

    broadcastCharacter(campaignCode) {
      if (window.DnDNexus.broadcastCharacterToParty) {
        window.DnDNexus.broadcastCharacterToParty(campaignCode);
      }
    }

    broadcastRoll(name, total, detailText) {
      if (window.DnDNexus.broadcastRollEvent) {
        window.DnDNexus.broadcastRollEvent(name, total, detailText);
      }
    }

    copyInviteLink() {
      if (window.DnDNexus.copyInviteLink) {
        window.DnDNexus.copyInviteLink();
      }
    }
  }

  const instance = new SyncService();
  if (window.DnDNexus.Services) {
    window.DnDNexus.Services.register('sync', instance);
  }
  window.DnDNexus.SyncService = instance;
})();
