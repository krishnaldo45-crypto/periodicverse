export function initFooter(container: HTMLElement) {
    container.className = "mt-20 border-t border-slate-200 bg-white py-12";
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 text-center text-slate-500">
            <h2 class="text-2xl font-extrabold text-slate-800 mb-4 tracking-tight"><span class="text-gradient">3D Interactive Periodic Table</span></h2>
            <p class="mb-2">A CBSE Class 9 Science Project.</p>
            <p class="text-sm mb-8">Handcrafted with HTML, CSS, and vanilla JavaScript. No frameworks attached.</p>
            
            <div class="flex justify-center gap-6 text-sm">
                <a href="#" class="hover:text-cyan-600 transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="#" class="hover:text-cyan-600 transition-colors">Terms of Use</a>
                <span>|</span>
                <a href="#" class="hover:text-cyan-600 transition-colors">Site Map</a>
            </div>
            
            <p class="mt-8 text-xs">&copy; ${new Date().getFullYear()} Krishnav Bajoria. All rights reserved.</p>
        </div>
    `;
}