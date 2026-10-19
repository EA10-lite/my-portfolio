import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/site'
import { ButtonLink, CopyEmail, Label, cvHref } from './ui'
import { WordsReveal } from './motion'
import { SmokeWordmark } from './SmokeWordmark'

export function Footer() {
  const onContact = useLocation().pathname === '/contact'
  const socials = [
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin },
    { label: 'GitHub', href: profile.github },
    { label: 'X', href: profile.x },
    { label: 'CV', href: cvHref },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <footer className={`rounded-t-[18px] bg-ink text-paper md:rounded-t-[40px] ${onContact ? 'mt-3' : 'mt-24 md:mt-32'}`}>
      <div className={`container-x flex flex-col gap-20 pb-8 md:gap-24 ${onContact ? 'pt-14' : 'pt-20 md:pt-28'}`}>
        {!onContact && (
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="flex max-w-4xl flex-[1_1_560px] flex-col gap-6">
              <WordsReveal
                as="h2"
                text="Have a product to build? Let's talk."
                className="text-[clamp(44px,6.4vw,96px)] font-[450] leading-[0.98] tracking-[-0.035em]"
              />
            </div>
            <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:min-w-[320px]">
              <ButtonLink to="/contact" className="justify-between">
                Get in touch
              </ButtonLink>
              <CopyEmail />
            </div>
          </div>
        )}

        <div className="grid gap-10 border-t border-line-dark pt-10 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">{profile.name}</span>
            <span className="text-[15px] leading-relaxed text-muted-dark">
              {profile.role}
              <br />
              {profile.location}, {profile.timezone}
            </span>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2">
            <Label dark className="mb-1">
              Site
            </Label>
            {[
              ['/', 'Home'],
              ['/work', 'Work'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="w-fit text-[15px] text-[#DDE1E3] transition-colors hover:text-accent">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Label dark className="mb-1">
              Elsewhere
            </Label>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                download={s.label === 'CV' || undefined}
                className="w-fit text-[15px] text-[#DDE1E3] transition-colors hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 text-sm text-muted-dark">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Built with React, GSAP and Framer Motion</span>
        </div>
      </div>
      <SmokeWordmark text={profile.name.split(' ')[0]} />
    </footer>
  )
}

