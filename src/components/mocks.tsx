import { useEffect, useRef } from 'react'
import type { Palette } from '../data/site'

/** A simple phone frame with abstract app UI in the project's colours. */
export function Phone({
  p,
  variant = 'list',
  className = '',
  cropped = true,
}: {
  p: Palette
  variant?: 'list' | 'grid'
  className?: string
  cropped?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={`bg-[#050708] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.3)] ${cropped ? 'rounded-t-[30px] pb-0' : 'rounded-[32px]'} ${className}`}
    >
      <div
        className={`flex h-full flex-col gap-2.5 px-3 py-5 ${cropped ? 'rounded-t-[23px]' : 'rounded-[25px]'}`}
        style={{ background: p.screen }}
      >
        <div className="h-2.5 w-1/2 rounded" style={{ background: p.ink, opacity: 0.85 }} />
        {variant === 'list' ? (
          <>
            <div className="h-[22%] rounded-xl" style={{ background: p.accent }} />
            <div className="grid grid-cols-3 gap-1.5">
              <div className="aspect-square rounded-lg" style={{ background: p.block }} />
              <div className="aspect-square rounded-lg" style={{ background: p.block }} />
              <div className="aspect-square rounded-lg" style={{ background: p.block }} />
            </div>
            <div className="h-7 rounded-lg" style={{ background: p.block }} />
            <div className="h-7 rounded-lg" style={{ background: p.block }} />
            <div className="h-7 w-2/3 rounded-lg" style={{ background: p.block }} />
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[4/5] rounded-lg" style={{ background: p.accent }} />
            <div className="aspect-[4/5] rounded-lg" style={{ background: p.block }} />
            <div className="aspect-[4/5] rounded-lg" style={{ background: p.block }} />
            <div className="aspect-[4/5] rounded-lg" style={{ background: p.block }} />
          </div>
        )}
      </div>
    </div>
  )
}

/** Dark admin dashboard window. */
export function Dashboard({ className = '', title = 'Good morning, admin' }: { className?: string; title?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex overflow-hidden rounded-xl border border-[#2A3A36] bg-[#11181B] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="hidden w-28 flex-col gap-2.5 border-r border-[#22302C] px-3 py-4 sm:flex">
        <div className="h-2.5 w-3/5 rounded bg-accent" />
        <div className="h-[7px] rounded bg-[#24312D]" />
        <div className="h-[7px] rounded bg-[#24312D]" />
        <div className="h-[7px] rounded bg-[#24312D]" />
        <div className="h-[7px] w-2/3 rounded bg-[#24312D]" />
      </div>
      <div className="flex flex-1 flex-col gap-3.5 p-4">
        <div className="text-[17px] font-semibold text-white">{title}</div>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="h-14 rounded-lg bg-[#18221F]" />
          <div className="h-14 rounded-lg bg-[#18221F]" />
          <div className="h-14 rounded-lg bg-[#2B5A4C]" />
        </div>
        <div className="flex h-24 items-end gap-2 rounded-lg bg-[#18221F] p-3">
          {[35, 55, 42, 70, 88, 60, 74].map((h, i) => (
            <div key={i} className={`flex-1 rounded-sm ${i === 4 ? 'bg-accent' : 'bg-[#2B5A4C]'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-2 rounded bg-[#18221F]" />
          <div className="h-2 w-4/5 rounded bg-[#18221F]" />
        </div>
      </div>
    </div>
  )
}

/** A placeholder box for a real screenshot. Replace with an <img> when you have one. */
export function Shot({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-[inherit] p-5 text-center text-sm text-[#4C7A65] ${className}`}>
      [{label}]
    </div>
  )
}

export const screenSrc = (name: string) => `${import.meta.env.BASE_URL}screens/${name}.webp`
const videoSrc = (name: string, ext: 'mp4' | 'webm' | 'webp') => `${import.meta.env.BASE_URL}videos/${name}.${ext}`

/**
 * A muted, looping screen recording. It only plays while on screen, and shows its
 * first frame as a still when the visitor prefers reduced motion.
 */
export function LoopVideo({ name, label, className = '' }: { name: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !still.matches) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className={className}
      poster={videoSrc(name, 'webp')}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={videoSrc(name, 'webm')} type="video/webm" />
      <source src={videoSrc(name, 'mp4')} type="video/mp4" />
    </video>
  )
}

/** A real app screenshot inside a phone frame. `cropped` hides the bottom bezel (bleeds off the card). */
export function PhoneShot({
  name,
  alt,
  className = '',
  cropped = true,
  eager = false,
  video,
}: {
  name: string
  alt: string
  className?: string
  cropped?: boolean
  eager?: boolean
  /** Name of a screen recording in public/videos; replaces the still when given. */
  video?: string
}) {
  const inner = `block h-full w-full object-cover object-top ${cropped ? 'rounded-t-[23px]' : 'rounded-[25px]'}`
  return (
    <div
      className={`overflow-hidden bg-[#050708] p-[7px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] ${
        cropped ? 'rounded-t-[30px] pb-0' : 'rounded-[32px]'
      } ${className}`}
    >
      {video ? (
        <LoopVideo name={video} label={alt} className={inner} />
      ) : (
        <img src={screenSrc(name)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width={390} height={844} className={inner} />
      )}
    </div>
  )
}

/** A real dashboard screenshot inside a simple browser window. */
export function BrowserShot({
  name,
  alt,
  className = '',
  eager = false,
  video,
}: {
  name: string
  alt: string
  className?: string
  eager?: boolean
  video?: string
}) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] ${className}`}>
      <div aria-hidden="true" className="flex h-7 shrink-0 items-center gap-1.5 border-b border-black/5 bg-[#F6F7F7] px-3">
        <span className="h-2 w-2 rounded-full bg-[#E1DED8]" />
        <span className="h-2 w-2 rounded-full bg-[#E1DED8]" />
        <span className="h-2 w-2 rounded-full bg-[#E1DED8]" />
      </div>
      {video ? (
        <LoopVideo name={video} label={alt} className="block min-h-0 w-full flex-1 object-cover object-left-top" />
      ) : (
        <img
          src={screenSrc(name)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width={1440}
          height={1000}
          className="block min-h-0 w-full flex-1 object-cover object-left-top"
        />
      )}
    </div>
  )
}
