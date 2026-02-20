// RevVault — State Management (per-user via auth key)

import { userStateKey } from './auth.js';

function getKey() { return userStateKey(); }

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(getKey());
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return {
            liked: new Set(parsed.liked || []),
            saved: new Set(parsed.saved || []),
            collections: parsed.collections || [
                { id: 'dream', name: 'Dream Garage', carIds: [] },
            ],
            recentlyViewed: parsed.recentlyViewed || [],
            compareIds: parsed.compareIds || [null, null],
        };
    } catch {
        return null;
    }
}

function persist() {
    const data = {
        liked: [...state.liked],
        saved: [...state.saved],
        collections: state.collections,
        recentlyViewed: state.recentlyViewed,
        compareIds: state.compareIds,
    };
    localStorage.setItem(getKey(), JSON.stringify(data));
}

function freshState() {
    return {
        liked: new Set(),
        saved: new Set(),
        collections: [{ id: 'dream', name: 'Dream Garage', carIds: [] }],
        recentlyViewed: [],
        compareIds: [null, null],
    };
}

export let state = loadFromStorage() || freshState();

/** Call after login/logout to reload state for the new user */
export function reloadState() {
    const loaded = loadFromStorage() || freshState();
    Object.assign(state, loaded);
}

// ——— Likes ———
export function toggleLike(carId) {
    if (state.liked.has(carId)) state.liked.delete(carId);
    else state.liked.add(carId);
    persist();
}
export function isLiked(carId) { return state.liked.has(carId); }

// ——— Saves ———
export function toggleSave(carId) {
    if (state.saved.has(carId)) state.saved.delete(carId);
    else state.saved.add(carId);
    persist();
}
export function isSaved(carId) { return state.saved.has(carId); }

// ——— Collections ———
export function addCollection(name) {
    const id = 'col-' + Date.now();
    state.collections.push({ id, name, carIds: [] });
    persist();
    return id;
}
export function removeCollection(colId) {
    state.collections = state.collections.filter(c => c.id !== colId);
    persist();
}
export function addToCollection(colId, carId) {
    const col = state.collections.find(c => c.id === colId);
    if (col && !col.carIds.includes(carId)) { col.carIds.push(carId); persist(); }
}
export function removeFromCollection(colId, carId) {
    const col = state.collections.find(c => c.id === colId);
    if (col) { col.carIds = col.carIds.filter(id => id !== carId); persist(); }
}

// ——— Recently Viewed ———
export function addRecentlyViewed(carId) {
    state.recentlyViewed = [carId, ...state.recentlyViewed.filter(id => id !== carId)].slice(0, 12);
    persist();
}

// ——— Compare ———
export function setCompare(slot, carId) { state.compareIds[slot] = carId; persist(); }
export function clearCompare() { state.compareIds = [null, null]; persist(); }
