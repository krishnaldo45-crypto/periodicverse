import { toggleFavourite, getFavourites } from '../utils/store';

let modalContainer: HTMLElement;

export function initModal(container: HTMLElement) {
    modalContainer = container;
    container.innerHTML = `
        <div id="modal-backdrop">
            <div class="element-modal glass-panel relative flex flex-col">
                <button id="modal-close" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <button id="modal-fav" class="absolute top-4 right-14 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-red-500 transition-colors z-10">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path></svg>
                </button>
                <div id="modal-content" class="flex-1 flex flex-col md:flex-row overflow-y-auto"></div>
            </div>
        </div>
    `;

    const backdrop = document.getElementById('modal-backdrop');
    backdrop?.addEventListener('click', (e) => {
        if(e.target === backdrop) closeModal();
    });

    document.getElementById('modal-close')?.addEventListener('click', closeModal);
}

let currentElSymbol = '';

export function openModal(el: any) {
    currentElSymbol = el.symbol;
    const isFav = getFavourites().includes(el.symbol);
    const favBtn = document.getElementById('modal-fav')!;
    
    if(isFav) favBtn.classList.add('text-red-500');
    else favBtn.classList.remove('text-red-500');

    favBtn.onclick = () => {
        toggleFavourite(el.symbol);
        const newIsFav = getFavourites().includes(el.symbol);
        if(newIsFav) favBtn.classList.add('text-red-500');
        else favBtn.classList.remove('text-red-500');
        // Let table handle its own update state by relying on users re-filtering or we can dispatch an event.
        // For simplicity, we can just trigger a click on 'All' or current filter on close.
    };

    const content = document.getElementById('modal-content')!;
    
    // Build lists
    const makeList = (items: string[]) => `<ul class="list-disc pl-5 space-y-1 mt-2 text-sm text-slate-600">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;

    content.innerHTML = `
        <div class="md:w-1/3 cat-${el.category} p-8 flex flex-col items-center justify-center text-slate-800 text-center">
            <div class="text-sm font-bold opacity-70 uppercase tracking-widest mb-4">${el.categoryLabel}</div>
            <div class="text-8xl font-black mb-2">${el.symbol}</div>
            <div class="text-3xl font-bold">${el.name}</div>
            <div class="text-lg font-medium mt-4">Atomic Number: ${el.atomicNumber}</div>
            <div class="text-lg mt-1 font-mono">${el.atomicMass} u</div>
            
            <div class="mt-8 flex gap-4 text-sm font-semibold opacity-80 uppercase">
                <div class="bg-white/30 px-3 py-1 rounded">Group ${el.group || '-'}</div>
                <div class="bg-white/30 px-3 py-1 rounded">Period ${el.period}</div>
                <div class="bg-white/30 px-3 py-1 rounded">Block ${el.block}</div>
            </div>
        </div>
        
        <div class="md:w-2/3 p-8">
            <p class="text-lg text-slate-700 leading-relaxed mb-8 border-l-4 border-cyan-500 pl-4 bg-slate-50 py-3 pr-3 rounded-r-lg">
                ${el.description}
            </p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 class="font-bold text-slate-800 border-b pb-2 mb-3">Physical Properties</h4>
                    <div class="space-y-2 text-sm text-slate-600">
                        <div class="flex justify-between"><span class="font-semibold text-slate-500">State at RT</span> <span>${el.state}</span></div>
                        <div class="flex justify-between"><span class="font-semibold text-slate-500">Melting Point</span> <span>${el.meltingPoint ? el.meltingPoint+' °C' : 'N/A'}</span></div>
                        <div class="flex justify-between"><span class="font-semibold text-slate-500">Boiling Point</span> <span>${el.boilingPoint ? el.boilingPoint+' °C' : 'N/A'}</span></div>
                        <div class="flex justify-between"><span class="font-semibold text-slate-500">Density</span> <span>${el.density ? el.density+' g/cm³' : 'N/A'}</span></div>
                        <div class="flex justify-between"><span class="font-semibold text-slate-500">Atomic Radius</span> <span>${el.atomicRadius ? el.atomicRadius+' pm' : 'N/A'}</span></div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-bold text-slate-800 border-b pb-2 mb-3">Atomic Properties</h4>
                    <div class="space-y-2 text-sm text-slate-600">
                        <div class="flex flex-col"><span class="font-semibold text-slate-500">Electron Configuration</span> <span class="font-mono bg-slate-100 px-2 py-1 rounded mt-1 text-xs w-max">${el.electronConfiguration}</span></div>
                        <div class="flex justify-between mt-2"><span class="font-semibold text-slate-500">Electronegativity</span> <span>${el.electronegativity || 'N/A'}</span></div>
                        <div class="flex justify-between"><span class="font-semibold text-slate-500">Oxidation States</span> <span>${el.oxidationStates || 'N/A'}</span></div>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div>
                    <h4 class="font-bold text-slate-800 flex items-center gap-2"><svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Uses & Applications</h4>
                    ${makeList(el.uses)}
                </div>
                
                ${el.biologicalImportance ? `
                <div>
                    <h4 class="font-bold text-slate-800 flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> Biological Importance</h4>
                    <p class="text-sm text-slate-600 mt-2 leading-relaxed">${el.biologicalImportance}</p>
                </div>` : ''}

                <div>
                    <h4 class="font-bold text-slate-800 flex items-center gap-2"><svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> NCERT Relevance</h4>
                    <p class="text-sm text-slate-600 mt-2 bg-blue-50 p-3 rounded-lg border border-blue-100">${el.ncertRelevance}</p>
                </div>

                <div class="pt-4 border-t text-sm text-slate-400 flex justify-between">
                    <span>Discovered: ${el.yearDiscovered}</span>
                    <span>By: ${el.discoverer}</span>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-backdrop')?.classList.add('open');
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    document.getElementById('modal-backdrop')?.classList.remove('open');
    document.body.style.overflow = '';
    // Dispatch a custom event so the table can refresh favorited state without tight coupling
    window.dispatchEvent(new Event('favourites-updated'));
}