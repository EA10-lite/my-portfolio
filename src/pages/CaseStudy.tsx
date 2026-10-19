import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/site'
import { DarkBand, Label, Tag } from '../components/ui'
import { Reveal, WordsReveal, useParallax, useScaleIn } from '../components/motion'
import { Dashboard, Phone } from '../components/mocks'
import { useScrollTo } from '../lib/smooth'
import { usePageTitle } from '../lib/usePageTitle'
import NotFound from './NotFound'

const sections = [
  { id: 'brief', label: 'The brief' },
  { id: 'built', label: 'What I built' },
  { id: 'problem', label: 'A hard problem' },
  { id: 'results', label: 'Results' },
]

export default function CaseStudy() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const p = projects[index]
  usePageTitle(p?.name)
  const media = useScaleIn<HTMLDivElement>()
  const phoneA = useParallax<HTMLDivElement>(90)
  const phoneB = useParallax<HTMLDivElement>(150)
  const [active, setActive] = useState('brief')
  const scrollTo = useScrollTo()

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: '-40% 0px -55% 0px',
    })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [slug])

  if (!p) return <NotFound />
  const next = projects[(index + 1) % projects.length]
  const cs = p.caseStudy
  const storeLinks = (p.links ?? []).filter((l) => l.href)

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-col gap-8 pb-12 pt-32 md:pt-40">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-muted-dark">
            <Link to="/work" className="inline-flex min-h-11 items-center transition-colors hover:text-paper">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-paper">{p.name}</span>
          </nav>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Tag key={t} light={false}>
                {t}
              </Tag>
            ))}
          </div>
          <WordsReveal
            immediate
            text={p.headline}
            className="max-w-5xl text-[clamp(40px,6vw,88px)] font-[450] leading-[1] tracking-[-0.035em]"
          />
          <Reveal delay={0.4}>
            <p className="max-w-3xl text-xl leading-relaxed text-soft-dark md:text-[22px]">{p.summary}</p>
          </Reveal>
        </div>

        <div className="container-x pb-12 md:pb-16">
          <div
            ref={media}
            role="img"
            aria-label={`${p.name} screens`}
            className="relative h-[440px] overflow-hidden rounded-[24px] md:h-[620px]"
            style={{ background: p.palette.bg }}
          >
            {p.kind === 'web' ? (
              <div className="absolute inset-x-[6%] bottom-0 top-14">
                <Dashboard title={p.name} className="h-full rounded-b-none" />
              </div>
            ) : (
              <>
                {p.slug === 'tego' ? (
                  <div className="absolute left-[34%] right-[-4%] top-16 hidden h-[420px] md:block">
                    <Dashboard className="h-full" />
                  </div>
                ) : (
                  <div className="absolute right-[8%] top-16 hidden h-[460px] w-[230px] md:block">
                    <Phone p={p.palette} cropped={false} className="h-full w-full" />
                  </div>
                )}
                <div ref={phoneA} className="absolute bottom-[-40px] left-[7%] h-[440px] w-[220px]">
                  <Phone p={p.palette} cropped={false} className="h-full w-full" />
                </div>
                <div ref={phoneB} className="absolute bottom-[-90px] left-[calc(7%+190px)] hidden h-[420px] w-[205px] sm:block">
                  <Phone p={p.palette} variant="grid" cropped={false} className="h-full w-full" />
                </div>
              </>
            )}
          </div>

          <dl className="mt-6 grid overflow-hidden rounded-[20px] border border-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Role', p.role],
              ['Timeline', p.timeline],
              ['Platforms', p.platforms],
              ['Tech stack', p.stack.join(', ')],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`flex flex-col gap-1.5 px-7 py-6 ${i > 0 ? 'border-t border-line-dark sm:border-t-0 sm:border-l' : ''}`}
              >
                <dt className="label text-[12px] text-muted-dark">{k}</dt>
                <dd className="text-[17px] font-medium leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </DarkBand>

      <div className="container-x flex flex-wrap items-start gap-16 pt-20 md:pt-28">
        <aside className="sticky top-28 hidden flex-[0_1_220px] flex-col gap-1 lg:flex">
          <Label className="pb-3 text-[12px]">On this page</Label>
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`flex min-h-10 items-center border-l-2 pl-4 text-left text-[15px] transition-colors ${
                active === s.id ? 'border-accent font-semibold text-ink' : 'border-line text-body hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </aside>

        <article className="flex min-w-0 flex-[1_1_640px] flex-col gap-24">
          <section id="brief" className="flex scroll-mt-28 flex-col gap-5">
            <Label>01 — The brief</Label>
            <Reveal className="flex flex-col gap-5">
              {cs.brief.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0 ? 'text-[26px] leading-[1.35] tracking-[-0.015em] md:text-[30px]' : 'text-lg leading-relaxed text-body'
                  }
                >
                  {para}
                </p>
              ))}
            </Reveal>
          </section>

          <section id="built" className="flex scroll-mt-28 flex-col gap-6">
            <Label>02 — What I built</Label>
            <h2 className="text-[clamp(30px,3.4vw,44px)] font-[450] leading-[1.1] tracking-[-0.03em]">
              Each part, and the decisions behind it.
            </h2>
            <ul className="border-b border-line">
              {cs.built.map((b, i) => (
                <Reveal
                  as="li"
                  key={b.title}
                  delay={i * 0.05}
                  className="grid gap-x-10 gap-y-2 border-t border-line py-7 md:grid-cols-[220px_minmax(0,1fr)]"
                >
                  <span className="text-xl font-medium">{b.title}</span>
                  <span className="text-[17px] leading-relaxed text-body">{b.body}</span>
                </Reveal>
              ))}
            </ul>
          </section>

          <section id="problem" className="flex scroll-mt-28 flex-col gap-7 rounded-[24px] bg-ink p-8 text-paper md:p-12">
            <Label dark>03 — A hard problem</Label>
            <h2 className="text-[clamp(28px,3vw,40px)] font-[450] leading-[1.15] tracking-[-0.025em]">{cs.problem.title}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {(
                [
                  ['Challenge', cs.problem.challenge],
                  ['Approach', cs.problem.approach],
                  ['Outcome', cs.problem.outcome],
                ] as const
              ).map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.08} className="flex flex-col gap-3 border-t border-line-dark pt-5">
                  <span className="label text-[12px] text-accent">{k}</span>
                  <p className="text-base leading-relaxed text-[#D5DADC]">{v}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="results" className="flex scroll-mt-28 flex-col gap-6">
            <Label>04 — Results</Label>
            <h2 className="text-[clamp(30px,3.4vw,44px)] font-[450] leading-[1.1] tracking-[-0.03em]">What shipped.</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cs.results.map((r, i) => (
                <Reveal
                  key={r.label}
                  delay={i * 0.06}
                  className={`flex flex-col gap-2 rounded-2xl p-6 ${r.placeholder ? 'border border-dashed border-[#C9CED1]' : 'bg-paper-2'}`}
                >
                  <span className={`text-[44px] font-[450] leading-none tracking-[-0.03em] ${r.placeholder ? 'text-[#9AA2A6]' : ''}`}>
                    {r.value}
                  </span>
                  <span className={`text-[15px] leading-snug ${r.placeholder ? 'text-muted' : 'text-body'}`}>{r.label}</span>
                </Reveal>
              ))}
            </div>
            {storeLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {storeLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label inline-flex min-h-[52px] items-center rounded-lg bg-ink px-6 text-paper"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </section>
        </article>
      </div>

      <div className="container-x pt-24 md:pt-32">
        <Link
          to={`/work/${next.slug}`}
          className="group flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[24px] p-8 md:p-12"
          style={{ background: next.palette.bg, color: next.kind === 'web' || next.slug === 'loveping' ? '#0A0E11' : '#FFFFFF' }}
        >
          <div className="flex flex-col gap-3">
            <span className="label opacity-80">Next case study</span>
            <span className="text-[clamp(40px,5vw,72px)] font-[450] leading-none tracking-[-0.035em]">{next.name}</span>
            <span className="max-w-xl text-lg opacity-85">{next.line}</span>
          </div>
          <span
            aria-hidden="true"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-paper text-2xl text-ink transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-45"
          >
            →
          </span>
        </Link>
      </div>
    </>
  )
}
