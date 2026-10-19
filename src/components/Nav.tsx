import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo, cvHref, LiveDot } from './ui'
import { profile } from '../data/site'
import { useLenis } from '../lib/smooth'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()
  const location = useLocation()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 240 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-lg bg-accent px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="container-x pt-3">
          <nav
            aria-label="Main"
            className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 text-paper transition-all duration-500 md:px-5 ${
              scrolled ? 'bg-ink/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl' : 'bg-transparent'
            }`}
          >
            <Logo />
            <div className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `label relative inline-flex min-h-11 items-center px-3.5 transition-colors ${
                      isActive ? 'text-paper' : 'text-[#C9CED1] hover:text-paper'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <a
                href={cvHref}
                download
                className="label inline-flex min-h-11 items-center px-3.5 text-[#C9CED1] transition-colors hover:text-paper"
              >
                CV ↓
              </a>
              <Link
                to="/contact"
                className="label group ml-2 inline-flex min-h-11 items-center gap-2.5 rounded-lg bg-paper px-5 text-ink transition-colors hover:bg-accent"
              >
                Let's talk
              </Link>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line-dark md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-[18px]">
                <span className={`absolute left-0 h-[1.6px] w-full bg-paper transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-[1.6px] w-full bg-paper transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-28 text-paper md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ to: '/', label: 'Home' }, ...links].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `flex min-h-16 items-center border-b border-line-dark text-4xl font-medium tracking-[-0.03em] ${isActive ? 'text-accent' : ''}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <span className="label inline-flex items-center gap-2 text-muted-dark">
                <LiveDot /> Open to new roles, {profile.location}
              </span>
              <a
                href={cvHref}
                download
                className="label inline-flex min-h-13 items-center justify-center rounded-lg border border-line-dark"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
