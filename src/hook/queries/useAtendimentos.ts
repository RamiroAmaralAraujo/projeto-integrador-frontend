import { useQuery} from 'react-query'
import { api } from '../../service/api'
import { PlataformaAtendimento } from '@/enums/PlataformaAtendimento'


export interface AtendimentosData {
  id:              string
  protocolo:       string
  telefone:        string
  nome:            string
  nota:            number
  createdAt:       Date
  empresaId:       string
  plataforma:      PlataformaAtendimento

}



async function read() {
  const response = await api.get('atendimento')
  
  return response.data
}


export function useRead() {
  

  return useQuery<[AtendimentosData]>({
    queryKey: ['ATENDIMENTOS'],
    queryFn: () => read(),
    onSuccess() {},
    onError() {},
  })
}


export function useAtendimentos() {
  return {
    useRead
  }
}
