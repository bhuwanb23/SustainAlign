export function getToken() {
  return localStorage.getItem('token') || ''
}

export function setToken(token) {
  if (token) localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function parseJwt(token) {
  try {
    const [, payload] = token.split('.')
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(json)))
  } catch {
    return null
  }
}

export function isAuthenticated() {
  const token = getToken()
  if (!token) return false
  const payload = parseJwt(token)
  if (!payload || !payload.exp) return false
  const now = Math.floor(Date.now() / 1000)
  return payload.exp > now
}


