import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { toast } from 'react-toastify'
import { useTicketStore } from '@/store/Ticket/Index'

export interface MensagensTicketData {
  id:        string
  usuarioID: string
  ticketId: string
  mensagem:   string
  createdAt:  Date
  
}




async function create(data: MensagensTicketData) {
  const response = await api.post('ticketmensagem', data)
  return response.data
}

async function read(ticketId: string) {
  const response = await api.get('ticketmensagem', { params: { ticketId } });

  return response.data;
}




async function readTicket(data: MensagensTicketData) {
  const id = data.id
  const response = await api.get(`ticketmensagem/${id}`)
  return response.data
}










export function useRead() {
  const { data } = useTicketStore((state) => ({ data: state.ticket }));
  const ticketId = data?.id;

  return useQuery<MensagensTicketData[]>({
    queryKey: ['TICKETMENSAGENS', ticketId],
    queryFn: async () => {

      const response = await read(ticketId!);

      return response;
    },
    enabled: !!ticketId, 
    onSuccess() {},
    onError() {},
  });
}




export function useCreate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, MensagensTicketData>(create, {
    onSuccess(_: MensagensTicketData) {
      queryCliente.invalidateQueries({ queryKey: ['TICKETMENSAGENS'] })
      toast.success('Mensagem Enviada com Sucesso!')
    },
    onError() {},
  })
}







export function useReadTicket(id: string) {
  return useQuery<MensagensTicketData>({
    queryKey: ['TICKETMENSAGENS', id],
    queryFn: () => readTicket({ id } as MensagensTicketData), 
    enabled: !!id, 
  });
}


export function useMensagensTicket() {
  return {
    readTicket,
    useRead,
    useCreate,
    useReadTicket,
  }
}
