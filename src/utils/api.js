const DEFAULT_API_BASE = '/api/crypto'

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, '')
}

function getConfiguredApiBase() {
  return stripTrailingSlash((import.meta?.env?.VITE_API_BASE || DEFAULT_API_BASE).trim())
}

export function getBackendRoot() {
  const base = getConfiguredApiBase()

  if (base.endsWith('/api/crypto')) {
    return base.slice(0, -'/api/crypto'.length)
  }

  if (base.endsWith('/api')) {
    return base.slice(0, -'/api'.length)
  }

  return base
}

export function getCryptoApiBase() {
  const base = getConfiguredApiBase()

  if (base.endsWith('/api/crypto')) {
    return base
  }

  if (base.endsWith('/api')) {
    return `${base}/crypto`
  }

  return `${base}/api/crypto`
}

export function getAuthApiBase() {
  const backendRoot = getBackendRoot()
  return `${backendRoot}/api/auth`
}