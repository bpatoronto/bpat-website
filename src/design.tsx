import { useEffect, useState, type ReactNode } from 'react'
import { DesignStyleContext, type DesignStyle } from './design-context'

const STORAGE_KEY = 'bpat-design-style'

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
