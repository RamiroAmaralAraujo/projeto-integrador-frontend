import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'

import { toast } from 'react-toastify'
import { CreateProdutosData, UpdateProdutosData } from '@/pages/Produtos/Components/Form'

export interface ProdutosData {
  id:              string 
  nome:            string 
  descricao:       string
  preco:           Number
  sku:             string
  quantidade:      string
  categoriaId:     string
  EmpresaId:       string
  prod_url:        string
  createdAt:       Date
  updatedAt:       Date

}

async function create(data: CreateProdutosData) {
  const response = await api.post('produtos', data)
  return response.data
}

async function read(empresaId: string) {
  const response = await api.get('produtos',{params: {empresaId}})
  
  return response.data
}

async function remove(id: string) {
  const response = await api.delete(`produtos/${id}`)
  return response.data
}

async function update(data: UpdateProdutosData) {
  const id = data.id
  const response = await api.patch(`produtos/${id}`, data)
  return response.data
}

 









export function useRead() {
  const storedEmpresa = localStorage.getItem('EmpresaStorage')
  

  return useQuery<ProdutosData[]>({
    queryKey: ['PRODUTOS'],
    queryFn: () => read(storedEmpresa || ''),
    onSuccess() {},
    onError() {},
  })
}

export function useCreate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, CreateProdutosData>(create, {
    onSuccess(_: CreateProdutosData) {
      queryCliente.invalidateQueries({ queryKey: ['PRODUTOS'] })
      toast.success('Produto Cadastrada com sucesso!')
    },
    onError() {},
  })
}

export function useRemove() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, string>(remove, {
    onSuccess(_: CreateProdutosData) {
      queryCliente.invalidateQueries({ queryKey: ['PRODUTO'] })
      toast.success('Produto Excluida com sucesso!')
    },
    onError() {},
  })
}

export function useUpdate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, UpdateProdutosData>(update, {
    onSuccess(_: UpdateProdutosData) {
      queryCliente.invalidateQueries({ queryKey: ['PRODUTO'] })
      toast.success('Produto Atualizada com sucesso!')
    },
    onError() {console.log("erro")},
  })
}



export function useProdutos() {
  return {
    useRead,
    useCreate,
    useUpdate,
  }
}
