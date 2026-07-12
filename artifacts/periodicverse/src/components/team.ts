export function initTeam(container: HTMLElement) {
    const members = [
        { initials: "KB", name: "Krishnav Bajoria", role: "Website Development & Other Help", gradient: "from-cyan-400 to-blue-500" },
        { initials: "HS", name: "Harsh Mahesh Shingadiya", role: "Chart & Model Making", gradient: "from-blue-400 to-indigo-500" },
        { initials: "SJ", name: "Sayanta Jana", role: "Lighting & Model Making", gradient: "from-indigo-400 to-purple-500" },
        { initials: "NT", name: "Nishant Thakur", role: "Website Development, Design & Reviewing", gradient: "from-purple-400 to-pink-500" },
    ];

    container.innerHTML = `
        <h2 class="section-title">Project Credits</h2>
        <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            ${members.map(m => `
                <div class="glass-panel p-8 text-center group hover:-translate-y-2 transition-transform duration-300">
                    <div class="w-24 h-24 mx-auto bg-gradient-to-tr ${m.gradient} rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                        <span class="text-3xl font-bold text-white">${m.initials}</span>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-1">${m.name}</h3>
                    <p class="text-cyan-600 font-semibold uppercase tracking-wider text-xs">${m.role}</p>
                </div>
            `).join('')}
        </div>

        <div class="max-w-md mx-auto">
            <div class="glass-panel p-8 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div class="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                    <span class="text-3xl font-bold text-white">DM</span>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 mb-1">Mrs. Durba Ma'am</h3>
                <p class="text-purple-600 font-semibold uppercase tracking-wider text-sm mb-4">Honourable Guide</p>
                <p class="text-sm text-slate-500">Science Teacher and Guide, providing invaluable support and scientific validation.</p>
            </div>
        </div>
    `;
}
