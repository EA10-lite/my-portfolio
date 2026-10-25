import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Wordmark } from './Wordmark'
import { useTheme } from '../lib/theme'
import { useLenis } from '../lib/smooth'

/* ---------- "site ready" signal: hero animations wait for the preloader to lift ---------- */
const SEEN_KEY = 'ea10-intro'
function seenBefore() {
  try {
    return window.localStorage.getItem(SEEN_KEY) === 'seen'
  } catch {
    return false
  }
}
let ready = typeof window === 'undefined' ? true : seenBefore()
const subs = new Set<() => void>()
function setReady() {
  if (ready) return
  ready = true
  subs.forEach((s) => s())
}
export function useSiteReady() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => ready,
    () => true,
  )
}

/* ---------- loading progress: fonts, then the page's media, with a short minimum ---------- */
const MIN_MS = 1700
const MAX_MS = 3200

function useLoadProgress(active: boolean) {
  const [target, setTarget] = useState(12)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    let fontsDone = false
    let pageDone = document.readyState === 'complete'
    const update = () => {
      const t = Math.min(1, (performance.now() - start) / MIN_MS)
      const base = (fontsDone ? 45 : 20) + (pageDone ? 40 : 0)
      setTarget(Math.max(12, Math.min(fontsDone && pageDone ? 100 : 92, base + t * 15)))
    }
    document.fonts?.ready.then(() => {
      fontsDone = true
      update()
    })
    const onLoad = () => {
      pageDone = true
      update()
    }
    window.addEventListener('load', onLoad)
    const id = window.setInterval(update, 120)
    const cap = window.setTimeout(() => {
      fontsDone = true
      pageDone = true
      update()
    }, MAX_MS)
    return () => {
      window.removeEventListener('load', onLoad)
      window.clearInterval(id)
      window.clearTimeout(cap)
    }
  }, [active])
  return target
}

/** First-visit preloader. Returning visitors skip it. */
export function Preloader() {
  const [show, setShow] = useState(() => !seenBefore())
  const reduce = useReducedMotion()
  const { anime } = useTheme()
  const lenis = useLenis()
  const target = useLoadProgress(show)
  const [shown, setShown] = useState(0)
  const startedAt = useRef(performance.now())

  // ease the visible number toward the real target
  useEffect(() => {
    if (!show) return
    let raf = 0
    const step = () => {
      setShown((v) => {
        const next = v + (target - v) * 0.12
        return target - next < 0.5 ? target : next
      })
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, show])

  // lift the loader once we're at 100 and the minimum time has passed
  useEffect(() => {
    if (!show || shown < 100) return
    const wait = Math.max(220, MIN_MS - (performance.now() - startedAt.current))
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(SEEN_KEY, 'seen')
      } catch {
        /* the loader will just show again next time */
      }
      setReady()
      setShow(false)
    }, wait)
    return () => window.clearTimeout(id)
  }, [shown, show])

  // no scrolling under the loader
  useEffect(() => {
    if (show) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [show, lenis])

  const pct = Math.round(shown)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading, ${pct} percent`}
          className="fixed inset-0 z-[90] overflow-hidden"
          initial={false}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: reduce ? 0.3 : 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {anime ? <AnimeLoader pct={pct} reduce={!!reduce} /> : <ClassicLoader pct={pct} reduce={!!reduce} />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ClassicLoader({ pct, reduce }: { pct: number; reduce: boolean }) {
  return (
    <div className="flex h-full flex-col bg-ink text-paper">
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Wordmark className="h-14 w-auto md:h-20" />
        </motion.div>
      </div>
      <div className="container-x flex flex-wrap items-end justify-between gap-6 pb-8 md:pb-10">
        <span className="text-[clamp(72px,13vw,200px)] font-[450] leading-[0.8] tracking-[-0.05em] [font-variant-numeric:tabular-nums]">
          {String(pct).padStart(3, '0')}
        </span>
        <span className="max-w-[260px] pb-2 text-right text-[15px] leading-snug text-muted-dark">
          Emmanuel Anyigor
          <br />
          Frontend and mobile engineer
        </span>
      </div>
      <div className="h-[3px] w-full bg-line-dark">
        <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  )
}

function AnimeLoader({ pct, reduce }: { pct: number; reduce: boolean }) {
  return (
    <div
      className="relative flex h-full flex-col items-center justify-center gap-10 px-5 text-center"
      style={{ background: 'linear-gradient(180deg,#1B1446 0%,#3A1D6E 40%,#8E2F82 72%,#E2557A 100%)' }}
    >
      <div
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-[170vmax] w-[170vmax] -translate-x-1/2 -translate-y-1/2 ${reduce ? '' : 'anime-lines'}`}
        style={{
          background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.22) 0deg 1.2deg, transparent 1.2deg 7deg)',
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 12%, #000 40%, transparent 75%)',
          maskImage: 'radial-gradient(closest-side, transparent 12%, #000 40%, transparent 75%)',
        }}
      />
      <motion.div
        className="relative rounded-[40px] border-[4px] border-[#1B1446] bg-white px-8 py-5 shadow-[8px_8px_0_#1B1446]"
        initial={reduce ? false : { scale: 0.6, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: -2, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        <Wordmark className="h-12 w-auto text-[#1B1446] md:h-16" />
        <span className="mt-2 block text-[18px] font-[800] text-[#1B1446]">Loading the next episode…</span>
        <svg viewBox="0 0 60 50" className="absolute -bottom-[38px] left-12 w-[52px]" aria-hidden="true">
          <path d="M4 0 L52 0 L10 46 Z" fill="#fff" stroke="#1B1446" strokeWidth="4" strokeLinejoin="round" />
          <rect x="2" y="-6" width="54" height="9" fill="#fff" />
        </svg>
      </motion.div>
      <span className="relative text-[clamp(64px,12vw,160px)] font-[800] leading-none text-[#FFE14D] [-webkit-text-stroke:5px_#1B1446] [paint-order:stroke] [font-variant-numeric:tabular-nums]">
        {pct}%
      </span>
      <div className="relative h-6 w-[min(80vw,520px)] overflow-hidden rounded-full border-[4px] border-[#1B1446] bg-white shadow-[5px_5px_0_#1B1446]">
        <div className="h-full origin-left bg-[#FF4FA3]" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  )
}
