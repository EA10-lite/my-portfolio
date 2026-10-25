import { useEffect, useState } from 'react'
import { profile } from '../data/site'
import { cvHref } from '../components/ui'
import { useLenis } from './smooth'

export type FooterLink = { label: string; href: string; external?: boolean; download?: boolean }

export function footerLinks(): FooterLink[] {
  return [
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin, external: true },
    { label: 'GitHub', href: profile.github, external: true },
    { label: 'X', href: profile.x, external: true },
    { label: 'CV', href: cvHref, download: true },
  ].filter(Boolean) as FooterLink[]
}

/** Local time in Lagos, updated every 20 seconds. */
export function useLagosTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 20000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

export function useBackToTop() {
  const lenis = useLenis()
  return () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))
}

