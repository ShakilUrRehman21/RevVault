// RevVault — Main Application Controller

import { register, init, navigate } from './router.js';
import { renderHome } from './pages/home.js';
import { renderGallery } from './pages/gallery.js';
import { renderDetail } from './pages/detail.js';
import { renderCompare } from './pages/compare.js';
import { renderDashboard } from './pages/dashboard.js';
import { currentUser, currentUserProfile, logout } from './auth.js';
import { reloadState } from './state.js';
// NOTE: No import from authModal.js here — we use a dynamic import to avoid
// the circular dependency (authModal previously imported updateAuthWidget from here).

// Register routes
register('/', () => renderHome());
register('/gallery', (params) => renderGallery(params));
register('/car/:id', (params) => renderDetail(params));
register('/compare', () => renderCompare());
register('/dashboard', () => {
    if (!currentUser()) {
        // Dynamic import breaks the circular authModal ↔ app dependency
        import('./authModal.js').then(m => m.showAuthModal('login'));
        return;
    }
    renderDashboard();
});

// ——— Build Navigation ———
export function buildNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const navLinks = nav.querySelector('.nav__links');
    const mobileBtn = nav.querySelector('.nav__mobile-btn');
    const actionsEl = nav.querySelector('.nav__actions');

    navLinks.innerHTML = '';

    const links = [
        { label: 'Home', path: '/' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Compare', path: '/compare' },
        { label: 'Dashboard', path: '/dashboard' },
    ];

    links.forEach(({ label, path }) => {
        const a = document.createElement('a');
        a.className = 'nav__link';
        a.textContent = label;
        a.setAttribute('data-path', path);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.classList.remove('open');
            navigate(path);
        });
        navLinks.appendChild(a);
    });

    // Mobile toggle (use { once: false } – we want it to persist)
    mobileBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));

    // --- Listen for auth changes from authModal (custom event, no circular import) ---
    window.addEventListener('revvault:auth-changed', () => updateAuthWidget());

    // Highlight on hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || '/';
        highlightActive(hash);
    });

    // Initial auth widget
    updateAuthWidget(actionsEl);
}

export function updateAuthWidget(actionsContainer) {
    const container = actionsContainer || document.querySelector('.nav__actions');
    if (!container) return;

    // Remove old auth widget
    container.querySelectorAll('.auth-widget').forEach(el => el.remove());

    const user = currentUserProfile();

    if (user) {
        const widget = document.createElement('div');
        widget.className = 'auth-widget nav-user';
        widget.innerHTML = `
      <span class="nav-user__avatar">${user.avatar}</span>
      <span class="nav-user__name">${user.displayName}</span>
      <button class="btn btn--ghost btn--sm" id="logout-btn">Sign Out</button>
    `;
        widget.querySelector('#logout-btn').addEventListener('click', () => {
            logout();
            reloadState();
            updateAuthWidget();
            navigate('/');
        });
        container.appendChild(widget);
    } else {
        const widget = document.createElement('div');
        widget.className = 'auth-widget';
        widget.style.cssText = 'display:flex;gap:8px;align-items:center';
        widget.innerHTML = `
      <button class="btn btn--ghost btn--sm" id="login-btn">Sign In</button>
      <button class="btn btn--primary btn--sm" id="signup-btn">Sign Up</button>
    `;
        widget.querySelector('#login-btn').addEventListener('click', () => {
            import('./authModal.js').then(m => m.showAuthModal('login'));
        });
        widget.querySelector('#signup-btn').addEventListener('click', () => {
            import('./authModal.js').then(m => m.showAuthModal('register'));
        });
        container.appendChild(widget);
    }
}

function highlightActive(path) {
    document.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('data-path') || '/';
        const isActive = href === '/' ? path === '/' : path.startsWith(href);
        link.classList.toggle('active', isActive);
    });
}

// ——— Boot ———
buildNav();
init();

const initialPath = window.location.hash.replace('#', '') || '/';
highlightActive(initialPath);
