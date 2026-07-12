export function initTimeline(container: HTMLElement) {
    const milestones = [
        { year: "Antiquity", title: "Ancient Elements", desc: "Gold, silver, copper, iron, lead, tin, mercury, sulfur, and carbon were known to ancient civilizations.", symbol: "Au" },
        { year: "1669", title: "The First Discovery", desc: "Hennig Brand discovers Phosphorus by boiling urine, the first element discovered in recorded history.", symbol: "P" },
        { year: "1789", title: "Lavoisier's List", desc: "Antoine Lavoisier publishes the first modern list of 33 chemical elements, distinguishing between metals and non-metals." },
        { year: "1869", title: "The Periodic Law", desc: "Dmitri Mendeleev publishes the first periodic table, arranging elements by atomic mass and leaving gaps for undiscovered elements." },
        { year: "1894", title: "Noble Gases", desc: "William Ramsay discovers Argon, leading to the addition of an entirely new group (Group 18) to the periodic table.", symbol: "Ar" },
        { year: "1913", title: "Atomic Number", desc: "Henry Moseley proves that elements should be ordered by atomic number (protons) rather than atomic mass, fixing anomalies in Mendeleev's table." },
        { year: "1940s", title: "Synthetic Elements", desc: "Glenn Seaborg and team discover Plutonium and other actinides, reshaping the bottom of the periodic table.", symbol: "Pu" },
        { year: "2016", title: "Completion of Row 7", desc: "Nihonium, Moscovium, Tennessine, and Oganesson are officially named, completing the 7th period of the table.", symbol: "Og" }
    ];

    container.innerHTML = `
        <h2 class="section-title">Timeline of Discovery</h2>
        <div class="timeline-container">
            ${milestones.map(m => `
                <div class="timeline-item reveal">
                    <div class="glass-panel p-6">
                        <div class="text-cyan-600 font-bold text-xl mb-1">${m.year}</div>
                        <h3 class="text-2xl font-bold mb-2 flex items-center gap-2">
                            ${m.title}
                            ${m.symbol ? `<span class="px-2 py-1 bg-slate-100 rounded text-xs font-mono text-slate-500">${m.symbol}</span>` : ''}
                        </h3>
                        <p class="text-slate-600">${m.desc}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}