// Backend root URL (e.g., http://localhost:5000 or https://backend.onrender.com)
// Path segments (/api/crypto, /api/auth, etc.) are appended by individual modules
const BACKEND_ROOT = (import.meta?.env?.VITE_API_BASE || '').trim().replace(/\/+$/, '')

export function getCryptoApiBase() {
  return `${BACKEND_ROOT}/api/crypto`
}

export function getAuthApiBase() {
  return `${BACKEND_ROOT}/api/auth`
}