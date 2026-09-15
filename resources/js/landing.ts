const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isJs = document.documentElement.classList.contains('js');

/* ---------------------------------------------------------------- *
 * Reveals con IntersectionObserver (una sola pasada, bien acotada)
 * ---------------------------------------------------------------- */
if (isJs) {
    const targets = document.querySelectorAll<HTMLElement>(
        '.js-reveal, .js-hero-rise, .js-hero-image',
    );

    if (reduced || !('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-in'));
    } else {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
        );

        targets.forEach((el) => io.observe(el));
    }
}

/* ---------------------------------------------------------------- *
 * Scroll-spy de navegación + barra de progreso + header scrolled
 * ---------------------------------------------------------------- */
const bar = document.querySelector<HTMLElement>('.js-progress-bar');
const header = document.querySelector<HTMLElement>('header.js-header');
const sections = Array.from(
    document.querySelectorAll<HTMLElement>('main[id], section[id]'),
);
const navLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('#nav-links a[href^="#"]'),
);

const onScroll = () => {
    if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${progress})`;
    }

    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 8);
    }

    let currentId = '';

    for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.45) {
            currentId = section.id;
        }
    }

    navLinks.forEach((link) => {
        link.classList.toggle(
            'spy-active',
            link.getAttribute('href') === `#${currentId}`,
        );
    });
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

/* ---------------------------------------------------------------- *
 * Marquee: pausa fuera de pantalla (respeta reduced-motion)
 * ---------------------------------------------------------------- */
const marquee = document.querySelector<HTMLElement>('.marquee-track');

if (marquee && 'IntersectionObserver' in window) {
    const mio = new IntersectionObserver(
        ([entry]) => {
            marquee.classList.toggle('paused', !entry.isIntersecting);
        },
        { threshold: 0.05 },
    );
    mio.observe(marquee);
}
