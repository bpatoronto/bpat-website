import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/** Two visual directions for the site: the painterly golden-hour scene,
 *  and the original abstract gradient art. Toggleable, persisted. */
export type DesignStyle = 'scene' | 'abstract'

const STORAGE_KEY = 'bpat-design-style'

const DesignStyleContext = createContext<{
  style: DesignStyle
  setStyle: (style: DesignStyle) => void
}>({ style: 'scene', setStyle: () => {} })

export function DesignStyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<DesignStyle>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved === 'abstract' ? 'abstract' : 'scene'
    } catch {
      return 'scene'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, style)
    } catch {
      /* private browsing */
    }
  }, [style])

  return <DesignStyleContext.Provider value={{ style, setStyle }}>{children}</DesignStyleContext.Provider>
}

export const useDesignStyle = () => useContext(DesignStyleContext)
