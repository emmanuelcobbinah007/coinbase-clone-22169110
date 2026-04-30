export const AUTH_USER_KEY = 'coinbaseCloneAuthUser';

export function getStoredAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.email) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function setStoredAuthUser(user) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('auth-user-changed'));
}

export function clearStoredAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event('auth-user-changed'));
}
