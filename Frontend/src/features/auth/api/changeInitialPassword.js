// DEV-05: запрос POST /auth/change-initial-password.
// Endpoint, имена полей и коды ошибок — ПРЕДЛОЖЕНИЕ из спеки, контракт не утверждён.
// Mock включается явно: VITE_USE_MOCK_API=true в .env.local

const API_URL = import.meta.env.VITE_API_URL ?? ''
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

/** status = 0 означает сетевую ошибку (ответа не было). */
export class ApiError extends Error {
  constructor(status, code, message) {
    super(message ?? `API error ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Подсказки для демо: "Temp1234" — верный текущий пароль,
// "rate" → 429, "boom" → 500, любой другой → неверный пароль.
async function mockRequest({ currentPassword }) {
  await sleep(700)
  if (currentPassword === 'rate') throw new ApiError(429, 'TOO_MANY_REQUESTS')
  if (currentPassword === 'boom') throw new ApiError(500, 'INTERNAL')
  if (currentPassword !== 'Temp1234') throw new ApiError(400, 'INVALID_CURRENT_PASSWORD')
  return null
}

async function readJsonSafe(response) {
  try {
    return await response.json()
  } catch {
    return null // 204 или не-JSON тело
  }
}

/**
 * @param {{ currentPassword: string, newPassword: string }} payload
 * @returns {Promise<object | null>} тело ответа (если есть)
 * @throws {ApiError}
 */
export async function changeInitialPassword({ currentPassword, newPassword }) {
  if (USE_MOCK) return mockRequest({ currentPassword })

  let response
  try {
    response = await fetch(`${API_URL}/auth/change-initial-password`, {
      method: 'POST',
      credentials: 'include', // cookie-сессия (FE-003-DEV-05)
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  } catch {
    throw new ApiError(0, 'NETWORK')
  }

  const body = await readJsonSafe(response)
  if (!response.ok) {
    throw new ApiError(response.status, body?.code, body?.message)
  }
  return body
}
