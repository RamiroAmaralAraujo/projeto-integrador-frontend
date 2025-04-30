import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { AuthContext } from '@/Context/AuthContext'
import { useContext } from 'react'

export interface useNotificacaoStatusData {
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
  atendimento?:{
    protocolo?: string
    status?: string
  }
  
  
}







async function read(usuarioID: string, isMaster: boolean) {
  if (!isMaster) {
    const response = await api.get('notificacao', { params: { usuarioID } })
    return response.data
  } else if (isMaster) {
    const response = await api.get('notificacao')
    return response.data
  }
}



async function update(data: useNotificacaoStatusData) {
  const id = data.id
  const response = await api.patch(`notificacao/${id}`, data)
  return response.data
}












export function useRead() {
  const { user } = useContext(AuthContext)
  const usuarioID = user?.sub || ''
  const isMaster = user?.master || false
 
  return useQuery<useNotificacaoStatusData[]>({
    queryKey: ['NOTIFICACAO'],
    queryFn: () => read(usuarioID, isMaster),
    onSuccess() {},
    onError() {},
  })
}







export function useUpdate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, useNotificacaoStatusData>(update, {
    onSuccess(_: useNotificacaoStatusData) {
      queryCliente.invalidateQueries({ queryKey: ['NOTIFICACAO'] })
    },
    onError() {console.log("erro")},
  })
}





export function useNotificacaoStatus() {
  return {
    useRead,
    useUpdate,
  }
}
