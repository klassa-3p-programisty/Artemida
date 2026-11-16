// Минимальная навигация на History API (без сторонних библиотек).
// ВРЕМЕННО: заменить, когда команда утвердит роутер (GEN-002).
const NAVIGATE_EVENT = 'app:navigate'

export function getPathname() {
  return window.location.pathname
}

export function navigate(path, { replace = false } = {}) {
  if (getPathname() === path) return
  window.history[replace ? 'replaceState' : 'pushState'](null, '', path)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export function subscribeToLocation(callback) {
  window.addEventListener('popstate', callback)
  window.addEventListener(NAVIGATE_EVENT, callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener(NAVIGATE_EVENT, callback)
  }
}
