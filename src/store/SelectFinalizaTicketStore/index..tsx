

import { TicketData } from '@/hook/queries/useTicket'
import { create } from 'zustand'

type ActionsProps = {
  handleChangeFinalizaAtendimento: (FinalizaAtendimento: TicketData| null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  FinalizaTicket: TicketData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useFinalizaAtendimentoStore = create<StoreProps>((set) => ({
  FinalizaTicket: null,
  isOpen: false,
  actions: {
    handleChangeFinalizaAtendimento: (FinalizaTicket) => set(() => ({ FinalizaTicket, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, FinalizaTicket: null })),
  },
}))
