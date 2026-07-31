/**
 * D&D 5e Nexus - Service Registry Module
 * Decoupled micro-service manager for lifecycle, registration, and discovery.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  class ServiceRegistry {
    constructor() {
      this.services = new Map();
      this.initialized = false;
    }

    /**
     * Register a new service module
     * @param {string} name 
     * @param {Object} serviceInstance 
     */
    register(name, serviceInstance) {
      if (this.services.has(name)) {
        console.warn(`[ServiceRegistry] Overwriting existing service: "${name}"`);
      }
      this.services.set(name, serviceInstance);
      
      if (this.initialized && typeof serviceInstance.init === 'function') {
        serviceInstance.init();
      }
    }

    /**
     * Retrieve a registered service
     * @param {string} name 
     * @returns {Object|null}
     */
    get(name) {
      const service = this.services.get(name);
      if (!service) {
        console.warn(`[ServiceRegistry] Service "${name}" not found.`);
      }
      return service;
    }

    /**
     * Initialize all registered services
     */
    initAll() {
      this.services.forEach((service, name) => {
        if (typeof service.init === 'function') {
          try {
            service.init();
          } catch (err) {
            console.error(`[ServiceRegistry] Error initializing service "${name}":`, err);
          }
        }
      });
      this.initialized = true;
    }
  }

  window.DnDNexus.ServiceRegistry = new ServiceRegistry();
  window.DnDNexus.Services = window.DnDNexus.ServiceRegistry;
})();
