const LINKS: { id: string; label: string }[] = [
    { id: "hero", label: "Home" },
    { id: "periodic-table-section", label: "Table" },
    { id: "compare-section", label: "Compare" },
    { id: "element-of-day", label: "Element of the Day" },
    { id: "timeline", label: "Timeline" },
    { id: "quiz", label: "Quiz" },
    { id: "facts", label: "Facts" },
    { id: "faq", label: "FAQ" },
    { id: "team", label: "Team" },
];

export function initNav(container: HTMLElement) {
    container.className = "nav-bar";
    container.innerHTML = `
        <div class="nav-inner">
            <a href="#hero" class="nav-brand" id="nav-brand">3D Periodic Table</a>
            <button id="nav-toggle" class="nav-toggle" aria-label="Toggle navigation">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links" id="nav-links">
                ${LINKS.map(l => `<li><a href="#${l.id}" data-target="${l.id}" class="nav-link">${l.label}</a></li>`).join('')}
            </ul>
        </div>
    `;

    const navEl = container;
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    toggle?.addEventListener('click', () => {
        links?.classList.toggle('open');
        toggle.classList.toggle('open');
    });

    container.querySelectorAll('.nav-link, .nav-brand').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = (link as HTMLElement).dataset.target || 'hero';
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
            links?.classList.remove('open');
            toggle?.classList.remove('open');
        });
    });

    const onScroll = () => {
        if (window.scrollY > 20) {
            navEl.classList.add('scrolled');
        } else {
            navEl.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
}
