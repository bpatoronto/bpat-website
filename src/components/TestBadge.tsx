/** Reminder that this deploy is a work-in-progress preview. Hidden on the production domain. */
export default function TestBadge() {
  if (typeof window !== 'undefined' && window.location.hostname === 'bpat.ca') {
    return null
  }

  return (
    <span className="fixed bottom-5 left-5 z-[1100] rounded-full border border-amber-500/40 bg-amber-100/95 px-3.5 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-amber-800 shadow-[0_10px_30px_-10px_rgba(23,55,58,0.45)]">
      Test build
    </span>
  )
}
