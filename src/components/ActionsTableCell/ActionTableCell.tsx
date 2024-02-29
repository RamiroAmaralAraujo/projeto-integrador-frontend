import { ComponentProps, ReactElement } from 'react'

interface ActionTableCellProps extends ComponentProps<'button'> {
  icon: ReactElement
  onClick: () => void
}

export function ActionTableCell({ icon, onClick }: ActionTableCellProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="rounded-full p-2 hover:bg-base-hover hover:brightness-110 transition-all"
    >
      {icon}
    </button>
  )
}
