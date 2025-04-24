import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { toast } from 'react-toastify'
import { useChatStore } from '@/store/MensagemAtendimentoStore'
import { AutorMensagemAtendimento } from '@/enums/AutorMensagemAtendimento'

export interface MensagensAtendimentoData {
  id:        string
  usuarioID: string
  atendimentoId: string
  mensagem:   string
  createdAt:  Date
  autor:    AutorMensagemAtendimento
}




async function create(data: MensagensAtendimentoData) {
  const response = await api.post('atendimento-mensagem', data)
  return response.data
}

async function read(atendimentoId: string) {
  const response = await api.get('atendimento-mensagem', { params: { atendimentoId } });

  return response.data;
}






async function readAtendimento(data: MensagensAtendimentoData) {
  const id = data.id
  const response = await api.get(`atendimento-mensagem/${id}`)
  return response.data
}










export function useRead() {

    const { data } = useChatStore((state) => ({ data: state.atendimentoId}));
    const atendimentoId = data?.id

  return useQuery<MensagensAtendimentoData[]>({
    queryKey: ['ATENDIMENTOMENSAGENS', atendimentoId],
    queryFn: async () => {

      const response = await read(atendimentoId!);

      return response;
    },
    enabled: !!atendimentoId, 
    onSuccess() {},
    onError() {},
  });
}




export function useCreate() {
  const queryCliente = useQueryClient()
  return useMutation<any, AxiosError, MensagensAtendimentoData>(create, {
    onSuccess(_: MensagensAtendimentoData) {
      queryCliente.invalidateQueries({ queryKey: ['ATENDIMENTOMENSAGENS'] })
      toast.success('Mensagem Enviada com Sucesso!')
    },
    onError() {},
  })
}







export function useReadAtendimento(id: string) {
  return useQuery<MensagensAtendimentoData>({
    queryKey: ['ATENDIMENTOMENSAGENS', id],
    queryFn: () => readAtendimento({ id } as MensagensAtendimentoData), 
    enabled: !!id, 
  });
}





export function useMensagensAtendimento() {
  return {
    readAtendimento,
    useRead,
    useCreate,
    useReadAtendimento,
  }
}
