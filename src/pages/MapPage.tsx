import { useEffect, useMemo, useState } from 'react'
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

function ClickCapture({ active, onPick }: { active: boolean; onPick: (pos: [number, number]) => void }) {
  useMapEvents({ click(e) { if (active) onPick([e.latlng.lat, e.latlng.lng]) } })
  return null
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
      next.has(issue) ? next.delete(issue) : next.add(issue)
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
    } catch (e: any) {
      alert(`Failed to submit: ${e.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const pillClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-all ${
      active
        ? 'bg-pine-600 text-white shadow-[0_6px_20px_-6px_rgba(39,98,102,0.7)]'
        : 'border border-pine-600/20 bg-white/60 text-pine-700 hover:border-pine-600/40'
    }`

  return (
    <div className={`relative h-svh w-full overflow-hidden ${reporting && !draftPos ? '[&_.leaflet-container]:cursor-crosshair!' : ''}`}>
      <Nav />

      <MapContainer center={[43.695, -79.4]} zoom={12} scrollWheelZoom className="h-full w-full" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ClickCapture active={reporting && !draftPos} onPick={setDraftPos} />

        {/* BikeSpace markers */}
        {visibleSubmissions.map((sub) => (
          <CircleMarker
            key={sub.id}
            center={[sub.latitude, sub.longitude]}
            radius={7}
            weight={2}
            pathOptions={ISSUE_STYLE[sub.issues[0] ?? 'other']}
          >
            <Popup maxWidth={300}>
              <div className="w-64 font-sans">
                <div className="flex flex-wrap gap-1.5">
                  {sub.issues.map((issue) => (
                    <span
                      key={issue}
                      className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider"
                      style={{ background: ISSUE_STYLE[issue].fillColor, color: ISSUE_STYLE[issue].color }}
                    >
                      {ISSUE_LABEL[issue]}
                    </span>
                  ))}
                </div>
                {sub.comments && (
                  <p className="m-0 mt-2.5 text-xs leading-relaxed text-pine-900/80">{sub.comments}</p>
                )}
                <div className="mt-2.5 flex flex-col gap-1 text-[0.6rem] text-pine-900/50">
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
          <Popup position={draftPos} maxWidth={320} eventHandlers={{ remove: cancelReport }}>
            <div className="w-72 font-sans">
              <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pine-500">
                Report an issue
              </p>

              <p className="m-0 mt-3 text-[0.6rem] font-semibold uppercase tracking-wider text-pine-900/60">
                What&rsquo;s the problem?
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {ALL_ISSUES.map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => toggleIssue(issue)}
                    className={`rounded-full border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider transition-colors ${
                      draftIssues.has(issue)
                        ? 'border-pine-600 bg-pine-600 text-white'
                        : 'border-pine-600/20 bg-white text-pine-700 hover:border-pine-600/40'
                    }`}
                  >
                    {ISSUE_LABEL[issue]}
                  </button>
                ))}
              </div>

              <p className="m-0 mt-3 text-[0.6rem] font-semibold uppercase tracking-wider text-pine-900/60">
                How long were you parking?
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {ALL_DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDraftDuration(d)}
                    className={`rounded-full border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider transition-colors ${
                      draftDuration === d
                        ? 'border-pine-600 bg-pine-600 text-white'
                        : 'border-pine-600/20 bg-white text-pine-700 hover:border-pine-600/40'
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
                className="mt-3 w-full resize-none rounded-xl border border-pine-600/25 bg-white px-3 py-2 text-xs leading-relaxed text-pine-950 placeholder:text-pine-900/40 focus:border-pine-600 focus:outline-none"
              />

              <div className="mt-2.5 flex gap-2">
                <button
                  onClick={submitReport}
                  disabled={draftIssues.size === 0 || submitting}
                  className="rounded-full bg-pine-600 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-pine-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? 'Submitting…' : 'Submit report'}
                </button>
                <button
                  onClick={cancelReport}
                  className="rounded-full border border-pine-600/25 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-pine-700 transition-colors hover:border-pine-600/50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>

      {/* ── Glass control panel ─────────────────────────────────────── */}
      <aside className="glass absolute left-4 right-4 top-24 z-[1000] max-h-[calc(100svh-8rem)] overflow-y-auto p-6 md:left-8 md:right-auto md:top-28 md:w-[22rem] md:p-7">
        <p className="eyebrow text-pine-600">Bike parking map</p>
        <h1 className="mt-3 text-xl font-bold uppercase tracking-[0.06em] text-pine-950 md:text-2xl">
          Community reports
        </h1>
        <p className="mt-3 text-xs font-light leading-relaxed text-pine-900/70 md:text-sm">
          Crowdsourced reports of bike parking problems across Toronto, powered by BikeSpace.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => setIssueFilter('all')} className={pillClass(issueFilter === 'all')}>All</button>
          {ALL_ISSUES.map((issue) => (
            <button key={issue} onClick={() => setIssueFilter(issue)} className={pillClass(issueFilter === issue)}>
              {ISSUE_LABEL[issue]}
            </button>
          ))}
        </div>

        <ul className="mt-5 flex flex-col gap-2 border-t border-pine-600/10 pt-4">
          {ALL_ISSUES.map((issue) => (
            <li key={issue} className="flex items-center gap-2.5 text-xs font-medium text-pine-900/80">
              <span
                className="h-3 w-3 shrink-0 rounded-full border-2"
                style={{ borderColor: ISSUE_STYLE[issue].color, backgroundColor: ISSUE_STYLE[issue].fillColor }}
              />
              {ISSUE_LABEL[issue]}
              <span className="ml-auto tabular-nums text-pine-900/40">{stats[issue]}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-pine-700/50">
          {loading
            ? 'Loading reports…'
            : error
              ? `Error: ${error}`
              : `${submissions.length.toLocaleString()} reports · ${visibleSubmissions.length.toLocaleString()} shown`}
        </p>
        <p className="mt-1 text-[0.6rem] text-pine-700/40">
          Data from{' '}
          <a href="https://bikespace.ca" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-pine-600">
            BikeSpace
          </a>
        </p>
      </aside>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      {!draftPos && (
        <div className="absolute bottom-6 left-1/2 z-[1000] flex w-max -translate-x-1/2 flex-col items-center gap-2.5">
          <button
            onClick={() => {
              if (reporting) {
                cancelReport()
              } else {
                setReporting(true)
              }
            }}
            className={`${reporting ? 'btn-glass bg-white/90' : 'btn-solid'} whitespace-nowrap px-7! shadow-2xl`}
          >
            {reporting ? 'Click the map to mark the spot, or tap to cancel' : 'Report a parking issue'}
          </button>
        </div>
      )}
    </div>
  )
}
