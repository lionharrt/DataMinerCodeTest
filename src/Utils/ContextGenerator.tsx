import { createContext, createElement } from 'react'

export function ContextGenerator<T>(store: () => T) {
  const context = createContext(undefined as any as T)
  return {
    context,
    contextMaker: ({ children }: { children: React.PropsWithChildren<JSX.Element | string> }) => {
      const value = store()
      return createElement(context.Provider, { value }, children)
    },
  }
}
