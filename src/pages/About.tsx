import { education, jobs, process, profile, skills } from '../data/site'
import { ButtonLink, DarkBand, LiveDot, cvHref, mailto } from '../components/ui'
import { Reveal, WordsReveal } from '../components/motion'
import { usePageTitle } from '../lib/usePageTitle'
import { SayName } from '../lib/theme'

export default function About() {
  usePageTitle('About', 'About Emmanuel Anyigor, a frontend and mobile engineer in Lagos with four years of React Native, React and Next.js work for banks, fintechs, travel and consumer products.')

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-wrap items-end gap-12 pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-8">
            <SayName block>
            <WordsReveal
              immediate
              text="I'm Emmanuel, a frontend and mobile engineer in Lagos."
              className="text-[clamp(40px,5.6vw,84px)] font-[450] leading-[1] tracking-[-0.035em]"
            />
            </SayName>
            <Reveal delay={0.3} className="flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-soft-dark">
              <p>
                For more than four years I've built products in React, Next.js and React Native for banking, fintech, travel and consumer
                teams, in-house and on contract.
              </p>
              <p>
                Most of my recent work is mobile: taking apps from the first screen to App Store and Google Play release, then building the
                dashboards that run them. I care about the details people feel but rarely notice, like a tab bar that fits every phone, or a
                photo picker that doesn't ask for your whole gallery.
              </p>
            </Reveal>
            <Reveal delay={0.4} className="flex flex-wrap gap-3">
              <ButtonLink href={cvHref} download>
                Download CV
              </ButtonLink>
              <ButtonLink href={mailto()} variant="outline-dark">
                Get in touch
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="flex min-w-0 flex-[2_1_320px] flex-col gap-3">
            <img
              src={`${import.meta.env.BASE_URL}portrait.webp`}
              alt="Portrait of Emmanuel Anyigor"
              width={900}
              height={1125}
              className="anime-card aspect-[4/5] w-full rounded-[14px] object-cover md:rounded-[24px]"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[15px]">
              <span className="inline-flex items-center gap-2">
                <LiveDot /> Open to new roles
              </span>
              <span className="text-muted-dark">
                {profile.location}, {profile.timezone}
              </span>
            </div>
          </Reveal>
        </div>
      </DarkBand>

      <div className="container-x flex flex-col gap-24 pt-24 md:gap-32 md:pt-32">
        <section aria-labelledby="process-h" className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <WordsReveal
              as="h2"
              id="process-h"
              text="From brief to release, in four steps."
              className="max-w-3xl text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]"
            />
          </div>
          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 0.06} className="flex flex-col gap-5 border-t-2 border-ink pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-[15px] font-medium text-accent">Step {i + 1}</span>
                </div>
                <h3 className="text-[28px] font-medium leading-tight tracking-[-0.025em]">{st.title}</h3>
                <p className="text-[17px] leading-relaxed text-body">{st.body}</p>
                <ul className="flex flex-col">
                  {st.items.map((it) => (
                    <li key={it} className="border-t border-line py-3 text-[16px]">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </section>

        <section aria-labelledby="career-h" className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_280px] flex-col gap-5">
            <h2 id="career-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Career
            </h2>
          </div>
          <ol className="min-w-0 flex-[3_1_640px]">
            {jobs.map((j) => (
              <Reveal as="li" key={j.company} className="grid gap-x-8 gap-y-3 border-t border-line py-8 md:grid-cols-[180px_minmax(0,1fr)]">
                <span className="flex items-start gap-2 text-sm text-muted">
                  {j.current && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="Current role" />}
                  {j.when}
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-medium tracking-[-0.02em]">
                    {j.role}, {j.company}
                  </span>
                  {j.type && <span className="text-sm text-muted">{j.type.replace(/ · /g, ', ')}</span>}
                  <p className="text-base leading-relaxed text-body">{j.what}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <section aria-labelledby="skills-h" className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_280px] flex-col gap-5">
            <h2 id="skills-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Skills
            </h2>
          </div>
          <dl className="min-w-0 flex-[3_1_640px]">
            {skills.map((sk) => (
              <Reveal key={sk.group} className="grid gap-3 border-t border-line py-6 md:grid-cols-[200px_minmax(0,1fr)]">
                <dt className="text-[17px] font-medium">{sk.group}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {sk.items.map((t) => (
                    <span key={t} className="rounded-full bg-paper-2 px-3 py-1.5 text-sm">
                      {t}
                    </span>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <section aria-labelledby="edu-h" className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_280px] flex-col gap-5">
            <h2 id="edu-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Education
            </h2>
          </div>
          <ul className="min-w-0 flex-[3_1_640px]">
            {education.map((e) => (
              <Reveal as="li" key={e.title} className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line py-7">
                <span className="text-xl font-medium">
                  {e.title}, <span className="text-body">{e.where}</span>
                </span>
                <span className="text-sm text-muted">{e.note}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
