import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'

import { toast } from 'react-toastify'
import { CreateDuplicatasData, UpdateDuplicatasData } from '@/pages/Pagaveis/Components/Form'

export interface DuplicatasData {
  id:              string 
  tipoPag:         boolean 
  pessoaRef:       string
  vencimento:      Date
  data_Pag_Receb:  Date
  descricao:       string
  valorLiq:        Number
  desconto:        Number
  descontoPorcento:Number
  acresc:          Number
  acrescPorcento:  Number
  valorFinal:      Number
  responsavel:     string
  comp_url:        string
  ass_url:         string
  empresaId:       string
  documento:       Number
  createdAt:       Date
  updatedAt:       Date

}

async function create(data: CreateDuplicatasData) {
  const response = await api.post('duplicatas', data)
  return response.data
}

async function read(empresaId: string) {
  const response = await api.get('duplicatas',{params: {empresaId}})
  
  return response.data
}

async function remove(id: string) {
  const response = await api.delete(`duplicatas/${id}`)
  return response.data
}

async function update(data: UpdateDuplicatasData) {
  const id = data.id
  const response = await api.patch(`duplicatas/${id}`, data)
  return response.data
}

 









export function useRead() {
  const storedEmpresa = localStorage.getItem('EmpresaStorage')
  

  return useQuery<DuplicatasData[]>({
    queryKey: ['DUPLICATAS'],
    queryFn: () => read(storedEmpresa || ''),
    onSuccess() {},
    onError() {},
  })
}

export function useCreate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, CreateDuplicatasData>(create, {
    onSuccess(_: CreateDuplicatasData) {
      queryCliente.invalidateQueries({ queryKey: ['DUPLICATAS'] })
      toast.success('Duplicata Cadastrada com sucesso!')
    },
    onError() {},
  })
}

export function useRemove() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, string>(remove, {
    onSuccess(_: CreateDuplicatasData) {
      queryCliente.invalidateQueries({ queryKey: ['DUPLICATA'] })
      toast.success('Duplicata Excluida com sucesso!')
    },
    onError() {},
  })
}

export function useUpdate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, UpdateDuplicatasData>(update, {
    onSuccess(_: UpdateDuplicatasData) {
      queryCliente.invalidateQueries({ queryKey: ['DUPLICATA'] })
      toast.success('Duplicata Atualizada com sucesso!')
    },
    onError() {console.log("erro")},
  })
}



export function useDuplicatas() {
  return {
    useRead,
    useCreate,
    useUpdate,
  }
}
