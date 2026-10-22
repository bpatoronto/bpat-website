import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Arrow, FORM_URL } from './Stagger'

const ease = [0.2, 0.65, 0.25, 1] as const

// Card rises and untilts once, then its contents arrive one after another
const card: Variants = {
  hidden: { opacity: 0, y: 120, scale: 0.9, rotateX: 22 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.9, ease, when: 'beforeChildren', staggerChildren: 0.12 },
  },
}

const item: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.6, ease } },
}

/** Closing request-form card that rises in the first time it comes into view. */
export default function XRequest() {
  const reduce = useReducedMotion()
  const motionProps = reduce
    ? {}
    : { variants: card, initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.3 } }

  return (
    <section className="container-pg pb-20 md:pb-28">
      <motion.div
        {...motionProps}
        style={{ transformPerspective: 1100 }}
        className="origin-top rounded-[22px] bg-pine-950 px-6 py-10 text-white shadow-[0_50px_90px_-40px_rgba(11,33,35,0.7)] md:flex md:items-end md:justify-between md:gap-14 md:px-14 md:py-16"
      >
        <div className="max-w-2xl">
          <motion.h2
            variants={reduce ? undefined : item}
            className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight md:text-5xl"
          >
            Tell us where you want bike parking.
          </motion.h2>
          <motion.p variants={reduce ? undefined : item} className="mt-4 max-w-xl leading-relaxed text-white/75 md:mt-5 md:text-lg">
            A plaza with nowhere to lock up, a building with no bike room, a corner that needs a
            rack. Point us to it.
          </motion.p>
        </div>
        <motion.a
          variants={reduce ? undefined : item}
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-white px-5 py-3.5 text-[0.95rem] font-medium text-pine-950 transition-colors hover:bg-pine-50 md:mt-0"
        >
          Open the form
          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.a>
      </motion.div>
    </section>
  )
}
