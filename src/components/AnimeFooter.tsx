import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/site'
import { footerLinks, useBackToTop, useLagosTime } from '../lib/footer'

const INK = '#120A24'

// Deterministic "random" so the stars and petals don't jump between renders.
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
const stars = Array.from({ length: 34 }, (_, i) => ({
  left: rand(i + 1) * 100,
  top: rand(i + 101) * 46,
  size: 2 + Math.round(rand(i + 201) * 3),
  delay: rand(i + 301) * 3,
}))
const petals = Array.from({ length: 16 }, (_, i) => ({
  left: rand(i + 401) * 100,
  delay: rand(i + 501) * 12,
  duration: 9 + rand(i + 601) * 8,
  size: 10 + rand(i + 701) * 10,
  sway: (rand(i + 801) - 0.5) * 220,
}))

/** A flat, cel-shaded cloud. */
function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 120" className={className} aria-hidden="true">
      <path d="M30 98c-18 0-26-18-14-30 6-6 16-8 24-4 2-22 22-38 44-34 10-20 36-28 56-16 14-16 42-14 54 4 22-6 44 10 44 32 18 0 30 18 22 34-4 8-12 14-22 14H30z" fill="#F7A9C4" />
      <path d="M70 60c4-14 18-22 32-18 8-14 28-18 42-8" fill="none" stroke="#FFE1EC" strokeWidth="7" strokeLinecap="round" />
      <path d="M30 98h228c10 0 18-6 22-14-40 8-150 10-250 6-6 4-6 8 0 8z" fill="#C97AAE" />
    </svg>
  )
}

/** A Lagos-style skyline silhouette, with lit windows and a cable-stayed bridge. */
function Skyline() {
  const blocks = [
    [0, 120, 60], [55, 160, 48], [98, 96, 40], [134, 210, 54], [184, 140, 46], [226, 250, 62], [284, 170, 44],
    [324, 120, 40], [360, 196, 52], [408, 132, 46], [450, 230, 58], [504, 150, 44], [544, 110, 40], [580, 188, 50],
    [626, 140, 46], [668, 270, 60], [724, 160, 48], [768, 118, 42], [806, 204, 54], [856, 146, 44], [896, 230, 56],
    [948, 128, 44], [988, 176, 50], [1034, 112, 40], [1070, 196, 54], [1120, 150, 46], [1162, 240, 58], [1216, 130, 44],
    [1256, 180, 50], [1302, 120, 42], [1340, 160, 60],
  ]
  return (
    <svg viewBox="0 0 1400 300" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[min(34vw,300px)] w-full" aria-hidden="true">
      {/* bridge */}
      <g stroke="#2A1747" strokeWidth="3" fill="none">
        <path d="M600 300V120" strokeWidth="8" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M600 ${130 + i * 6}L${340 + i * 26} 262M600 ${130 + i * 6}L${860 - i * 26} 262`} />
        ))}
      </g>
      <rect x="300" y="258" width="600" height="8" fill="#2A1747" />
      {blocks.map(([x, h, w], i) => (
        <g key={i}>
          <rect x={x} y={300 - h} width={w} height={h} fill="#1A0F2E" />
          {Array.from({ length: Math.floor(h / 26) }, (_, r) =>
            Array.from({ length: Math.floor(w / 16) }, (_, c) =>
              rand(i * 97 + r * 13 + c) > 0.62 ? (
                <rect key={`${r}-${c}`} x={x + 6 + c * 14} y={300 - h + 12 + r * 24} width="6" height="9" fill="#FFD27A" opacity="0.85" />
              ) : null,
            ),
          )}
        </g>
      ))}
    </svg>
  )
}

/** The name as a manga title: halftone fill, thick ink outline, offset colour shadow. Stretches to the full width. */
function AnimeWordmark({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 1000 220" className="relative block w-full" role="img" aria-label={text}>
      <defs>
        <pattern id="halftone" width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill="#FFF3F8" />
          <circle cx="4.5" cy="4.5" r="2.1" fill="#FF8FC7" />
        </pattern>
      </defs>
      <text
        x="500"
        y="184"
        textAnchor="middle"
        textLength="980"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="'Bricolage Grotesque Variable', sans-serif"
        fontWeight="800"
        fontSize="210"
        fill="#FF4FA3"
        transform="translate(12 10)"
      >
        {text}
      </text>
      <text
        x="500"
        y="184"
        textAnchor="middle"
        textLength="980"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="'Bricolage Grotesque Variable', sans-serif"
        fontWeight="800"
        fontSize="210"
        fill="url(#halftone)"
        stroke={INK}
        strokeWidth="9"
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        {text}
      </text>
    </svg>
  )
}

function Sticker({ children, className = '', tone = 'light' }: { children: ReactNode; className?: string; tone?: 'light' | 'yellow' | 'night' }) {
  const colours = { light: 'bg-white text-[#120A24]', yellow: 'bg-[#FFE14D] text-[#120A24]', night: 'bg-[#2A1747] text-white' }[tone]
  return (
    <span className={`inline-flex items-center rounded-full border-[3px] border-[#120A24] px-4 py-1.5 font-bold shadow-[4px_4px_0_#120A24] ${colours} ${className}`}>
      {children}
    </span>
  )
}

export function AnimeFooter({ onContact, toggle }: { onContact: boolean; toggle: ReactNode }) {
  const time = useLagosTime()
  const toTop = useBackToTop()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      /* the address is still on screen */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className="relative isolate overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#1B1446 0%,#3A1D6E 28%,#8E2F82 52%,#E2557A 70%,#FF9A4D 86%,#FFD27A 100%)' }}
    >
      {/* sky */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {stars.map((s, i) => (
          <span
            key={i}
            className="anime-twinkle absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
        <span className="absolute left-[12%] top-[16%] text-[28px] text-white/90 anime-twinkle">✦</span>
        <span className="absolute right-[18%] top-[30%] text-[20px] text-white/80 anime-twinkle" style={{ animationDelay: '1.2s' }}>
          ✦
        </span>
        {/* setting sun */}
        <div
          className="absolute bottom-[min(20vw,170px)] left-1/2 h-[min(56vw,520px)] w-[min(56vw,520px)] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle,#FFF1B8 0%,#FFC56B 45%,rgba(255,154,77,0.0) 70%)' }}
        />
        <Cloud className="anime-drift absolute left-[-4%] top-[44%] w-[min(40vw,380px)] opacity-95" />
        <Cloud className="anime-drift absolute right-[-6%] top-[56%] w-[min(46vw,440px)]" />
        <Cloud className="anime-drift absolute left-[34%] top-[64%] w-[min(26vw,240px)] opacity-80" />
        <Skyline />
        {petals.map((p, i) => (
          <span
            key={i}
            className="anime-petal absolute top-0 rounded-[100%_0_100%_0] bg-[#FFB7D5]"
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

      <div className="container-x relative flex flex-col pb-6 pt-14 md:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Sticker tone="yellow" className="text-[15px]">Final episode</Sticker>
          {toggle}
        </div>

        {/* speech bubble with manga speed lines behind it */}
        <div className="relative mt-12 w-fit max-w-full md:mt-16">
          <div
            aria-hidden="true"
            className="anime-lines pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[220%] w-[160%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.55) 0deg 1.2deg, transparent 1.2deg 7deg)',
              WebkitMaskImage: 'radial-gradient(closest-side, transparent 38%, #000 62%, transparent 100%)',
              maskImage: 'radial-gradient(closest-side, transparent 38%, #000 62%, transparent 100%)',
            }}
          />
          <div className="relative rounded-[48px] border-[4px] border-[#120A24] bg-white px-7 py-6 shadow-[8px_8px_0_#120A24] md:rounded-[64px] md:px-12 md:py-9">
            <h2 className="max-w-[14ch] text-[clamp(40px,6.4vw,96px)] font-[800] leading-[0.95] tracking-[-0.03em] text-[#120A24]">
              {onContact ? 'Thanks for stopping by!' : "Let's build something together!"}
            </h2>
            {/* bubble tail */}
            <svg viewBox="0 0 60 50" className="absolute -bottom-[42px] left-16 w-[60px]" aria-hidden="true">
              <path d="M4 0 L52 0 L10 46 Z" fill="#fff" stroke="#120A24" strokeWidth="4" strokeLinejoin="round" />
              <rect x="2" y="-6" width="54" height="9" fill="#fff" />
            </svg>
          </div>
          <span aria-hidden="true" className="absolute -right-4 -top-6 rotate-12 text-[44px] font-[800] text-[#FFE14D] [-webkit-text-stroke:3px_#120A24] md:-right-10 md:text-[64px]">
            !!
          </span>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4 md:mt-20">
          <a
            href={`mailto:${profile.email}`}
            className="-rotate-2 rounded-2xl border-[4px] border-[#120A24] bg-[#FFE14D] px-6 py-3 text-[clamp(20px,3vw,40px)] font-[800] tracking-[-0.02em] text-[#120A24] shadow-[6px_6px_0_#120A24] transition-transform hover:rotate-0 hover:-translate-y-1"
          >
            {profile.email}
          </a>
          <button type="button" onClick={copy} aria-live="polite">
            <Sticker className="text-[15px] transition-transform hover:-translate-y-0.5">{copied ? 'Copied ✦' : 'Copy address'}</Sticker>
          </button>
          {!onContact && (
            <Link to="/contact">
              <Sticker className="text-[15px] transition-transform hover:-translate-y-0.5">Use the contact page</Sticker>
            </Link>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-3">
            {footerLinks().map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.external ? '_blank' : undefined} rel="noreferrer" download={l.download || undefined}>
                  <Sticker className="text-[15px] transition-transform hover:-translate-y-0.5">{l.label}</Sticker>
                </a>
              </li>
            ))}
          </ul>
          <Sticker tone="night" className="text-[15px]">
            {profile.location.split(',')[0]} {time}
          </Sticker>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[14px] font-semibold text-white [text-shadow:0_2px_0_#120A24]">
          <span>
            © {new Date().getFullYear()} {profile.name}. Built with React, GSAP and Framer Motion.
          </span>
          <button type="button" onClick={toTop} className="min-h-11">
            <Sticker className="text-[15px]">Back to top ↑</Sticker>
          </button>
        </div>

        <div className="mt-[min(10vw,90px)]" aria-hidden="false">
          <AnimeWordmark text={profile.name.split(' ')[0]} />
        </div>
      </div>
    </div>
  )
}
