
import { ProdutosData } from '@/hook/queries/useProdutos'
import { create } from 'zustand'

type ActionsProps = {
  handleChange: (produtos: ProdutosData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  produtos: ProdutosData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useProdutosStore = create<StoreProps>((set) => ({
  produtos: null,
  isOpen: false,
  actions: {
    handleChange: (produtos) => set(() => ({ produtos, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, produtos: null })),
  },
}))
