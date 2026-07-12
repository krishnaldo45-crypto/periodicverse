import { ELEMENTS } from '../data/elements';

export function initFacts(container: HTMLElement) {
    // Extract cool facts from the dataset
    const facts = ELEMENTS.map(e => {
        if(e.facts && e.facts.length > 0) {
            return {
                element: e.name,
                symbol: e.symbol,
                fact: e.facts[0], // take first fact
                cat: e.category
            };
        }
        return null;
    }).filter(f => f !== null).sort(() => Math.random() - 0.5).slice(0, 10);

    container.innerHTML = `
        <h2 class="section-title">Fascinating Facts</h2>
        <div class="carousel-container glass-panel rounded-2xl">
            <div class="carousel-track" id="facts-track">
                ${facts.map(f => `
                    <div class="carousel-slide flex flex-col md:flex-row items-center gap-8">
                        <div class="w-32 h-32 shrink-0 rounded-full cat-${f?.cat} flex flex-col items-center justify-center shadow-lg transform rotate-3">
                            <span class="text-4xl font-black text-slate-800">${f?.symbol}</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-4 text-slate-800">${f?.element}</h3>
                            <p class="text-xl text-slate-600 italic leading-relaxed">"${f?.fact}"</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="flex justify-center gap-2 p-4 pb-6">
                ${facts.map((_, i) => `
                    <button class="w-3 h-3 rounded-full bg-slate-300 transition-colors carousel-dot" data-idx="${i}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const track = document.getElementById('facts-track');
    const dots = container.querySelectorAll('.carousel-dot');
    let currentIdx = 0;
    
    function updateSlide() {
        if(track) track.style.transform = `translateX(-${currentIdx * 100}%)`;
        dots.forEach((d, i) => {
            if(i === currentIdx) d.classList.replace('bg-slate-300', 'bg-cyan-600');
            else d.classList.replace('bg-cyan-600', 'bg-slate-300');
        });
    }

    dots.forEach(d => {
        d.addEventListener('click', (e) => {
            currentIdx = parseInt((e.target as HTMLElement).getAttribute('data-idx')!);
            updateSlide();
        });
    });
    
    // Auto advance
    setInterval(() => {
        currentIdx = (currentIdx + 1) % facts.length;
        updateSlide();
    }, 5000);

    updateSlide(); // init
}