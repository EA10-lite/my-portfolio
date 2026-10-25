import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Theme = 'classic' | 'anime'
const KEY = 'ea10-theme'

const ThemeContext = createContext<{ anime: boolean; setAnime: (v: boolean) => void }>({ anime: false, setAnime: () => {} })

export const useTheme = () => useContext(ThemeContext)

function read(): Theme {
  try {
    const v = window.localStorage.getItem(KEY) ?? window.localStorage.getItem('ea10-footer-mode')
    return v === 'anime' ? 'anime' : 'classic'
  } catch {
    return 'classic'
  }
}

/** Site-wide theme: the classic look or anime mode. Remembered per visitor. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(read)
  const [flash, setFlash] = useState(0)
  const reduce = useReducedMotion()
  const anime = theme === 'anime'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', anime ? '#1B1446' : '#0A0E11')
  }, [theme, anime])

  const setAnime = (v: boolean) => {
    const next: Theme = v ? 'anime' : 'classic'
    setTheme(next)
    if (v) setFlash((n) => n + 1)
    try {
      window.localStorage.setItem(KEY, next)
    } catch {
      /* the choice just won't be remembered */
    }
  }

  return (
    <ThemeContext.Provider value={{ anime, setAnime }}>
      {children}
      {anime && <AnimeSky />}
      <AnimatePresence>
        {flash > 0 && !reduce && anime && (
          <motion.div
            key={flash}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          >
            <motion.div
              className="absolute inset-[-50%]"
              style={{
                background: 'repeating-conic-gradient(from 0deg, #fff 0deg 1.4deg, transparent 1.4deg 6deg)',
                WebkitMaskImage: 'radial-gradient(closest-side, transparent 20%, #000 60%)',
                maskImage: 'radial-gradient(closest-side, transparent 20%, #000 60%)',
              }}
              initial={{ scale: 0.6, rotate: 0 }}
              animate={{ scale: 1.2, rotate: 8 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="relative text-[clamp(64px,14vw,180px)] font-[800] text-[#FFE14D] [-webkit-text-stroke:6px_#1B1446] [paint-order:stroke]"
              initial={{ scale: 0.4, rotate: -12 }}
              animate={{ scale: 1, rotate: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            >
              !!
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  )
}

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
const petals = Array.from({ length: 14 }, (_, i) => ({
  left: rand(i + 11) * 100,
  delay: rand(i + 21) * 14,
  duration: 12 + rand(i + 31) * 10,
  size: 9 + rand(i + 41) * 9,
  sway: (rand(i + 51) - 0.5) * 240,
}))

/** Petals drifting down over every page in anime mode. Hidden when the visitor prefers reduced motion. */
function AnimeSky() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="anime-petal absolute top-0 rounded-[100%_0_100%_0] bg-[#FFB7D5] opacity-90"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.7,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--sway': `${p.sway}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

/** The anime mode switch, used in the nav, the mobile menu and the footer. */
export function AnimeToggle({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  const { anime, setAnime } = useTheme()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={anime}
      aria-label={compact ? 'Anime mode' : undefined}
      onClick={() => setAnime(!anime)}
      className={`anime-toggle group inline-flex min-h-11 items-center gap-3 rounded-full text-[15px] font-semibold transition-colors ${
        compact ? 'px-1.5' : 'py-1.5 pl-4 pr-1.5'
      } ${className}`}
    >
      {!compact && <span>Anime mode</span>}
      <span aria-hidden="true" className={`relative flex h-7 w-12 items-center rounded-full transition-colors ${anime ? 'bg-[#FF4FA3]' : 'bg-[#2A3338]'}`}>
        <span
          className={`absolute flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] text-[#FF4FA3] transition-transform duration-300 ${
            anime ? 'translate-x-6' : 'translate-x-1'
          }`}
        >
          ✦
        </span>
      </span>
    </button>
  )
}
