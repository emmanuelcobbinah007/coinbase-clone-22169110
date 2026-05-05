import { getCryptoApiBase } from '../utils/api'

const API_BASE = getCryptoApiBase()

async function safeFetch(path = '', opts = {}) {
  try {
    const res = await fetch(path, opts)
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || res.statusText || 'API error')
    }
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) return await res.json()
    return {}
  } catch (err) {
    console.error('crypto api error', err)
    throw err
  }
}

function toArray(payload, keys = []) {
  if (Array.isArray(payload)) return payload
  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key]
  }
  return []
}

export async function getAllCryptos() {
  const payload = await safeFetch(`${API_BASE}`)
  return toArray(payload, ['cryptos', 'data'])
}

export async function getGainers() {
  const payload = await safeFetch(`${API_BASE}/gainers`)
  return toArray(payload, ['gainers', 'cryptos', 'data'])
}

export async function getNewListings() {
  const payload = await safeFetch(`${API_BASE}/new`)
  return toArray(payload, ['newListings', 'cryptos', 'data'])
}

export async function createCrypto(payload) {
  return await safeFetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export default { getAllCryptos, getGainers, getNewListings, createCrypto }
