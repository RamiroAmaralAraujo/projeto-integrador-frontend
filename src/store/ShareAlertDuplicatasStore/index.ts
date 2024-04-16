
import { DuplicatasData } from '@/hook/queries/useDuplicatas'
import { create } from 'zustand'

type ActionsProps = {
  handleChangeSelectDuplicata: (duplicata: DuplicatasData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  duplicata: DuplicatasData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useShareAlertDuplicatasStore = create<StoreProps>((set) => ({
  duplicata: null,
  isOpen: false,
  actions: {
    handleChangeSelectDuplicata: (duplicata) => set(() => ({ duplicata, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, duplicata: null })),
  },
}))
