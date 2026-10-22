import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { members, headshotThumbOf, initialsOf, type Member } from '../../data/team'
import { Arrow } from './Stagger'

const shirts = ['#276266', '#c9733f', '#3f8589', '#5b6b8c', '#a8553f', '#2f4f4f', '#b8902f']
const bikes = ['#17373a', '#235257', '#6b4f3a', '#17373a', '#3c4a5c']

function Wheel({ cx, spin }: { cx: number; spin: MotionValue<number> | number }) {
  return (
    <g>
      <circle cx={cx} cy="125" r="31" fill="none" stroke="#17373a" strokeWidth="5" />
      <circle cx={cx} cy="125" r="26" fill="none" stroke="#17373a" strokeOpacity="0.25" strokeWidth="1.5" />
      <motion.g style={{ rotate: spin, transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle cx={cx} cy="125" r="26" fill="none" stroke="none" />
        {[0, 45, 90, 135].map((a) => (
          <path key={a} d={`M${cx - 26} 125H${cx + 26}`} stroke="#17373a" strokeOpacity="0.45" strokeWidth="1.2" transform={`rotate(${a} ${cx} 125)`} />
        ))}
      </motion.g>
      <circle cx={cx} cy="125" r="3" fill="#17373a" />
    </g>
  )
}

function Rider({ member, index, spin }: { member: Member; index: number; spin: MotionValue<number> | number }) {
  const [failed, setFailed] = useState(false)
  const shirt = shirts[index % shirts.length]
  const frame = bikes[index % bikes.length]

  return (
    <figure className="w-[150px] shrink-0 md:w-[210px]">
      <div className="relative aspect-[200/190]">
        <svg viewBox="0 -30 200 190" className="absolute inset-0 h-full w-full -scale-x-100" aria-hidden="true">
          <Wheel cx={45} spin={spin} />
          <Wheel cx={155} spin={spin} />
          {/* back leg */}
          <path d="M82 60 100 80 88 112" fill="none" stroke="#2a3436" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          {/* frame */}
          <g fill="none" stroke={frame} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M45 125 95 125 82 70Z" />
            <path d="M82 70 138 70 95 125" />
            <path d="M138 70 155 125" />
            <path d="M138 70 140 56 152 54" />
            <path d="M72 64H92" strokeWidth="6" />
          </g>
          {/* crank */}
          <path d="M88 112 102 138" stroke="#17373a" strokeWidth="3" strokeLinecap="round" />
          {/* front leg */}
          <path d="M82 60 113 88 102 138" fill="none" stroke="#1e2b2d" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          {/* torso and arm */}
          <path d="M82 60 116 34" stroke={shirt} strokeWidth="18" strokeLinecap="round" />
          <path d="M116 36 132 50 150 55" fill="none" stroke={shirt} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* head */}
        {failed ? (
          <span className="absolute left-[15%] top-[-3%] flex aspect-square w-[38%] items-center justify-center rounded-full bg-pine-600 text-base md:text-lg font-semibold text-white ring-2 ring-paper">
            {initialsOf(member.name)}
          </span>
        ) : (
          <img
            src={headshotThumbOf(member.name)}
            alt=""
            width={160}
            height={160}
            fetchPriority="low"
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute left-[15%] top-[-3%] aspect-square w-[38%] rounded-full bg-pine-600 object-cover ring-2 ring-paper"
          />
        )}
      </div>
      <figcaption className="mt-5 pr-4">
        <p className="text-[0.95rem] font-semibold leading-tight text-pine-950">{member.name}</p>
        <p className="mt-1 text-sm leading-snug text-pine-900/75">{member.role}</p>
      </figcaption>
    </figure>
  )
}

function Heading() {
  return (
    <div className="container-pg flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <h2 className="max-w-xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-pine-950 md:text-5xl">
        Meet BPAT's Team.
      </h2>
      <Link to="/team" className="group inline-flex items-center gap-2 font-medium text-pine-700 underline decoration-pine-600/30 underline-offset-4 hover:decoration-pine-600">
        Meet the whole team
        <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

/** The team rides across the screen, right to left, while the section is pinned. */
export default function XTeam() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // The row leads with a half-screen spacer, so 0% starts the first rider mid-screen
  // and -100% puts every rider off the left edge
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])
  const spin = useTransform(scrollYProgress, [0, 1], [0, 360 * 14])

  if (reduce) {
    return (
      <section id="team" className="scroll-mt-16 py-20 md:py-32">
        <Heading />
        <div className="container-pg mt-14 flex gap-8 overflow-x-auto pb-4">
          {members.map((member, i) => <Rider key={member.name} member={member} index={i} spin={0} />)}
        </div>
      </section>
    )
  }

  return (
    <section id="team" ref={sectionRef} className="relative h-[280vh] md:h-[320vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-14 overflow-hidden md:gap-20">
        <Heading />
        <div className="relative">
          {/* the road, level with the bottom of the wheels */}
          <div className="absolute inset-x-0 top-[142px] h-px bg-pine-950/25 md:top-[199px]" />
          <motion.div style={{ x }} className="flex w-max items-start gap-8 md:gap-12">
            <div aria-hidden="true" className="w-[50vw] shrink-0" />
            {members.map((member, i) => <Rider key={member.name} member={member} index={i} spin={spin} />)}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
