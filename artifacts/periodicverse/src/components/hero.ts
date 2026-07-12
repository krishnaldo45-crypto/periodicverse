export function initHero(container: HTMLElement) {
    container.className = "relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-32";
    container.innerHTML = `
        <div class="z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
            <div class="atom-container mb-12">
                <div class="nucleus"></div>
                <div class="orbit"><div class="electron"></div></div>
                <div class="orbit"><div class="electron"></div></div>
                <div class="orbit"><div class="electron"></div></div>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                <span class="text-gradient">3D Interactive Periodic Table</span>
            </h1>
            <p class="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl">
                Explore all 118 elements up close. Experience chemistry reimagined for the modern era.
            </p>
            
            <div class="flex flex-wrap justify-center gap-4 mb-16">
                <button id="hero-btn-explore" class="btn-primary text-lg px-8 py-3">Explore Elements</button>
                <button id="hero-btn-learn" class="btn-secondary text-lg px-8 py-3">Learn Chemistry</button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full mt-10">
                <div class="glass-panel p-6">
                    <div class="text-4xl font-bold text-slate-800 counter" data-target="118">0</div>
                    <div class="text-sm font-medium text-slate-500 uppercase tracking-wider mt-2">Elements</div>
                </div>
                <div class="glass-panel p-6">
                    <div class="text-4xl font-bold text-slate-800 counter" data-target="7">0</div>
                    <div class="text-sm font-medium text-slate-500 uppercase tracking-wider mt-2">Periods</div>
                </div>
                <div class="glass-panel p-6">
                    <div class="text-4xl font-bold text-slate-800 counter" data-target="18">0</div>
                    <div class="text-sm font-medium text-slate-500 uppercase tracking-wider mt-2">Groups</div>
                </div>
                <div class="glass-panel p-6">
                    <div class="text-4xl font-bold text-slate-800">100s</div>
                    <div class="text-sm font-medium text-slate-500 uppercase tracking-wider mt-2">Of Uses</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('hero-btn-explore')?.addEventListener('click', () => {
        document.getElementById('periodic-table-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('hero-btn-learn')?.addEventListener('click', () => {
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Animate counters
    const counters = container.querySelectorAll('.counter');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target')!;
            const count = +counter.innerHTML;
            const inc = target / speed;
            if(count < target) {
                counter.innerHTML = Math.ceil(count + inc).toString();
                setTimeout(animateCounters, 10);
            } else {
                counter.innerHTML = target.toString();
            }
        });
    }
    
    setTimeout(animateCounters, 500);
}
