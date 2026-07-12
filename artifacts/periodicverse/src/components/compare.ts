import { ELEMENTS } from '../data/elements';

export function initCompare(container: HTMLElement) {
    container.innerHTML = `
        <h2 class="section-title">Compare Elements</h2>
        <div class="glass-panel p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <!-- Select 1 -->
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-slate-700">Element 1</label>
                    <select id="compare-sel-1" class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="">Select an element...</option>
                        ${ELEMENTS.map(e => `<option value="${e.symbol}">${e.atomicNumber} - ${e.name} (${e.symbol})</option>`).join('')}
                    </select>
                </div>
                <!-- Select 2 -->
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-slate-700">Element 2</label>
                    <select id="compare-sel-2" class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="">Select an element...</option>
                        ${ELEMENTS.map(e => `<option value="${e.symbol}">${e.atomicNumber} - ${e.name} (${e.symbol})</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div id="compare-results" class="hidden grid-cols-3 gap-4 border-t border-slate-200 pt-8">
                <!-- Headers -->
                <div class="col-span-1 space-y-4 font-semibold text-slate-500 text-right pr-4 border-r border-slate-200">
                    <div class="h-24"></div> <!-- Spacer for element big card -->
                    <div>Atomic Number</div>
                    <div>Atomic Mass</div>
                    <div>Category</div>
                    <div>State at RT</div>
                    <div>Density</div>
                    <div>Melting Point</div>
                    <div>Boiling Point</div>
                    <div>Electron Config</div>
                </div>
                
                <!-- Col 1 -->
                <div id="compare-col-1" class="col-span-1 space-y-4 pl-4 text-center"></div>
                
                <!-- Col 2 -->
                <div id="compare-col-2" class="col-span-1 space-y-4 pl-4 text-center border-l border-slate-100"></div>
            </div>
        </div>
    `;

    const sel1 = document.getElementById('compare-sel-1') as HTMLSelectElement;
    const sel2 = document.getElementById('compare-sel-2') as HTMLSelectElement;
    
    // Set default selections
    sel1.value = 'H';
    sel2.value = 'He';

    const updateCompare = () => {
        const val1 = sel1.value;
        const val2 = sel2.value;
        const results = document.getElementById('compare-results');
        
        if(!val1 || !val2) {
            results?.classList.add('hidden');
            return;
        }
        
        const el1 = ELEMENTS.find(e => e.symbol === val1);
        const el2 = ELEMENTS.find(e => e.symbol === val2);
        
        if(!el1 || !el2) return;
        
        results?.classList.remove('hidden');
        results?.classList.add('grid');
        
        const formatVal = (v: any, unit: string = '') => v ? `${v} ${unit}` : 'N/A';

        const buildCol = (el: any) => `
            <div class="h-24 flex items-center justify-center mb-4">
                <div class="w-20 h-20 rounded-xl flex flex-col items-center justify-center cat-${el.category} shadow-lg text-slate-800">
                    <span class="text-xs font-bold opacity-70">${el.atomicNumber}</span>
                    <span class="text-3xl font-black">${el.symbol}</span>
                </div>
            </div>
            <div class="font-medium">${el.atomicNumber}</div>
            <div>${el.atomicMass} u</div>
            <div><span class="px-2 py-1 rounded-full text-xs cat-${el.category}">${el.categoryLabel}</span></div>
            <div>${el.state}</div>
            <div>${formatVal(el.density, 'g/cm³')}</div>
            <div>${formatVal(el.meltingPoint, '°C')}</div>
            <div>${formatVal(el.boilingPoint, '°C')}</div>
            <div class="text-sm font-mono bg-slate-100 py-1 rounded">${el.electronConfiguration}</div>
        `;
        
        document.getElementById('compare-col-1')!.innerHTML = buildCol(el1);
        document.getElementById('compare-col-2')!.innerHTML = buildCol(el2);
    };

    sel1.addEventListener('change', updateCompare);
    sel2.addEventListener('change', updateCompare);
    
    updateCompare(); // trigger initial render
}