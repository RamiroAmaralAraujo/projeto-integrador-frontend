import { useState } from 'react'

export interface DialogStateProps<T> {
  isOpen: boolean
  data?: T
}

interface UseDialogProps<T> {
  isOpen: boolean
  data?: T
  closeDialog: () => void
  openDialog: (data?: T) => void
}

export default function useDialog<T>(): UseDialogProps<T> {
  const [dialog, setDialog] = useState<DialogStateProps<T>>({
    isOpen: false,
  })

  function closeDialog() {
    setDialog((oldState) => ({
      ...oldState,
      isOpen: false,
    }))
  }

  function openDialog(data?: T) {
    setDialog(() => ({
      isOpen: true,
      data,
    }))
  }

  return { isOpen: dialog.isOpen, data: dialog.data, closeDialog, openDialog }
}
