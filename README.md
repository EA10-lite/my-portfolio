# Emmanuel Anyigor — Portfolio

A portfolio site built with **React + Vite + TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **GSAP (ScrollTrigger)** and **Lenis** smooth scrolling.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

`PREVIEW=1 npm run build` makes a self-contained build (relative paths and hash routing) that runs from any folder or static host.

## Edit the content

Almost everything lives in **`src/data/site.ts`**:

- `profile`: name, role, email, GitHub, LinkedIn (empty hides the link), CV file name, availability
- `projects`: the four case studies (copy, stack, tags, colours, results). Results with `placeholder: true` show as dashed boxes until you add real numbers.
- `links` on a project: store links. Add the URLs and the buttons appear on the case study.
- `jobs`, `earlierWork`, `skills`, `education`, `capabilities`, `helps`, `process`

The CV download is `public/Emmanuel_Anyigor_CV.pdf`. Replace the file to update it.

## Add real screenshots

The phone and dashboard visuals are drawn in code (`src/components/mocks.tsx`). To use real screenshots, drop images into `public/` and swap a `<Phone />` for an `<img>` in `ProjectCard.tsx` or `CaseStudy.tsx`. The About page has a marked spot for your portrait.

## How the motion works

| Effect | Where |
| --- | --- |
| Smooth scrolling (Lenis on GSAP's ticker) | `src/lib/smooth.tsx` |
| Headline word reveals, fade-ups, count-ups | `src/components/motion.tsx` |
| Parallax and scroll-scaled media (ScrollTrigger) | `useParallax`, `useScaleIn` in `motion.tsx` |
| Orange curtain between pages | `src/components/Layout.tsx` |
| Nav that hides on scroll down, mobile menu | `src/components/Nav.tsx` |

Everything respects **reduced motion**: with that setting on, smooth scrolling and animations are turned off.

## Deploy

**Vercel:** import the repo; framework preset "Vite". `vercel.json` already rewrites every route to `index.html`.

**Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` handles routing.

## Contact form

There's no backend. The form opens the visitor's email app with the subject and message filled in. To receive messages on a server instead, point the form in `src/pages/Contact.tsx` at Formspree or a serverless function.
