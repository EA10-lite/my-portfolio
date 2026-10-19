import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { capabilities, companies, helps, jobs, profile, projects, stats } from '../data/site'
import { ButtonLink, DarkBand, Label, LiveDot, cvHref } from '../components/ui'
import { CountUp, Reveal, WordsReveal, useParallax } from '../components/motion'
import { Dashboard, Phone } from '../components/mocks'
import { ProjectCard } from '../components/ProjectCard'
import { usePageTitle } from '../lib/usePageTitle'

const ease = [0.16, 1, 0.3, 1] as const
const stack = [
  'React Native',
  'Expo',
  'TypeScript',
  'React',
  'Next.js',
  'Zustand',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'EAS',
  'Sentry',
]

export default function Home() {
  usePageTitle()
  const tego = projects[0]
  const phone = useParallax<HTMLDivElement>(120)
  const board = useParallax<HTMLDivElement>(50)

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-col gap-16 pb-16 pt-32 md:gap-20 md:pb-20 md:pt-40">
          <div className="flex flex-col gap-9">
            <motion.div
              className="label flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-dark"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span>{profile.role}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#3A4347]" />
              <span>{profile.location}</span>
              {profile.available && (
                <>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#3A4347]" />
                  <span className="inline-flex items-center gap-2 text-paper">
                    <LiveDot /> Open to roles
                  </span>
                </>
              )}
            </motion.div>
            <WordsReveal
              immediate
              text="Mobile apps and the platforms behind them, built end to end."
              accent="built end to end."
              className="max-w-[1180px] text-[clamp(44px,7vw,108px)] font-[450] leading-[0.98] tracking-[-0.035em]"
            />
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
            >
              <ButtonLink to="/work">See the work</ButtonLink>
              <ButtonLink href={cvHref} download variant="outline-dark" arrow={false}>
                Download CV
              </ButtonLink>
            </motion.div>
          </div>

          <div className="flex flex-wrap items-stretch gap-12">
            <Reveal className="min-w-0 flex-[1_1_560px]">
              <Link
                to={`/work/${tego.slug}`}
                aria-label="Featured work: TEGO"
                className="group relative block h-[420px] overflow-hidden rounded-[24px] md:h-[480px]"
                style={{ background: tego.palette.bg }}
              >
                <div ref={board} className="absolute left-[12%] right-[-8%] top-12 h-[300px]">
                  <Dashboard className="h-full" />
                </div>
                <div
                  ref={phone}
                  className="absolute -bottom-10 left-[6%] h-[300px] w-[150px] sm:h-[360px] sm:w-[180px] md:h-[380px] md:w-[190px]"
                >
                  <Phone p={tego.palette} cropped={false} className="h-full w-full" />
                </div>
                <span className="label absolute bottom-6 right-6 hidden items-center gap-2.5 border-b border-paper pb-1 text-paper sm:inline-flex">
                  Featured · TEGO{' '}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>

            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-9">
              <Reveal>
                <p className="text-[24px] font-normal leading-[1.4] tracking-[-0.01em] text-[#E9ECED] md:text-[28px]">{profile.intro}</p>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col gap-3.5">
                <Label dark className="text-[12px]">
                  Shipped with teams at
                </Label>
                <ul className="grid grid-cols-2 border-l border-t border-line-dark sm:grid-cols-3">
                  {companies.map((c) => (
                    <li
                      key={c}
                      className="flex min-h-[76px] items-center justify-center border-b border-r border-line-dark p-2 text-center text-base font-semibold tracking-[-0.01em] text-[#DDE1E3] transition-colors hover:bg-ink-2"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <dl aria-label="In numbers" className="grid grid-cols-2 border-t border-line-dark lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center gap-2 px-4 pb-2 pt-9 text-center border-line-dark ${i % 2 === 1 ? 'border-l' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i >= 2 ? 'max-lg:border-t' : ''}`}
              >
                <dd className="order-1 text-[44px] font-[450] leading-none tracking-[-0.03em] md:text-[52px]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="order-2 text-[15px] text-muted-dark">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </DarkBand>

      <div aria-hidden="true" className="marquee-wrap overflow-hidden border-b border-line py-7">
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-[28px] font-[450] tracking-[-0.02em] text-[#C3C9CC]">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              {s}
              <svg width="12" height="12" viewBox="0 0 16 16">
                <path d="M8 0v16M0 8h16M2.3 2.3l11.4 11.4M13.7 2.3 2.3 13.7" stroke="#FF6B1A" strokeWidth="2.4" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      <div className="container-x">
        <section aria-labelledby="work-h" className="flex flex-col gap-12 pt-24 md:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-3xl flex-col gap-5">
              <Label>Selected work</Label>
              <WordsReveal
                as="h2"
                id="work-h"
                text="Products I've built, from first commit to the stores."
                className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]"
              />
            </div>
            <ButtonLink to="/work" variant="outline-light" className="min-h-12">
              All work
            </ButtonLink>
          </div>
          <div className="grid gap-x-6 gap-y-14 lg:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i % 2 === 1 ? 0.12 : 0}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="help-h" className="flex flex-col pt-24 md:pt-32">
          <div className="flex flex-col gap-5 pb-10">
            <Label>How I can help</Label>
            <WordsReveal
              as="h2"
              id="help-h"
              text="Three problems I'm often hired to solve."
              className="max-w-3xl text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]"
            />
          </div>
          {helps.map((h) => {
            const p = projects.find((x) => x.slug === h.slug)!
            return (
              <Reveal key={h.q} className="flex flex-wrap items-start gap-x-12 gap-y-7 border-t border-line py-10">
                <span className="flex-[0_1_240px] text-[17px] leading-snug text-body">{h.q}</span>
                <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-7">
                  <p className="text-[24px] font-normal leading-[1.32] tracking-[-0.015em] md:text-[30px]">{h.a}</p>
                  <ButtonLink to="/contact" className="min-h-12 self-start">
                    {h.cta}
                  </ButtonLink>
                </div>
                <Link
                  to={`/work/${p.slug}`}
                  aria-label={`See ${p.name}`}
                  className="group hidden h-60 flex-[0_0_240px] items-end justify-center overflow-hidden rounded-[20px] pt-7 md:flex"
                  style={{ background: p.palette.bg }}
                >
                  <Phone p={p.palette} className="h-[212px] w-[120px] transition-transform duration-700 group-hover:-translate-y-2" />
                </Link>
              </Reveal>
            )
          })}
        </section>
      </div>

      <Capabilities />

      <div className="container-x">
        <section aria-labelledby="exp-h" className="flex flex-wrap gap-12 pt-24 md:pt-32">
          <div className="flex flex-[1_1_300px] flex-col gap-5">
            <Label>Experience</Label>
            <h2 id="exp-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Where I've worked.
            </h2>
            <Link to="/about" className="label group inline-flex min-h-11 w-fit items-center gap-2.5 border-b border-ink">
              Full career{' '}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <ol className="min-w-0 flex-[2_1_640px]">
            {jobs.map((j, i) => (
              <Reveal
                as="li"
                key={j.company}
                delay={i * 0.04}
                className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line py-6"
              >
                <span className="flex-[1_1_220px] text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent">
                  {j.company}
                </span>
                <span className="flex-[1_1_220px] text-base text-body">
                  {j.role}
                  {j.type ? ` · ${j.type.split(' (')[0]}` : ''}
                </span>
                <span className="min-w-[170px] text-sm text-muted md:text-right">{j.when}</span>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}

function Capabilities() {
  const [active, setActive] = useState(0)
  const cap = capabilities[active]
  return (
    <section aria-labelledby="cap-h" className="mx-3 mt-24 rounded-[28px] bg-ink text-paper md:mx-5 md:mt-32 md:rounded-[40px]">
      <div className="container-x flex flex-col gap-14 py-20 md:py-28">
        <div className="flex max-w-3xl flex-col gap-5">
          <Label dark>Capabilities</Label>
          <WordsReveal
            as="h2"
            id="cap-h"
            text="From a blank repo to a reviewed, released product."
            className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]"
          />
        </div>
        <div className="flex flex-wrap items-start gap-12">
          <div role="tablist" aria-label="Capabilities" className="flex flex-[0_1_220px] flex-row flex-wrap gap-x-6 md:flex-col md:gap-0.5">
            {capabilities.map((c, i) => (
              <button
                key={c.name}
                type="button"
                role="tab"
                id={`cap-tab-${i}`}
                aria-selected={i === active}
                aria-controls="cap-panel"
                onClick={() => setActive(i)}
                className={`flex min-h-12 items-center gap-2.5 text-left text-[22px] font-[450] tracking-[-0.01em] transition-colors ${
                  i === active ? 'text-paper' : 'text-[#6B7479] hover:text-[#A9B1B5]'
                }`}
              >
                <span className={`h-2 w-2 rounded-full transition-colors ${i === active ? 'bg-accent' : 'bg-transparent'}`} />
                {c.name}
              </button>
            ))}
          </div>
          <div id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${active}`} className="min-w-0 flex-[1_1_620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={cap.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-col gap-7"
              >
                <h3 className="text-[28px] font-[450] leading-[1.15] tracking-[-0.025em] md:text-[36px]">{cap.title}</h3>
                <div className="grid border-l border-t border-line-dark sm:grid-cols-2">
                  {cap.items.map((it, i) => (
                    <motion.div
                      key={it.t}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.08 * i, duration: 0.5 }}
                      className="flex min-h-[200px] flex-col justify-between gap-10 border-b border-r border-line-dark p-6 transition-colors hover:bg-ink-2"
                    >
                      <span className="text-sm text-muted-dark">0{i + 1}</span>
                      <div className="flex flex-col gap-2">
                        <span className="text-xl font-medium">{it.t}</span>
                        <span className="text-[15px] leading-normal text-soft-dark">{it.d}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
