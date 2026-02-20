// RevVault — Client-Side Hash Router

const routes = {};
let currentPath = null;

export function register(path, handler) {
    routes[path] = handler;
}

export function navigate(path, pushState = true) {
    if (pushState) {
        window.location.hash = path;
    }
    render(path);
}

function render(path) {
    // Normalise
    let matched = null;
    let params = {};

    for (const pattern of Object.keys(routes)) {
        const { match, p } = matchRoute(pattern, path);
        if (match) {
            matched = pattern;
            params = p;
            break;
        }
    }

    if (!matched) {
        matched = '/';
        params = {};
    }

    // Page transition
    const app = document.getElementById('app');
    app.classList.add('page-exit');

    setTimeout(() => {
        app.innerHTML = '';
        routes[matched](params);
        app.classList.remove('page-exit');
        app.classList.add('page-enter');
        setTimeout(() => app.classList.remove('page-enter'), 400);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);

    currentPath = path;
}

function matchRoute(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    if (patternParts.length !== pathParts.length) return { match: false };

    const p = {};
    for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
            p[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
        } else if (patternParts[i] !== pathParts[i]) {
            return { match: false };
        }
    }
    return { match: true, p };
}

export function getCurrentPath() {
    return currentPath;
}

export function init() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || '/';
        render(hash);
    });

    const initial = window.location.hash.replace('#', '') || '/';
    render(initial);
}
