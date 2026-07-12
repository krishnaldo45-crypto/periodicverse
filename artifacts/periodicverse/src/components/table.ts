import { ELEMENTS, CATEGORY_LABELS } from '../data/elements';
import { getFavourites, toggleFavourite } from '../utils/store';
import { openModal } from './modal';

let currentFilter = 'all';
let searchQuery = '';
let showOnlyFavs = false;

export function initPeriodicTable(container: HTMLElement) {
    container.innerHTML = `
        <h2 class="section-title">The Periodic Table</h2>
        
        <div class="glass-panel p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="relative w-full md:w-1/3">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" id="pt-search" placeholder="Search by name, symbol, or atomic number..." class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all">
            </div>
            <div class="flex flex-wrap gap-2 justify-center flex-1" id="pt-filters">
                <button data-cat="all" class="pt-filter-btn px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-800 text-white transition-all">All</button>
                <button data-cat="favs" class="pt-filter-btn px-4 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1">
                    <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" fill-rule="evenodd"></path></svg> Favs
                </button>
            </div>
        </div>

        <div id="pt-legend" class="flex flex-wrap gap-2 justify-center mb-6 max-w-4xl mx-auto"></div>

        <div class="pt-wrapper">
            <div class="pt-grid" id="pt-main-grid"></div>
            <div class="pt-lanthanides" id="pt-lan-grid"></div>
            <div class="pt-actinides" id="pt-act-grid"></div>
        </div>
    `;

    renderLegend();
    renderTable();
    setupInteractions();
}

function renderLegend() {
    const legendContainer = document.getElementById('pt-legend');
    if (!legendContainer) return;
    const cats = Object.entries(CATEGORY_LABELS).filter(([k]) => k !== 'unknown');
    
    legendContainer.innerHTML = cats.map(([k, v]) => `
        <button data-cat="${k}" class="pt-legend-btn flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all">
            <span class="w-3 h-3 rounded-full cat-${k}"></span>
            ${v}
        </button>
    `).join('');
}

function renderTable() {
    const mainGrid = document.getElementById('pt-main-grid');
    const lanGrid = document.getElementById('pt-lan-grid');
    const actGrid = document.getElementById('pt-act-grid');
    if (!mainGrid || !lanGrid || !actGrid) return;

    mainGrid.innerHTML = '';
    lanGrid.innerHTML = '';
    actGrid.innerHTML = '';

    const favs = getFavourites();

    ELEMENTS.forEach(el => {
        const isFav = favs.includes(el.symbol);
        const tile = document.createElement('div');
        tile.className = `element-tile cat-${el.category} ${isFav ? 'is-fav' : ''}`;
        tile.dataset.symbol = el.symbol;
        tile.dataset.category = el.category;
        
        let shouldDim = false;
        
        // Apply filters
        if (showOnlyFavs && !isFav) shouldDim = true;
        if (currentFilter !== 'all' && el.category !== currentFilter) shouldDim = true;
        
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const match = el.name.toLowerCase().includes(q) || 
                          el.symbol.toLowerCase().includes(q) || 
                          el.atomicNumber.toString() === q;
            if (!match) shouldDim = true;
        }

        if (shouldDim) tile.classList.add('dimmed');

        tile.innerHTML = `
            <span class="atomic-num">${el.atomicNumber}</span>
            <span class="symbol">${el.symbol}</span>
            <span class="name">${el.name}</span>
            <svg class="fav-icon w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path></svg>
        `;

        // 3D Tilt Effect
        tile.addEventListener('mousemove', (e) => {
            if(tile.classList.contains('dimmed')) return;
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            tile.style.transform = `scale(1.5) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = '';
        });

        tile.addEventListener('click', (e) => {
            // Heart toggle logic inside tile
            if((e.target as HTMLElement).closest('.fav-icon')) {
                e.stopPropagation();
                toggleFavourite(el.symbol);
                renderTable(); // re-render to update classes
                return;
            }
            openModal(el);
        });

        // Positioning
        if (el.category === 'lanthanide') {
            lanGrid.appendChild(tile);
        } else if (el.category === 'actinide') {
            actGrid.appendChild(tile);
        } else {
            // Place in main grid
            tile.style.gridColumn = el.group?.toString() || '1';
            tile.style.gridRow = el.period.toString();
            mainGrid.appendChild(tile);
        }
    });
}

function setupInteractions() {
    const searchInput = document.getElementById('pt-search') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
        searchQuery = (e.target as HTMLInputElement).value;
        renderTable();
    });

    const filterBtn = document.querySelector('[data-cat="all"]');
    const favBtn = document.querySelector('[data-cat="favs"]');
    
    filterBtn?.addEventListener('click', () => {
        currentFilter = 'all';
        showOnlyFavs = false;
        updateFilterUI();
        renderTable();
    });

    favBtn?.addEventListener('click', () => {
        showOnlyFavs = !showOnlyFavs;
        if(showOnlyFavs) currentFilter = 'all'; // reset cat filter
        updateFilterUI();
        renderTable();
    });

    window.addEventListener('favourites-updated', () => {
        renderTable();
    });

    document.querySelectorAll('.pt-legend-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = (e.currentTarget as HTMLElement).dataset.cat!;
            if (currentFilter === cat) {
                currentFilter = 'all';
            } else {
                currentFilter = cat;
                showOnlyFavs = false;
            }
            updateFilterUI();
            renderTable();
        });
    });
}

function updateFilterUI() {
    document.querySelector('[data-cat="all"]')?.classList.toggle('bg-slate-800', currentFilter === 'all' && !showOnlyFavs);
    document.querySelector('[data-cat="all"]')?.classList.toggle('text-white', currentFilter === 'all' && !showOnlyFavs);
    
    document.querySelector('[data-cat="favs"]')?.classList.toggle('bg-slate-800', showOnlyFavs);
    document.querySelector('[data-cat="favs"]')?.classList.toggle('text-white', showOnlyFavs);
    
    document.querySelectorAll('.pt-legend-btn').forEach(btn => {
        const cat = (btn as HTMLElement).dataset.cat;
        if(cat === currentFilter) {
            btn.classList.add('ring-2', 'ring-cyan-500');
        } else {
            btn.classList.remove('ring-2', 'ring-cyan-500');
        }
    });
}