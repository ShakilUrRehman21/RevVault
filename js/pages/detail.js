// RevVault — Car Detail Page

import { CARS, BRANDS, getCarById, getBrandById } from '../data.js';
import { CarCard, SpecRow, SectionHeader, showToast, initReveal } from '../components.js';
import { state, toggleLike, toggleSave, isLiked, isSaved, addRecentlyViewed, setCompare } from '../state.js';
import { getSimilarCars, generateAIDescription } from '../ai.js';
import { navigate } from '../router.js';

export function renderDetail({ id }) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const car = getCarById(id);
    if (!car) {
        app.innerHTML = `
      <div class="page" style="min-height:80vh;display:flex;align-items:center;justify-content:center">
        <div class="empty-state">
          <div class="empty-state__icon">🚗</div>
          <div class="empty-state__title">Car not found</div>
          <button class="btn btn--primary" onclick="navigate('/gallery')">Back to Gallery</button>
        </div>
      </div>`;
        return;
    }

    addRecentlyViewed(car.id);
    const brand = getBrandById(car.brand);
    const liked = isLiked(car.id);
    const saved = isSaved(car.id);
    let currentImg = 0;
    const aiDesc = generateAIDescription(car);
    const similarCars = getSimilarCars(car, CARS, 4);

    const page = document.createElement('div');
    page.className = 'page';

    const container = document.createElement('div');
    container.className = 'container';
    container.style.paddingTop = '40px';

    // ——— Breadcrumb ———
    const crumb = document.createElement('div');
    crumb.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:0.82rem;color:var(--text-muted);margin-bottom:28px;cursor:pointer';
    crumb.innerHTML = `
    <span class="back-btn" style="cursor:pointer;color:var(--accent)">&larr; Gallery</span>
    <span>/</span>
    <span style="color:var(--text-primary)">${car.brand} ${car.model}</span>
  `;
    crumb.querySelector('.back-btn').addEventListener('click', () => navigate('/gallery'));
    container.appendChild(crumb);

    // ——— Hero Image ———
    const heroWrap = document.createElement('div');
    heroWrap.className = 'detail-hero';
    heroWrap.innerHTML = `<img id="main-img" src="${car.images[0]}" alt="${car.model}" /><div class="detail-hero__overlay"></div>`;
    container.appendChild(heroWrap);

    // ——— Thumbnails ———
    if (car.images.length > 1) {
        const thumbs = document.createElement('div');
        thumbs.className = 'detail-thumbnails';
        car.images.forEach((src, i) => {
            const t = document.createElement('div');
            t.className = `detail-thumb ${i === 0 ? 'active' : ''}`;
            t.innerHTML = `<img src="${src}" alt="thumb ${i}" loading="lazy" />`;
            t.addEventListener('click', () => {
                document.getElementById('main-img').src = src;
                document.getElementById('main-img').style.animation = 'none';
                void document.getElementById('main-img').offsetWidth;
                document.getElementById('main-img').style.animation = 'fadeIn 0.4s var(--ease) both';
                thumbs.querySelectorAll('.detail-thumb').forEach(e => e.classList.remove('active'));
                t.classList.add('active');
                currentImg = i;
            });
            thumbs.appendChild(t);
        });
        container.appendChild(thumbs);
    }

    // ——— Detail Layout ———
    const layout = document.createElement('div');
    layout.className = 'detail-layout';

    // Left: info
    const left = document.createElement('div');

    // Title row
    const titleRow = document.createElement('div');
    titleRow.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px';
    titleRow.innerHTML = `
    <div>
      <div style="font-size:0.82rem;color:${brand?.color || 'var(--accent)'};font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">
        ${brand?.logo || ''} ${brand?.name || car.brand}
      </div>
      <h1 style="font-family:var(--font-heading);font-size:clamp(1.8rem,4vw,3rem);font-weight:900;letter-spacing:-0.01em;line-height:1.1">
        ${car.model}
      </h1>
      <div style="color:var(--text-muted);font-size:0.9rem;margin-top:8px">${car.year} · ${car.engine}</div>
    </div>
    <div style="display:flex;gap:10px;align-items:center">
      <button class="btn btn--ghost btn--sm" id="detail-compare-btn">⚡ Compare</button>
      <button class="btn btn--ghost btn--sm like-btn-detail ${liked ? 'active' : ''}" id="detail-like-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${liked ? '#EF4444' : 'none'}" stroke="${liked ? '#EF4444' : 'currentColor'}" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span id="like-label">${liked ? 'Liked' : 'Like'}</span>
      </button>
      <button class="btn btn--ghost btn--sm save-btn-detail ${saved ? 'active' : ''}" id="detail-save-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <span id="save-label">${saved ? 'Saved' : 'Save'}</span>
      </button>
    </div>
  `;
    left.appendChild(titleRow);

    // AI Description
    const aiBox = document.createElement('div');
    aiBox.className = 'ai-description';
    aiBox.innerHTML = `
    <div class="ai-description__badge">✦ AI Analysis</div>
    <p class="ai-description__text">${aiDesc}</p>
  `;
    left.appendChild(aiBox);

    // Tags
    const tagsRow = document.createElement('div');
    tagsRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px';
    car.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t;
        tagsRow.appendChild(span);
    });
    left.appendChild(tagsRow);

    // Related Cars
    if (similarCars.length > 0) {
        const relHeader = SectionHeader('You Might <span style="color:var(--accent)">Also Like</span>');
        relHeader.style.marginBottom = '20px';
        left.appendChild(relHeader);
        const relGrid = document.createElement('div');
        relGrid.className = 'car-grid car-grid--2';
        similarCars.forEach(c => relGrid.appendChild(CarCard(c)));
        left.appendChild(relGrid);
    }

    // Right: Specs Card
    const specsCard = document.createElement('div');
    specsCard.className = 'specs-card';
    specsCard.innerHTML = `
    <div class="specs-card__header">
      <div class="specs-card__logo">${brand?.logo || '🚗'}</div>
      <div>
        <div class="specs-card__title">${car.model}</div>
        <div class="specs-card__sub">${car.year} — Technical Specifications</div>
      </div>
    </div>
  `;

    const specsList = document.createElement('div');
    const specs = [
        { label: 'Engine', value: car.engine, unit: '' },
        { label: 'Horsepower', value: car.hp.toLocaleString(), unit: ' hp', h: true },
        { label: 'Torque', value: car.torque.toLocaleString(), unit: ' Nm' },
        { label: '0-100 km/h', value: car.sprint, unit: ' sec', h: true },
        { label: 'Top Speed', value: car.topSpeed, unit: ' km/h' },
        { label: 'Year', value: car.year, unit: '' },
    ];
    specs.forEach(s => specsList.appendChild(SpecRow(s.label, s.value, s.unit, s.h)));
    specsCard.appendChild(specsList);

    // HP bar
    const hpPct = Math.min((car.hp / 2000) * 100, 100);
    const hpBar = document.createElement('div');
    hpBar.style.cssText = 'padding:16px 24px;border-top:1px solid var(--border)';
    hpBar.innerHTML = `
    <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-muted);margin-bottom:6px">
      <span>Power Output</span><span>${car.hp} hp</span>
    </div>
    <div style="height:4px;background:var(--border);border-radius:2px;overflow:hidden">
      <div style="height:100%;width:0%;background:linear-gradient(90deg,var(--accent),#7C3AED);border-radius:2px;transition:width 1.2s cubic-bezier(0.4,0,0.2,1)" id="hp-bar-fill"></div>
    </div>
  `;
    specsCard.appendChild(hpBar);

    // Animate HP bar
    setTimeout(() => {
        const fill = document.getElementById('hp-bar-fill');
        if (fill) fill.style.width = hpPct + '%';
    }, 300);

    layout.appendChild(left);
    layout.appendChild(specsCard);
    container.appendChild(layout);

    page.appendChild(container);
    app.appendChild(page);
    app.appendChild(makeFooter());

    // ——— Events ———
    container.querySelector('#detail-like-btn').addEventListener('click', () => {
        toggleLike(car.id);
        const nowLiked = isLiked(car.id);
        const btn = container.querySelector('#detail-like-btn');
        btn.querySelector('svg').setAttribute('fill', nowLiked ? '#EF4444' : 'none');
        btn.querySelector('svg').setAttribute('stroke', nowLiked ? '#EF4444' : 'currentColor');
        container.querySelector('#like-label').textContent = nowLiked ? 'Liked' : 'Like';
        showToast(nowLiked ? `❤️ Liked ${car.model}` : `Unliked ${car.model}`);
    });

    container.querySelector('#detail-save-btn').addEventListener('click', () => {
        toggleSave(car.id);
        const nowSaved = isSaved(car.id);
        const btn = container.querySelector('#detail-save-btn');
        btn.querySelector('svg').setAttribute('fill', nowSaved ? 'currentColor' : 'none');
        container.querySelector('#save-label').textContent = nowSaved ? 'Saved' : 'Save';
        showToast(nowSaved ? `🔖 Saved to collection` : `Removed from saved`);
    });

    container.querySelector('#detail-compare-btn').addEventListener('click', () => {
        setCompare(0, car.id);
        showToast(`⚡ ${car.model} added to compare`);
        navigate('/compare');
    });
}

function makeFooter() {
    const f = document.createElement('footer');
    f.className = 'footer';
    f.innerHTML = `<div class="container"><div class="footer__logo">REV<span>VAULT</span></div><p>© 2024 RevVault</p></div>`;
    return f;
}
