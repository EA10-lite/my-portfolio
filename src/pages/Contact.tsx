import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/site'
import { CopyEmail, DarkBand, Label, LiveDot, cvHref } from '../components/ui'
import { Reveal, WordsReveal } from '../components/motion'
import { usePageTitle } from '../lib/usePageTitle'

const topics = [
  {
    id: 'role',
    label: 'Full-time role',
    sub: 'Join your team',
    hint: 'Tell me about the role and team, and link the job post if you have one.',
  },
  { id: 'contract', label: 'Contract', sub: 'Defined scope', hint: 'Share the scope, timeline and rough budget.' },
  { id: 'app', label: 'Build an app', sub: 'New product', hint: 'What should it do, and who is it for?' },
  { id: 'other', label: 'Something else', sub: 'Questions, ideas', hint: "What's on your mind?" },
]

const field =
  'min-h-[52px] w-full rounded-lg border border-line-dark bg-ink-2 px-4 text-base text-paper placeholder:text-[#6B7479] transition-colors focus:border-accent focus:outline-none'

export default function Contact() {
  usePageTitle('Contact', 'Get in touch with Emmanuel Anyigor about a mobile app, dashboard or product website. Based in Lagos (GMT+1), working with teams anywhere.')
  const [topic, setTopic] = useState(topics[0].id)
  const [sent, setSent] = useState(false)
  const cur = topics.find((t) => t.id === topic)!

  // No backend needed: the form opens the visitor's email app with everything filled in.
  // To collect messages on a server instead, point the form at Formspree or a serverless function.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = `${cur.label} — ${data.get('name') || 'New enquiry'}${data.get('company') ? ` (${data.get('company')})` : ''}`
    const body = [
      data.get('message'),
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      data.get('company') ? `Company: ${data.get('company')}` : '',
      `Start: ${data.get('start')}`,
    ]
      .filter((l) => l !== '')
      .join('\n')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <DarkBand>
      <div className="container-x flex flex-wrap items-start gap-16 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-8">
          <WordsReveal
            immediate
            text="Let's work together."
            className="text-[clamp(44px,6vw,96px)] font-[450] leading-[0.98] tracking-[-0.035em]"
          />
          <Reveal delay={0.3}>
            <p className="max-w-md text-lg leading-relaxed text-soft-dark">
              Hiring for a mobile or frontend role, or need an app built? Send a note and I'll reply within two working days.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="flex flex-col gap-3">
            <Label dark>
              Prefer email?
            </Label>
            <CopyEmail />
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="border-t border-line-dark">
              {[
                { label: 'GitHub', href: profile.github, note: profile.handle },
                { label: 'X', href: profile.x, note: profile.xHandle },
                ...(profile.linkedin ? [{ label: 'LinkedIn', href: profile.linkedin, note: 'Profile' }] : []),
                { label: 'CV', href: cvHref, note: 'PDF' },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    download={l.label === 'CV' || undefined}
                    className="group flex min-h-16 items-center justify-between border-b border-line-dark text-lg transition-colors hover:text-accent"
                  >
                    <span>
                      {l.label} <span className="text-muted-dark">{l.note}</span>
                    </span>
                    <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <span className="inline-flex items-center gap-2.5 text-[15px] text-soft-dark">
            <LiveDot /> {profile.location} ({profile.timezone}), remote or on-site
          </span>
        </div>

        <Reveal delay={0.2} className="min-w-0 flex-[1_1_540px]">
          <form onSubmit={onSubmit} className="anime-card flex flex-col gap-6 rounded-[14px] md:rounded-[24px] border border-line-dark bg-ink-2 p-6 md:p-10">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-[15px] font-semibold">What's this about?</legend>
              <div className="grid grid-cols-2 gap-2.5">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={t.id === topic}
                    onClick={() => setTopic(t.id)}
                    className={`relative flex min-h-[76px] flex-col items-start justify-center gap-1 rounded-xl border px-4 text-left transition-colors ${
                      t.id === topic ? 'border-accent' : 'border-line-dark hover:border-[#3A4347]'
                    }`}
                  >
                    {t.id === topic && (
                      <motion.span
                        layoutId="topic-bg"
                        className="absolute inset-0 rounded-xl bg-accent/10"
                        transition={{ duration: 0.35 }}
                      />
                    )}
                    <span className="relative text-[15px] font-semibold">{t.label}</span>
                    <span className="relative text-[13px] text-muted-dark">{t.sub}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Full name
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Work email
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold">
                <span>
                  Company <span className="font-normal text-muted-dark">(optional)</span>
                </span>
                <input name="company" autoComplete="organization" className={field} />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Start date
                <select name="start" className={field} defaultValue="As soon as possible">
                  <option>As soon as possible</option>
                  <option>Within a month</option>
                  <option>In 1–3 months</option>
                  <option>Not sure yet</option>
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Message
              <textarea name="message" required rows={5} placeholder={cur.hint} className={`${field} resize-y py-3 leading-relaxed`} />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <span className="text-[13px] text-muted-dark" aria-live="polite">
                {sent ? 'Your email app should open with the message ready to send.' : 'Opens your email app with the message filled in.'}
              </span>
              <button
                type="submit"
                className="label group inline-flex min-h-[52px] items-center gap-3 rounded-lg bg-accent px-7 text-ink transition-colors hover:bg-accent-hover"
              >
                Send message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </DarkBand>
  )
}
