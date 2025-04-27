import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { AuthContext } from '@/Context/AuthContext'
import { useContext } from 'react'

export interface useNotificacaoTicketStatusData {
  id:      string
  userId?: string
  isRead?: Boolean
  isExcluida?: Boolean
  ticketId?: string
  createdAt?:  Date
  updatedAt?:  Date
  ticket?:{
    numero?: string
    status?: string
  }
  
  
}







async function read(usuarioID: string, isMaster: boolean) {
  if (!isMaster) {
    const response = await api.get('ticket-notificacao', { params: { usuarioID } })
    return response.data
  } else if (isMaster) {
    const response = await api.get('ticket-notificacao')
    return response.data
  }
}



async function update(data: useNotificacaoTicketStatusData) {
  const id = data.id
  const response = await api.patch(`ticket-notificacao/${id}`, data)
  return response.data
}












export function useRead() {
  const { user } = useContext(AuthContext)
  const usuarioID = user?.sub || ''
  const isMaster = user?.master || false
 
  return useQuery<useNotificacaoTicketStatusData[]>({
    queryKey: ['NOTIFICACAOTICKET'],
    queryFn: () => read(usuarioID, isMaster),
    onSuccess() {},
    onError() {},
  })
}







export function useUpdate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, useNotificacaoTicketStatusData>(update, {
    onSuccess(_: useNotificacaoTicketStatusData) {
      queryCliente.invalidateQueries({ queryKey: ['NOTIFICACAOTICKET'] })
    },
    onError() {console.log("erro")},
  })
}





export function useNotificacaoTicketStatus() {
  return {
    useRead,
    useUpdate,
  }
}
