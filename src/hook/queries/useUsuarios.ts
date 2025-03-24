import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'

export interface UsuarioData {
  id: string
  userName: string
  email: string
  cpf: string
  password: string
  createAt: string
  updatedAt: string
  master: boolean
}

async function readUsuario(id: string): Promise<UsuarioData> {
  const response = await api.get(`usuarios/${id}`)
  return response.data
}

export function useReadUsuario(id: string) {
  return useQuery<UsuarioData, AxiosError>({
    queryKey: ['USUARIO', id],
    queryFn: () => readUsuario(id),
    onSuccess() {},
    onError() {
      console.error('Erro ao buscar usuário')
    },
  })
}

export function useUsuarios() {
  return {
    useReadUsuario,
  }
}
