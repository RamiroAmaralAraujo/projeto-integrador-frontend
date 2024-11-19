
import { PedidosData } from '@/hook/queries/usePedidos'
import { create } from 'zustand'

type ActionsProps = {
  handleChangeSelectPedido: (pedido: PedidosData | null) => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
}

interface StoreProps {
  pedido: PedidosData | null
  isOpen: boolean
  actions: ActionsProps
}

export const useShareAlertPedidosStore = create<StoreProps>((set) => ({
  pedido: null,
  isOpen: false,
  actions: {
    handleChangeSelectPedido: (pedido) => set(() => ({ pedido, isOpen: true })),
    handleOpenDialog: () => set(() => ({ isOpen: true })),
    handleCloseDialog: () => set(() => ({ isOpen: false, pedido: null })),
  },
}))
