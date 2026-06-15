import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'

// Split heavy / secondary routes out of the initial bundle.
// MapPage pulls in leaflet (~140KB), so it must not load on the homepage.
const MapPage = lazy(() => import('./pages/MapPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))

/** Honour hash anchors on navigation; otherwise reset scroll per page. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
