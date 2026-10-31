import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/site'
import { posts } from '../data/posts'
import { DarkBand, Tag } from '../components/ui'
import { Reveal, WordsReveal, useParallax, useScaleIn } from '../components/motion'
import { BrowserShot, PhoneShot } from '../components/mocks'
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
  usePageTitle(p ? `${p.name} case study` : 'Case study', p ? `${p.name}: ${p.line}` : undefined)
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
  const phones = p.screens.phones
  const storeLinks = (p.links ?? []).filter((l) => l.href)
  const related = posts.filter((x) => x.project === p.slug)

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
          <figure className="m-0 flex flex-col gap-3">
            <div ref={media} className="anime-card relative h-[460px] overflow-hidden rounded-[14px] md:rounded-[24px] md:h-[640px]" style={{ background: p.palette.bg }}>
              {phones.length === 0 && p.screens.desktop ? (
                <div className="absolute inset-x-[5%] bottom-[-40px] top-12">
                  <BrowserShot name={p.screens.desktop} video={p.video.desktop} alt={`${p.name} dashboard`} eager className="h-full" />
                </div>
              ) : p.screens.desktop ? (
                <>
                  <div className="absolute left-[30%] right-[-10%] top-14 hidden h-[460px] md:block">
                    <BrowserShot name={p.screens.desktop} video={p.video.desktop} alt={`${p.name} admin dashboard`} eager className="h-full" />
                  </div>
                  <div ref={phoneA} className="absolute bottom-[-40px] left-[6%] h-[460px] w-[214px]">
                    <PhoneShot name={phones[0]} video={p.video.phone} alt={`${p.name} app screen`} eager cropped={false} className="h-full w-full" />
                  </div>
                  {phones[1] && (
                    <div ref={phoneB} className="absolute bottom-[-110px] left-[calc(6%+190px)] hidden h-[440px] w-[204px] sm:block">
                      <PhoneShot name={phones[1]} alt={`${p.name} app screen`} eager cropped={false} className="h-full w-full" />
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-x-0 bottom-0 top-12 flex items-end justify-center gap-4 px-4 md:gap-8">
                  {phones[1] && (
                    <div ref={phoneB} className="hidden h-[440px] w-[204px] translate-y-16 md:block">
                      <PhoneShot name={phones[1]} alt={`${p.name} app screen`} eager cropped={false} className="h-full w-full" />
                    </div>
                  )}
                  <div ref={phoneA} className="h-[470px] w-[218px] translate-y-8">
                    <PhoneShot name={phones[0]} video={p.video.phone} alt={`${p.name} app screen`} eager cropped={false} className="h-full w-full" />
                  </div>
                  {phones[2] && (
                    <div className="hidden h-[440px] w-[204px] translate-y-16 md:block">
                      <PhoneShot name={phones[2]} alt={`${p.name} app screen`} eager cropped={false} className="h-full w-full" />
                    </div>
                  )}
                </div>
              )}
            </div>
            <figcaption className="text-sm text-muted-dark">{p.slug === 'munkai' ? `Real screens from the ${p.name} app.` : `Real screens from the ${p.name} codebase, shown with sample data.`}</figcaption>
          </figure>

          <dl className="mt-6 grid overflow-hidden rounded-[12px] md:rounded-[20px] border border-line-dark sm:grid-cols-2 lg:grid-cols-4">
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
                <dt className="text-[14px] text-muted-dark">{k}</dt>
                <dd className="text-[17px] font-medium leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </DarkBand>

      <div className="container-x flex flex-wrap items-start gap-16 pt-20 md:pt-28">
        <aside className="sticky top-28 hidden flex-[0_1_220px] flex-col gap-1 lg:flex">
          <span className="pb-3 text-[15px] text-muted">On this page</span>
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
            <h2 className="text-[clamp(30px,3.4vw,44px)] font-[450] leading-[1.1] tracking-[-0.03em]">The brief</h2>
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

          {phones.length > 1 && (
            <section aria-labelledby="screens-h" className="flex flex-col gap-6">
              <h2 id="screens-h" className="text-[clamp(30px,3.4vw,44px)] font-[450] leading-[1.1] tracking-[-0.03em]">
                Inside the app.
              </h2>
              <div className="-mx-5 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0" data-lenis-prevent>
                <ul className="flex w-max gap-4 md:w-auto md:grid md:grid-cols-[repeat(auto-fill,minmax(180px,220px))]">
                  {phones.map((name) => (
                    <Reveal as="li" key={name} className="w-[200px] md:w-auto">
                      <div className="anime-card rounded-[14px] md:rounded-[24px] p-3" style={{ background: p.palette.bg }}>
                        <PhoneShot name={name} alt={`${p.name}: ${name.split('-').slice(1).join(' ')} screen`} cropped={false} className="aspect-[390/844] w-full" />
                      </div>
                      <span className="mt-3 block text-sm capitalize text-muted">{name.split('-').slice(1).join(' ')}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section id="problem" className="band-dark flex scroll-mt-28 flex-col gap-7 rounded-[14px] md:rounded-[24px] bg-ink p-8 text-paper md:p-12">
            <span className="text-[16px] text-muted-dark">The hardest problem</span>
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
                  <span className="text-[16px] font-semibold text-accent">{k}</span>
                  <p className="text-base leading-relaxed text-[#D5DADC]">{v}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="results" className="flex scroll-mt-28 flex-col gap-6">
            <h2 className="text-[clamp(30px,3.4vw,44px)] font-[450] leading-[1.1] tracking-[-0.03em]">What shipped.</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cs.results.map((r, i) => (
                <Reveal
                  key={r.label}
                  delay={i * 0.06}
                  className={`anime-card flex flex-col gap-2 rounded-2xl p-6 ${r.placeholder ? 'border border-dashed border-[#C9CED1]' : 'bg-paper-2'}`}
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
            {related.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-line p-6 transition-colors hover:border-ink"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-sm text-muted">From the blog · {post.readMinutes} min read</span>
                  <span className="text-xl font-medium tracking-[-0.01em]">{post.title}</span>
                </span>
                <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </section>
        </article>
      </div>

      <div className="container-x pt-24 md:pt-32">
        <Link
          to={`/work/${next.slug}`}
          className="anime-card group flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[14px] md:rounded-[24px] p-8 md:p-12"
          style={{ background: next.palette.bg, color: next.palette.fg }}
        >
          <div className="flex flex-col gap-3">
            <span className="label opacity-80">Next case study</span>
            <span className="text-[clamp(40px,5vw,72px)] font-[450] leading-none tracking-[-0.035em]">{next.name}</span>
            <span className="max-w-xl text-lg opacity-85">{next.line}</span>
          </div>
          <span
            aria-hidden="true"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-paper text-2xl text-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        </Link>
      </div>
    </>
  )
}
