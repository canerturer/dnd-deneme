/**
 * D&D 5e Nexus - Event Bus Module
 * Decoupled event-driven pub/sub communication channel for micro-services.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  class EventBus {
    constructor() {
      this.listeners = {};
    }

    /**
     * Subscribe to an event topic
     * @param {string} event 
     * @param {Function} callback 
     */
    subscribe(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
      return () => this.unsubscribe(event, callback);
    }

    /**
     * Unsubscribe from an event topic
     * @param {string} event 
     * @param {Function} callback 
     */
    unsubscribe(event, callback) {
      if (!this.listeners[event]) return;
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    /**
     * Publish an event to all subscribers
     * @param {string} event 
     * @param {*} payload 
     */
    publish(event, payload) {
      if (!this.listeners[event]) return;
      this.listeners[event].forEach(callback => {
        try {
          callback(payload);
        } catch (err) {
          console.error(`[EventBus Error] Event "${event}":`, err);
        }
      });
    }
  }

  // Pre-defined System Events
  EventBus.EVENTS = {
    CHARACTER_UPDATED: 'character:updated',
    CHARACTER_LOADED: 'character:loaded',
    DICE_ROLLED: 'dice:rolled',
    SYNC_RECEIVED: 'sync:received',
    SYNC_STATUS_CHANGED: 'sync:status_changed',
    ENCOUNTER_UPDATED: 'encounter:updated',
    REST_PERFORMED: 'rest:performed',
    INSPIRATION_CHANGED: 'dm:inspiration_changed',
    VIEW_CHANGED: 'view:changed'
  };

  window.DnDNexus.EventBus = new EventBus();
  window.DnDNexus.EVENTS = EventBus.EVENTS;
})();
