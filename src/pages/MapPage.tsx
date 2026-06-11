import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Nav from '../components/Nav'
import { spots, styleFor, type Category } from '../data/spots'

// Pins dropped by visitors marking where they want cycling infrastructure.
// Stored in localStorage until the mapping team has a real database.
type WishPin = {
  id: string
  note: string
  position: [number, number]
}

const WISH_STORAGE_KEY = 'bpat-wish-pins'

function loadWishPins(): WishPin[] {
  try {
    const raw = localStorage.getItem(WISH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

type Filter = Category | 'wish' | 'all'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'plaza', label: 'Plaza gaps' },
  { id: 'apartment', label: 'Apartment gaps' },
  { id: 'win', label: 'Wins' },
  { id: 'wish', label: 'Your pins' },
]

const wishStyle = { color: '#3f8589', fillColor: '#ddedee', fillOpacity: 0.95, dashArray: '4 3' }

function MapClickCapture({ active, onPick }: { active: boolean; onPick: (position: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      if (active) onPick([e.latlng.lat, e.latlng.lng])
    },
  })
  return null
}

export default function MapPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [wishPins, setWishPins] = useState<WishPin[]>(loadWishPins)
  const [adding, setAdding] = useState(false)
  const [draftPosition, setDraftPosition] = useState<[number, number] | null>(null)
  const [draftNote, setDraftNote] = useState('')

  useEffect(() => {
    localStorage.setItem(WISH_STORAGE_KEY, JSON.stringify(wishPins))
  }, [wishPins])

  const visibleSpots = useMemo(
    () => (filter === 'all' ? spots : filter === 'wish' ? [] : spots.filter((spot) => spot.category === filter)),
    [filter],
  )
  const visibleWishes = filter === 'all' || filter === 'wish' ? wishPins : []

  const cancelDraft = () => {
    setDraftPosition(null)
    setDraftNote('')
  }

  const saveDraft = () => {
    if (!draftPosition || !draftNote.trim()) return
    setWishPins((pins) => [...pins, { id: crypto.randomUUID(), note: draftNote.trim(), position: draftPosition }])
    cancelDraft()
    setAdding(false)
  }

  const removeWish = (id: string) => {
    setWishPins((pins) => pins.filter((pin) => pin.id !== id))
  }

  return (
    <div className={`relative h-svh w-full overflow-hidden ${adding ? '[&_.leaflet-container]:cursor-crosshair!' : ''}`}>
      <Nav />

      <MapContainer
        center={[43.715, -79.36]}
        zoom={11}
        scrollWheelZoom
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapClickCapture
          active={adding && !draftPosition}
          onPick={(position) => setDraftPosition(position)}
        />
        {visibleSpots.map((spot) => (
          <CircleMarker
            key={spot.name}
            center={spot.position}
            radius={9}
            weight={2.5}
            pathOptions={styleFor(spot.category)}
          >
            <Popup>
              <div className="font-sans">
                <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pine-500">
                  {spot.category === 'win' ? 'Win' : spot.category === 'plaza' ? 'Plaza gap' : 'Apartment gap'}
                </p>
                <p className="m-0 mt-1 text-sm font-semibold text-pine-950">{spot.name}</p>
                <p className="m-0 mt-1.5 text-xs leading-relaxed text-pine-900/70">{spot.note}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
        {visibleWishes.map((pin) => (
          <CircleMarker
            key={pin.id}
            center={pin.position}
            radius={9}
            weight={2.5}
            pathOptions={wishStyle}
          >
            <Popup>
              <div className="font-sans">
                <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pine-500">
                  Your pin
                </p>
                <p className="m-0 mt-1.5 text-xs leading-relaxed text-pine-900/80">{pin.note}</p>
                <button
                  onClick={() => removeWish(pin.id)}
                  className="mt-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pine-600 underline-offset-2 hover:underline"
                >
                  Remove pin
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
        {draftPosition && (
          <Popup position={draftPosition} eventHandlers={{ remove: cancelDraft }}>
            <div className="w-56 font-sans">
              <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pine-500">
                New pin
              </p>
              <textarea
                autoFocus
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                placeholder="What's needed here? e.g. bike racks, a protected lane…"
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-pine-600/25 bg-white px-3 py-2 text-xs leading-relaxed text-pine-950 placeholder:text-pine-900/40 focus:border-pine-600 focus:outline-none"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={saveDraft}
                  disabled={!draftNote.trim()}
                  className="rounded-full bg-pine-600 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-pine-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Save
                </button>
                <button
                  onClick={cancelDraft}
                  className="rounded-full border border-pine-600/25 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pine-700 transition-colors hover:border-pine-600/50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>

      {/* Glass control panel */}
      <aside className="glass absolute left-4 right-4 top-24 z-[1000] p-6 md:left-8 md:right-auto md:top-28 md:w-[22rem] md:p-7">
        <p className="eyebrow text-pine-600">The gap map</p>
        <h1 className="mt-3 text-xl font-bold uppercase tracking-[0.06em] text-pine-950 md:text-2xl">
          Nowhere to park
        </h1>
        <p className="mt-3 text-xs font-light leading-relaxed text-pine-900/70 md:text-sm">
          Places worth biking to, with no safe place to lock a bike — and the wins that show
          what&rsquo;s possible. Our mapping team is documenting gaps across the city.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-all ${
                filter === id
                  ? 'bg-pine-600 text-white shadow-[0_6px_20px_-6px_rgba(39,98,102,0.7)]'
                  : 'border border-pine-600/20 bg-white/60 text-pine-700 hover:border-pine-600/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="mt-5 flex flex-col gap-2 border-t border-pine-600/10 pt-4">
          <li className="flex items-center gap-2.5 text-xs font-medium text-pine-900/80">
            <span className="h-3 w-3 rounded-full border-2 border-pine-600 bg-white" /> Plaza with no bike parking
          </li>
          <li className="flex items-center gap-2.5 text-xs font-medium text-pine-900/80">
            <span className="h-3 w-3 rounded-full border-2 border-pine-900 bg-pine-200" /> Apartments without secure storage
          </li>
          <li className="flex items-center gap-2.5 text-xs font-medium text-pine-900/80">
            <span className="h-3 w-3 rounded-full bg-pine-600" /> Win — parking installed
          </li>
          <li className="flex items-center gap-2.5 text-xs font-medium text-pine-900/80">
            <span className="h-3 w-3 rounded-full border-2 border-dashed border-pine-500 bg-pine-100" /> Your pin — infrastructure wanted
          </li>
        </ul>

        <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-pine-700/50">
          Demonstration data · {visibleSpots.length + visibleWishes.length} locations shown
        </p>
      </aside>

      {/* Bottom CTA */}
      <div className="absolute bottom-6 left-1/2 z-[1000] flex w-max -translate-x-1/2 flex-col items-center gap-2.5">
        <button
          onClick={() => {
            setAdding((a) => !a)
            cancelDraft()
          }}
          className={`${adding ? 'btn-glass bg-white/90' : 'btn-solid'} whitespace-nowrap px-7! shadow-2xl`}
        >
          {adding ? 'Click the map to place your pin — or tap to cancel' : 'Want better cycling here? Drop a pin'}
        </button>
        <Link
          to="/#join"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-pine-800/70 transition-colors hover:text-pine-600"
        >
          or get involved →
        </Link>
      </div>
    </div>
  )
}
