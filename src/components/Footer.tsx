import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/site'
import { WordsReveal } from './motion'
import { AnimeFooter } from './AnimeFooter'
import { footerLinks, useBackToTop, useLagosTime } from '../lib/footer'
import { AnimeToggle, useTheme } from '../lib/theme'

export function Footer() {
  const onContact = useLocation().pathname === '/contact'
  const { anime } = useTheme()
  const reduce = useReducedMotion()
  const mode = anime ? 'anime' : 'classic'

  return (
    <footer
      aria-label="Footer"
      className={`relative overflow-hidden rounded-t-[18px] md:rounded-t-[40px] ${anime ? 'bg-[#1B1446]' : 'bg-ink'} text-paper ${onContact ? 'mt-3' : 'mt-24 md:mt-32'}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: anime ? 1.04 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {anime ? <AnimeFooter onContact={onContact} toggle={<AnimeToggle />} /> : <ClassicFooter onContact={onContact} toggle={<AnimeToggle />} />}
        </motion.div>
      </AnimatePresence>
    </footer>
  )
}

function ClassicFooter({ onContact, toggle }: { onContact: boolean; toggle: React.ReactNode }) {
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
    <div className="relative">
      <div className="container-x flex flex-col pb-10 pt-16 md:pt-24 md:pb-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[16px] text-muted-dark">( Final screen )</span>
          {toggle}
        </div>

        <WordsReveal
          as="h2"
          text={onContact ? 'Thanks for stopping by.' : "Let's build something together."}
          className="mt-8 max-w-[14ch] text-[clamp(48px,7.4vw,112px)] font-[450] leading-[0.98] tracking-[-0.035em] md:mt-10"
        />

        <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3 md:mt-14">
          <a href={`mailto:${profile.email}`} className="footer-email group text-[clamp(24px,3.6vw,52px)] font-[450] tracking-[-0.02em]">
            <span className="footer-email-text">{profile.email}</span>
          </a>
          <div className="flex items-center gap-5 text-[15px] font-medium">
            <a href={`mailto:${profile.email}`} className="text-muted-dark transition-colors hover:text-paper">
              Send an email ↗
            </a>
            <button type="button" onClick={copy} className="min-h-11 text-accent transition-colors hover:text-accent-hover" aria-live="polite">
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>
        </div>
        {!onContact && (
          <Link to="/contact" className="mt-4 w-fit text-[16px] text-soft-dark underline decoration-line-dark underline-offset-[6px] transition-colors hover:text-paper hover:decoration-accent">
            Prefer a form? Use the contact page
          </Link>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line-dark pt-8 md:mt-24">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[17px]">
            {footerLinks().map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel="noreferrer"
                  download={l.download || undefined}
                  className="text-[#C9CED1] transition-colors hover:text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="text-[16px] text-muted-dark">
            {profile.location.split(',')[0]}, {time}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[14px] text-muted-dark">
          <span>
            © {new Date().getFullYear()} {profile.name}. Built with React, GSAP and Framer Motion.
          </span>
          <button type="button" onClick={toTop} className="min-h-11 text-[15px] text-soft-dark transition-colors hover:text-paper">
            Back to top ↑
          </button>
        </div>
      </div>
    </div>
  )
}
