import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { AuthContext } from '@/Context/AuthContext'
import { useContext } from 'react'
import { CreateEmpresasData, UpdateEmpresasData } from '@/pages/Empresas/Components/Form'
import { toast } from 'react-toastify'

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
  logo_url: String
}




async function create(data: CreateEmpresasData) {
  const response = await api.post('empresas', data)
  return response.data
}

async function read(usuarioID: string, isMaster: boolean) {
  if (!isMaster) {
    const response = await api.get('empresas', { params: { usuarioID } })
    return response.data
  } else if (isMaster) {
    const response = await api.get('empresas')
    return response.data
  }
}

async function remove(id: string) {
  const response = await api.delete(`empresas/${id}`)
  return response.data
}

async function update(data: UpdateEmpresasData) {
  const id = data.id
  const response = await api.patch(`empresas/${id}`, data)
  return response.data
}

async function readempresa(data: EmpresasData) {
  const id = data.id
  const response = await api.get(`empresas/${id}`)
  return response.data
}

async function readempresabyid(id: string) {
  const response = await api.get(`empresas/${id}`)
  return response.data
}











export function useRead() {
  const { user } = useContext(AuthContext)
  const usuarioID = user?.sub || ''
  const isMaster = user?.master || false
 
  return useQuery<EmpresasData[]>({
    queryKey: ['EMPRESAS'],
    queryFn: () => read(usuarioID, isMaster),
    onSuccess() {},
    onError() {},
  })
}

export function useReadEmpresaById(id: string) {
  return useQuery<EmpresasData>({
    queryKey: ['EMPRESAS', id],
    queryFn: () => readempresabyid(id), 
    onSuccess() {},
    onError() {},
  })
}


export function useCreate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, CreateEmpresasData>(create, {
    onSuccess(_: CreateEmpresasData) {
      queryCliente.invalidateQueries({ queryKey: ['EMPRESAS'] })
      toast.success('Empresa Cadastrada com sucesso!')
    },
    onError() {},
  })
}

export function useRemove() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, string>(remove, {
    onSuccess(_: CreateEmpresasData) {
      queryCliente.invalidateQueries({ queryKey: ['EMPRESA'] })
      toast.success('Empresa Excluida com sucesso!')
    },
    onError() {
      toast.error('Não é possível deletar Empresas com duplicatas registradas em sistema.')
    },
  })
}

export function useUpdate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, UpdateEmpresasData>(update, {
    onSuccess(_: UpdateEmpresasData) {
      queryCliente.invalidateQueries({ queryKey: ['EMPRESA'] })
      toast.success('Empresa Atualizada com sucesso!')
    },
    onError() {console.log("erro")},
  })
}


export function useSelectEmpresa() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, EmpresasData>(readempresa, {
    onSuccess(_: EmpresasData) {
      queryCliente.invalidateQueries({ queryKey: ['EMPRESA'] })
      toast.success('Empresa selecionada com sucesso!')
    },
    onError() {console.log("erro")},
  })
}

export function useEmpresas() {
  return {
    useRead,
    useCreate,
    useUpdate,
    useSelectEmpresa,
    useReadEmpresaById
  }
}
