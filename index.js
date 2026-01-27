const scrollbarBg = document.getElementById('scrollbar-bg');
const scrollbarContainer = document.querySelector('.scrollbar-container');
const navbar = document.querySelector('nav');

let isDragging = false;

function updateScrollbar() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollHeight) * 100;
    scrollbarBg.style.height = `${scrollPercent}%`;
    scrollbarBg.style.top = `${scrollPercent}%`;
}

window.addEventListener('scroll', updateScrollbar);

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        navbar.style.transform = 'translateY(-130%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

scrollbarContainer.addEventListener('mousedown', (e) => {
    isDragging = true;

    const rect = scrollbarContainer.getBoundingClientRect();
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    function scrollToCursor(event) {
        const clickY = event.clientY - rect.top;
        let newScroll = (clickY / rect.height) * scrollHeight;
        if (newScroll < 0) newScroll = 0;
        if (newScroll > scrollHeight) newScroll = scrollHeight;
        window.scrollTo({ top: newScroll, behavior: 'auto' });
    }

    scrollToCursor(e);

    function onMouseMove(event) {
        if (isDragging) scrollToCursor(event);
    }

    window.addEventListener('mousemove', onMouseMove);

    window.addEventListener('mouseup', () => {
        isDragging = false;
        window.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
});

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeButton = document.querySelector('.theme-button');

    const themes = {
        light: { '--bg': 'white', '--fg': 'black', label: 'DARK' },
        dark: { '--bg': 'black', '--fg': 'white', label: 'LIGHT' }
    };

    function applyTheme(theme) {
        const colors = themes[theme];

        for (const key in colors) {
            if (key.startsWith('--')) {
                root.style.setProperty(key, colors[key]);
            }
        }

        themeButton.textContent = colors.label;
    }

    window.swapTheme = function () {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});

