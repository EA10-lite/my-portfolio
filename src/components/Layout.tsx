import { Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { usePrefersReducedMotion, useLenis, ScrollTrigger } from '../lib/smooth'

/** Wraps every page: navigation, a curtain transition between routes, and the footer. */
export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduced = usePrefersReducedMotion()
  const lenis = useLenis()

  // While the curtain covers the screen, jump to the top and re-measure scroll animations.
  const onExitComplete = () => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
        <motion.div key={location.pathname} className="relative">
          {!reduced && (
            <>
              <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[60] origin-bottom bg-accent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[60] origin-top bg-accent"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              />
            </>
          )}
          <main id="main">
            <Suspense fallback={<div className="min-h-screen rounded-b-[40px] bg-ink" />}>{outlet}</Suspense>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
