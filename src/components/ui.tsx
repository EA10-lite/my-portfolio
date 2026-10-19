import { Wordmark } from './Wordmark'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/site'

type Variant = 'accent' | 'white' | 'outline-dark' | 'outline-light'

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-ink hover:bg-accent-hover',
  white: 'bg-paper text-ink hover:bg-paper-2',
  'outline-dark': 'border border-line-dark text-paper hover:border-muted-dark',
  'outline-light': 'border border-line text-ink hover:border-muted',
}

const base =
  'group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-lg px-6 text-[16px] font-semibold tracking-[-0.01em] transition-colors duration-200'

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  )
}

export function ButtonLink({
  to,
  href,
  children,
  variant = 'accent',
  arrow = false,
  className = '',
  download,
}: {
  to?: string
  href?: string
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
  download?: boolean
}) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
        {arrow && <Arrow />}
      </Link>
    )
  return (
    <a
      href={href}
      className={cls}
      download={download || undefined}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
    >
      {children}
      {arrow && <Arrow />}
    </a>
  )
}

/** An underlined text link for secondary actions. */
export function TextLink({ to, children, dark = false }: { to: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 w-fit items-center text-[17px] font-semibold underline decoration-2 underline-offset-[6px] transition-colors ${
        dark ? 'decoration-line-dark hover:decoration-accent' : 'decoration-line hover:decoration-accent'
      }`}
    >
      {children}
    </Link>
  )
}

export const cvHref = `${import.meta.env.BASE_URL}${profile.cv}`

export function Label({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return <span className={`label ${dark ? 'text-muted-dark' : 'text-muted'} ${className}`}>{children}</span>
}

export function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-live opacity-60" />
      <span className="relative h-2 w-2 rounded-full bg-live" />
    </span>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center ${className}`} aria-label={`${profile.name}, home`}>
      <Wordmark className="h-[22px] w-auto md:h-6 [&_.ea10-digits]:transition-transform [&_.ea10-digits]:duration-500 group-hover:[&_.ea10-digits]:-translate-y-[18px]" />
    </Link>
  )
}

/** Copies the email address and confirms with "Copied!". */
export function CopyEmail({ dark = true, className = '' }: { dark?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      /* clipboard may be blocked; the address is still visible */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`flex min-h-[56px] w-full items-center justify-between gap-4 rounded-lg border px-6 text-left text-base transition-colors ${
        dark ? 'border-line-dark text-paper hover:border-muted-dark' : 'border-line text-ink hover:border-muted'
      } ${className}`}
    >
      <span className="truncate">{profile.email}</span>
      <span className={`label text-[12px] ${copied ? 'text-live' : 'text-accent'}`} aria-live="polite">
        {copied ? 'Copied!' : 'Copy'}
      </span>
    </button>
  )
}

export function Tag({ children, light = true }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${
        light ? 'bg-white/90 text-ink' : 'border border-line-dark text-soft-dark'
      }`}
    >
      {children}
    </span>
  )
}

/** Dark hero band with rounded bottom corners, used at the top of every page. */
export function DarkBand({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-b-[18px] bg-ink text-paper md:rounded-b-[40px] ${className}`}>{children}</section>
}
