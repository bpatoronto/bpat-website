import { useDesignStyle, type DesignStyle } from '../design-context'

const options: { id: DesignStyle; label: string }[] = [
  { id: 'scene', label: 'Scene' },
  { id: 'abstract', label: 'Abstract' },
]

/** Floating switcher to explore the two design directions. */
export default function DesignToggle() {
  const { style, setStyle } = useDesignStyle()

  return (
    <div className="fixed bottom-5 left-5 z-[1100] flex items-center gap-1 rounded-full border border-pine-600/25 bg-white/95 p-1 shadow-[0_10px_30px_-10px_rgba(23,55,58,0.45)]">
      <span className="pl-3 pr-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-pine-700">
        Design
      </span>
      {options.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setStyle(id)}
          aria-pressed={style === id}
          className={`rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-all ${
            style === id ? 'bg-pine-600 text-white' : 'text-pine-700 hover:bg-pine-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
