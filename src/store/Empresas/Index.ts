
import { EmpresasData } from '@/hook/queries/useEmpresas'
import { create } from 'zustand'

type ActionsProps = {
  handleChange: (empresas: EmpresasData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  empresas: EmpresasData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useEmpresasStore = create<StoreProps>((set) => ({
  empresas: null,
  isOpen: false,
  actions: {
    handleChange: (empresas) => set(() => ({ empresas, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, empresas: null })),
  },
}))
