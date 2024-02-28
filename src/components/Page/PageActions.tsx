import { ReactNode } from 'react'

interface PageActionsProps {
  children: ReactNode
}

export function PageActions({ children }: PageActionsProps) {
  return <div className="flex items-center">{children}</div>
}
