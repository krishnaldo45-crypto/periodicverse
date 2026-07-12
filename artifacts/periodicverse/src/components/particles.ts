export function initParticles(container: HTMLElement) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {x: number, y: number, r: number, dx: number, dy: number, c: string}[] = [];
    const colors = ['rgba(6, 182, 212, 0.4)', 'rgba(139, 92, 246, 0.4)', 'rgba(59, 130, 246, 0.4)'];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    function initParticles() {
        particles = [];
        const numParticles = Math.min(50, window.innerWidth / 20);
        for(let i=0; i<numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 3 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                c: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    function draw() {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx!.fillStyle = p.c;
            ctx!.fill();
            p.x += p.dx;
            p.y += p.dy;
            if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
}