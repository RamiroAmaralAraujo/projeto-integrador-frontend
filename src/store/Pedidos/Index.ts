
import { PedidosData } from '@/hook/queries/usePedidos'
import { create } from 'zustand'

type ActionsProps = {
  handleChange: (pedidos: PedidosData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  pedidos: PedidosData | null
  isOpen: boolean
  actions: ActionsProps
}

export const usePedidosStore = create<StoreProps>((set) => ({
  pedidos: null,
  isOpen: false,
  actions: {
    handleChange: (pedidos) => set(() => ({ pedidos, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, pedidos: null })),
  },
}))
