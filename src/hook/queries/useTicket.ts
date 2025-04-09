import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { AuthContext } from '@/Context/AuthContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { Prioridade } from '@/enums/Prioridade'
import { StatusTicket } from '@/enums/StatusTicket'
import { CategoriaTicket } from '@/enums/CategoriaTicket'
import { CreateTicketData, UpdateTicketData } from '@/pages/Ticket/Components/Form'

export interface TicketData {
  id:        string
  usuarioID: string
  titulo:    string
  descricao: string
  prioridade: Prioridade
  status:     StatusTicket
  responsavelId: string
  avaliacao:    number
  numero:    string
  categoria:  CategoriaTicket
  createdAt:  Date
  updatedAt:  Date
  
}




async function create(data: CreateTicketData) {
  const response = await api.post('ticket', data)
  return response.data
}

async function read(usuarioID: string, isMaster: boolean) {
  if (!isMaster) {
    const response = await api.get('ticket', { params: { usuarioID } })
    return response.data
  } else if (isMaster) {
    const response = await api.get('ticket')
    return response.data
  }
}

async function remove(id: string) {
  const response = await api.delete(`ticket/${id}`)
  return response.data
}

async function update(data: UpdateTicketData) {
  const id = data.id
  const response = await api.patch(`ticket/${id}`, data)
  return response.data
}

async function readTicket(data: TicketData) {
  const id = data.id
  const response = await api.get(`ticket/${id}`)
  return response.data
}










export function useRead() {
  const { user } = useContext(AuthContext)
  const usuarioID = user?.sub || ''
  const isMaster = user?.master || false
 
  return useQuery<TicketData[]>({
    queryKey: ['TICKET'],
    queryFn: () => read(usuarioID, isMaster),
    onSuccess() {},
    onError() {},
  })
}



export function useCreate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, CreateTicketData>(create, {
    onSuccess(_: CreateTicketData) {
      queryCliente.invalidateQueries({ queryKey: ['TICKET'] })
      toast.success('Ticket registrado com sucesso!')
    },
    onError() {},
  })
}

export function useRemove() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, string>(remove, {
    onSuccess(_: CreateTicketData) {
      queryCliente.invalidateQueries({ queryKey: ['TICKET'] })
      toast.success('Ticket excluido com sucesso!')
    },
    onError() {
      toast.error('Não é possível deletar o Ticket em andamento.')
    },
  })
}

export function useUpdate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, UpdateTicketData>(update, {
    onSuccess(_: UpdateTicketData) {
      queryCliente.invalidateQueries({ queryKey: ['TICKET'] })
      toast.success('Ticket Atualizado com sucesso!')
    },
    onError() {console.log("erro")},
  })
}

export function useSelectResponsavel() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, UpdateTicketData>(update, {
    onSuccess(_: UpdateTicketData) {
      queryCliente.invalidateQueries({ queryKey: ['TICKET'] })
      toast.success('Responsabilidade Atribuida com sucesso ao Ticket!')
    },
    onError() {console.log("erro")},
  })
}

export function useReadTicket(id: string) {
  return useQuery<TicketData>({
    queryKey: ['TICKET', id],
    queryFn: () => readTicket({ id } as TicketData), 
    enabled: !!id, 
  });
}


export function useTicket() {
  return {
    readTicket,
    useRead,
    useCreate,
    useUpdate,
    useRemove,
    useSelectResponsavel,
    useReadTicket,
  }
}
