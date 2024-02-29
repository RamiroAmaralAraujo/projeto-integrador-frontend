import { ReactNode } from 'react'
import { ActionsTable } from '.'
import { Pencil, Trash } from 'lucide-react'

interface ActionsTableCellProps {
  defaultActions?: boolean
  onEdit?: () => void
  onDelete?: () => void
  children?: ReactNode
}

export function ActionsTableCell(props: ActionsTableCellProps) {
  const { defaultActions = true, children, onEdit, onDelete } = props

  return (
    <div className="flex items-center justify-center gap-2">
      {defaultActions && (
        <>
          {onEdit && (
            <div className='bg-gray-300 rounded-full hover:bg-gray-200 '>
              <ActionsTable.Action icon={<Pencil size={20} />} onClick={onEdit} />
            </div>
          )}

          {onDelete && (
            <div className='bg-gray-300 rounded-full hover:bg-gray-200 text-red-700'>
              <ActionsTable.Action
                onClick={onDelete}
                icon={<Trash size={20} />}
              />
            </div>
          )}
        </>
      )}

      {children}
    </div>
  )
}
