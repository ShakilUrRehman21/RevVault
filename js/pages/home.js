// RevVault — Homepage

import { CARS, BRANDS } from '../data.js';
import { CarCard, BrandCard, SkeletonCard, SectionHeader, initReveal, showToast } from '../components.js';
import { navigate } from '../router.js';

export function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    // ——— HERO ———
    const hero = document.createElement('section');
    hero.className = 'hero';
    hero.innerHTML = `
    <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=85')"></div>
    <div class="hero__gradient"></div>
    <div class="container" style="width:100%">
      <div class="hero__content">
        <span class="hero__eyebrow hero-anim-1">🏁 Premium Automotive Discovery</span>
        <h1 class="hero__title hero-anim-2">
          Where Machines<br>
          Meet <span class="accent">Passion</span>
        </h1>
        <p class="hero__sub hero-anim-3">Discover. Collect. Compare.</p>
        <div class="hero__actions hero-anim-4">
          <button class="btn btn--primary" id="hero-cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Explore Gallery
          </button>
          <button class="btn btn--ghost" id="hero-compare">⚡ Compare Cars</button>
        </div>
      </div>
    </div>
    <div class="hero__scroll" id="hero-scroll">
      <span>Scroll</span>
      <div class="hero__scroll-line"></div>
    </div>
  `;
    app.appendChild(hero);

    hero.querySelector('#hero-cta').addEventListener('click', () => navigate('/gallery'));
    hero.querySelector('#hero-compare').addEventListener('click', () => navigate('/compare'));
    hero.querySelector('#hero-scroll').addEventListener('click', () => {
        trendingSection.scrollIntoView({ behavior: 'smooth' });
    });

    // ——— TRENDING CARS ———
    const trendingSection = document.createElement('section');
    trendingSection.className = 'section';
    const trending = [...CARS].sort((a, b) => b.hp - a.hp).slice(0, 6);

    const trendingContainer = document.createElement('div');
    trendingContainer.className = 'container';

    const trendingHeader = SectionHeader('Trending <span style="color:var(--accent)">Machines</span>', 'The most powerful rides in our vault right now');
    trendingHeader.classList.add('reveal');

    const grid = document.createElement('div');
    grid.className = 'car-grid car-grid--3';

    // Show skeletons first
    for (let i = 0; i < 6; i++) grid.appendChild(SkeletonCard());
    trendingContainer.appendChild(trendingHeader);
    trendingContainer.appendChild(grid);
    trendingSection.appendChild(trendingContainer);
    app.appendChild(trendingSection);

    // Replace skeletons after delay
    setTimeout(() => {
        grid.innerHTML = '';
        trending.forEach((car, i) => {
            const card = CarCard(car);
            // Add trending badge to first 3
            if (i < 3) {
                const badge = document.createElement('div');
                badge.className = 'trending-badge';
                badge.textContent = `#${i + 1} Trending`;
                card.querySelector('.car-card__img-wrap').appendChild(badge);
            }
            grid.appendChild(card);
        });
    }, 700);

    const viewAll1 = document.createElement('div');
    viewAll1.style.cssText = 'text-align:center;margin-top:40px';
    viewAll1.innerHTML = `<button class="btn btn--ghost" id="view-all-cars">View All Cars →</button>`;
    trendingContainer.appendChild(viewAll1);
    viewAll1.querySelector('#view-all-cars').addEventListener('click', () => navigate('/gallery'));

    // ——— BRANDS ———
    const brandsSection = document.createElement('section');
    brandsSection.className = 'section';
    brandsSection.style.background = 'linear-gradient(180deg, var(--bg) 0%, rgba(26,26,34,0.6) 50%, var(--bg) 100%)';
    const brandsContainer = document.createElement('div');
    brandsContainer.className = 'container';
    brandsContainer.appendChild(SectionHeader('Browse by <span style="color:var(--accent)">Brand</span>', 'Filter the collection by your favourite manufacturer'));

    const brandsGrid = document.createElement('div');
    brandsGrid.style.cssText = 'display:grid;grid-template-columns:repeat(5,1fr);gap:16px';
    BRANDS.forEach(b => {
        const card = BrandCard(b);
        card.style.setProperty('--brand-clr', b.color);
        card.classList.add('reveal');
        brandsGrid.appendChild(card);
    });
    brandsContainer.appendChild(brandsGrid);
    brandsSection.appendChild(brandsContainer);
    app.appendChild(brandsSection);

    // ——— FEATURED BUILDS (Masonry) ———
    const featSection = document.createElement('section');
    featSection.className = 'section';
    const featContainer = document.createElement('div');
    featContainer.className = 'container';
    featContainer.appendChild(SectionHeader('Featured <span style="color:var(--accent)">Builds</span>', 'Hand-picked machines from the RevVault editors'));

    const masonry = document.createElement('div');
    masonry.className = 'masonry';

    const featuredCars = [...CARS].sort(() => 0.5 - Math.random()).slice(0, 9);
    featuredCars.forEach(car => {
        const item = document.createElement('div');
        item.className = 'masonry-item reveal';
        item.innerHTML = `
      <img src="${car.images[0]}" alt="${car.model}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'"/>
      <div class="masonry-item__info">
        <div class="masonry-item__brand">${car.brand.toUpperCase()}</div>
        <div class="masonry-item__model">${car.model} '${String(car.year).slice(2)}</div>
        <div style="margin-top:4px;font-size:0.8rem;color:var(--text-muted)">${car.hp} HP · ${car.engine}</div>
      </div>
    `;
        item.addEventListener('click', () => navigate(`/car/${car.id}`));
        masonry.appendChild(item);
    });

    featContainer.appendChild(masonry);
    featSection.appendChild(featContainer);
    app.appendChild(featSection);

    // ——— CTA BANNER ———
    const ctaSection = document.createElement('section');
    ctaSection.className = 'section';
    ctaSection.innerHTML = `
    <div class="container">
      <div style="
        background: linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(124,58,237,0.15) 100%);
        border: 1px solid rgba(59,130,246,0.3);
        border-radius: 28px;
        padding: 64px 48px;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 70%);pointer-events:none"></div>
        <h2 style="font-family:var(--font-heading);font-size:clamp(1.6rem,4vw,2.8rem);font-weight:900;margin-bottom:16px;letter-spacing:0.02em">
          Build Your <span style="color:var(--accent)">Dream Garage</span>
        </h2>
        <p style="color:var(--text-secondary);margin-bottom:32px;font-size:1rem;max-width:500px;margin-left:auto;margin-right:auto">
          Save your favourite cars, create custom collections, and compare specs side by side.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn--primary cta-dashboard">Open My Dashboard</button>
          <button class="btn btn--ghost cta-compare">Compare Now</button>
        </div>
      </div>
    </div>
  `;
    ctaSection.querySelector('.cta-dashboard').addEventListener('click', () => navigate('/dashboard'));
    ctaSection.querySelector('.cta-compare').addEventListener('click', () => navigate('/compare'));
    app.appendChild(ctaSection);

    // ——— FOOTER ———
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
    <div class="container">
      <div class="footer__logo">REV<span>VAULT</span></div>
      <p>© 2024 RevVault. Built for automotive enthusiasts.</p>
      <p style="margin-top:4px;font-size:0.75rem;opacity:0.5">Ferrari • Lamborghini • Porsche • BMW • Tesla</p>
    </div>
  `;
    app.appendChild(footer);

    // Init scroll animations
    requestAnimationFrame(() => initReveal());

    // Nav scroll effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    }, { passive: true });
}
