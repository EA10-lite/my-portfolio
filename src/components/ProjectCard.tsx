import { Link } from 'react-router-dom'
import type { Project } from '../data/site'
import { BrowserShot, PhoneShot } from './mocks'
import { Tag } from './ui'
import { useScaleIn } from './motion'

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

export function ProjectCard({ p, tall = false }: { p: Project; tall?: boolean }) {
  const media = useScaleIn<HTMLDivElement>()
  const [first, second] = p.screens.phones
  return (
    <Link to={`/work/${p.slug}`} className="group flex flex-col gap-5" aria-label={`${p.name}: ${p.line}`}>
      <div
        ref={media}
        className={`relative flex items-end justify-center gap-4 overflow-hidden rounded-[14px] md:rounded-[24px] px-6 pt-16 ${
          tall ? 'h-[440px] md:h-[520px]' : 'h-[380px] md:h-[440px]'
        }`}
        style={{ background: p.palette.bg }}
      >
        <div className="absolute inset-x-5 top-5 z-10 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        {!first && p.screens.desktop ? (
          <BrowserShot
            name={p.screens.desktop}
            video={p.video.desktop}
            alt={`${p.name} dashboard`}
            className={`h-[80%] w-[94%] translate-y-8 transition-transform duration-700 ${ease} group-hover:translate-y-4`}
          />
        ) : (
          <>
            {first && (
              <PhoneShot
                name={first}
                video={p.video.phone}
                alt={`${p.name} app screen`}
                className={`h-[84%] w-[44%] max-w-[200px] transition-transform duration-700 ${ease} group-hover:-translate-y-3`}
              />
            )}
            {second && (
              <PhoneShot
                name={second}
                alt={`${p.name} app screen`}
                className={`hidden h-[70%] w-[44%] max-w-[200px] transition-transform delay-75 duration-700 ${ease} group-hover:-translate-y-5 sm:block`}
              />
            )}
          </>
        )}
        <span className="label absolute bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          ↗
        </span>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 px-1">
        <div className="flex flex-[1_1_300px] flex-col gap-2">
          <span className="text-[28px] font-medium tracking-[-0.025em] md:text-[30px]">{p.name}</span>
          <span className="text-[17px] leading-relaxed text-body">{p.line}</span>
        </div>
        <dl className="flex min-w-[180px] flex-col gap-1.5 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted">Role</dt>
            <dd className="font-medium">{p.role.split(',')[0].replace(' (contract)', '')}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Year</dt>
            <dd className="font-medium">{p.year}</dd>
          </div>
        </dl>
      </div>
    </Link>
  )
}
