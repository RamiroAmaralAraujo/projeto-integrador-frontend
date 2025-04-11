import * as PrimitiveDialog from '@radix-ui/react-dialog'
import { X as Close } from 'lucide-react'
import { ReactNode } from 'react'

interface DialogContentProps {
  children: ReactNode,
  title: string,
  icon: ReactNode,
  text?: ReactNode
}

export function DialogContent({ children, title, icon, text }: DialogContentProps) {
  return (
    <PrimitiveDialog.Portal>
      <PrimitiveDialog.Overlay className="fixed z-50 bg-black/80 inset-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <PrimitiveDialog.Content className="md:min-w-[600px] fixed left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] z-50 rounded-2xl shadow-md bg-white duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <header className="py-6 px-6 flex items-center justify-between">
          <PrimitiveDialog.Title className="text-xl font-semibold text-base-title flex gap-3 text-brand-blue-500">
            {title} {icon} {text}
          </PrimitiveDialog.Title>
          <PrimitiveDialog.Close asChild>
            <button aria-label="Close">{<Close size={20} />}</button>
          </PrimitiveDialog.Close>
        </header>
        <main className="px-8">{children}</main>
      </PrimitiveDialog.Content>
    </PrimitiveDialog.Portal>
  )
}
