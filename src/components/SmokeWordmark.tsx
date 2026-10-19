import { useEffect, useRef } from 'react'

const FONT = `'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif`
const WEIGHT = 550
const TRACKING = -0.055 // em

/** A tileable smoke texture, made once from SVG turbulence: white wisps on transparent. */
function smokeTile(size: number, freq: string, seed: number, gain: number, bias: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <filter id="n" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${seed}" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  ${gain} 0 0 0 ${bias}"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`
  const img = new Image()
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  return img.decode().then(() => img)
}

/**
 * The name set edge to edge, filled with slowly drifting smoke, with soft wisps
 * rising off the letters. Everything heavy (text, blur, noise) is drawn once;
 * each frame only moves the smoke textures. Pauses off screen; still when the
 * visitor prefers reduced motion.
 */
export function SmokeWordmark({ text }: { text: string }) {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = box.current
    const cv = canvas.current
    if (!wrap || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let raf = 0
    let visible = false
    let started = 0 // time the smoke first came into view, for the fade-in
    let W = 0, H = 0, fs = 0
    let letters: HTMLCanvasElement | null = null // crisp text, used as a mask
    let haze: HTMLCanvasElement | null = null // blurred text, for the wisps
    let fine: CanvasPattern | null = null
    let broad: CanvasPattern | null = null
    let wisp: CanvasPattern | null = null
    const work = document.createElement('canvas')
    const wctx = work.getContext('2d')!

    const layout = () => {
      const cs = getComputedStyle(wrap)
      const inner = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      if (inner <= 0) return
      // fit the word to the width
      ctx.font = `${WEIGHT} 100px ${FONT}`
      ;(ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${TRACKING * 100}px`
      const m = ctx.measureText(text)
      fs = (inner / m.width) * 100
      const lift = fs * 0.32 // room above the letters for the wisps
      const cap = fs * 0.74 // visible letter height (bottom is cropped slightly)
      W = Math.round(inner)
      H = Math.round(lift + cap)
      for (const c of [cv, work]) {
        c.width = Math.round(W * dpr)
        c.height = Math.round(H * dpr)
      }
      cv.style.width = `${W}px`
      cv.style.height = `${H}px`

      const make = (blur: number) => {
        const c = document.createElement('canvas')
        c.width = cv.width
        c.height = cv.height
        const x = c.getContext('2d')!
        x.scale(dpr, dpr)
        x.font = `${WEIGHT} ${fs}px ${FONT}`
        ;(x as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${TRACKING * fs}px`
        x.textBaseline = 'alphabetic'
        if (blur) x.filter = `blur(${blur}px)`
        x.fillStyle = '#fff'
        x.fillText(text, 0, H + fs * 0.06)
        return c
      }
      letters = make(0)
      // haze: the blurred letters smeared upward and fading, so the wisps rise off the word
      const soft = make(Math.max(fs * 0.05, 6))
      haze = document.createElement('canvas')
      haze.width = cv.width
      haze.height = cv.height
      const hx = haze.getContext('2d')!
      for (let i = 0; i < 12; i++) {
        hx.globalAlpha = 0.55 * (1 - i / 12)
        hx.drawImage(soft, 0, -(i / 11) * 0.3 * fs * dpr)
      }
      // soften the sides and the top, where the canvas would otherwise cut the haze off
      hx.globalAlpha = 1
      hx.globalCompositeOperation = 'destination-out'
      const edge = hx.createLinearGradient(0, 0, haze.width, 0)
      edge.addColorStop(0, 'rgba(0,0,0,1)')
      edge.addColorStop(0.05, 'rgba(0,0,0,0)')
      edge.addColorStop(0.95, 'rgba(0,0,0,0)')
      edge.addColorStop(1, 'rgba(0,0,0,1)')
      hx.fillStyle = edge
      hx.fillRect(0, 0, haze.width, haze.height)
      const top = hx.createLinearGradient(0, 0, 0, haze.height * 0.45)
      top.addColorStop(0, 'rgba(0,0,0,1)')
      top.addColorStop(1, 'rgba(0,0,0,0)')
      hx.fillStyle = top
      hx.fillRect(0, 0, haze.width, haze.height)
    }

    const draw = (t: number) => {
      if (!letters || !haze || !fine || !broad || !wisp) return
      const s = t / 1000
      const fade = reduce ? 1 : Math.min(1, (t - started) / 1800)
      const ease = 1 - Math.pow(1 - fade, 3)
      const r = Math.min(1.4, Math.max(0.3, fs / 260))
      const move = (p: CanvasPattern, x: number, y: number, k: number) =>
        p.setTransform(new DOMMatrix().translateSelf(x * r * dpr, y * r * dpr).scaleSelf(k * r * dpr, k * r * dpr))

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, cv.width, cv.height)

      // 1. wisps: the blurred letters, eaten by fast-rising smoke, drifting up
      wctx.setTransform(1, 0, 0, 1, 0, 0)
      wctx.globalCompositeOperation = 'source-over'
      wctx.clearRect(0, 0, work.width, work.height)
      wctx.drawImage(haze, 0, 0)
      wctx.globalCompositeOperation = 'source-in'
      move(wisp, s * 9, -s * 46, 1.4)
      wctx.fillStyle = wisp
      wctx.fillRect(0, 0, work.width, work.height)
      ctx.globalAlpha = 0.9 * ease
      ctx.drawImage(work, 0, 0)

      // 2. letters: a dim solid base with two layers of smoke rolling through
      wctx.globalCompositeOperation = 'source-over'
      wctx.clearRect(0, 0, work.width, work.height)
      wctx.globalAlpha = 0.3
      wctx.drawImage(letters, 0, 0)
      wctx.globalAlpha = 1
      wctx.globalCompositeOperation = 'source-atop'
      move(broad, -s * 14, -s * 22, 1.8)
      wctx.fillStyle = broad
      wctx.fillRect(0, 0, work.width, work.height)
      move(fine, s * 20, -s * 38, 1)
      wctx.fillStyle = fine
      wctx.fillRect(0, 0, work.width, work.height)
      // fade the base of the word into the footer
      wctx.globalCompositeOperation = 'destination-out'
      const g = wctx.createLinearGradient(0, work.height * 0.55, 0, work.height)
      g.addColorStop(0, 'rgba(0,0,0,0)')
      g.addColorStop(1, 'rgba(0,0,0,0.6)')
      wctx.fillStyle = g
      wctx.fillRect(0, 0, work.width, work.height)
      ctx.globalAlpha = ease
      if ('filter' in ctx) ctx.filter = ease < 1 ? `blur(${(1 - ease) * 14}px)` : 'none'
      ctx.drawImage(work, 0, 0)
      if ('filter' in ctx) ctx.filter = 'none'
      ctx.globalAlpha = 1
    }

    const loop = (t: number) => {
      draw(t)
      if (visible && !reduce) raf = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      if (!started) started = performance.now()
      raf = requestAnimationFrame(loop)
    }

    let alive = true
    const ready = Promise.all([
      document.fonts?.load(`${WEIGHT} 100px ${FONT}`).catch(() => {}),
      smokeTile(512, '0.012 0.02', 4, 2.4, -0.7),
      smokeTile(512, '0.004 0.008', 9, 1.9, -0.45),
      smokeTile(512, '0.008 0.014', 21, 2.8, -1.05),
    ]).then(([, a, b, c]) => {
      if (!alive) return
      fine = ctx.createPattern(a, 'repeat')
      broad = ctx.createPattern(b, 'repeat')
      wisp = ctx.createPattern(c, 'repeat')
      layout()
      if (reduce) draw(0)
    })

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) ready.then(() => alive && !reduce && start())
      else cancelAnimationFrame(raf)
    })
    io.observe(wrap)
    const ro = new ResizeObserver(() => {
      if (!fine) return
      layout()
      draw(performance.now())
    })
    ro.observe(wrap)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [text])

  return (
    <div ref={box} aria-hidden="true" className="container-x pointer-events-none select-none overflow-hidden">
      <canvas ref={canvas} className="block" />
    </div>
  )
}
