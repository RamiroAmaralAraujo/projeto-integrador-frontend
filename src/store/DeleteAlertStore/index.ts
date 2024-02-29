import { create } from 'zustand'

type ActionsProps = {
  onOpenAlert: (id?: string | null) => void
  onCloseAlert: () => void
  setLoading: (isLoading: boolean) => void
}

interface StoreProps {
  id?: string | null
  isLoading?: boolean
  isOpen: boolean
  actions: ActionsProps
}

export const useDeleteAlertStore = create<StoreProps>((set) => ({
  id: null,
  isOpen: false,
  isLoading: false,
  actions: {
    setLoading: (isLoading) => set(() => ({ isLoading })),
    onOpenAlert: (_id) => set(() => ({ id: _id, isOpen: true })),
    onCloseAlert: () => set(() => ({ isOpen: false, id: '' })),
  },
}))
