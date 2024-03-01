
import { EmpresasData } from '@/hook/queries/useEmpresas'
import { create } from 'zustand'

type ActionsProps = {
  handleChangeSelectEmpresa: (empresas: EmpresasData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  empresas: EmpresasData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useSelectEmpresaStore = create<StoreProps>((set) => ({
  empresas: null,
  isOpen: false,
  actions: {
    handleChangeSelectEmpresa: (empresas) => set(() => ({ empresas, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, empresas: null })),
  },
}))
