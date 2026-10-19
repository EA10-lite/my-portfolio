import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from '../data/site'

export const defaultDescription =
  'Emmanuel Anyigor is a frontend and mobile engineer in Lagos building React Native apps, React dashboards and product websites, from first commit to the App Store and Google Play.'

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

/**
 * Sets the page title, description, canonical link and share tags for the current route,
 * so each page is indexed and previewed with its own text.
 */
export function usePageTitle(title?: string, description = defaultDescription, noindex = false) {
  const { pathname } = useLocation()
  useEffect(() => {
    const full = title ? `${title} · ${profile.name}` : `${profile.name} · ${profile.role}`
    const url = profile.url + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''))
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow')
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [title, description, noindex, pathname])
}
