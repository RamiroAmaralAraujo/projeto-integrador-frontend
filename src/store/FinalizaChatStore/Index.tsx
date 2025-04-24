

import { AtendimentosData } from '@/hook/queries/useAtendimentos'
import { create } from 'zustand'

type ActionsProps = {
  handleChangeFinalizaChat: (FinalizaAtendimento: AtendimentosData| null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  FinalizaChat: AtendimentosData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useFinalizaChatStore = create<StoreProps>((set) => ({
  FinalizaChat: null,
  isOpen: false,
  actions: {
    handleChangeFinalizaChat: (FinalizaChat) => set(() => ({ FinalizaChat, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, FinalizaChat: null })),
  },
}))
