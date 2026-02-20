// RevVault — Compare Page

import { CARS, getBrandById } from '../data.js';
import { state, setCompare, clearCompare } from '../state.js';
import { navigate } from '../router.js';
import { showToast } from '../components.js';

export function renderCompare() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const page = document.createElement('div');
    page.className = 'page';

    const container = document.createElement('div');
    container.className = 'container';
    container.style.paddingTop = '40px';

    container.innerHTML = `
    <div class="section-header" style="margin-bottom:40px">
      <h1 class="section-title">Car <span style="color:var(--accent)">Comparison</span></h1>
      <p class="section-subtitle">Select two cars to compare specifications side by side</p>
    </div>

    <!-- Selector row -->
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:24px;align-items:center;margin-bottom:40px">
      <div>
        <label style="font-size:0.78rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:8px">Car A</label>
        <select id="car-a" class="filter-select" style="width:100%;font-size:1rem;padding:14px 16px">
          <option value="">— Select Car —</option>
          ${CARS.map(c => `<option value="${c.id}">${c.brand.charAt(0).toUpperCase() + c.brand.slice(1)} ${c.model} (${c.year})</option>`).join('')}
        </select>
      </div>
      <div style="font-size:2rem;color:var(--accent);user-select:none">⚡</div>
      <div>
        <label style="font-size:0.78rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:8px">Car B</label>
        <select id="car-b" class="filter-select" style="width:100%;font-size:1rem;padding:14px 16px">
          <option value="">— Select Car —</option>
          ${CARS.map(c => `<option value="${c.id}">${c.brand.charAt(0).toUpperCase() + c.brand.slice(1)} ${c.model} (${c.year})</option>`).join('')}
        </select>
      </div>
    </div>

    <div id="compare-result"></div>
  `;

    page.appendChild(container);
    app.appendChild(page);
    app.appendChild(makeFooter());

    // Pre-fill from state
    const selA = container.querySelector('#car-a');
    const selB = container.querySelector('#car-b');
    if (state.compareIds[0]) selA.value = state.compareIds[0];
    if (state.compareIds[1]) selB.value = state.compareIds[1];

    function renderComparison() {
        const idA = selA.value;
        const idB = selB.value;
        setCompare(0, idA || null);
        setCompare(1, idB || null);

        const result = document.getElementById('compare-result');

        if (!idA || !idB) {
            result.innerHTML = `
        <div class="empty-state" style="padding:60px 0">
          <div class="empty-state__icon">🏎️</div>
          <div class="empty-state__title">Select both cars to begin</div>
          <div class="empty-state__sub">Use the dropdowns above to pick two machines</div>
        </div>`;
            return;
        }

        if (idA === idB) {
            result.innerHTML = `<div class="empty-state" style="padding:40px 0"><div class="empty-state__icon">🤔</div><div class="empty-state__title">Pick two different cars!</div></div>`;
            return;
        }

        const carA = CARS.find(c => c.id === idA);
        const carB = CARS.find(c => c.id === idB);
        const brandA = getBrandById(carA.brand);
        const brandB = getBrandById(carB.brand);

        const specs = [
            { label: 'Brand', a: carA.brand, b: carB.brand, numeric: false },
            { label: 'Year', a: carA.year, b: carB.year, numeric: true, better: 'high' },
            { label: 'Engine', a: carA.engine, b: carB.engine, numeric: false },
            { label: 'Horsepower', a: carA.hp, b: carB.hp, numeric: true, better: 'high', unit: ' hp' },
            { label: 'Torque', a: carA.torque, b: carB.torque, numeric: true, better: 'high', unit: ' Nm' },
            { label: '0-100 km/h', a: carA.sprint, b: carB.sprint, numeric: true, better: 'low', unit: 's' },
            { label: 'Top Speed', a: carA.topSpeed, b: carB.topSpeed, numeric: true, better: 'high', unit: ' km/h' },
        ];

        function winnerClass(rowA, rowB, spec) {
            if (!spec.numeric || spec.better === undefined) return ['', ''];
            if (rowA === rowB) return ['', ''];
            const aWins = spec.better === 'high' ? rowA > rowB : rowA < rowB;
            return aWins ? ['winner', ''] : ['', 'winner'];
        }

        const rows = specs.map(spec => {
            const [clsA, clsB] = winnerClass(spec.a, spec.b, spec);
            const unit = spec.unit || '';
            const fmtA = spec.numeric && typeof spec.a === 'number' ? `${spec.a.toLocaleString()}${unit}` : spec.a;
            const fmtB = spec.numeric && typeof spec.b === 'number' ? `${spec.b.toLocaleString()}${unit}` : spec.b;
            return `
        <tr>
          <td class="label-col">${spec.label}</td>
          <td class="${clsA}">${fmtA} ${clsA === 'winner' ? '✓' : ''}</td>
          <td class="${clsB}">${fmtB} ${clsB === 'winner' ? '✓' : ''}</td>
        </tr>`;
        }).join('');

        result.innerHTML = `
      <!-- Car header cards -->
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:24px;margin-bottom:24px;align-items:stretch">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden">
          <img src="${carA.images[0]}" alt="${carA.model}" style="width:100%;aspect-ratio:16/9;object-fit:cover" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'"/>
          <div style="padding:20px">
            <div style="font-size:0.78rem;color:${brandA?.color || 'var(--accent)'};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">${brandA?.logo} ${brandA?.name}</div>
            <div style="font-family:var(--font-heading);font-size:1.3rem;font-weight:900">${carA.model}</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">${carA.year}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center">
          <div style="font-size:1.5rem;color:var(--accent);font-weight:900;font-family:var(--font-heading);opacity:0.6">VS</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden">
          <img src="${carB.images[0]}" alt="${carB.model}" style="width:100%;aspect-ratio:16/9;object-fit:cover" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'"/>
          <div style="padding:20px">
            <div style="font-size:0.78rem;color:${brandB?.color || 'var(--accent)'};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">${brandB?.logo} ${brandB?.name}</div>
            <div style="font-family:var(--font-heading);font-size:1.3rem;font-weight:900">${carB.model}</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">${carB.year}</div>
          </div>
        </div>
      </div>

      <!-- Spec table -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden;margin-bottom:28px">
        <table class="compare-table" style="width:100%">
          <thead>
            <tr style="background:var(--bg-card-2)">
              <th class="label-col">Specification</th>
              <th>${carA.model}</th>
              <th>${carB.model}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <!-- Legend + actions -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div style="display:flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--text-muted)">
          <span style="color:var(--accent);font-weight:700">✓ Blue</span> = better value in this spec
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn--ghost btn--sm" id="clear-compare">Clear</button>
          <button class="btn btn--ghost btn--sm" id="view-a">View ${carA.model}</button>
          <button class="btn btn--ghost btn--sm" id="view-b">View ${carB.model}</button>
        </div>
      </div>
    `;

        result.querySelector('#clear-compare')?.addEventListener('click', () => {
            selA.value = '';
            selB.value = '';
            clearCompare();
            renderComparison();
        });
        result.querySelector('#view-a')?.addEventListener('click', () => navigate(`/car/${carA.id}`));
        result.querySelector('#view-b')?.addEventListener('click', () => navigate(`/car/${carB.id}`));
    }

    selA.addEventListener('change', renderComparison);
    selB.addEventListener('change', renderComparison);
    renderComparison();
}

function makeFooter() {
    const f = document.createElement('footer');
    f.className = 'footer';
    f.innerHTML = `<div class="container"><div class="footer__logo">REV<span>VAULT</span></div><p>© 2024 RevVault</p></div>`;
    return f;
}
