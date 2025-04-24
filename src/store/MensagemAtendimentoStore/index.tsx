import { AtendimentosData } from '@/hook/queries/useAtendimentos'
import create from 'zustand'

interface StoreProps {
  atendimentoId: AtendimentosData | null
  selectedId: string | null
  setAtendimentoId: (id: string | null) => void
  setSelectedId: (id: string | null) => void
}

export const useChatStore = create<StoreProps>((set) => ({
  atendimentoId: null,
  selectedId: null,

  setAtendimentoId: (id) => {
    const atendimentoData = id ? { id } as AtendimentosData : null
    set({ atendimentoId: atendimentoData })
  },

  setSelectedId: (id) => set({ selectedId: id }),
}))
