// RevVault — Reusable UI Components

import { state, toggleLike, toggleSave, isLiked, isSaved } from './state.js';
import { navigate } from './router.js';
import { getBrandById } from './data.js';

// ——— Toast Notification ———
export function showToast(msg, type = 'success') {
    const existing = document.querySelector('.rv-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `rv-toast rv-toast--${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('rv-toast--visible');
    });

    setTimeout(() => {
        toast.classList.remove('rv-toast--visible');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ——— Car Card ———
export function CarCard(car, options = {}) {
    const brand = getBrandById(car.brand);
    const liked = isLiked(car.id);
    const saved = isSaved(car.id);

    const card = document.createElement('article');
    card.className = 'car-card';
    card.setAttribute('data-id', car.id);
    card.innerHTML = `
    <div class="car-card__img-wrap">
      <img 
        class="car-card__img" 
        src="${car.images[0]}" 
        alt="${car.brand} ${car.model}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'"
      />
      <div class="car-card__overlay">
        <button class="car-card__action-btn like-btn ${liked ? 'active' : ''}" data-id="${car.id}" title="Like">
          <svg viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="car-card__action-btn save-btn ${saved ? 'active' : ''}" data-id="${car.id}" title="Save">
          <svg viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>
      <span class="car-card__brand-badge" style="--brand-clr: ${brand?.color || '#3B82F6'}">
        ${brand?.logo || ''} ${brand?.name || car.brand}
      </span>
    </div>
    <div class="car-card__info">
      <h3 class="car-card__model">${car.model}</h3>
      <div class="car-card__meta">
        <span class="car-card__year">${car.year}</span>
        <span class="car-card__hp">${car.hp} <small>HP</small></span>
      </div>
      <div class="car-card__tags">
        ${(car.tags || []).slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `;

    // Navigate on image click
    card.querySelector('.car-card__img-wrap').addEventListener('click', (e) => {
        if (!e.target.closest('.car-card__action-btn')) {
            navigate(`/car/${car.id}`);
        }
    });

    // Like button
    card.querySelector('.like-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(car.id);
        const btn = card.querySelector('.like-btn');
        const nowLiked = isLiked(car.id);
        btn.classList.toggle('active', nowLiked);
        btn.querySelector('svg').setAttribute('fill', nowLiked ? 'currentColor' : 'none');
        showToast(nowLiked ? `❤️ Liked ${car.model}` : `Unliked ${car.model}`);
    });

    // Save button
    card.querySelector('.save-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSave(car.id);
        const btn = card.querySelector('.save-btn');
        const nowSaved = isSaved(car.id);
        btn.classList.toggle('active', nowSaved);
        btn.querySelector('svg').setAttribute('fill', nowSaved ? 'currentColor' : 'none');
        showToast(nowSaved ? `🔖 Saved ${car.model}` : `Removed ${car.model} from saved`);
    });

    return card;
}

// ——— Skeleton Card ———
export function SkeletonCard() {
    const el = document.createElement('div');
    el.className = 'car-card skeleton-card';
    el.innerHTML = `
    <div class="skeleton-img skeleton-shimmer"></div>
    <div class="skeleton-info">
      <div class="skeleton-line skeleton-shimmer" style="width:60%;height:20px"></div>
      <div class="skeleton-line skeleton-shimmer" style="width:40%;height:14px;margin-top:8px"></div>
      <div class="skeleton-line skeleton-shimmer" style="width:80%;height:12px;margin-top:8px"></div>
    </div>
  `;
    return el;
}

// ——— Brand Card ———
export function BrandCard(brand) {
    const el = document.createElement('div');
    el.className = 'brand-card';
    el.setAttribute('data-brand', brand.id);
    el.innerHTML = `
    <div class="brand-card__logo" style="--brand-clr: ${brand.color}">${brand.logo}</div>
    <div class="brand-card__name">${brand.name}</div>
    <div class="brand-card__tagline">${brand.tagline}</div>
  `;
    el.addEventListener('click', () => {
        navigate(`/gallery?brand=${brand.id}`);
    });
    return el;
}

// ——— Spec Row ———
export function SpecRow(label, value, unit = '', highlight = false) {
    const el = document.createElement('div');
    el.className = `spec-row ${highlight ? 'spec-row--highlight' : ''}`;
    el.innerHTML = `
    <span class="spec-row__label">${label}</span>
    <span class="spec-row__value">${value}<small>${unit}</small></span>
  `;
    return el;
}

// ——— Section Header ———
export function SectionHeader(title, subtitle = '') {
    const el = document.createElement('div');
    el.className = 'section-header reveal';
    el.innerHTML = `
    <h2 class="section-title">${title}</h2>
    ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
  `;
    return el;
}

// ——— Grid ———
export function CarGrid(cars, columns = 3) {
    const grid = document.createElement('div');
    grid.className = `car-grid car-grid--${columns}`;
    cars.forEach(car => grid.appendChild(CarCard(car)));
    return grid;
}

// ——— Intersection Observer for scroll animations ———
export function initReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
