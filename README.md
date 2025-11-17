## Portfolio – React + TypeScript + Vite + Tailwind CSS + Framer Motion

### Overview

This project is a starter portfolio built with **React**, **TypeScript**, and **Vite**, styled using **Tailwind CSS** and animated with **Framer Motion**.
It includes a minimal landing layout you can extend into full portfolio sections (hero, projects, about, contact) with consistent motion patterns.

### Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler/Dev Server**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Linting**: ESLint (from the Vite React TypeScript template)

### Dependencies & Versions

Key dependencies (see `package.json` for exact versions):

- **react**, **react-dom**
- **framer-motion**
- **tailwindcss**, **postcss**, **autoprefixer**
- **vite**, **@vitejs/plugin-react**

### Project Structure (high level)

- `index.html` – Application entry HTML.
- `src/main.tsx` – React entry point, mounts the `App` component and imports global styles.
- `src/index.css` – Tailwind CSS entry file and global overrides.
- `src/App.tsx` – Root UI component containing the initial animated portfolio shell.
- `tailwind.config.js` – Tailwind configuration (content paths, theme extensions).
- `postcss.config.js` – PostCSS configuration for Tailwind and Autoprefixer.

### Tailwind CSS Configuration

Tailwind is enabled with the following key settings:

- **Content paths** in `tailwind.config.js`:
  - `./index.html`
  - `./src/**/*.{js,ts,jsx,tsx}`
- **Custom theme extensions**:
  - `colors.portfolio-bg` – dark background color used for the body.
- **Global styles** in `src/index.css`:
  - `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
  - `body` uses `bg-portfolio-bg`, `text-white`, and `antialiased` via Tailwind utilities.

### Framer Motion Setup

Framer Motion is integrated in `src/App.tsx`:

- Import via `import { motion } from 'framer-motion'`.
- The main card and call-to-action buttons use `motion.section`, `motion.h1`, `motion.p`, and `motion.button` with:
  - `initial`, `animate`, `transition` props for enter animations.
  - `whileHover` and `whileTap` for interactive button effects.

You can reuse these patterns in new components such as hero sections, project cards, or modals.

### Setup Instructions

1. **Install dependencies**

   ```bash
   cd /Users/gojosatura/Desktop/portfolio
   npm install
   ```

   If Tailwind or Framer Motion were not yet installed for some reason, you can reinstall them:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install framer-motion
   ```

2. **Environment variables**

   - No environment variables are required for the base setup.
   - If you later add APIs (e.g., email/contact service, analytics), prefer using a `.env` file and document each variable here.

3. **Ports**

   - By default, Vite serves the app on port **5173** (or the next available port).

### Running the Project

- **Development server**

  ```bash
  npm run dev
  ```

  Then open the URL printed by Vite (usually `http://localhost:5173`) in your browser.

- **Type checking**

  ```bash
  npm run build -- --debug
  ```

  or configure a dedicated type-check script using `tsc` if desired.

- **Production build**

  ```bash
  npm run build
  ```

- **Preview production build**

  ```bash
  npm run preview
  ```

### How the Pieces Fit Together

- Vite loads `index.html`, which mounts the React app via `src/main.tsx`.
- `main.tsx` imports `src/index.css`, which in turn pulls in Tailwind base/styles and sets global body styles.
- Tailwind scans all `.tsx` files under `src` (and `index.html`) using `tailwind.config.js` and generates the corresponding CSS utilities.
- `App.tsx` uses Tailwind utility classes for layout and appearance and uses Framer Motion for entrance animations and hover/tap interactions.

### Known Limitations & Assumptions

- The current UI is a **single-page landing shell**; additional pages/sections and routing (e.g., React Router) are not yet configured.
- There is **no backend integration**; any contact forms or project data are expected to be static or client-side only unless you add APIs.
- Accessibility is partially handled via semantic HTML and reasonable defaults, but you should review components as you expand the portfolio.
- The design is intentionally minimal and opinionated toward a dark theme; you may want to introduce a theme system or light mode toggle later.

### Recommended Next Steps / Best Practices

- Extract the current `App` layout into reusable components (`Layout`, `Hero`, `ProjectList`, `ContactSection`) to keep files small and focused.
- Define a **design token layer** using Tailwind (colors, spacing, font sizes) in `tailwind.config.js` to keep styling consistent.
- Create **animation variants** with Framer Motion (e.g., `fadeInUp`, `staggerContainer`) and reuse them across sections to avoid duplication.
- Add ESLint + Prettier integration and enable type-aware linting if this becomes a larger production portfolio.

