import { createContext, useContext } from 'react'

/** Two visual directions for the site: the painterly golden-hour scene,
 *  and the original abstract gradient art. Toggleable, persisted. */
export type DesignStyle = 'scene' | 'abstract'

export const DesignStyleContext = createContext<{
  style: DesignStyle
  setStyle: (style: DesignStyle) => void
}>({ style: 'scene', setStyle: () => {} })

export const useDesignStyle = () => useContext(DesignStyleContext)
