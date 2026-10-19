import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { gsap, usePrefersReducedMotion } from '../lib/smooth'

const ease = [0.16, 1, 0.3, 1] as const

/** Fades and lifts its children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'span'
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  )
}

const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
}
const wordChild: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.95, ease } },
}

/**
 * Splits text into words that rise from behind a mask.
 * `accent` words (matched from the end of the string) take the accent colour.
 */
export function WordsReveal({
  text,
  accent,
  className,
  as = 'h1',
  immediate = false,
  id,
}: {
  text: string
  accent?: string
  className?: string
  as?: 'h1' | 'h2' | 'p'
  immediate?: boolean
  id?: string
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const main = accent && text.endsWith(accent) ? text.slice(0, -accent.length).trim() : text
  const words = main.split(' ').map((w) => ({ w, accent: false }))
  if (accent && text.endsWith(accent)) accent.split(' ').forEach((w) => words.push({ w, accent: true }))
  const Tag = motion[as]
  const show = immediate || inView

  if (reduced) {
    const Plain = as
    return (
      <Plain id={id} className={className}>
        {main} {accent && <span className="text-accent">{accent}</span>}
      </Plain>
    )
  }

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      variants={wordParent}
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
      aria-label={text}
    >
      {words.map((item, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={wordChild} className={`inline-block ${item.accent ? 'text-accent' : ''}`}>
            {item.w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Counts a number up from zero when it scrolls into view. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)
  useEffect(() => {
    if (!inView || reduced) return
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.4,
      ease: 'power3.out',
      onUpdate: () => setShown(Math.round(obj.v)),
    })
    return () => {
      tween.kill()
    }
  }, [inView, reduced, value])
  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
    </span>
  )
}

/** Moves an element vertically as the page scrolls past it (GSAP ScrollTrigger). */
export function useParallax<T extends HTMLElement>(amount = 80) {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount / 2 },
        {
          y: -amount / 2,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
    return () => ctx.revert()
  }, [amount, reduced])
  return ref
}

/** Scales a media block up slightly as it enters, for a soft zoom-in. */
export function useScaleIn<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    // tighter corners on phones, to match the card's own rounded-[14px] md:rounded-[24px]
    const wide = window.matchMedia('(min-width: 768px)').matches
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0.92, borderRadius: wide ? '48px' : '28px' },
        {
          scale: 1,
          borderRadius: wide ? '24px' : '14px',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: true },
        },
      )
    })
    return () => ctx.revert()
  }, [reduced])
  return ref
}
