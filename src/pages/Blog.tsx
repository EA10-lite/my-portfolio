import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { DarkBand } from '../components/ui'
import { Reveal, WordsReveal } from '../components/motion'
import { formatDate } from '../components/RichText'
import { usePageTitle } from '../lib/usePageTitle'

export default function Blog() {
  usePageTitle('Blog', 'Notes by Emmanuel Anyigor on building React Native apps and React products: migrations, decisions and what I learned shipping them.')
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-col gap-10 pb-16 pt-32 md:pb-20 md:pt-40">
          <WordsReveal
            immediate
            text="Notes from building and shipping."
            className="max-w-4xl text-[clamp(44px,6.4vw,96px)] font-[450] leading-[0.98] tracking-[-0.035em]"
          />
          <p className="max-w-2xl text-xl leading-relaxed text-soft-dark">
            What I learned building React Native apps and React products: the decisions, the trade-offs and what I’d do again.
          </p>
        </div>
      </DarkBand>

      <div className="container-x pt-16 md:pt-24">
        <ul>
          {sorted.map((p) => (
            <Reveal as="li" key={p.slug} className="border-t border-line">
              <Link
                to={`/blog/${p.slug}`}
                className="group grid gap-x-8 gap-y-3 py-10 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-start"
              >
                <span className="text-sm text-muted">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span className="block">{p.readMinutes} min read</span>
                </span>
                <span className="flex flex-col gap-3">
                  <span className="text-[clamp(24px,2.6vw,36px)] font-[450] leading-[1.12] tracking-[-0.02em] transition-colors group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="max-w-3xl text-base leading-relaxed text-body">{p.description}</span>
                  <span className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-paper-2 px-3 py-1.5 text-sm">
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
                <span aria-hidden="true" className="hidden text-2xl text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent md:block">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  )
}
