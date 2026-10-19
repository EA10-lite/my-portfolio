import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { earlierWork, projects } from '../data/site'
import { DarkBand } from '../components/ui'
import { Reveal, WordsReveal } from '../components/motion'
import { ProjectCard } from '../components/ProjectCard'
import { usePageTitle } from '../lib/usePageTitle'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
] as const

type Filter = (typeof filters)[number]['id']

export default function Work() {
  usePageTitle('Work', 'Selected work by Emmanuel Anyigor: TEGO, Munkai, Loveping and Kopa Xclusive. Mobile apps, admin dashboards and product websites, from first commit to the stores.')
  const [filter, setFilter] = useState<Filter>('all')
  const shown = projects.filter((p) => filter === 'all' || p.kind === filter)

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-col gap-10 pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <WordsReveal
              immediate
              text="Selected projects and case studies."
              className="max-w-4xl text-[clamp(44px,6.4vw,96px)] font-[450] leading-[0.98] tracking-[-0.035em]"
            />
            <div role="group" aria-label="Filter projects" className="flex rounded-xl border border-line-dark p-1">
              {filters.map((f) => {
                const count = f.id === 'all' ? projects.length : projects.filter((p) => p.kind === f.id).length
                const active = filter === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.id)}
                    className={`label relative min-h-11 rounded-lg px-5 transition-colors ${active ? 'text-ink' : 'text-[#C9CED1] hover:text-paper'}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter"
                        className="absolute inset-0 rounded-lg bg-paper"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">
                      {f.label} <span className={active ? 'text-muted' : 'text-muted-dark'}>{count}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <p className="max-w-2xl text-xl leading-relaxed text-soft-dark">
            Mobile apps, admin dashboards and product websites, with notes on my role, the stack and the problems I solved.
          </p>
        </div>
      </DarkBand>

      <div className="container-x">
        <motion.div layout className="grid gap-x-6 gap-y-14 pt-16 md:pt-24 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <section aria-labelledby="earlier-h" className="flex flex-col gap-8 pt-24 md:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-5">
              <h2 id="earlier-h" className="text-[clamp(32px,3.6vw,48px)] font-[450] leading-[1.05] tracking-[-0.03em]">
                Client and in-house projects.
              </h2>
            </div>
            <span className="text-[15px] text-muted">Details available on request</span>
          </div>
          <ul>
            {earlierWork.map((e, i) => (
              <Reveal
                as="li"
                key={e.company}
                delay={i * 0.05}
                className="group grid gap-x-8 gap-y-2 border-t border-line py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_auto]"
              >
                <span className="text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent">{e.company}</span>
                <span className="text-base leading-relaxed text-body">{e.what}</span>
                <span className="text-sm text-muted">{e.stack}</span>
                <span className="text-sm text-muted md:text-right">{e.year}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
