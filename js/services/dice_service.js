/**
 * D&D 5e Nexus - Dice Micro-Service
 * Decoupled Dice Roller engine driven by EventBus.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  class DiceService {
    init() {
      // Initialize dice service listeners
    }

    openModal(sides = 20, count = 1, mod = 0, name = 'Zar Atışı') {
      if (window.DnDNexus.openDiceModal) {
        window.DnDNexus.openDiceModal(sides, count, mod, name);
      }
    }

    closeModal() {
      if (window.DnDNexus.closeDiceModal) {
        window.DnDNexus.closeDiceModal();
      }
    }

    executeRoll() {
      if (window.DnDNexus.executeModalRoll) {
        window.DnDNexus.executeModalRoll();
      }
    }
  }

  const instance = new DiceService();
  if (window.DnDNexus.Services) {
    window.DnDNexus.Services.register('dice', instance);
  }
  window.DnDNexus.DiceService = instance;
})();
