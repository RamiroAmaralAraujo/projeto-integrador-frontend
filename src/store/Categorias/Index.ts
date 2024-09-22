
import { CategoriasData } from '@/hook/queries/useCategorias'
import { create } from 'zustand'

type ActionsProps = {
  handleChange: (categorias: CategoriasData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  categorias: CategoriasData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useCategoriasStore = create<StoreProps>((set) => ({
  categorias: null,
  isOpen: false,
  actions: {
    handleChange: (categorias) => set(() => ({ categorias, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, categorias: null })),
  },
}))
