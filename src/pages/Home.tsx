import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { capabilities, companies, helps, jobs, profile, projects } from '../data/site'
import { ButtonLink, DarkBand, LiveDot, TextLink, cvHref, mailto } from '../components/ui'
import { Reveal, WordsReveal, useParallax } from '../components/motion'
import { BrowserShot, PhoneShot } from '../components/mocks'
import { ProjectCard } from '../components/ProjectCard'
import { usePageTitle } from '../lib/usePageTitle'
import { SayName } from '../lib/theme'
import { useSiteReady } from '../components/Preloader'

const ease = [0.16, 1, 0.3, 1] as const

export default function Home() {
  usePageTitle()
  const ready = useSiteReady()
  const tego = projects[0]
  const phone = useParallax<HTMLDivElement>(120)
  const board = useParallax<HTMLDivElement>(50)

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-col gap-12 pb-14 pt-32 md:gap-16 md:pb-20 md:pt-40">
          <div className="flex flex-col gap-9">
            <motion.p
              className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[16px] text-muted-dark"
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease }}
            >
              <span>Frontend and mobile engineer in {profile.location.split(',')[0]}</span>
              {profile.available && (
                <span className="inline-flex items-center gap-2 rounded-full border border-line-dark px-3 py-1 text-paper">
                  <LiveDot /> Open to new roles
                </span>
              )}
            </motion.p>
            <WordsReveal
              immediate
              text="Mobile apps and the platforms behind them, built end to end."
              className="max-w-[1180px] text-[clamp(44px,7vw,108px)] font-[450] leading-[0.98] tracking-[-0.035em]"
            />
            <motion.div
              className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
            >
              <p className="max-w-[600px] text-[19px] leading-[1.5] text-soft-dark md:text-[21px]">{profile.intro.split(profile.name)[0]}
                <SayName className="say-inline">{profile.name}</SayName>
                {profile.intro.split(profile.name)[1]}
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink to="/work">See the work</ButtonLink>
                <ButtonLink href={cvHref} download variant="outline-dark">
                  Download CV
                </ButtonLink>
              </div>
            </motion.div>
          </div>

          <Reveal>
            <Link
              to={`/work/${tego.slug}`}
              aria-label="Featured work: TEGO"
              className="anime-card group relative block h-[420px] overflow-hidden rounded-[14px] md:h-[600px] md:rounded-[24px]"
              style={{ background: tego.palette.bg }}
            >
              <div ref={board} className="absolute left-[8%] right-[-6%] top-12 hidden h-[440px] sm:block md:left-[26%] md:top-16 md:h-[520px]">
                <BrowserShot name={tego.screens.desktop!} video={tego.video.desktop} alt="TEGO admin dashboard" eager className="h-full" />
              </div>
              <div
                ref={phone}
                className="absolute -bottom-12 left-1/2 h-[400px] w-[190px] -translate-x-1/2 sm:left-[6%] sm:translate-x-0 md:h-[520px] md:w-[244px]"
              >
                <PhoneShot name={tego.screens.phones[0]} video={tego.video.phone} alt="TEGO app home screen" eager cropped={false} className="h-full w-full" />
              </div>
              <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[15px] font-medium text-paper md:left-auto md:right-6 md:top-auto md:bottom-6">
                TEGO, live on both app stores
                <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </span>
            </Link>
          </Reveal>

          <Reveal className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line-dark pt-8">
            <span className="text-[15px] text-muted-dark">Shipped with teams at</span>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {companies.map((c) => (
                <li key={c} className="text-[19px] font-medium tracking-[-0.01em] text-[#DDE1E3]">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </DarkBand>

      <div className="container-x">
        <section aria-labelledby="work-h" className="flex flex-col gap-12 pt-24 md:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-3xl flex-col gap-5">
              <WordsReveal
                as="h2"
                id="work-h"
                text="Products I've built, from first commit to the stores."
                className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]"
              />
            </div>
            <TextLink to="/work">All work</TextLink>
          </div>
          <div className="grid gap-x-6 gap-y-14 lg:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} y={0} delay={i % 2 === 1 ? 0.12 : 0}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="help-h" className="flex flex-col pt-24 md:pt-32">
          <div className="flex flex-col gap-5 pb-10">
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
                  <TextLink href={mailto(h.cta)}>{h.cta}</TextLink>
                </div>
                <Link
                  to={`/work/${p.slug}`}
                  aria-label={`See ${p.name}`}
                  className="anime-card group hidden h-60 flex-[0_0_240px] items-end justify-center overflow-hidden rounded-[12px] md:rounded-[20px] pt-7 md:flex"
                  style={{ background: p.palette.bg }}
                >
                  {p.screens.phones[0] ? (
                    <PhoneShot
                      name={p.screens.phones[0]}
                      alt={`${p.name} app screen`}
                      className="h-[212px] w-[120px] transition-transform duration-700 group-hover:-translate-y-2"
                    />
                  ) : (
                    <BrowserShot name={p.screens.desktop!} alt={`${p.name} dashboard`} className="h-[180px] w-[220px]" />
                  )}
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
            <h2 id="exp-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Where I've worked.
            </h2>
            <TextLink to="/about">Full career</TextLink>
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
                  {j.type ? `, ${j.type.split(' (')[0].split(' · ')[0].toLowerCase()}` : ''}
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
  return (
    <section aria-labelledby="cap-h" className="band-dark mx-3 mt-24 rounded-[18px] bg-ink text-paper md:mx-5 md:mt-32 md:rounded-[40px]">
      <div className="container-x flex flex-col gap-14 py-20 md:py-28">
        <div className="flex max-w-3xl flex-col gap-5">
          <WordsReveal
            as="h2"
            id="cap-h"
            text="From a blank repo to a reviewed, released product."
            className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]"
          />
        </div>
        <ol className="flex flex-col">
          {capabilities.map((cap) => (
            <li key={cap.name} className="grid gap-8 border-t border-line-dark py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:py-16">
              <Reveal className="flex flex-col gap-4 md:sticky md:top-28 md:self-start">
                <span className="text-[16px] text-muted-dark">{cap.name}</span>
                <h3 className="text-[28px] font-[450] leading-[1.15] tracking-[-0.025em] md:text-[36px]">{cap.title}</h3>
              </Reveal>
              <dl className="grid gap-x-10 sm:grid-cols-2">
                {cap.items.map((it) => (
                  <div key={it.t} className="flex flex-col gap-2 border-t border-line-dark py-6">
                    <dt className="text-xl font-medium">{it.t}</dt>
                    <dd className="text-[16px] leading-normal text-soft-dark">{it.d}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
