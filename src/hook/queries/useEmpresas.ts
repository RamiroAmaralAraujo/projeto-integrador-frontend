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


async function read() {
  const response = await api.get('empresas', {params: {usuarioID: "3407be36-ee0d-4db9-8239-84c2ff66fb2d"}})
  return response.data
}


export function useRead() {
  return useQuery<EmpresasData[]>({
    queryKey: ['EMPRESAS'],
    queryFn: read,
    onSuccess() {},
    onError() {},
  })
}


export function useEmpresas() {
  return {
    useRead,
  }
}
