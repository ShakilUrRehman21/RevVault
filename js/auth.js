// RevVault — Authentication System (localStorage-based multi-user)

const USERS_KEY = 'revvault_users';
const SESSION_KEY = 'revvault_session';

// ——— User Store Helpers ———
function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; }
    catch { return {}; }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ——— Session ———
function loadSession() {
    return localStorage.getItem(SESSION_KEY) || null;
}

function saveSession(username) {
    if (username) localStorage.setItem(SESSION_KEY, username);
    else localStorage.removeItem(SESSION_KEY);
}

// ——— Public API ———

/** Returns the currently logged-in username, or null */
export function currentUser() {
    return loadSession();
}

/** Returns the user profile object, or null */
export function currentUserProfile() {
    const u = currentUser();
    if (!u) return null;
    const users = loadUsers();
    return users[u] || null;
}

/** Register a new user. Returns { ok, error }. */
export function register(username, password, displayName) {
    const users = loadUsers();
    const key = username.trim().toLowerCase();

    if (!key || key.length < 3) return { ok: false, error: 'Username must be at least 3 characters.' };
    if (!password || password.length < 4) return { ok: false, error: 'Password must be at least 4 characters.' };
    if (users[key]) return { ok: false, error: 'Username already taken.' };

    users[key] = {
        username: key,
        displayName: (displayName || username).trim(),
        avatar: randomAvatar(),
        createdAt: Date.now(),
        // password stored as a naive hash (XOR + base64) — fine for a demo
        passwordHash: simpleHash(password),
    };
    saveUsers(users);
    saveSession(key);
    return { ok: true };
}

/** Login an existing user. Returns { ok, error }. */
export function login(username, password) {
    const users = loadUsers();
    const key = username.trim().toLowerCase();
    const user = users[key];

    if (!user) return { ok: false, error: 'User not found.' };
    if (user.passwordHash !== simpleHash(password)) return { ok: false, error: 'Incorrect password.' };

    saveSession(key);
    return { ok: true };
}

/** Log out the current user. */
export function logout() {
    saveSession(null);
}

/** Storage key prefix for per-user state */
export function userStateKey() {
    const u = currentUser();
    return u ? `revvault_state_${u}` : 'revvault_state_guest';
}

// ——— Helpers ———
function simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    return h.toString(36);
}

const AVATARS = ['🏎️', '🚀', '⚡', '🔥', '🎯', '🏆', '💎', '🦾'];
function randomAvatar() { return AVATARS[Math.floor(Math.random() * AVATARS.length)]; }
