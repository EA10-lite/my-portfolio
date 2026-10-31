import { Link, useParams } from 'react-router-dom'
import { posts, type Block } from '../data/posts'
import { profile, projects } from '../data/site'
import { DarkBand } from '../components/ui'
import { Reveal } from '../components/motion'
import { RichText, formatDate } from '../components/RichText'
import { usePageTitle } from '../lib/usePageTitle'
import NotFound from './NotFound'

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case 'h2':
      return <h2 className="pt-8 text-[clamp(26px,2.6vw,34px)] font-[450] leading-[1.15] tracking-[-0.02em]">{b.text}</h2>
    case 'p':
      return (
        <p className="text-[18px] leading-[1.75] text-body md:text-[19px]">
          <RichText text={b.text} />
        </p>
      )
    case 'ul':
      return (
        <ul className="flex flex-col gap-3 pl-1">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3 text-[18px] leading-[1.7] text-body md:text-[19px]">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <RichText text={it} />
              </span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return <blockquote className="border-l-2 border-accent pl-5 text-[20px] leading-[1.6]">{b.text}</blockquote>
    case 'code':
      return (
        <figure className="flex flex-col gap-2">
          <pre className="overflow-x-auto rounded-2xl bg-ink p-5 text-[14px] leading-[1.65] text-[#E6E9EB] md:p-6">
            <code className="font-mono">{b.code}</code>
          </pre>
          {b.caption && <figcaption className="font-mono text-[13px] text-muted">{b.caption}</figcaption>}
        </figure>
      )
  }
}

export default function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  usePageTitle(post?.title ?? 'Post not found', post?.description, !post)
  if (!post) return <NotFound />
  const project = post.project ? projects.find((p) => p.slug === post.project) : undefined
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <DarkBand>
        <div className="container-x flex flex-col gap-8 pb-14 pt-32 md:pb-20 md:pt-40">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-muted-dark">
            <Link to="/blog" className="inline-flex min-h-11 items-center transition-colors hover:text-paper">
              Blog
            </Link>
          </nav>
          <h1 className="max-w-5xl text-[clamp(38px,5.4vw,80px)] font-[450] leading-[1.02] tracking-[-0.035em]">{post.title}</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-soft-dark">{post.description}</p>
          <p className="text-[15px] text-muted-dark">
            {profile.name} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
          </p>
        </div>
      </DarkBand>

      <article className="container-x pt-16 md:pt-24">
        <div className="mx-auto flex max-w-[44rem] flex-col gap-6">
          {post.blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}

          <Reveal className="mt-12 flex flex-col gap-4 border-t border-line pt-10">
            <p className="text-[17px] leading-relaxed text-body">
              Thanks for reading. If your team is planning a migration like this, or needs a React Native app built and shipped, I’d like to hear about it at{' '}
              <a href={`mailto:${profile.email}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                {profile.email}
              </a>
              .
            </p>
            {project && (
              <Link
                to={`/work/${project.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-paper-2 p-6 transition-colors hover:bg-[#ECEEEF]"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-sm text-muted">Case study</span>
                  <span className="text-xl font-medium tracking-[-0.01em]">{project.name}: {project.headline}</span>
                </span>
                <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
            {others.map((o) => (
              <Link key={o.slug} to={`/blog/${o.slug}`} className="text-lg underline decoration-line underline-offset-4 hover:decoration-accent">
                {o.title}
              </Link>
            ))}
          </Reveal>
        </div>
      </article>
    </>
  )
}
