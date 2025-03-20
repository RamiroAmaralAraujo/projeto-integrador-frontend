import { useQuery} from 'react-query'
import { api } from '../../service/api'


export interface AtendimentosData {
  id:              string
  protocolo:       string
  telefone:        string
  nome:            string
  nota:            number
  createdAt:       Date
  empresaNome:     string
  empresaId:       string

}



async function read(empresaId: string) {
  const response = await api.get('atendimento',{params: {empresaId}})
  
  return response.data
}


export function useRead() {
  const storedEmpresa = localStorage.getItem('EmpresaStorage')
  

  return useQuery<[AtendimentosData]>({
    queryKey: ['ATENDIMENTOS'],
    queryFn: () => read(storedEmpresa || ''),
    onSuccess() {},
    onError() {},
  })
}


export function useAtendimentos() {
  return {
    useRead
  }
}
