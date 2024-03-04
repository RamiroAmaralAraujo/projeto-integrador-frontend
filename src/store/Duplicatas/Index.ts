
import { DuplicatasData } from '@/hook/queries/useDuplicatas'
import { create } from 'zustand'

type ActionsProps = {
  handleChange: (duplicatas: DuplicatasData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  duplicatas: DuplicatasData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useDuplicatasStore = create<StoreProps>((set) => ({
  duplicatas: null,
  isOpen: false,
  actions: {
    handleChange: (duplicatas) => set(() => ({ duplicatas, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, duplicatas: null })),
  },
}))
