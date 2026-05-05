const CREATED_COINS_KEY = 'coinbaseCloneCreatedCoinsByUser'

function readCreatedCoinsStore() {
  try {
    const raw = localStorage.getItem(CREATED_COINS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeCreatedCoinsStore(store) {
  localStorage.setItem(CREATED_COINS_KEY, JSON.stringify(store))
}

export function getCreatedCoinSymbolsForUser(userEmail) {
  const emailKey = (userEmail || '').toLowerCase().trim()
  if (!emailKey) return []

  const store = readCreatedCoinsStore()
  const value = store[emailKey]
  if (!Array.isArray(value)) return []
  return value
}

export function trackCreatedCoinForUser(userEmail, symbol) {
  const emailKey = (userEmail || '').toLowerCase().trim()
  const normalizedSymbol = (symbol || '').toUpperCase().trim()

  if (!emailKey || !normalizedSymbol) return

  const store = readCreatedCoinsStore()
  const existing = Array.isArray(store[emailKey]) ? store[emailKey] : []
  if (existing.includes(normalizedSymbol)) return

  store[emailKey] = [...existing, normalizedSymbol]
  writeCreatedCoinsStore(store)
}