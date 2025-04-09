

import { TicketData } from '@/hook/queries/useTicket'
import { create } from 'zustand'

type ActionsProps = {
  handleChangeSelectResponsavel: (responsavel: TicketData| null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  responsavel: TicketData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useSelectResponsavelStore = create<StoreProps>((set) => ({
  responsavel: null,
  isOpen: false,
  actions: {
    handleChangeSelectResponsavel: (responsavel) => set(() => ({ responsavel, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, responsavel: null })),
  },
}))
