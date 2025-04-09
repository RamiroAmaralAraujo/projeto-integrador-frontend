

import { TicketData } from '@/hook/queries/useTicket'
import { create } from 'zustand'

type ActionsProps = {
  handleChange: (ticket: TicketData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  ticket: TicketData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useTicketStore = create<StoreProps>((set) => ({
  ticket: null,
  isOpen: false,
  actions: {
    handleChange: (ticket) => set(() => ({ ticket, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, ticket: null })),
  },
}))
