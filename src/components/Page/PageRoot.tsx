import { ReactNode } from 'react'

interface PageRootProps {
  children: ReactNode
}

export function PageRoot({ children }: PageRootProps) {
  return <div className="px-5 py-4">{children}</div>
}
