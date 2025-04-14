import { ReactNode } from 'react'
import { ActionsTable } from '.'
import { Pencil, Trash, CheckCircle, Printer, UserRoundSearch, Search, TicketCheck, Smile  } from 'lucide-react'

interface ActionsTableCellProps {
  defaultActions?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onPrint?: () => void
  onSelectEmpresa?: () => void
  onIdentificaResp?: () => void
  onInformacao?: () => void
  onFinalizar?: () => void
  onAvaliar?: () => void
  children?: ReactNode
}

export function ActionsTableCell(props: ActionsTableCellProps) {
  const { defaultActions = true, children, onEdit, onDelete, onSelectEmpresa, onIdentificaResp, onInformacao, onFinalizar,onAvaliar, onPrint } = props

  return (
    <div className="flex items-center gap-2">
      {defaultActions && (
        <>
          {onEdit && (
            <div className='bg-gray-300 rounded-full text-brand-blue-500 hover:bg-gray-200 '>
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

          {onPrint && (
            <div className='bg-gray-300 rounded-full text-brand-blue-300 hover:bg-gray-200'>
              <ActionsTable.Action
                onClick={onPrint}
                icon={<Printer size={20} />}
              />
            </div>
          )}

          {onSelectEmpresa && (
            <div className='bg-gray-300 rounded-full hover:bg-gray-200 text-green-50 hover:text-green-600'>
              <ActionsTable.Action
                onClick={onSelectEmpresa}
                icon={<CheckCircle size={20} />}
              />
            </div>
          )}

          {onInformacao && (
            <div className='bg-gray-300 rounded-full hover:bg-gray-200 text-green-50 hover:text-brand-blue-500'>
              <ActionsTable.Action icon={<Search  size={20} />} onClick={onInformacao} />
            </div>
          )}

          {onIdentificaResp && (
            <div className='bg-gray-300 rounded-full hover:bg-gray-200 text-green-50 hover:text-brand-blue-500'>
              <ActionsTable.Action
                onClick={onIdentificaResp}
                icon={<UserRoundSearch  size={20} />}
              />
            </div>
          )}
          {onFinalizar && (
            <div className='bg-gray-300 rounded-full text-green-50 hover:bg-green-300 hover:text-green-700 '>
              <ActionsTable.Action icon={<TicketCheck size={20} />} onClick={onFinalizar} />
            </div>
          )}
          {onAvaliar && (
            <div className='bg-gray-300 rounded-full text-green-50 hover:bg-green-300 hover:text-green-700 '>
              <ActionsTable.Action icon={<Smile size={20} />} onClick={onAvaliar} />
            </div>
          )}               
        </>
      )}

      {children}
    </div>
  )
}
