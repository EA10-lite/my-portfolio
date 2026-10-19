import { useEffect } from 'react'
import { profile } from '../data/site'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · ${profile.role}`
  }, [title])
}
