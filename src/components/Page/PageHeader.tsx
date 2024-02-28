import { ReactNode } from 'react'

interface PageHeaderProps {
  children: ReactNode
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      {children}
    </header>
  )
}
