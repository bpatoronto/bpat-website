import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Arrow } from './Stagger'

// Same palette the live parking map uses for BikeSpace issue types
const ISSUE = {
  none: { label: 'No parking', fill: '#9ca3af', ring: '#4b5563' },
  full: { label: 'Full', fill: '#fbbf24', ring: '#92400e' },
  damaged: { label: 'Damaged', fill: '#f87171', ring: '#991b1b' },
  abandoned: { label: 'Abandoned', fill: '#fde68a', ring: '#78350f' },
  other: { label: 'Other', fill: '#c4b5fd', ring: '#6b21a8' },
} as const

type IssueKey = keyof typeof ISSUE

const reports: [number, number, IssueKey][] = [
  [62, 146, 'none'], [118, 96, 'full'], [206, 168, 'none'], [242, 250, 'damaged'],
  [94, 268, 'none'], [172, 326, 'full'], [30, 214, 'damaged'], [186, 92, 'none'],
  [216, 382, 'none'], [102, 356, 'other'], [266, 318, 'damaged'], [58, 392, 'abandoned'],
  [138, 214, 'none'], [250, 120, 'full'],
]

/** Stylised slice of Toronto: street grid, ravine, parks, the Gardiner and the lake. */
function MapBase({ children }: { children?: ReactNode }) {
  return (
    <svg viewBox="0 0 300 650" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="300" height="650" fill="#eceee6" />
      <g stroke="#fff" strokeWidth="3">
        {[40, 85, 130, 175, 220, 265].map((x) => <path key={x} d={`M${x} 0V540`} />)}
        {[60, 110, 160, 210, 260, 310, 360, 410, 460, 505].map((y) => <path key={y} d={`M0 ${y}H300`} />)}
      </g>
      <path d="M-10 60C40 90 74 150 62 236L-10 248Z" fill="#d3e3c9" />
      <path d="M192 122h66v84h-66z" fill="#d3e3c9" />
      <path d="M18 332h76v54H18z" fill="#d3e3c9" />
      <path d="M-10 545C60 522 110 550 170 534 220 520 262 532 310 516V660H-10Z" fill="#b6d3dc" />
      <g stroke="#fff" strokeWidth="8" strokeLinecap="round" fill="none">
        <path d="M0 186H300" />
        <path d="M0 402H300" />
        <path d="M152 0V530" />
        <path d="M-10 304 310 124" />
      </g>
      <path d="M-10 488C100 472 200 482 310 462" stroke="#f1d6a2" strokeWidth="9" fill="none" />
      {children}
    </svg>
  )
}

function ReportDot({ x, y, issue, progress, at }: { x: number; y: number; issue: IssueKey; progress: MotionValue<number>; at: number }) {
  const scale = useTransform(progress, [at, at + 0.12], [0, 1])
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="7.5"
      fill={ISSUE[issue].fill}
      stroke={ISSUE[issue].ring}
      strokeWidth="2.5"
      style={{ scale, transformBox: 'fill-box', transformOrigin: 'center' }}
    />
  )
}

function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="22" fill="#276266" opacity="0.15" />
      <path d="M0 6C-9-6-12-10-12-16a12 12 0 0 1 24 0C12-10 9-6 0 6Z" fill="#276266" stroke="#fff" strokeWidth="2.5" />
      <circle cy="-16" r="4.5" fill="#fff" />
    </g>
  )
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[8cqw] pt-[4.2cqw] text-[length:3.8cqw] font-semibold text-pine-950">
      <span>9:41</span>
      <span className="flex items-center gap-[1.4cqw]">
        <span className="flex items-end gap-[0.6cqw]">
          {[1.4, 2.1, 2.8, 3.5].map((h) => <span key={h} className="w-[0.9cqw] rounded-[0.3cqw] bg-current" style={{ height: `${h}cqw` }} />)}
        </span>
        <span className="h-[3.4cqw] w-[6.4cqw] rounded-[1cqw] border-[0.4cqw] border-current p-[0.4cqw]">
          <span className="block h-full w-3/4 rounded-[0.4cqw] bg-current" />
        </span>
      </span>
    </div>
  )
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[9/19.5] rounded-[15%/7%] bg-[#141414] p-[3.2%] shadow-[0_50px_80px_-40px_rgba(11,33,35,0.6),inset_0_0_0_1.5px_#3c3c3c]">
      <div className="relative h-full w-full overflow-hidden rounded-[12%/5.6%] bg-white [container-type:inline-size]">
        <div className="absolute left-1/2 top-[2.6cqw] z-20 h-[7.6cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  )
}

function Chip({ children, active = false, dot }: { children: ReactNode; active?: boolean; dot?: IssueKey }) {
  return (
    <span
      className={`inline-flex items-center gap-[1.4cqw] rounded-full border px-[3cqw] py-[1.5cqw] text-[length:3.5cqw] font-medium ${
        active ? 'border-pine-600 bg-pine-600 text-white' : 'border-pine-950/12 bg-white text-pine-900'
      }`}
    >
      {dot && <span className="h-[2.4cqw] w-[2.4cqw] rounded-full border-[0.5cqw]" style={{ background: ISSUE[dot].fill, borderColor: ISSUE[dot].ring }} />}
      {children}
    </span>
  )
}

function MapScreen({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <MapBase>
        {reports.map(([x, y, issue], i) => (
          <ReportDot key={i} x={x} y={y} issue={issue} progress={progress} at={0.35 + i * 0.035} />
        ))}
      </MapBase>
      <StatusBar />
      <div className="absolute inset-x-[5cqw] top-[15cqw] flex items-center gap-[2.4cqw] rounded-[3.5cqw] bg-white px-[4cqw] py-[3.2cqw] text-[length:3.8cqw] text-pine-900/70 shadow-[0_2px_10px_rgba(11,33,35,0.12)]">
        <svg viewBox="0 0 20 20" className="h-[4cqw] w-[4cqw]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" /></svg>
        Search Toronto
      </div>
      <div className="absolute inset-x-0 bottom-0 rounded-t-[6cqw] bg-white px-[5.5cqw] pb-[7cqw] pt-[2.6cqw] shadow-[0_-4px_20px_rgba(11,33,35,0.12)]">
        <div className="mx-auto h-[1.2cqw] w-[11cqw] rounded-full bg-pine-950/15" />
        <p className="mt-[3.6cqw] text-[length:5.4cqw] font-semibold leading-tight text-pine-950">Community reports</p>
        <p className="mt-[0.8cqw] text-[length:3.4cqw] text-pine-900/75">Toronto, from BikeSpace</p>
        <div className="mt-[3.4cqw] flex flex-wrap gap-[1.8cqw]">
          <Chip active>All</Chip>
          <Chip dot="none">No parking</Chip>
          <Chip dot="full">Full</Chip>
          <Chip dot="damaged">Damaged</Chip>
        </div>
        <div className="mt-[4.4cqw] rounded-[3.5cqw] bg-pine-950 py-[3.4cqw] text-center text-[length:3.9cqw] font-medium text-white">
          Report a problem
        </div>
      </div>
    </>
  )
}

function ReportScreen() {
  return (
    <>
      <StatusBar />
      <div className="flex h-full flex-col px-[5.5cqw] pt-[15cqw]">
        <div className="flex items-center gap-[2cqw] text-[length:5.2cqw] font-semibold text-pine-950">
          <svg viewBox="0 0 20 20" className="h-[4.6cqw] w-[4.6cqw]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m12 4-6 6 6 6" /></svg>
          New report
        </div>
        <div className="relative mt-[4cqw] h-[34cqw] shrink-0 overflow-hidden rounded-[4cqw]">
          <MapBase>
            <Pin x={150} y={300} />
          </MapBase>
        </div>
        <p className="mt-[5cqw] text-[length:3.6cqw] text-pine-900/75">What&rsquo;s the problem?</p>
        <div className="mt-[2cqw] flex flex-wrap gap-[1.8cqw]">
          <Chip active>No parking</Chip>
          <Chip>Full</Chip>
          <Chip>Damaged</Chip>
          <Chip>Abandoned</Chip>
          <Chip>Other</Chip>
        </div>
        <p className="mt-[5cqw] text-[length:3.6cqw] text-pine-900/75">How long were you parking?</p>
        <div className="mt-[2cqw] grid grid-cols-2 gap-[1.8cqw] text-center">
          {['Minutes', 'Hours', 'Overnight', 'Multiple days'].map((d) => (
            <span
              key={d}
              className={`rounded-[2.6cqw] border py-[2.2cqw] text-[length:3.5cqw] font-medium ${
                d === 'Hours' ? 'border-pine-600 bg-pine-50 text-pine-700' : 'border-pine-950/12 text-pine-900'
              }`}
            >
              {d}
            </span>
          ))}
        </div>
        <div className="mt-[4cqw] rounded-[2.6cqw] border border-pine-950/12 p-[3cqw] text-[length:3.6cqw] leading-snug text-pine-950">
          Whole plaza, nowhere to lock up.
        </div>
        <div className="mb-[7cqw] mt-auto rounded-[3.5cqw] bg-pine-600 py-[3.4cqw] text-center text-[length:3.9cqw] font-medium text-white">
          Submit report
        </div>
      </div>
    </>
  )
}

function DetailScreen() {
  return (
    <>
      <MapBase>
        {reports.slice(0, 8).map(([x, y, issue], i) => (
          <circle key={i} cx={x} cy={y} r="7.5" fill={ISSUE[issue].fill} stroke={ISSUE[issue].ring} strokeWidth="2.5" opacity="0.55" />
        ))}
        <Pin x={150} y={236} />
      </MapBase>
      <StatusBar />
      <div className="absolute inset-x-[4cqw] bottom-[5cqw] rounded-[5cqw] bg-white p-[5cqw] shadow-[0_6px_24px_rgba(11,33,35,0.16)]">
        <div className="flex items-center gap-[2cqw]">
          <span className="h-[3.4cqw] w-[3.4cqw] rounded-full border-[0.7cqw]" style={{ background: ISSUE.none.fill, borderColor: ISSUE.none.ring }} />
          <span className="text-[length:4.8cqw] font-semibold text-pine-950">No parking</span>
        </div>
        <p className="mt-[1.2cqw] text-[length:3.4cqw] text-pine-900/75">Parked for hours</p>
        <p className="mt-[3.4cqw] text-[length:3.8cqw] leading-snug text-pine-950">&ldquo;Whole plaza, nowhere to lock up.&rdquo;</p>
        <div className="mt-[4cqw] flex items-center gap-[2cqw] border-t border-pine-950/10 pt-[3.4cqw] text-[length:3.4cqw] font-medium text-pine-700">
          <svg viewBox="0 0 20 20" className="h-[4cqw] w-[4cqw]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m4 10 4 4 8-8" /></svg>
          Added to the BikeSpace map
        </div>
      </div>
    </>
  )
}

const captions = ['Report a spot in seconds', 'See every gap on one map', 'Shared through BikeSpace']

export default function XBikeSpace() {
  const stageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center 0.55'] })

  // Centre phone settles down from oversized; the side phones slide out from behind it
  const centerScale = useTransform(scrollYProgress, [0, 0.7], [1.28, 1])
  const centerY = useTransform(scrollYProgress, [0, 0.7], [70, 0])
  const sideOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])
  const leftX = useTransform(scrollYProgress, [0.2, 0.85], ['60%', '0%'])
  const rightX = useTransform(scrollYProgress, [0.2, 0.85], ['-60%', '0%'])
  const leftRotate = useTransform(scrollYProgress, [0.2, 0.85], [0, -5])
  const rightRotate = useTransform(scrollYProgress, [0.2, 0.85], [0, 5])

  // With reduced motion, show the finished layout and all reports
  const settled = useMotionValue(1)
  const dotsProgress = reduce ? settled : scrollYProgress

  return (
    <section id="map" className="overflow-x-clip pb-8 pt-20 md:pb-12 md:pt-32">
      <div className="container-pg">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end md:gap-16">
          <h2 className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-pine-950 md:text-5xl">
            Mapping the gaps, one report at a time.
          </h2>
          <div>
            <p className="max-w-md leading-relaxed text-pine-900/80 md:text-lg">
              Our parking map runs on the BikeSpace API: crowdsourced reports of missing, full and
              broken bike parking across Toronto. Anyone can add one.
            </p>
            <Link to="/map" className="group mt-5 inline-flex items-center gap-2 font-medium text-pine-700 underline decoration-pine-600/30 underline-offset-4 hover:decoration-pine-600">
              Open the parking map
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div ref={stageRef} className="mx-auto mt-16 flex max-w-[780px] items-end justify-center md:mt-24">
          <motion.div
            style={reduce ? { rotate: -5 } : { x: leftX, rotate: leftRotate, opacity: sideOpacity }}
            className="relative z-0 -mr-[12%] mb-[4%] w-[44%] max-w-[250px] shrink-0 origin-bottom-right"
          >
            <div className="x-bob [animation-delay:-2s]">
              <Phone><ReportScreen /></Phone>
            </div>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { scale: centerScale, y: centerY }}
            className="relative z-10 w-[56%] max-w-[300px] shrink-0 origin-bottom"
          >
            <div className="x-bob">
              <Phone><MapScreen progress={dotsProgress} /></Phone>
            </div>
          </motion.div>

          <motion.div
            style={reduce ? { rotate: 5 } : { x: rightX, rotate: rightRotate, opacity: sideOpacity }}
            className="relative z-0 -ml-[12%] mb-[4%] w-[44%] max-w-[250px] shrink-0 origin-bottom-left"
          >
            <div className="x-bob [animation-delay:-4s]">
              <Phone><DetailScreen /></Phone>
            </div>
          </motion.div>
        </div>

        <ol className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3 md:mt-20">
          {captions.map((title) => (
            <li key={title} className="border-t border-pine-950/12 pt-5 font-semibold text-pine-950">
              {title}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
