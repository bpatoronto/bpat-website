import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Reveal from './Reveal'
import { spots, styleFor } from '../data/spots'

export default function MapTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  // Mount Leaflet (and fetch tiles) only once the section approaches the viewport
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 md:py-28">
      <div className="container-pg">
        <Reveal>
          <div className="glass grain relative overflow-hidden p-8 md:p-12">
            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="eyebrow text-pine-600">The gap map</p>
                <h2 className="mt-5 text-balance text-3xl font-bold uppercase tracking-[0.07em] text-pine-950 md:text-4xl">
                  See where Toronto has nowhere to park.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-pine-900/85">
                  Every plaza without a rack, every building without storage — and every win.
                  Spot a gap we missed? Drop a pin.
                </p>
                <Link to="/map" className="btn-solid mt-8 px-9! py-4!">
                  Explore the map
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12m-5-5 5 5-5 5" />
                  </svg>
                </Link>
              </div>

              {/* Live preview of the gap map */}
              <div className="relative h-64 overflow-hidden rounded-2xl border border-pine-600/15 shadow-[0_12px_40px_-16px_rgba(23,55,58,0.35)] md:h-80">
                {showMap ? (
                  <MapContainer
                    center={[43.715, -79.36]}
                    zoom={10}
                    className="h-full w-full"
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    {spots.map((spot) => (
                      <CircleMarker
                        key={spot.name}
                        center={spot.position}
                        radius={6}
                        weight={2}
                        pathOptions={styleFor(spot.category)}
                      >
                        <Popup>
                          <div className="font-sans">
                            <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pine-500">
                              {spot.category === 'win' ? 'Win' : spot.category === 'plaza' ? 'Plaza gap' : 'Apartment gap'}
                            </p>
                            <p className="m-0 mt-1 text-sm font-semibold text-pine-950">{spot.name}</p>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                ) : (
                  <div className="h-full w-full bg-pine-100" />
                )}
                {/* Corner link into the full map — doesn't block panning */}
                <Link
                  to="/map"
                  aria-label="Explore the full gap map"
                  className="absolute bottom-3 right-3 z-800 rounded-full bg-white/95 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-pine-700 shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open the map →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
