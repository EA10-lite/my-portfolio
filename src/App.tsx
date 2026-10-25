import { lazy } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { SmoothScroll } from './lib/smooth'
import { ThemeProvider } from './lib/theme'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Work = lazy(() => import('./pages/Work'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

// Hash routing is used for the self-contained preview build (PREVIEW=1).
const Router = import.meta.env.VITE_HASH_ROUTER === '1' ? HashRouter : BrowserRouter

export default function App() {
  return (
    <Router>
      <ThemeProvider>
      <SmoothScroll>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<CaseStudy />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SmoothScroll>
      </ThemeProvider>
    </Router>
  )
}
