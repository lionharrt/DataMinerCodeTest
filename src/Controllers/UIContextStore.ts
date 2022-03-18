import { useState } from 'react'
import { ContextGenerator } from '../Utils/ContextGenerator'

const useUIContextStore = () => {
  const [expanded, setExpanded] = useState<string>()

  const changeExpanded = (newExpandId: string) => {
    setExpanded(newExpandId === expanded ? undefined : newExpandId)
  }
  return {
    expanded,
    changeExpanded,
  }
}

export const { context: UIContext, contextMaker: UIContextMaker } = ContextGenerator(useUIContextStore)
