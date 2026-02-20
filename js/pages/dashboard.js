// RevVault — User Dashboard Page

import { CARS, getBrandById, getCarById } from '../data.js';
import { state, addCollection, removeCollection, addToCollection, removeFromCollection } from '../state.js';
import { CarCard, SectionHeader, showToast } from '../components.js';
import { getRecommendedForUser } from '../ai.js';
import { navigate } from '../router.js';
import { currentUserProfile, currentUser } from '../auth.js';
// showAuthModal loaded dynamically to break circular dependency chain

export function renderDashboard() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  // Guard: must be logged in
  if (!currentUser()) {
    app.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'page';
    page.style.cssText = 'min-height:80vh;display:flex;align-items:center;justify-content:center';
    page.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔒</div>
        <div class="empty-state__title">Sign in to access your Dashboard</div>
        <div class="empty-state__sub">Your personal garage, saved cars, and recommendations are waiting.</div>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:28px">
          <button class="btn btn--primary" id="dash-login-btn">Sign In</button>
          <button class="btn btn--ghost" id="dash-reg-btn">Create Account</button>
        </div>
      </div>
    `;
    app.appendChild(page);
    page.querySelector('#dash-login-btn').addEventListener('click', () => import('../authModal.js').then(m => m.showAuthModal('login')));
    page.querySelector('#dash-reg-btn').addEventListener('click', () => import('../authModal.js').then(m => m.showAuthModal('register')));
    app.appendChild(makeFooter());
    return;
  }

  const page = document.createElement('div');
  page.className = 'page';

  const container = document.createElement('div');
  container.className = 'container';
  container.style.paddingTop = '40px';

  container.appendChild(buildDashboard());
  page.appendChild(container);
  app.appendChild(page);
  app.appendChild(makeFooter());
}

function buildDashboard() {
  const userProfile = currentUserProfile();
  const wrap = document.createElement('div');

  // ——— Header ———
  const hdr = document.createElement('div');
  hdr.className = 'section-header';
  hdr.innerHTML = `<h1 class="section-title">My <span style="color:var(--accent)">Dashboard</span></h1><p class="section-subtitle">Welcome back, ${userProfile?.displayName || 'Enthusiast'}!</p>`;
  wrap.appendChild(hdr);

  const dashGrid = document.createElement('div');
  dashGrid.className = 'dashboard-grid';

  // ——— PROFILE CARD ———
  const profileCol = document.createElement('div');
  const profileCard = document.createElement('div');
  profileCard.className = 'profile-card';
  profileCard.innerHTML = `
    <div class="profile-avatar">${userProfile?.avatar || '👤'}</div>
    <div class="profile-name">${userProfile?.displayName || 'Enthusiast'}</div>
    <div class="profile-handle">@${userProfile?.username || currentUser()}</div>
    <div class="profile-stats">
      <div class="stat-box">
        <div class="stat-box__num">${state.liked.size}</div>
        <div class="stat-box__lbl">Liked</div>
      </div>
      <div class="stat-box">
        <div class="stat-box__num">${state.saved.size}</div>
        <div class="stat-box__lbl">Saved</div>
      </div>
      <div class="stat-box">
        <div class="stat-box__num">${state.collections.length}</div>
        <div class="stat-box__lbl">Collections</div>
      </div>
      <div class="stat-box">
        <div class="stat-box__num">${state.recentlyViewed.length}</div>
        <div class="stat-box__lbl">Viewed</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn btn--primary" style="width:100%" id="explore-btn">🔍 Explore Gallery</button>
      <button class="btn btn--ghost" style="width:100%" id="compare-btn">⚡ Compare Cars</button>
    </div>
  `;
  profileCol.appendChild(profileCard);
  dashGrid.appendChild(profileCol);

  // ——— MAIN CONTENT ———
  const mainCol = document.createElement('div');
  mainCol.style.minWidth = '0';

  // ——— SAVED CARS ———
  mainCol.appendChild(SectionHeader('Saved Cars', `${state.saved.size} car${state.saved.size !== 1 ? 's' : ''} in your vault`));
  const savedIds = [...state.saved];
  if (savedIds.length === 0) {
    mainCol.appendChild(emptyState('🔖', 'No saved cars yet', 'Hit the bookmark icon on any car to save it here'));
  } else {
    const savedGrid = document.createElement('div');
    savedGrid.className = 'car-grid car-grid--2';
    savedIds.slice(0, 6).forEach(id => {
      const car = getCarById(id);
      if (car) savedGrid.appendChild(CarCard(car));
    });
    mainCol.appendChild(savedGrid);
  }

  // ——— COLLECTIONS ———
  const colHeader = document.createElement('div');
  colHeader.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-top:48px;margin-bottom:20px';
  colHeader.innerHTML = `
    <h2 class="section-title" style="font-size:1.6rem">My <span style="color:var(--accent)">Collections</span></h2>
    <button class="btn btn--ghost btn--sm" id="add-col-btn">+ New Collection</button>
  `;
  mainCol.appendChild(colHeader);

  const collectionsWrap = document.createElement('div');
  collectionsWrap.id = 'collections-wrap';
  mainCol.appendChild(collectionsWrap);

  function renderCollections() {
    collectionsWrap.innerHTML = '';
    if (state.collections.length === 0) {
      collectionsWrap.appendChild(emptyState('📁', 'No collections', 'Create a collection to organise your saved cars'));
      return;
    }
    state.collections.forEach(col => {
      const colCard = document.createElement('div');
      colCard.className = 'collection-card';
      const colCars = col.carIds.map(id => getCarById(id)).filter(Boolean);
      const colHdr = document.createElement('div');
      colHdr.className = 'collection-header';
      colHdr.innerHTML = `
        <div>
          <div class="collection-title">📁 ${col.name}</div>
          <div class="collection-count">${colCars.length} car${colCars.length !== 1 ? 's' : ''}</div>
        </div>
        ${col.id !== 'dream' ? `<button class="btn btn--danger btn--sm del-col-btn" data-id="${col.id}">Delete</button>` : ''}
      `;
      colCard.appendChild(colHdr);

      if (colCars.length > 0) {
        const miniGrid = document.createElement('div');
        miniGrid.className = 'car-grid car-grid--2';
        colCars.slice(0, 4).forEach(c => miniGrid.appendChild(CarCard(c)));
        colCard.appendChild(miniGrid);
      } else {
        colCard.innerHTML += `<p style="font-size:0.85rem;color:var(--text-muted);text-align:center;padding:20px">Empty — save some cars to add them here!</p>`;
      }

      colCard.querySelector('.del-col-btn')?.addEventListener('click', () => {
        removeCollection(col.id);
        showToast(`🗑 Deleted "${col.name}"`);
        renderCollections();
      });
      collectionsWrap.appendChild(colCard);
    });
  }

  renderCollections();

  colHeader.querySelector('#add-col-btn').addEventListener('click', () => {
    const name = prompt('Collection name:');
    if (name?.trim()) {
      addCollection(name.trim());
      showToast(`📁 Created "${name.trim()}"`);
      renderCollections();
    }
  });

  // ——— RECENTLY VIEWED ———
  const recentHeader = SectionHeader('Recently <span style="color:var(--accent)">Viewed</span>');
  recentHeader.style.marginTop = '48px';
  mainCol.appendChild(recentHeader);
  const recentIds = state.recentlyViewed.slice(0, 8);
  if (recentIds.length === 0) {
    mainCol.appendChild(emptyState('👁', 'Nothing viewed yet', 'Browse the gallery to track your history'));
  } else {
    const strip = document.createElement('div');
    strip.className = 'h-scroll';
    recentIds.forEach(id => {
      const car = getCarById(id);
      if (car) strip.appendChild(CarCard(car));
    });
    mainCol.appendChild(strip);
  }

  // ——— RECOMMENDED ———
  const recHeader = SectionHeader('Recommended <span style="color:var(--accent)">For You</span>', 'Powered by your likes and preferences');
  recHeader.style.marginTop = '48px';
  mainCol.appendChild(recHeader);
  const likedIds = [...state.liked];
  const recommended = getRecommendedForUser(likedIds, CARS, 6);
  const recGrid = document.createElement('div');
  recGrid.className = 'car-grid car-grid--2';
  recommended.forEach(c => recGrid.appendChild(CarCard(c)));
  mainCol.appendChild(recGrid);

  dashGrid.appendChild(mainCol);
  wrap.appendChild(dashGrid);

  // Button events
  setTimeout(() => {
    document.getElementById('explore-btn')?.addEventListener('click', () => navigate('/gallery'));
    document.getElementById('compare-btn')?.addEventListener('click', () => navigate('/compare'));
  }, 0);

  return wrap;
}

function emptyState(icon, title, sub) {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.innerHTML = `
    <div class="empty-state__icon">${icon}</div>
    <div class="empty-state__title">${title}</div>
    <div class="empty-state__sub">${sub}</div>
  `;
  return el;
}

function makeFooter() {
  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `<div class="container"><div class="footer__logo">REV<span>VAULT</span></div><p>© 2024 RevVault</p></div>`;
  return f;
}
