// RevVault — Cars Gallery Page

import { CARS, BRANDS, getBrandById } from '../data.js';
import { CarCard, SkeletonCard, SectionHeader, initReveal } from '../components.js';
import { navigate } from '../router.js';

export function renderGallery(params = {}) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const page = document.createElement('div');
    page.className = 'page';

    const container = document.createElement('div');
    container.className = 'container';
    container.style.paddingTop = '40px';

    // ——— Header ———
    container.appendChild(SectionHeader('Car <span style="color:var(--accent)">Gallery</span>', `${CARS.length} machines. Zero compromises.`));

    // ——— Filter Bar ———
    const filterBar = document.createElement('div');
    filterBar.className = 'filter-bar';
    filterBar.innerHTML = `
    <div class="filter-group">
      <label>Search</label>
      <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input id="gal-search" class="search-input" placeholder="Model, brand…" type="search" value="" />
      </div>
    </div>
    <div class="filter-group">
      <label>Brand</label>
      <div class="filter-chips" id="brand-chips">
        <div class="filter-chip active" data-brand="all">All</div>
        ${BRANDS.map(b => `<div class="filter-chip" data-brand="${b.id}" style="">${b.logo} ${b.name}</div>`).join('')}
      </div>
    </div>
    <div class="filter-group">
      <label>Min HP: <span id="hp-val">0</span></label>
      <input type="range" id="gal-hp" min="0" max="2000" step="50" value="0" />
    </div>
    <div class="filter-group">
      <label>Year from: <span id="year-val">2010</span></label>
      <input type="range" id="gal-year" min="2010" max="2025" step="1" value="2010" />
    </div>
    <div class="filter-group" style="margin-left:auto">
      <label>Sort</label>
      <select id="gal-sort" class="filter-select">
        <option value="hp-desc">HP: High → Low</option>
        <option value="hp-asc">HP: Low → High</option>
        <option value="year-desc">Year: Newest</option>
        <option value="year-asc">Year: Oldest</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  `;
    container.appendChild(filterBar);

    // ——— Results row ———
    const resultsRow = document.createElement('div');
    resultsRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:24px';
    resultsRow.innerHTML = `
    <div id="result-count" style="font-size:0.88rem;color:var(--text-muted)"></div>
    <button class="btn btn--ghost btn--sm" id="clear-filters">Reset Filters</button>
  `;
    container.appendChild(resultsRow);

    // ——— Grid ———
    const grid = document.createElement('div');
    grid.className = 'car-grid car-grid--3';
    container.appendChild(grid);

    page.appendChild(container);
    app.appendChild(page);
    app.appendChild(makeFooter());

    // ——— State ———
    let activeBrand = params.brand || 'all';
    let searchTerm = '';
    let minHp = 0;
    let minYear = 2010;
    let sortKey = 'hp-desc';
    let debounceTimer;

    // Pre-set brand chip if param given
    if (activeBrand !== 'all') {
        filterBar.querySelectorAll('.filter-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.brand === activeBrand);
        });
    }

    // ——— Show loading skeletons ———
    function showSkeletons(n = 6) {
        grid.innerHTML = '';
        for (let i = 0; i < n; i++) grid.appendChild(SkeletonCard());
    }

    // ——— Filter & render ———
    function applyFilters(withDelay = false) {
        const allFiltered = CARS.filter(car => {
            if (activeBrand !== 'all' && car.brand !== activeBrand) return false;
            if (car.hp < minHp) return false;
            if (car.year < minYear) return false;
            if (searchTerm) {
                const q = searchTerm.toLowerCase();
                if (!car.model.toLowerCase().includes(q) && !car.brand.toLowerCase().includes(q)) return false;
            }
            return true;
        });

        // Sort
        allFiltered.sort((a, b) => {
            switch (sortKey) {
                case 'hp-desc': return b.hp - a.hp;
                case 'hp-asc': return a.hp - b.hp;
                case 'year-desc': return b.year - a.year;
                case 'year-asc': return a.year - b.year;
                case 'name': return `${a.brand}${a.model}`.localeCompare(`${b.brand}${b.model}`);
            }
        });

        document.getElementById('result-count').textContent =
            `${allFiltered.length} car${allFiltered.length !== 1 ? 's' : ''} found`;

        const render = () => {
            grid.innerHTML = '';
            if (allFiltered.length === 0) {
                grid.innerHTML = `
          <div style="grid-column:1/-1">
            <div class="empty-state">
              <div class="empty-state__icon">🔍</div>
              <div class="empty-state__title">No cars found</div>
              <div class="empty-state__sub">Try adjusting your filters</div>
            </div>
          </div>`;
                return;
            }
            allFiltered.forEach(car => grid.appendChild(CarCard(car)));
        };

        if (withDelay) {
            showSkeletons(6);
            setTimeout(render, 600);
        } else {
            render();
        }
    }

    // ——— Events ———
    filterBar.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeBrand = chip.dataset.brand;
            applyFilters(true);
        });
    });

    filterBar.querySelector('#gal-search').addEventListener('input', (e) => {
        searchTerm = e.target.value.trim();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => applyFilters(), 300);
    });

    filterBar.querySelector('#gal-hp').addEventListener('input', (e) => {
        minHp = Number(e.target.value);
        document.getElementById('hp-val').textContent = minHp;
        applyFilters();
    });

    filterBar.querySelector('#gal-year').addEventListener('input', (e) => {
        minYear = Number(e.target.value);
        document.getElementById('year-val').textContent = minYear;
        applyFilters();
    });

    filterBar.querySelector('#gal-sort').addEventListener('change', (e) => {
        sortKey = e.target.value;
        applyFilters();
    });

    resultsRow.querySelector('#clear-filters').addEventListener('click', () => {
        activeBrand = 'all';
        searchTerm = '';
        minHp = 0;
        minYear = 2010;
        sortKey = 'hp-desc';
        filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c.dataset.brand === 'all'));
        filterBar.querySelector('#gal-search').value = '';
        filterBar.querySelector('#gal-hp').value = '0';
        filterBar.querySelector('#gal-year').value = '2010';
        filterBar.querySelector('#gal-sort').value = 'hp-desc';
        document.getElementById('hp-val').textContent = '0';
        document.getElementById('year-val').textContent = '2010';
        applyFilters(true);
    });

    // Initial render with skeleton
    applyFilters(true);
}

function makeFooter() {
    const f = document.createElement('footer');
    f.className = 'footer';
    f.innerHTML = `<div class="container"><div class="footer__logo">REV<span>VAULT</span></div><p>© 2024 RevVault</p></div>`;
    return f;
}
