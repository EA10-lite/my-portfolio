/**
 * Tiny synthesized UI sounds (Web Audio, no audio files).
 * Nothing plays until the visitor has interacted with the page, and everything respects the mute setting.
 */
const KEY = 'ea10-sound'
let ctx: AudioContext | null = null
let noise: AudioBuffer | null = null
let enabled = readEnabled()
const listeners = new Set<(on: boolean) => void>()

function readEnabled() {
  try {
    return window.localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export function soundEnabled() {
  return enabled
}
export function setSoundEnabled(on: boolean) {
  enabled = on
  try {
    window.localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* not remembered */
  }
  listeners.forEach((l) => l(on))
  if (on) tick(true)
}
export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function audio(): AudioContext | null {
  if (!enabled) return null
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  } catch {
    return null
  }
}

function master(c: AudioContext, volume: number) {
  const g = c.createGain()
  g.gain.value = volume
  g.connect(c.destination)
  return g
}

/** One enveloped oscillator note. */
function tone(c: AudioContext, out: AudioNode, opts: { type?: OscillatorType; from: number; to?: number; at?: number; dur: number; peak: number }) {
  const t = c.currentTime + (opts.at ?? 0)
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = opts.type ?? 'sine'
  o.frequency.setValueAtTime(opts.from, t)
  if (opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t + opts.dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(opts.peak, t + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.dur)
  o.connect(g).connect(out)
  o.start(t)
  o.stop(t + opts.dur + 0.02)
}

/** Soft click for buttons and links. */
export function tick(force = false) {
  const c = audio()
  if (!c || (!force && !enabled)) return
  tone(c, master(c, 1), { type: 'triangle', from: 1900, to: 1100, dur: 0.035, peak: 0.05 })
}

/** Playful pop (anime mode). */
export function pop() {
  const c = audio()
  if (!c) return
  const base = 520 + Math.random() * 240
  tone(c, master(c, 1), { from: base, to: base * 2.2, dur: 0.09, peak: 0.07 })
}

/** Filtered-noise whoosh for page changes. */
export function whoosh(up = true) {
  const c = audio()
  if (!c) return
  if (!noise) {
    noise = c.createBuffer(1, c.sampleRate * 0.6, c.sampleRate)
    const d = noise.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  const t = c.currentTime
  const src = c.createBufferSource()
  src.buffer = noise
  const f = c.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = 1.2
  f.frequency.setValueAtTime(up ? 380 : 2400, t)
  f.frequency.exponentialRampToValueAtTime(up ? 2600 : 420, t + 0.38)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.12)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42)
  src.connect(f).connect(g).connect(c.destination)
  src.start(t)
  src.stop(t + 0.45)
}

/** Rising sparkle chime: anime mode switched on. */
export function sparkle() {
  const c = audio()
  if (!c) return
  const out = master(c, 1)
  ;[1046.5, 1318.5, 1568, 2093].forEach((f, i) => tone(c, out, { from: f, at: i * 0.07, dur: 0.28, peak: 0.06 }))
  tone(c, out, { type: 'triangle', from: 3136, at: 0.3, dur: 0.4, peak: 0.025 })
  whoosh(true)
}

/** Two falling notes: anime mode switched off. */
export function settle() {
  const c = audio()
  if (!c) return
  const out = master(c, 1)
  tone(c, out, { from: 880, at: 0, dur: 0.16, peak: 0.05 })
  tone(c, out, { from: 587, at: 0.1, dur: 0.24, peak: 0.05 })
}

/** Small bell: something was copied. */
export function ding() {
  const c = audio()
  if (!c) return
  const out = master(c, 1)
  tone(c, out, { from: 1318.5, dur: 0.5, peak: 0.06 })
  tone(c, out, { from: 1975.5, at: 0.06, dur: 0.6, peak: 0.04 })
}

/**
 * Global listener for anime mode: a pop on every button/link press. Classic mode stays silent.
 */
export function installUiSounds(isAnime: () => boolean) {
  const onDown = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest('a, button, [role="switch"], select, label')
    if (!el || el.closest('[data-sound="none"]')) return
    if (el.matches('[role="switch"]') || !isAnime()) return // switches play their own sound; classic mode is silent
    pop()
  }
  document.addEventListener('pointerdown', onDown, { passive: true })
  return () => {
    document.removeEventListener('pointerdown', onDown)
  }
}

let lastSay = 0
/**
 * Says the name the way an anime character would: Japanese voice reading katakana
 * (エマニュエル, "Emanyueru"), bright and a little fast. Falls back to "Emmanuel-san!"
 * in any voice the device has. Anime mode and sound must both be on.
 */
export function sayName() {
  if (!enabled || document.documentElement.dataset.theme !== 'anime') return
  const synth = window.speechSynthesis
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return
  const now = Date.now()
  if (now - lastSay < 2500 || synth.speaking) return
  lastSay = now
  const voices = synth.getVoices()
  const ja = voices.find((v) => v.lang?.toLowerCase().startsWith('ja'))
  const u = ja ? new SpeechSynthesisUtterance('エマニュエル！') : new SpeechSynthesisUtterance('Emmanuel-san!')
  if (ja) {
    u.voice = ja
    u.lang = ja.lang
  }
  u.pitch = ja ? 1.7 : 1.9
  u.rate = ja ? 1.05 : 1.1
  u.volume = 0.9
  sparkleSoft()
  synth.speak(u)
}

/** A short chime before the name is spoken. */
function sparkleSoft() {
  const c = audio()
  if (!c) return
  const out = master(c, 1)
  ;[1568, 2093].forEach((f, i) => tone(c, out, { from: f, at: i * 0.06, dur: 0.2, peak: 0.04 }))
}

// Some browsers load their voice list late.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices()
  window.speechSynthesis.addEventListener?.('voiceschanged', () => window.speechSynthesis.getVoices())
}
