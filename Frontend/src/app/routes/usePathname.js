import { useSyncExternalStore } from 'react'
import { getPathname, subscribeToLocation } from './navigation'

export function usePathname() {
  return useSyncExternalStore(subscribeToLocation, getPathname)
}
