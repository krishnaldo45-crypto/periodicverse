export function initFAQ(container: HTMLElement) {
    const faqs = [
        { q: "Why is the Periodic Table shaped this way?", a: "The shape reflects the electron structure of the elements. Elements in the same vertical column (group) have similar valence electron configurations, which gives them similar chemical properties." },
        { q: "What are the Lanthanides and Actinides?", a: "These are the two rows often placed below the main table to save space. They belong in periods 6 and 7 between groups 3 and 4, and involve the filling of 'f' electron orbitals." },
        { q: "Is the Periodic Table complete?", a: "Currently, all 118 elements up to Oganesson have been discovered or synthesized, completing the 7th row. However, scientists are trying to synthesize element 119 and beyond to start row 8." },
        { q: "What is the most abundant element in the universe?", a: "Hydrogen is the most abundant, making up about 75% of elemental mass. Helium is second at about 24%." },
        { q: "Why are some symbols completely different from their names?", a: "Many symbols come from their historical Latin or Greek names. For example, Gold is Au (Aurum), Iron is Fe (Ferrum), and Sodium is Na (Natrium)." }
    ];

    container.innerHTML = `
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto space-y-4">
            ${faqs.map((faq, i) => `
                <div class="glass-panel overflow-hidden">
                    <button class="faq-btn w-full text-left p-6 flex justify-between items-center focus:outline-none">
                        <span class="text-lg font-bold text-slate-800">${faq.q}</span>
                        <svg class="w-6 h-6 transform transition-transform text-slate-500 faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 px-6 bg-white/30">
                        <p class="pb-6 text-slate-600 leading-relaxed">${faq.a}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    const btns = container.querySelectorAll('.faq-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling as HTMLElement;
            const icon = btn.querySelector('.faq-icon') as HTMLElement;
            
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
            
            // Close all
            container.querySelectorAll('.faq-content').forEach(c => (c as HTMLElement).style.maxHeight = '0px');
            container.querySelectorAll('.faq-icon').forEach(i => (i as HTMLElement).style.transform = 'rotate(0deg)');

            // Open clicked if was closed
            if(!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}