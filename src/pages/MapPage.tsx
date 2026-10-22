import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Nav from '../components/Nav'
// import { spots, styleFor, photoFor, labelFor, type Category } from '../data/spots'

// ── BikeSpace API ────────────────────────────────────────────────────

const API = 'https://api-dev.bikespace.ca/api/v2'

type Issue = 'not_provided' | 'full' | 'damaged' | 'abandoned' | 'other'
type Duration = 'minutes' | 'hours' | 'overnight' | 'multiday'

type Submission = {
  id: number
  latitude: number
  longitude: number
  issues: Issue[]
  parking_duration: Duration | null
  parking_time: string
  comments: string | null
  submitted_datetime: string | null
  user: string | null
  version: number
}

const ISSUE_STYLE: Record<Issue, { color: string; fillColor: string; fillOpacity: number }> = {
  not_provided: { color: '#4b5563', fillColor: '#9ca3af', fillOpacity: 0.85 },
  full:         { color: '#92400e', fillColor: '#fbbf24', fillOpacity: 0.85 },
  damaged:      { color: '#991b1b', fillColor: '#f87171', fillOpacity: 0.85 },
  abandoned:    { color: '#78350f', fillColor: '#fde68a', fillOpacity: 0.85 },
  other:        { color: '#6b21a8', fillColor: '#c4b5fd', fillOpacity: 0.85 },
}

const ISSUE_LABEL: Record<Issue, string> = {
  not_provided: 'No parking',
  full: 'Full',
  damaged: 'Damaged',
  abandoned: 'Abandoned',
  other: 'Other',
}

const DURATION_LABEL: Record<Duration, string> = {
  minutes: 'Minutes',
  hours: 'Hours',
  overnight: 'Overnight',
  multiday: 'Multiple days',
}

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong'

const ALL_ISSUES: Issue[] = ['not_provided', 'full', 'damaged', 'abandoned', 'other']
const ALL_DURATIONS: Duration[] = ['minutes', 'hours', 'overnight', 'multiday']

async function fetchAllSubmissions(): Promise<Submission[]> {
  const all: Submission[] = []
  let page = 1
  const limit = 100
  for (;;) {
    const url = page === 1
      ? `${API}/submissions?limit=${limit}`
      : `${API}/submissions?limit=${limit}&offset=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`API returned ${res.status}`)
    const data = await res.json()
    all.push(...data.submissions)
    if (!data.pagination.has_next) break
    page++
  }
  return all
}

async function postSubmission(body: {
  latitude: number
  longitude: number
  issues: Issue[]
  parking_duration: Duration
  parking_time: string
  comments?: string
}) {
  const res = await fetch(`${API}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API returned ${res.status}`)
  return res.json() as Promise<{ status: string; submission_id: number }>
}

// ── Helpers ──────────────────────────────────────────────────────────

function ClickCapture({ active, onPick, onInteract }: {
  active: boolean
  onPick: (pos: [number, number]) => void
  onInteract: () => void
}) {
  useMapEvents({
    click(e) {
      onInteract()
      if (active) onPick([e.latlng.lat, e.latlng.lng])
    },
    popupopen: onInteract,
  })
  return null
}

const MOBILE_QUERY = '(max-width: 767px)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

// type Tab = 'reports' | 'research'
// const researchFilters: { id: Category | 'all'; label: string }[] = [
//   { id: 'all', label: 'All' },
//   { id: 'plaza', label: 'Plaza gaps' },
//   { id: 'apartment', label: 'Apartment gaps' },
//   { id: 'win', label: 'Wins' },
// ]

// ── Component ────────────────────────────────────────────────────────

export default function MapPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [issueFilter, setIssueFilter] = useState<Issue | 'all'>('all')

  const [reporting, setReporting] = useState(false)
  const [draftPos, setDraftPos] = useState<[number, number] | null>(null)
  const [draftIssues, setDraftIssues] = useState<Set<Issue>>(new Set())
  const [draftDuration, setDraftDuration] = useState<Duration>('minutes')
  const [draftComment, setDraftComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // On phones the panel starts collapsed so the map stays visible
  const isMobile = useIsMobile()
  const [panelOpen, setPanelOpen] = useState(false)
  // Keep popups clear of the nav + collapsed panel (top) and the CTA (bottom).
  // The panel is hidden on phones while the report form is open, so it only clears the nav.
  const popupPadding = isMobile
    ? { autoPanPaddingTopLeft: [12, 220] as [number, number], autoPanPaddingBottomRight: [12, 90] as [number, number] }
    : {}
  const formPopupPadding = isMobile
    ? { autoPanPaddingTopLeft: [12, 96] as [number, number], autoPanPaddingBottomRight: [12, 16] as [number, number] }
    : {}

  useEffect(() => {
    let cancelled = false
    fetchAllSubmissions()
      .then((data) => { if (!cancelled) setSubmissions(data) })
      .catch((e) => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const visibleSubmissions = useMemo(() => {
    if (issueFilter === 'all') return submissions
    return submissions.filter((s) => s.issues.includes(issueFilter))
  }, [issueFilter, submissions])

  const stats = useMemo(() => {
    const c: Record<Issue, number> = { not_provided: 0, full: 0, damaged: 0, abandoned: 0, other: 0 }
    for (const s of submissions) for (const i of s.issues) c[i]++
    return c
  }, [submissions])

  const cancelReport = () => {
    setDraftPos(null)
    setDraftIssues(new Set())
    setDraftDuration('minutes')
    setDraftComment('')
    setReporting(false)
  }

  const toggleIssue = (issue: Issue) =>
    setDraftIssues((prev) => {
      const next = new Set(prev)
      if (next.has(issue)) {
        next.delete(issue)
      } else {
        next.add(issue)
      }
      return next
    })

  const submitReport = async () => {
    if (!draftPos || draftIssues.size === 0) return
    setSubmitting(true)
    try {
      const result = await postSubmission({
        latitude: draftPos[0],
        longitude: draftPos[1],
        issues: [...draftIssues],
        parking_duration: draftDuration,
        parking_time: new Date().toISOString(),
        comments: draftComment.trim() || undefined,
      })
      setSubmissions((prev) => [
        {
          id: result.submission_id,
          latitude: draftPos[0],
          longitude: draftPos[1],
          issues: [...draftIssues],
          parking_duration: draftDuration,
          parking_time: new Date().toISOString(),
          comments: draftComment.trim() || null,
          submitted_datetime: new Date().toISOString(),
          user: null,
          version: 1,
        },
        ...prev,
      ])
      cancelReport()
    } catch (e: unknown) {
      alert(`Failed to submit: ${errorMessage(e)}`)
    } finally {
      setSubmitting(false)
    }
  }

  const picking = reporting && !draftPos

  const statusText = loading
    ? 'Loading reports…'
    : error
      ? `Error: ${error}`
      : `${submissions.length.toLocaleString()} reports · ${visibleSubmissions.length.toLocaleString()} shown`

  const pillClass = (active: boolean) =>
    `shrink-0 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-pine-950 bg-pine-950 text-white'
        : 'border-pine-950/15 bg-white text-pine-900 hover:border-pine-950/40'
    }`

  return (
    <div className={`relative h-svh w-full overflow-hidden ${picking ? '[&_.leaflet-container]:cursor-crosshair!' : ''}`}>
      <Helmet>
        <title>BPAT Gap Map – Bike Parking Problems in Toronto</title>
        <meta name="description" content="BPAT's interactive map of bike parking gaps and community reports across Toronto. See where racks are missing, full, or damaged." />
        <link rel="canonical" href="https://bpat.ca/map" />
      </Helmet>
      <Nav solid />

      <MapContainer center={[43.695, -79.4]} zoom={12} scrollWheelZoom className="h-full w-full" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ClickCapture
          active={picking}
          onPick={setDraftPos}
          onInteract={() => { if (isMobile) setPanelOpen(false) }}
        />

        {/* BikeSpace markers */}
        {/* While picking a spot, markers ignore taps so they land on the map.
            `interactive` is creation-only in Leaflet, hence the key change. */}
        {visibleSubmissions.map((sub) => (
          <CircleMarker
            key={`${sub.id}-${picking}`}
            interactive={!picking}
            center={[sub.latitude, sub.longitude]}
            radius={7}
            weight={2}
            pathOptions={ISSUE_STYLE[sub.issues[0] ?? 'other']}
          >
            <Popup maxWidth={300} {...popupPadding}>
              <div className="w-[min(16rem,calc(100vw-6rem))] font-sans">
                <div className="flex flex-wrap gap-1.5">
                  {sub.issues.map((issue) => (
                    <span
                      key={issue}
                      className="rounded-md px-2 py-0.5 text-xs font-medium"
                      style={{ background: ISSUE_STYLE[issue].fillColor, color: ISSUE_STYLE[issue].color }}
                    >
                      {ISSUE_LABEL[issue]}
                    </span>
                  ))}
                </div>
                {sub.comments && (
                  <p className="m-0 mt-2.5 text-sm leading-relaxed text-pine-900/85">{sub.comments}</p>
                )}
                <div className="mt-2.5 flex flex-col gap-1 text-xs text-pine-900/60">
                  {sub.parking_duration && <span>Duration: {DURATION_LABEL[sub.parking_duration]}</span>}
                  {sub.parking_time && (
                    <span>Issue time: {new Date(sub.parking_time).toLocaleString()}</span>
                  )}
                  {sub.submitted_datetime && (
                    <span>Reported: {new Date(sub.submitted_datetime).toLocaleString()}</span>
                  )}
                  {sub.user && <span>By: {sub.user}</span>}
                  <span className="text-pine-900/30">ID #{sub.id} · v{sub.version}</span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* BPAT research markers — commented out (filler data)
        {visibleSpots.map((spot) => (
          <CircleMarker key={spot.name} center={spot.position} radius={9} weight={2.5} pathOptions={styleFor(spot.category)}>
            <Popup>
              <div className="w-60 font-sans">
                <img src={photoFor(spot.category)} alt={labelFor(spot.category)} className="h-28 w-full rounded-xl object-cover" />
                <p className="m-0 mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pine-500">{labelFor(spot.category)}</p>
                <p className="m-0 mt-1 text-sm font-semibold text-pine-950">{spot.name}</p>
                <p className="m-0 mt-1.5 text-xs leading-relaxed text-pine-900/70">{spot.note}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
        */}

        {/* Report form popup */}
        {draftPos && (
          <Popup position={draftPos} maxWidth={320} eventHandlers={{ remove: cancelReport }} {...formPopupPadding}>
            <div className="w-[min(18rem,calc(100vw-6rem))] font-sans">
              <p className="m-0 text-base font-semibold text-pine-950">
                Report an issue
              </p>

              <p className="m-0 mt-3 text-xs font-medium text-pine-900/70">
                What&rsquo;s the problem?
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {ALL_ISSUES.map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => toggleIssue(issue)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors md:py-1 ${
                      draftIssues.has(issue)
                        ? 'border-pine-950 bg-pine-950 text-white'
                        : 'border-pine-950/15 bg-white text-pine-900 hover:border-pine-950/40'
                    }`}
                  >
                    {ISSUE_LABEL[issue]}
                  </button>
                ))}
              </div>

              <p className="m-0 mt-3 text-xs font-medium text-pine-900/70">
                How long were you parking?
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {ALL_DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDraftDuration(d)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors md:py-1 ${
                      draftDuration === d
                        ? 'border-pine-950 bg-pine-950 text-white'
                        : 'border-pine-950/15 bg-white text-pine-900 hover:border-pine-950/40'
                    }`}
                  >
                    {DURATION_LABEL[d]}
                  </button>
                ))}
              </div>

              <textarea
                value={draftComment}
                onChange={(e) => setDraftComment(e.target.value)}
                placeholder="Any details? (optional)"
                rows={2}
                // 16px on mobile stops iOS Safari zooming in on focus
                className="mt-3 w-full resize-none rounded-lg border border-pine-950/20 bg-white px-3 py-2 text-base leading-relaxed text-pine-950 placeholder:text-pine-900/40 focus:border-pine-950 md:text-sm focus:outline-none"
              />

              <div className="mt-2.5 flex gap-2">
                <button
                  onClick={submitReport}
                  disabled={draftIssues.size === 0 || submitting}
                  className="rounded-lg bg-pine-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pine-800 md:py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? 'Submitting…' : 'Submit report'}
                </button>
                <button
                  onClick={cancelReport}
                  className="rounded-lg border border-pine-950/20 px-4 py-2 text-sm font-medium text-pine-900 transition-colors hover:border-pine-950/50 md:py-1.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>

      {/* ── Glass control panel ─────────────────────────────────────── */}
      {/* Phones: compact card (title, count, filter row) that expands for details.
          Desktop: everything always shown. */}
      <aside className={`${draftPos ? 'max-md:hidden' : ''} absolute left-3 right-3 top-24 z-1000 max-h-[calc(100svh-12rem)] overflow-y-auto p-4 md:left-8 md:right-auto md:top-28 md:max-h-[calc(100svh-8rem)] md:w-88 md:p-7 rounded-[22px] border border-pine-950/10 bg-paper shadow-[0_30px_70px_-30px_rgba(11,33,35,0.45)]`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-[-0.015em] text-pine-950 md:text-3xl md:leading-[1.1]">
              Community reports
            </h1>
            <p className="mt-0.5 text-xs text-pine-900/65 md:hidden">
              {statusText}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen((o) => !o)}
            aria-expanded={panelOpen}
            aria-controls="map-panel-details"
            aria-label={panelOpen ? 'Hide map details' : 'Show map details'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-pine-950/15 bg-white text-pine-900 md:hidden"
          >
            <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${panelOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        <p className={`${panelOpen ? '' : 'hidden'} mt-3 text-sm leading-relaxed text-pine-900/80 md:block md:text-base`}>
          Crowdsourced reports of bike parking problems across Toronto, powered by BikeSpace.
        </p>

        {/* Single swipeable row on phones, wraps on desktop */}
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:mt-5 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          <button onClick={() => setIssueFilter('all')} className={pillClass(issueFilter === 'all')}>All</button>
          {ALL_ISSUES.map((issue) => (
            <button key={issue} onClick={() => setIssueFilter(issue)} className={pillClass(issueFilter === issue)}>
              {ISSUE_LABEL[issue]}
            </button>
          ))}
        </div>

        <div id="map-panel-details" className={`${panelOpen ? '' : 'hidden'} md:block`}>
          <ul className="mt-4 flex flex-col gap-2 border-t border-pine-950/10 pt-4 md:mt-5">
            {ALL_ISSUES.map((issue) => (
              <li key={issue} className="flex items-center gap-2.5 text-sm text-pine-900/85">
                <span
                  className="h-3 w-3 shrink-0 rounded-full border-2"
                  style={{ borderColor: ISSUE_STYLE[issue].color, backgroundColor: ISSUE_STYLE[issue].fillColor }}
                />
                {ISSUE_LABEL[issue]}
                <span className="ml-auto tabular-nums text-pine-900/55">{stats[issue]}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 hidden text-sm text-pine-900/65 md:block">
            {statusText}
          </p>
          <p className="mt-3 text-xs text-pine-900/60 md:mt-1">
            Data from{' '}
            <a href="https://bikespace.ca" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-pine-600">
              BikeSpace
            </a>
          </p>
        </div>
      </aside>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      {!draftPos && (
        <div className="absolute bottom-6 left-1/2 z-1000 flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col items-center gap-2.5">
          {reporting && (
            <p className="rounded-lg bg-pine-950/90 px-4 py-2 text-center text-sm font-medium text-white shadow-xl md:hidden">
              Tap the map to mark the spot
            </p>
          )}
          <button
            onClick={() => {
              if (reporting) {
                cancelReport()
              } else {
                setPanelOpen(false)
                setReporting(true)
              }
            }}
            className={`${reporting ? 'border border-pine-950/20 bg-white text-pine-950 hover:bg-pine-50' : 'bg-pine-950 text-white hover:bg-pine-800'} rounded-lg px-5 py-3.5 text-center text-[0.95rem] font-medium shadow-[0_20px_50px_-20px_rgba(11,33,35,0.6)] transition-colors md:whitespace-nowrap`}
          >
            {reporting ? (
              <>
                <span className="md:hidden">Cancel</span>
                <span className="hidden md:inline">Click the map to mark the spot, or tap to cancel</span>
              </>
            ) : (
              'Report a parking issue'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
