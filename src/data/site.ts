// All site content lives here. Edit this file to update text, projects and links.

export const profile = {
  name: 'Emmanuel Anyigor',
  short: 'ea10',
  handle: 'EA10-lite',
  /** The live site address, used for canonical links, the sitemap and share previews. */
  url: 'https://ea10.vercel.app',
  role: 'Frontend & Mobile Engineer',
  location: 'Lagos, Nigeria',
  timezone: 'GMT+1',
  email: 'emanuelanyigor@gmail.com',
  github: 'https://github.com/EA10-lite',
  linkedin: 'https://www.linkedin.com/in/emmanuel-anyigor-a61287180/',
  x: 'https://x.com/anyigoremmanue4',
  xHandle: '@anyigoremmanue4',
  cv: 'Emmanuel_Anyigor_CV.pdf',
  available: true,
  intro:
    "I'm Emmanuel Anyigor. For four years I've built React Native apps, React dashboards and product sites for banks, fintechs, travel and consumer teams, and seen them through to release.",
}

export const companies = ['Materia Technica', 'TEGO', 'LOTUS Bank', 'EcoHotels', 'Orvalon Digital', 'Coralstone']

export const stats = [
  { value: 4, suffix: '+', label: 'years in production' },
  { value: 6, suffix: '', label: 'companies and clients' },
  { value: 3, suffix: '', label: 'platforms: iOS, Android, web' },
  { value: 4, suffix: '', label: 'industries served' },
]

export type Palette = {
  /** Card background behind the screens, and the text colour that sits on it. */
  bg: string
  fg: string
  screen: string
  ink: string
  accent: string
  block: string
}

export type CaseSection = {
  brief: string[]
  built: { title: string; body: string }[]
  problem: { title: string; challenge: string; approach: string; outcome: string }
  results: { value: string; label: string; placeholder?: boolean }[]
}

export type Project = {
  slug: string
  name: string
  kind: 'mobile' | 'web'
  role: string
  year: string
  timeline: string
  platforms: string
  stack: string[]
  tags: string[]
  line: string
  headline: string
  summary: string
  palette: Palette
  /** Real screens captured from the app's code (sample data), in public/screens. */
  screens: { phones: string[]; desktop?: string }
  /** Looping screen recordings in public/videos (sample data), for the main phone and the desktop view. */
  video: { phone?: string; desktop?: string }
  links?: { label: string; href: string }[]
  caseStudy: CaseSection
}

export const projects: Project[] = [
  {
    slug: 'tego',
    name: 'TEGO',
    kind: 'mobile',
    role: 'Mobile Developer (contract), sole engineer',
    year: '2026',
    timeline: 'Apr – Oct 2026 · 6 months',
    platforms: 'iOS · Android · Web',
    stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'WebSockets', 'Cloudinary', 'EAS Build'],
    tags: ['Mobile app', 'Admin', 'Store release'],
    line: 'A service booking app, its admin dashboard and website, released on Google Play and the App Store.',
    headline: 'A booking platform built end to end by one engineer',
    summary:
      'TEGO needed an app for customers, tools for its team and a website for the public. I built all three and took the app through Google Play and App Store release.',
    palette: { bg: '#A9DBFB', fg: '#0A0E11', screen: '#F3F9FE', ink: '#0A0E11', accent: '#33ABF7', block: '#DDEFFC' },
    screens: { phones: ['tego-home', 'tego-providers'], desktop: 'tego-admin' },
    video: { phone: 'tego-app', desktop: 'tego-admin' },
    links: [
      { label: 'Google Play', href: '' },
      { label: 'App Store', href: '' },
    ],
    caseStudy: {
      brief: [
        'Customers needed a simple way to find and book services on their phones. The team needed a dashboard to manage users and operations. And the business needed a public website with the policies the app stores require.',
        'There was one engineer for all of it, so every decision had to keep the three surfaces consistent and easy to maintain.',
      ],
      built: [
        {
          title: 'Mobile app',
          body: 'A cross-platform booking app in React Native, Expo and TypeScript. It talks to REST APIs and real-time socket services, keeps state in Zustand and handles image uploads through Cloudinary.',
        },
        {
          title: 'Admin dashboard',
          body: 'A web dashboard for managing users and operations. It reads the same data as the app, so the team and customers always see the same state.',
        },
        {
          title: 'Public website',
          body: 'Home, About, FAQ and Privacy Policy pages in React, including the account-deletion help that both stores ask for.',
        },
        {
          title: 'Release',
          body: 'EAS build profiles, production Android App Bundles and the submission workflow for Google Play and the App Store.',
        },
      ],
      problem: {
        title: 'Google Play rejected a release over photo permissions',
        challenge:
          'The app asked for broad photo and video access, which Google Play now restricts for apps targeting Android 13 and above.',
        approach:
          'I traced every place the app used media, moved uploads to the Android system photo picker and removed the permissions from every build.',
        outcome: 'People choose photos without opening up their whole gallery, and the update could go back through review.',
      },
      results: [
        { value: '3', label: 'products: app, dashboard and website' },
        { value: '2', label: 'app stores: Google Play and the App Store' },
        { value: '6', label: 'months from start to release' },
        { value: '—', label: 'Add downloads, bookings or rating', placeholder: true },
      ],
    },
  },
  {
    slug: 'munkai',
    name: 'Munkai',
    kind: 'mobile',
    role: 'Mobile engineer',
    year: '2026',
    timeline: '2026',
    platforms: 'iOS · Android',
    stack: ['React Native', 'Expo Router', 'TypeScript', 'Zustand', 'StyleSheet theming'],
    tags: ['Mobile app', 'Web to native'],
    line: 'A reading and creator platform rebuilt as a native app, with reader, wallet and Creator Studio.',
    headline: 'Taking a reading and creator platform from web to native',
    summary:
      'Munkai already had a web platform for reading and publishing stories. I rebuilt it as a native app, screen by screen, matching its design system on iOS and Android.',
    palette: { bg: '#141A44', fg: '#FFFFFF', screen: '#0B1033', ink: '#E9EEFF', accent: '#8FD3FF', block: '#1C2456' },
    screens: { phones: ['munkai-home', 'munkai-publication', 'munkai-reader', 'munkai-studio'] },
    video: { phone: 'munkai' },
    caseStudy: {
      brief: [
        'The web app was the source of truth for design, features and flows. The goal was a native app that felt like Munkai, not a wrapped website.',
        'An earlier mobile attempt was scrapped, so the new app started from a clean Expo project with no NativeWind.',
      ],
      built: [
        {
          title: 'Reading experience',
          body: 'Home, Explore, Library, publication pages, a chapter reader with comments, search and notifications, plus offline reading.',
        },
        {
          title: 'Accounts and wallet',
          body: 'Sign-up in steps, login, password reset and account restore, a profile with referrals, and a wallet with history and transfers.',
        },
        {
          title: 'Creator Studio',
          body: 'Tools for creators to manage publications, write and reorder chapters, and publish from their phone.',
        },
        {
          title: 'Design system',
          body: 'A themed StyleSheet layer with dark as the default and a light mode, so every screen pulls colour and type from one place.',
        },
      ],
      problem: {
        title: 'A white flash between the splash screen and Home',
        challenge:
          'On launch, a white frame flashed between the animated splash and the first screen, which broke the dark, polished first impression.',
        approach:
          'I recorded the launch frame by frame, traced it to the navigation layer using its default white background, and gave navigation the app’s own theme colours.',
        outcome: 'The launch now goes straight from splash to Home with no white frames, in both dark and light mode.',
      },
      results: [
        { value: '20+', label: 'screens rebuilt natively' },
        { value: '2', label: 'themes: dark default and light' },
        { value: '1', label: 'shared design-token layer' },
        { value: '—', label: 'Add launch date or store links', placeholder: true },
      ],
    },
  },
  {
    slug: 'loveping',
    name: 'LovePing',
    kind: 'mobile',
    role: 'Mobile engineer',
    year: '2026',
    timeline: '2026',
    platforms: 'iOS · Android',
    stack: ['React Native', 'Expo Router', 'TypeScript', 'Zustand', 'Sentry'],
    tags: ['Migration', 'Accessibility'],
    line: 'An app audit and migration off NativeWind, with a tab bar that fits every phone.',
    headline: 'Rebuilding a live app’s foundations without changing how it feels',
    summary:
      'LovePing helps couples send love notes and gift nudges. I audited the whole app, planned App 2.0, and moved it from NativeWind to plain React Native styling while keeping its look.',
    palette: { bg: '#0F3324', fg: '#FFFFFF', screen: '#05231A', ink: '#FFFFFF', accent: '#48D962', block: '#0F3324' },
    screens: { phones: ['loveping-home', 'loveping-messages', 'loveping-gifts'] },
    video: { phone: 'loveping' },
    caseStudy: {
      brief: [
        'The team wanted to drop NativeWind and move to StyleSheet.create without losing any features or changing the experience users knew.',
        'Before touching code, I audited every screen, component, store and dependency, and wrote a migration plan the team could review.',
      ],
      built: [
        {
          title: 'Audit and plan',
          body: 'A full map of routes, 9 Zustand stores, services and components, with risks and a step-by-step migration order.',
        },
        {
          title: 'Screen migration',
          body: 'Messages, Gifts, Search, nudges and Profile moved off NativeWind and checked side by side with the original at phone width.',
        },
        {
          title: 'Bugs fixed on the way',
          body: 'Search that didn’t search, a share flow that only copied, and edit screens that ignored the chosen tone now all work.',
        },
        {
          title: 'Accessibility',
          body: '44pt touch targets, screen-reader roles and labels, and text that still fits with large accessibility sizes.',
        },
      ],
      problem: {
        title: 'A floating tab bar that broke on half the phones',
        challenge:
          'The tab bar left a visible strip when hidden, jumped sideways between tabs, and covered content on phones with a home indicator or Android navigation bar.',
        approach:
          'I measured the bar against real device sizes from 320dp to iPad, made its spacing adapt to the screen, and gave every screen a shared hook for bottom clearance.',
        outcome:
          'The bar now hides fully, keeps a fixed width, never gets stuck hidden, and nothing ends up underneath it on any screen size.',
      },
      results: [
        { value: '29', label: 'files migrated in one batch' },
        { value: '5', label: 'screen sizes checked, 320dp to iPad' },
        { value: '0', label: 'NativeWind left in migrated screens' },
        { value: '—', label: 'Add release or user numbers', placeholder: true },
      ],
    },
  },
  {
    slug: 'kopa-xclusive',
    name: 'Kopa Xclusive',
    kind: 'web',
    role: 'Frontend engineer',
    year: '2026',
    timeline: '2026',
    platforms: 'Web',
    stack: ['React', 'TypeScript', 'Admin tools'],
    tags: ['Fintech', 'Dashboard'],
    line: 'Operations dashboard and landing page work for a buy-now-pay-later platform for corps members.',
    headline: 'Making a credit product clear for corps members and controllable for ops',
    summary:
      'Kopa Xclusive lets NYSC corps members buy from vendors now and repay a month later. I worked on the admin dashboard and designed the public landing page.',
    palette: { bg: '#008751', fg: '#FFFFFF', screen: '#FFFFFF', ink: '#0A0E11', accent: '#008751', block: '#E3F1EA' },
    screens: { phones: [], desktop: 'kopa-dashboard' },
    video: { desktop: 'kopa-dashboard' },
    caseStudy: {
      brief: [
        'Two audiences, two needs: corps members must understand exactly how credit and repayment work, and the operations team needs control over orders, vendors and withdrawals.',
      ],
      built: [
        {
          title: 'Dashboard review',
          body: 'An audit of the admin dashboard with concrete improvements and the missing actions the team needed day to day.',
        },
        {
          title: 'Landing page',
          body: 'Three design directions for the public site, each built around the real product rules rather than vague promises.',
        },
        {
          title: 'Delivery plan',
          body: 'A 30-day plan across web and mobile with priorities, checkpoints and risks.',
        },
      ],
      problem: {
        title: 'Explaining money rules without fine print',
        challenge:
          'Early copy said users “pay when allowance lands”, but Kopa actually debits one month after each purchase. Getting this wrong would erode trust fast.',
        approach:
          'I based every claim on the product rules: repayment a month after purchase, vendor withdrawals from ₦100, and orders held until delivery.',
        outcome: 'Landing page copy that matches how the product really works, in plain language corps members use.',
      },
      results: [
        { value: '3', label: 'landing page directions' },
        { value: '30', label: 'day build plan' },
        { value: '—', label: 'Add launch or usage numbers', placeholder: true },
      ],
    },
  },
]

export const earlierWork = [
  {
    company: 'LOTUS Bank',
    what: 'Internal banking admin dashboard with role-based access and secure sign-in; faster loads through code splitting and memoisation.',
    stack: 'React · TypeScript · Zustand',
    year: '2025 – 26',
  },
  {
    company: 'Orvalon Digital',
    what: 'Frontend of a platform connecting Nigerian talent with businesses; brought in component-driven development and code review.',
    stack: 'Next.js · Tailwind',
    year: '2026',
  },
  {
    company: 'EcoHotels',
    what: 'Hotel search, booking and pricing features for a global booking platform.',
    stack: 'React · Next.js · TypeScript',
    year: '2023 – 25',
  },
  {
    company: 'Coralstone Capital',
    what: 'Led the company website revamp, from new design concepts to a responsive site.',
    stack: 'Next.js · Tailwind',
    year: '2022',
  },
]

export const helps = [
  {
    q: 'Need an app built and released on both stores?',
    a: 'I take React Native apps from the first screen to the App Store and Google Play, including builds, listings and the fixes review asks for.',
    cta: 'Start a mobile project',
    slug: 'tego',
  },
  {
    q: 'Is your dashboard slowing the team down?',
    a: 'I build React and Next.js dashboards with role-based access, fast tables and data that stays in sync with your app.',
    cta: 'Improve my dashboard',
    slug: 'munkai',
  },
  {
    q: 'Inherited a codebase that needs a reset?',
    a: 'I audit first, plan the move screen by screen, then migrate without breaking what users rely on, as I did moving LovePing off NativeWind.',
    cta: 'Plan a migration',
    slug: 'loveping',
  },
]

export const capabilities = [
  {
    name: 'Mobile',
    title: 'Native-feeling apps with React Native and Expo.',
    items: [
      { t: 'App architecture', d: 'Expo Router, typed navigation and state that scales past the first release.' },
      { t: 'Platform polish', d: 'Safe areas, gestures and layouts that fit every phone size.' },
      { t: 'Store release', d: 'EAS builds, listings and fixing what App Store and Play review flag.' },
      { t: 'Migrations', d: 'Moving live apps to new styling or architecture without breaking users.' },
    ],
  },
  {
    name: 'Web',
    title: 'Dashboards and product sites teams rely on.',
    items: [
      { t: 'Admin dashboards', d: 'Role-based access, secure auth and data-heavy tables.' },
      { t: 'Product websites', d: 'Fast, accessible Next.js sites with the policy pages stores require.' },
      { t: 'Performance', d: 'Code splitting and memoisation for faster loads.' },
      { t: 'API integration', d: 'REST and sockets wired so web and mobile always show the same data.' },
    ],
  },
  {
    name: 'Quality',
    title: 'Code the next engineer can pick up.',
    items: [
      { t: 'TypeScript', d: 'Typed end to end, with checks on every change.' },
      { t: 'Components', d: 'Component-driven UI with reuse and code review.' },
      { t: 'Accessibility', d: '44pt targets, labels and contrast on every screen.' },
      { t: 'Monitoring', d: 'Sentry and clear logging so issues are found early.' },
    ],
  },
]

export const jobs = [
  {
    company: 'Materia Technica',
    role: 'Software Engineer',
    type: 'Contract · Remote (Greece)',
    when: 'Jul 2026 – Present',
    current: true,
    what: 'Frontend and full-stack features in React, Next.js and TypeScript. I scope work with the manager and stakeholders, review code and document engineering standards.',
  },
  {
    company: 'TEGO',
    role: 'Mobile Application Developer',
    type: 'Contract',
    when: 'Apr – Oct 2026',
    what: 'A cross-platform service booking app in React Native, Expo and TypeScript with REST and real-time sockets, plus its admin dashboard and website, through store release.',
  },
  {
    company: 'Orvalon Digital',
    role: 'Full-Stack Developer (frontend-heavy)',
    type: '',
    when: 'Jan – Aug 2026',
    what: 'Frontend of a platform connecting Nigerian talent with businesses. Pixel-perfect, accessible pages, component-driven development and code review.',
  },
  {
    company: 'LOTUS Bank',
    role: 'Frontend Developer',
    type: 'Contract',
    when: 'Oct 2025 – Mar 2026',
    what: 'A secure internal banking dashboard with role-based access and real-time data sync; faster loads through code splitting and memoisation.',
  },
  {
    company: 'EcoHotels',
    role: 'Frontend Developer',
    type: '',
    when: 'Nov 2023 – Dec 2025',
    what: 'Hotel search, booking and pricing features for a global booking platform in React, Next.js and TypeScript.',
  },
  {
    company: 'Coralstone Capital',
    role: 'Frontend Web Developer',
    type: 'Contract',
    when: 'Apr – Aug 2022',
    what: 'Led the company website revamp, turning new design concepts into a responsive Next.js and Tailwind site.',
  },
]

export const process = [
  {
    title: 'Understand',
    body: 'I start by reading the existing code, designs and goals, and write down what I found before touching anything.',
    items: ['Audit the codebase and dependencies', 'Map screens, flows and APIs', 'Agree scope and priorities'],
  },
  {
    title: 'Plan',
    body: 'Each screen gets a written plan or mock the team reviews, so surprises show up on paper, not in code.',
    items: ['Screen-by-screen mocks', 'Clear acceptance criteria', 'Risks flagged early'],
  },
  {
    title: 'Build',
    body: 'I ship in small, reviewable steps that match the design, each one type-checked and tested before the next.',
    items: ['TypeScript and lint on every change', 'Component-driven, reusable UI', 'Accessible from the start'],
  },
  {
    title: 'Release',
    body: 'I take it through builds, store listings and review, then stay on to fix what real users find.',
    items: ['EAS builds and submissions', 'Store policy compliance', 'Monitoring with Sentry'],
  },
]

export const skills = [
  { group: 'Mobile', items: ['React Native', 'Expo', 'EAS Build & Submit', 'Google Play Console', 'App Store Connect'] },
  { group: 'Web', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand'] },
  { group: 'Backend & data', items: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'Firebase'] },
  { group: 'Integrations', items: ['REST APIs', 'WebSockets', 'Stripe', 'Cloudinary', 'Sentry'] },
  { group: 'Practice', items: ['Agile & Scrum', 'TDD', 'Code review', 'CI/CD', 'Figma', 'Jira'] },
]

export const education = [
  { title: 'BSc Systems Engineering', where: 'University of Lagos', note: 'In progress' },
  { title: 'JavaScript Algorithms and Data Structures', where: 'freeCodeCamp', note: 'Certificate' },
]
