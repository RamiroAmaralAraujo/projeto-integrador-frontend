import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { AuthContext } from '@/Context/AuthContext'
import { useContext } from 'react'

export interface EmpresasData {
  id: string
  empresaNome: string
  cnpj_cpf: String
  endereco: String
  bairro: String
  cidade: String
  uf: String
  cep: String
  usuarioID: String
}

async function read(usuarioID: string) {
  const response = await api.get('empresas',{params: {usuarioID}})
  
  return response.data
}

export function useRead() {
  const { user } = useContext(AuthContext)
 

  return useQuery<EmpresasData[]>({
    queryKey: ['EMPRESAS'],
    queryFn: () => read(user?.sub || ''),
    onSuccess() {},
    onError() {},
  })
}

export function useEmpresas() {
  return {
    useRead,
  }
}
