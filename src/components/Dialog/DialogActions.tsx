import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog } from '.'

interface DialogActionsProps {
  defaultActions?: boolean
  isLoading?: boolean
  children?: ReactNode
}

export function DialogActions(props: DialogActionsProps) {
  const { defaultActions = true, isLoading, children } = props

  return (
    <footer className="py-6 flex items-center justify-end">
      {defaultActions && (
        <>
          <div className='flex gap-4'>
            <Dialog.Close asChild>
              <Button label='Cancelar' />
            </Dialog.Close>

            <Button
              type="submit"
              className="bg-brand-green-light text-white"
              label="Salvar"
              isLoading={isLoading}
            />
          </div>
        </>
      )}

      {children}
    </footer>
  )
}
