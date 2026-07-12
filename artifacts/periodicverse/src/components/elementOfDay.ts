import { ELEMENTS } from '../data/elements';
import { openModal } from './modal';

export function initElementOfDay(container: HTMLElement) {
    // Deterministic selection based on current date
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Simple pseudo-random using seed to pick 0-117
    const index = (seed * 1103515245 + 12345) % 2147483648 % 118;
    const el = ELEMENTS[index];

    container.innerHTML = `
        <h2 class="section-title">Element of the Day</h2>
        <div class="glass-panel overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row cursor-pointer hover:shadow-2xl transition-shadow" id="eod-card">
            <div class="md:w-1/3 cat-${el.category} p-8 flex flex-col items-center justify-center relative min-h-[300px]">
                <div class="absolute top-4 left-4 text-sm font-bold opacity-60 uppercase tracking-widest">${el.categoryLabel}</div>
                <div class="text-6xl font-black text-slate-900 mb-2">${el.symbol}</div>
                <div class="text-2xl font-bold text-slate-800">${el.name}</div>
                <div class="text-sm font-medium mt-2 opacity-80">Atomic Number: ${el.atomicNumber}</div>
            </div>
            <div class="p-8 md:w-2/3 flex flex-col justify-center">
                <div class="flex items-center gap-2 mb-4 text-cyan-600 font-semibold uppercase tracking-wider text-sm">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Featured for ${today.toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                </div>
                <p class="text-lg text-slate-700 leading-relaxed mb-6">${el.description}</p>
                <div class="mt-auto">
                    <button class="btn-primary text-sm inline-flex items-center gap-2">
                        Explore Details
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('eod-card')?.addEventListener('click', () => {
        openModal(el);
    });
}