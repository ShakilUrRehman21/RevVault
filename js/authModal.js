// RevVault — Auth Modal (Sign In / Sign Up)
// NOTE: Does NOT import from app.js (breaks circular dependency).
// Instead fires a custom event 'revvault:auth-changed' that app.js listens to.

import { login, register, currentUser, currentUserProfile } from './auth.js';
import { reloadState } from './state.js';
import { navigate } from './router.js';
import { showToast } from './components.js';

let overlay = null;

export function showAuthModal(mode = 'login') {
  closeModal();

  overlay = document.createElement('div');
  overlay.className = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-modal" id="auth-modal">
      <button class="auth-modal__close" id="auth-close">✕</button>

      <!-- Tabs -->
      <div class="auth-tabs">
        <button class="auth-tab ${mode === 'login' ? 'active' : ''}" data-tab="login">Sign In</button>
        <button class="auth-tab ${mode === 'register' ? 'active' : ''}" data-tab="register">Sign Up</button>
      </div>

      <!-- Sign In Form -->
      <div class="auth-form ${mode === 'login' ? 'active' : ''}" id="form-login">
        <div class="auth-brand">
          <div class="auth-brand__logo">🏎</div>
          <div>
            <div class="auth-brand__name">REV<span>VAULT</span></div>
            <div class="auth-brand__sub">Welcome back, enthusiast</div>
          </div>
        </div>
        <div class="auth-field">
          <label>Username</label>
          <input type="text" id="login-username" class="auth-input" placeholder="your_username" autocomplete="username"/>
        </div>
        <div class="auth-field">
          <label>Password</label>
          <div style="position:relative">
            <input type="password" id="login-password" class="auth-input" placeholder="••••••••" autocomplete="current-password"/>
            <button class="auth-eye" data-target="login-password">👁</button>
          </div>
        </div>
        <div class="auth-error" id="login-error"></div>
        <button class="btn btn--primary" style="width:100%;margin-top:8px" id="do-login">Sign In →</button>
        <p class="auth-switch">Don't have an account? <button class="auth-link" data-tab="register">Sign Up</button></p>
        <p style="font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:4px">
          Tip: usernames are case-insensitive (stored lowercase)
        </p>
      </div>

      <!-- Register Form -->
      <div class="auth-form ${mode === 'register' ? 'active' : ''}" id="form-register">
        <div class="auth-brand">
          <div class="auth-brand__logo">🏎</div>
          <div>
            <div class="auth-brand__name">REV<span>VAULT</span></div>
            <div class="auth-brand__sub">Join the community</div>
          </div>
        </div>
        <div class="auth-field">
          <label>Display Name</label>
          <input type="text" id="reg-name" class="auth-input" placeholder="Enzo Ferrari" autocomplete="name"/>
        </div>
        <div class="auth-field">
          <label>Username <span style="color:var(--text-muted);font-weight:400">(min. 3 chars, letters/numbers)</span></label>
          <input type="text" id="reg-username" class="auth-input" placeholder="enzo_ferrari" autocomplete="username"/>
        </div>
        <div class="auth-field">
          <label>Password <span style="color:var(--text-muted);font-weight:400">(min. 4 chars)</span></label>
          <div style="position:relative">
            <input type="password" id="reg-password" class="auth-input" placeholder="••••••••" autocomplete="new-password"/>
            <button class="auth-eye" data-target="reg-password">👁</button>
          </div>
        </div>
        <div class="auth-error" id="reg-error"></div>
        <button class="btn btn--primary" style="width:100%;margin-top:8px" id="do-register">Create Account →</button>
        <p class="auth-switch">Already have an account? <button class="auth-link" data-tab="login">Sign In</button></p>
        <p style="font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:4px">
          ⚠️ Accounts are saved only in this browser. Use the same browser to log back in.
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));

  // ——— Close ———
  overlay.querySelector('#auth-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', escHandler);

  // ——— Tabs ———
  overlay.querySelectorAll('.auth-tab, .auth-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      overlay.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
      overlay.querySelectorAll('.auth-form').forEach(f => f.classList.toggle('active', f.id === `form-${tab}`));
    });
  });

  // ——— Eye toggles ———
  overlay.querySelectorAll('.auth-eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = overlay.querySelector('#' + btn.dataset.target);
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  });

  // ——— Login ———
  overlay.querySelector('#do-login').addEventListener('click', () => doLogin());
  overlay.querySelector('#login-password').addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });

  function doLogin() {
    const username = overlay.querySelector('#login-username').value.trim();
    const password = overlay.querySelector('#login-password').value;
    const errEl = overlay.querySelector('#login-error');
    errEl.textContent = '';

    if (!username) { errEl.textContent = 'Please enter your username.'; return; }
    if (!password) { errEl.textContent = 'Please enter your password.'; return; }

    const result = login(username, password);
    if (!result.ok) { errEl.textContent = result.error; return; }

    onAuthSuccess();
  }

  // ——— Register ———
  overlay.querySelector('#do-register').addEventListener('click', () => doRegister());
  overlay.querySelector('#reg-password').addEventListener('keydown', (e) => { if (e.key === 'Enter') doRegister(); });

  function doRegister() {
    const name = overlay.querySelector('#reg-name').value.trim();
    const username = overlay.querySelector('#reg-username').value.trim();
    const password = overlay.querySelector('#reg-password').value;
    const errEl = overlay.querySelector('#reg-error');
    errEl.textContent = '';

    if (!name) { errEl.textContent = 'Please enter a display name.'; return; }
    const result = register(username, password, name);
    if (!result.ok) { errEl.textContent = result.error; return; }

    onAuthSuccess();
  }

  function onAuthSuccess() {
    // 1. Close modal FIRST (removes overlay from DOM)
    closeModal();

    // 2. Reload per-user state
    reloadState();

    // 3. Tell app.js to update nav widget (no circular import — custom event)
    window.dispatchEvent(new CustomEvent('revvault:auth-changed'));

    // 4. Toast + navigate
    showToast(`👋 Welcome, ${currentUserProfile()?.displayName || currentUser()}!`);
    navigate('/dashboard');
  }
}

function escHandler(e) {
  if (e.key === 'Escape') closeModal();
}

function closeModal() {
  if (!overlay) return;

  // *** FIX: capture element reference BEFORE setting overlay = null ***
  const el = overlay;
  overlay = null;
  document.removeEventListener('keydown', escHandler);

  el.classList.remove('open');

  // Use both transitionend AND a timeout fallback so removal is guaranteed
  let removed = false;
  const doRemove = () => {
    if (removed) return;
    removed = true;
    el.remove();
  };
  el.addEventListener('transitionend', doRemove, { once: true });
  setTimeout(doRemove, 400); // fallback: always remove after 400ms
}
