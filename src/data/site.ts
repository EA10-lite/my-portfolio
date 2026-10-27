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
        title: 'Forms that disappeared behind the keyboard',
        challenge:
          'Reviews, support messages and service prices are typed into bottom sheets. On iOS the sheet ignored the keyboard and covered the field you were typing in. On Android the sheet and a keyboard-avoiding wrapper both reacted at once, so the screen flickered in a loop. Each fix on one platform broke the other.',
        approach:
          'I stopped treating it as one problem. On iOS these forms now open in a native modal with KeyboardAvoidingView. On Android the bottom sheet alone handles the keyboard, with no nested wrappers. I proved the pattern on one screen, then applied it to every form sheet in the app.',
        outcome:
          'The field you are typing in stays visible on both platforms, the flicker is gone, and new forms follow one pattern instead of another round of fixes.',
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
    slug: 'wearable',
    name: 'Wearable',
    kind: 'web',
    role: 'Full-stack developer, sole engineer',
    year: '2026',
    timeline: 'Jun – Sep 2026',
    platforms: 'Web, admin and API',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Node.js', 'Express', 'MongoDB', 'Paystack', 'Cloudinary'],
    tags: ['E-commerce', 'Full-stack', 'Live'],
    line: 'A Nigerian fashion store: the shop, the admin that runs it and the API behind both, live at wearable.ng.',
    headline: 'An online fashion store, from the shop window to the stock room',
    summary:
      'Wearable sells men’s and women’s clothing, footwear and accessories across Nigeria. I built the storefront, the admin dashboard and the backend API, with Paystack payments and delivery fees down to the local government area.',
    palette: { bg: '#E7E3DC', fg: '#0A0E11', screen: '#FFFFFF', ink: '#0A0E11', accent: '#0A0E11', block: '#F2F2F2' },
    screens: { phones: ['wearable-home', 'wearable-product', 'wearable-category'], desktop: 'wearable-admin' },
    video: { phone: 'wearable-store-m', desktop: 'wearable-admin' },
    links: [{ label: 'Visit wearable.ng', href: 'https://wearable.ng' }],
    caseStudy: {
      brief: [
        'Wearable needed a place to sell clothing online in Nigeria: a shop customers enjoy browsing, a back office the team can run without a developer, and payments and delivery that work anywhere in the country.',
        'I was the only engineer, so I designed the data model once and built the storefront, the admin and the API on top of it.',
      ],
      built: [
        {
          title: 'Storefront',
          body: 'A fast React and TypeScript shop with categories, search, product pages with sizes and colours, a cart that survives a refresh, and checkout with Paystack. Customers sign in with a one-time code sent to their email, so there is no password to forget.',
        },
        {
          title: 'Admin dashboard',
          body: 'Sales, order trends and category performance at a glance. The team adds products with photos, sizes and stock, follows each order from payment to delivery, manages customers and sets delivery fees.',
        },
        {
          title: 'Backend API',
          body: 'Node.js, Express and MongoDB with JWT auth, Cloudinary image uploads and email codes. Paystack webhooks are checked against their signature before an order is marked as paid. Helmet, rate limits, input validation and Swagger docs are built in.',
        },
        {
          title: 'Search and sharing',
          body: 'Per-page titles, descriptions and share tags, lazy-loaded pages, and a WhatsApp button so shoppers can ask a question before they buy.',
        },
      ],
      problem: {
        title: 'Delivery fees that depend on exactly where you live',
        challenge:
          'Delivering to Lekki doesn’t cost the same as delivering to Kano, and the team needed to change prices without asking a developer. The fee also had to be right before the customer paid, not fixed by hand afterwards.',
        approach:
          'I gave the admin a delivery-fee table by state, with optional prices for individual local government areas. At checkout the server looks for the exact area first, then the state, then a default, and stops the order if no delivery option exists.',
        outcome:
          'Customers see the real delivery fee before they pay, and the team updates prices in the admin in seconds.',
      },
      results: [
        { value: '3', label: 'parts built: storefront, admin and API' },
        { value: '37', label: 'states and the FCT covered at checkout, down to local area' },
        { value: 'Live', label: 'taking orders at wearable.ng' },
        { value: '—', label: 'Add orders, revenue or customers', placeholder: true },
      ],
    },
  },
  {
    slug: '360comms',
    name: '360Comms',
    kind: 'web',
    role: 'Frontend developer',
    year: '2025',
    timeline: 'Nov 2025, redesigned Oct 2026',
    platforms: 'Marketing website',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router'],
    tags: ['Marketing site', 'Enterprise', 'Live'],
    line: 'The website for an enterprise communications platform used by banks, regulators and governments across Africa, live at 360comms.network.',
    headline: 'A clearer front door for enterprise communications',
    summary:
      '360Comms sells voice, video, messaging and conferencing to organisations that can’t afford a dropped call. I built the website: home, features, solutions, help centre, blog, downloads and search. Later I redesigned it so the story reads on any screen.',
    palette: { bg: '#155E8E', fg: '#FFFFFF', screen: '#FFFFFF', ink: '#0B2A43', accent: '#00F6FF', block: '#F1FAFF' },
    screens: { phones: ['360comms-home', '360comms-sectors', '360comms-differentiators'], desktop: '360comms-desktop' },
    video: { phone: '360comms-m', desktop: '360comms-site' },
    links: [{ label: 'Visit 360comms.network', href: 'https://360comms.network' }],
    caseStudy: {
      brief: [
        '360Comms needed a website that explains a broad platform (PBX systems, secure messaging, command and control) to buyers in government, telecoms and finance, and gets them to download the apps.',
        'I built the whole site in React and TypeScript, from the page layouts to search, the help centre and the download page for mobile, desktop and the web.',
      ],
      built: [
        {
          title: 'Eight pages, one system',
          body: 'Home, features, solutions, help centre, blog, downloads, search and an assistant page, all built from shared cards, headings and layouts so new content drops in without new code.',
        },
        {
          title: 'Search',
          body: 'A site-wide search overlay that closes on Escape and locks the page behind it, and a results page with tabs and sorting.',
        },
        {
          title: 'Downloads',
          body: 'One page for every way to get the product: the Loveworld App Store, Google Play and the App Store, plus desktop builds for macOS, Windows and Linux.',
        },
        {
          title: 'Search engines and sharing',
          body: 'Titles, descriptions, Open Graph and Twitter cards, a canonical URL and organisation structured data, so the site shows up properly in search results and link previews.',
        },
      ],
      problem: {
        title: 'A home page you couldn’t read on a phone',
        challenge:
          'The first version used banner images with the headline drawn into the picture. On a phone that became a thin strip of unreadable text, and search engines couldn’t read it at all. The same was true of the target sectors diagram, and text sizes jumped between 13px and 30px.',
        approach:
          'I rebuilt the hero and the sectors as real HTML: a headline, two clear actions and key numbers up front, then sectors as a readable list. I set one type scale for headings, body text and cards, and moved light text off the mid-blue background where it failed contrast.',
        outcome:
          'The home page now reads at any width, the main actions are visible on the first screen, and every word on it can be indexed.',
      },
      results: [
        { value: '8', label: 'pages built from one set of shared components' },
        { value: '3', label: 'app platforms on one download page: mobile, desktop and web' },
        { value: 'Live', label: 'at 360comms.network' },
        { value: '—', label: 'Add visits, downloads or sign-ups', placeholder: true },
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
    name: 'Loveping',
    kind: 'mobile',
    role: 'Mobile engineer, built version 1 and 2',
    year: '2026',
    timeline: '2026',
    platforms: 'iOS · Android',
    stack: ['React Native', 'Expo Router', 'TypeScript', 'Zustand', 'Sentry'],
    tags: ['Mobile app', 'Rebuild', 'Accessibility'],
    line: 'An app for couples that I built from scratch, then rebuilt as version 2 when its styling kept breaking.',
    headline: 'Building an app, then rebuilding it without changing how it feels',
    summary:
      'Loveping helps couples send love notes, call reminders and gift nudges. I built the first version end to end, then led Loveping 2.0: a full audit and a move from NativeWind to plain React Native styling, keeping the look users knew.',
    palette: { bg: '#0F3324', fg: '#FFFFFF', screen: '#05231A', ink: '#FFFFFF', accent: '#48D962', block: '#0F3324' },
    screens: { phones: ['loveping-home', 'loveping-messages', 'loveping-gifts'] },
    video: { phone: 'loveping' },
    caseStudy: {
      brief: [
        'I built the first version of Loveping myself: the screens, navigation, stores and API integration, styled with NativeWind.',
        'As the app grew, the styling became the problem. Layout bugs kept coming back, and the floating tab bar behaved differently from phone to phone. Rather than keep patching, I planned version 2: the same features and the same look, on plain React Native StyleSheet.',
      ],
      built: [
        {
          title: 'Version 1',
          body: 'The original app in React Native, Expo Router and TypeScript: love notes with tones, call and gift nudges, partner profiles, notifications and 9 Zustand stores.',
        },
        {
          title: 'Audit and plan for 2.0',
          body: 'A full map of routes, stores, services and components, with risks and a step-by-step migration order the team could review.',
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
    a: 'I audit first, plan the move screen by screen, then migrate without breaking what users rely on, as I did moving Loveping off NativeWind.',
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

/** Open-source work: merged contributions to other people's projects (from the fork history). */
export const openSource = [
  {
    repo: 'fluxapay',
    org: 'MetroLogic',
    url: 'https://github.com/MetroLogic/fluxapay/pulls?q=is%3Apr+author%3AEA10-lite',
    when: 'Jan–Sep 2026',
    summary: 'Features and fixes across the frontend and the backend.',
    items: [
      { text: 'Pricing page with plan cards, a comparison table and FAQ' },
      { text: 'Settlement report page' },
      { text: 'Fiat settlement engine on the backend' },
      { text: 'Admin platform fees and configuration, plus follow-up fixes' },
      { text: 'Privacy policy and terms pages' },
      { text: 'Consistent API routes across services' },
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'Prisma'],
  },
  {
    repo: 'Disciplr',
    org: 'Disciplr-Org',
    url: 'https://github.com/Disciplr-Org',
    when: 'Jul 2026',
    summary: 'Fixes on both the API and the web app.',
    items: [
      { text: 'Required auth on the milestone approval status endpoint' },
      { text: 'Reused the milestone record in the approve endpoint instead of fetching it twice' },
      { text: 'Independent window anchors when filters change' },
      { text: 'Restored the missing milestone validation export and fields' },
      { text: 'Replaced hardcoded hex colours with theme tokens' },
    ],
    tags: ['TypeScript', 'Node.js', 'React'],
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
