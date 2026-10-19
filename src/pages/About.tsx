import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { education, jobs, process, profile, skills } from '../data/site'
import { ButtonLink, DarkBand, Label, LiveDot, cvHref } from '../components/ui'
import { Reveal, WordsReveal } from '../components/motion'
import { usePageTitle } from '../lib/usePageTitle'

export default function About() {
  usePageTitle('About')
  const [step, setStep] = useState(0)
  const cur = process[step]

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-wrap items-end gap-12 pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-8">
            <Label dark>About</Label>
            <WordsReveal
              immediate
              text="I'm Emmanuel, a frontend & mobile engineer in Lagos."
              accent="in Lagos."
              className="text-[clamp(40px,5.6vw,84px)] font-[450] leading-[1] tracking-[-0.035em]"
            />
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
              <ButtonLink to="/contact" variant="outline-dark">
                Get in touch
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="flex min-w-0 flex-[2_1_320px] flex-col gap-3">
            {/* Replace this block with <img src="/portrait.jpg" alt="Emmanuel Anyigor" className="aspect-[4/5] w-full rounded-[24px] object-cover" /> */}
            <div className="flex aspect-[4/5] items-center justify-center rounded-[24px] border border-line-dark bg-ink-2 text-[15px] text-muted-dark">
              [Your portrait photo]
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line-dark px-5 py-4 text-sm">
              <span className="inline-flex items-center gap-2">
                <LiveDot /> Open to roles
              </span>
              <span className="text-muted-dark">
                {profile.location} · {profile.timezone}
              </span>
            </div>
          </Reveal>
        </div>
      </DarkBand>

      <div className="container-x flex flex-col gap-24 pt-24 md:gap-32 md:pt-32">
        <section aria-labelledby="process-h" className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <Label>How I work</Label>
            <WordsReveal
              as="h2"
              id="process-h"
              text="From brief to release, in four steps."
              className="max-w-3xl text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]"
            />
          </div>
          <div role="tablist" aria-label="Process steps" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === step}
                aria-controls="process-panel"
                onClick={() => setStep(i)}
                className={`flex min-h-32 flex-col items-start justify-between gap-6 rounded-2xl border p-6 text-left transition-colors duration-300 ${
                  i === step ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-[#C9CED1]'
                }`}
              >
                <span className={`text-sm ${i === step ? 'text-accent' : 'text-muted'}`}>0{i + 1}</span>
                <span className="text-2xl font-medium tracking-[-0.02em]">{s.title}</span>
              </button>
            ))}
          </div>
          <div id="process-panel" role="tabpanel" className="rounded-[24px] bg-paper-2 p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-10 md:grid-cols-2"
              >
                <p className="text-[24px] leading-[1.4] tracking-[-0.01em] md:text-[28px]">{cur.body}</p>
                <ul className="flex flex-col">
                  {cur.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 border-b border-line py-4 text-[17px]">
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                        <path
                          d="M3.5 8.5l3 3 6-7"
                          fill="none"
                          stroke="#FF6B1A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section aria-labelledby="career-h" className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_280px] flex-col gap-5">
            <Label>Experience</Label>
            <h2 id="career-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Career.
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
                    {j.role} · {j.company}
                  </span>
                  {j.type && <span className="text-sm text-muted">{j.type}</span>}
                  <p className="text-base leading-relaxed text-body">{j.what}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <section aria-labelledby="skills-h" className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_280px] flex-col gap-5">
            <Label>Toolkit</Label>
            <h2 id="skills-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Skills.
            </h2>
          </div>
          <div className="grid min-w-0 flex-[3_1_640px] border-l border-t border-line sm:grid-cols-2">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.04} className="flex flex-col gap-4 border-b border-r border-line p-6">
                <span className="label text-[12px] text-muted">{s.group}</span>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((t) => (
                    <span key={t} className="rounded-full bg-paper-2 px-3 py-1.5 text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="edu-h" className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_280px] flex-col gap-5">
            <Label>Education</Label>
            <h2 id="edu-h" className="text-[clamp(34px,4vw,56px)] font-[450] leading-[1.05] tracking-[-0.03em]">
              Learning.
            </h2>
          </div>
          <ul className="min-w-0 flex-[3_1_640px]">
            {education.map((e) => (
              <Reveal as="li" key={e.title} className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line py-7">
                <span className="text-xl font-medium">
                  {e.title} <span className="text-body">· {e.where}</span>
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
