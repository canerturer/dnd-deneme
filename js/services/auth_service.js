/**
 * D&D 5e Nexus - User Authentication & Profile Micro-Service
 * Decoupled User Profile & Cryptographic SHA-256 Account Vault.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  class AuthService {
    constructor() {
      this.user = null;
      this.activeTab = 'login';
    }

    init() {
      this.loadProfile();
      this.bindUI();

      if (!this.user) {
        setTimeout(() => this.openLoginModal(), 400);
      } else {
        this.updateHeaderBadge();
      }
    }

    // SHA-256 Cryptographic Password Hashing (Web Crypto API)
    async hashPassword(password, salt = 'dnd_nexus_salt_2026') {
      const encoder = new TextEncoder();
      const data = encoder.encode(password + salt);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    getAccountsVault() {
      try {
        return JSON.parse(localStorage.getItem('dnd_accounts_vault') || '{}');
      } catch(e) {
        return {};
      }
    }

    saveAccountsVault(vault) {
      localStorage.setItem('dnd_accounts_vault', JSON.stringify(vault));
    }

    loadProfile() {
      const saved = localStorage.getItem('dnd_user_profile');
      if (saved) {
        try {
          this.user = JSON.parse(saved);
        } catch(e) { this.user = null; }
      }
    }

    async registerAccount(userId, username, password, confirmPassword, avatar = '🧙‍♂️') {
      const cleanId = (userId || '').trim().toLowerCase();
      const cleanName = (username || '').trim();

      if (!cleanId || cleanId.length < 3) {
        return { success: false, message: 'Kullanıcı ID en az 3 karakter olmalıdır!' };
      }
      if (!cleanName) {
        return { success: false, message: 'Lütfen görünür isim (Display Name) giriniz!' };
      }
      if (!password || password.length < 4) {
        return { success: false, message: 'Şifre en az 4 karakter olmalıdır!' };
      }
      if (password !== confirmPassword) {
        return { success: false, message: 'Şifreler birbiriyle eşleşmiyor!' };
      }

      // 1. Supabase Cloud Native Authentication
      if (window.DnDNexus.SupabaseService && window.DnDNexus.SupabaseService.isConnected) {
        const sbRes = await window.DnDNexus.SupabaseService.signUpUser(cleanId, password, cleanName, avatar);
        if (sbRes.success) {
          const account = {
            id: cleanId,
            username: cleanName,
            avatar: avatar
          };
          this.setCurrentSession(account);
          return { success: true, message: '⚡ Supabase Cloud hesabı başarıyla oluşturuldu ve giriş yapıldı!' };
        } else {
          return sbRes;
        }
      }

      // 2. Local Account Vault Fallback
      const vault = this.getAccountsVault();
      if (vault[cleanId]) {
        return { success: false, message: 'Bu Kullanıcı ID zaten kayıtlı! Lütfen Giriş Yapın veya başka ID seçin.' };
      }

      const passwordHash = await this.hashPassword(password);
      const account = {
        id: cleanId,
        username: cleanName,
        passwordHash: passwordHash,
        avatar: avatar,
        createdAt: Date.now()
      };

      vault[cleanId] = account;
      this.saveAccountsVault(vault);

      this.setCurrentSession(account);
      return { success: true, message: 'Hesap yerel olarak oluşturuldu ve giriş yapıldı!' };
    }

    async loginAccount(userId, password) {
      const cleanId = (userId || '').trim().toLowerCase();
      if (!cleanId) return { success: false, message: 'Lütfen Kullanıcı ID giriniz!' };
      if (!password) return { success: false, message: 'Lütfen Şifre giriniz!' };

      // 1. Supabase Cloud Native Authentication
      if (window.DnDNexus.SupabaseService && window.DnDNexus.SupabaseService.isConnected) {
        const sbRes = await window.DnDNexus.SupabaseService.signInUser(cleanId, password);
        if (sbRes.success) {
          const userMeta = sbRes.user?.user_metadata || {};
          const account = {
            id: cleanId,
            username: userMeta.username || cleanId,
            avatar: userMeta.avatar || '🧙‍♂️'
          };
          this.setCurrentSession(account);
          return { success: true, message: '⚡ Supabase Cloud hesabına başarıyla giriş yapıldı!' };
        } else {
          return sbRes;
        }
      }

      // 2. Local Account Vault Fallback
      const vault = this.getAccountsVault();
      const account = vault[cleanId];

      if (!account) {
        return { success: false, message: 'Kullanıcı ID bulunamadı! Lütfen önce Kayıt Olun.' };
      }

      const inputHash = await this.hashPassword(password);
      if (inputHash !== account.passwordHash) {
        return { success: false, message: 'Hatalı şifre! Lütfen tekrar deneyin.' };
      }

      this.setCurrentSession(account);
      return { success: true, message: 'Başarıyla giriş yapıldı!' };
    }

    setCurrentSession(account) {
      this.user = {
        id: account.id,
        username: account.username,
        avatar: account.avatar || '🧙‍♂️',
        loggedInAt: Date.now()
      };
      localStorage.setItem('dnd_user_profile', JSON.stringify(this.user));
      this.updateHeaderBadge();

      if (window.DnDNexus.EventBus) {
        window.DnDNexus.EventBus.publish('user:logged_in', this.user);
      }
    }

    logout() {
      localStorage.removeItem('dnd_user_profile');
      this.user = null;
      this.updateHeaderBadge();

      if (window.DnDNexus.EventBus) {
        window.DnDNexus.EventBus.publish('user:logged_out', null);
      }

      this.openLoginModal();
    }

    getUser() {
      return this.user || { id: 'usr-guest', username: 'Misafir', avatar: '🛡️' };
    }

    updateHeaderBadge() {
      const badgeElem = document.getElementById('user-profile-display');
      if (!badgeElem) return;

      const user = this.getUser();
      badgeElem.innerHTML = `${user.avatar} <strong>${user.username}</strong>`;
    }

    openLoginModal() {
      const modal = document.getElementById('login-modal');
      if (modal) {
        modal.style.display = 'flex';
        this.switchAuthTab('login');
      }
    }

    closeLoginModal() {
      const modal = document.getElementById('login-modal');
      if (modal) modal.style.display = 'none';
    }

    switchAuthTab(tabName) {
      this.activeTab = tabName;
      const tabLogin = document.getElementById('auth-tab-btn-login');
      const tabReg = document.getElementById('auth-tab-btn-register');
      const panelLogin = document.getElementById('auth-panel-login');
      const panelReg = document.getElementById('auth-panel-register');
      const msgBox = document.getElementById('auth-msg-box');

      if (msgBox) msgBox.style.display = 'none';

      if (tabName === 'login') {
        tabLogin?.classList.add('active');
        tabReg?.classList.remove('active');
        if (panelLogin) panelLogin.style.display = 'flex';
        if (panelReg) panelReg.style.display = 'none';
      } else {
        tabReg?.classList.add('active');
        tabLogin?.classList.remove('active');
        if (panelReg) panelReg.style.display = 'flex';
        if (panelLogin) panelLogin.style.display = 'none';
      }
    }

    showAuthMessage(msg, isError = true) {
      const msgBox = document.getElementById('auth-msg-box');
      if (msgBox) {
        msgBox.style.display = 'block';
        msgBox.style.color = isError ? '#fecdd3' : '#a7f3d0';
        msgBox.style.background = isError ? 'rgba(136, 19, 55, 0.4)' : 'rgba(16, 185, 129, 0.2)';
        msgBox.style.border = `1px solid ${isError ? '#f43f5e' : '#10b981'}`;
        msgBox.innerHTML = (isError ? '❌ ' : '✅ ') + msg;
      }
    }

    bindUI() {
      document.getElementById('btn-user-profile')?.addEventListener('click', () => this.openLoginModal());
      document.getElementById('btn-close-login')?.addEventListener('click', () => this.closeLoginModal());

      document.getElementById('auth-tab-btn-login')?.addEventListener('click', () => this.switchAuthTab('login'));
      document.getElementById('auth-tab-btn-register')?.addEventListener('click', () => this.switchAuthTab('register'));

      // Login form submit
      document.getElementById('btn-execute-login')?.addEventListener('click', async () => {
        const id = document.getElementById('login-id-input')?.value;
        const pass = document.getElementById('login-pass-input')?.value;

        const res = await this.loginAccount(id, pass);
        if (res.success) {
          this.showAuthMessage(res.message, false);
          setTimeout(() => {
            this.closeLoginModal();
          }, 600);
        } else {
          this.showAuthMessage(res.message, true);
        }
      });

      // Register form submit
      document.getElementById('btn-execute-register')?.addEventListener('click', async () => {
        const id = document.getElementById('reg-id-input')?.value;
        const username = document.getElementById('reg-username-input')?.value;
        const pass = document.getElementById('reg-pass-input')?.value;
        const passConfirm = document.getElementById('reg-pass-confirm-input')?.value;
        const avatar = document.getElementById('reg-avatar-select')?.value || '🧙‍♂️';

        const res = await this.registerAccount(id, username, pass, passConfirm, avatar);
        if (res.success) {
          this.showAuthMessage(res.message, false);
          setTimeout(() => {
            this.closeLoginModal();
          }, 600);
        } else {
          this.showAuthMessage(res.message, true);
        }
      });
    }
  }

  const instance = new AuthService();
  if (window.DnDNexus.Services) {
    window.DnDNexus.Services.register('auth', instance);
  }
  window.DnDNexus.AuthService = instance;
})();
