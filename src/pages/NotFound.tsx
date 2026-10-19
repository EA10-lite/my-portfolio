import { ButtonLink, DarkBand, Label } from '../components/ui'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <DarkBand>
      <div className="container-x flex min-h-[70vh] flex-col justify-center gap-8 pb-20 pt-32">
        <Label dark>404</Label>
        <h1 className="max-w-3xl text-[clamp(44px,6vw,88px)] font-[450] leading-[1] tracking-[-0.035em]">
          This page didn't ship. <span className="text-accent">Yet.</span>
        </h1>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/">Back home</ButtonLink>
          <ButtonLink to="/work" variant="outline-dark">
            See the work
          </ButtonLink>
        </div>
      </div>
    </DarkBand>
  )
}
