import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'
import { toast } from 'react-toastify'
import { CreatePedidosData, UpdatePedidosData } from '@/pages/Pedidos/Components/Form'
import { TipoMovimentacao } from '@/enums/TipoMovimentacao'; // Importe o Enum aqui

export interface PedidosData {
  id:              string 
  tipo:            TipoMovimentacao  // Alterado de boolean para TipoMovimentacao
  quantidade:      number
  produtoId:       string
  empresaId:       string
  descricao:       string
  ped_url:         string
  data:            Date
  createdAt:       Date
  updatedAt:       Date
}

// Função de criação de pedidos
async function create(data: CreatePedidosData) {
  const payload = {
    ...data,
    tipo: data.tipo === 'ENTRADA' ? TipoMovimentacao.ENTRADA : TipoMovimentacao.SAIDA,
  };

  const response = await api.post('pedidos', payload);
  return response.data;
}

// Função de leitura de pedidos, convertendo boolean para enum
async function read(empresaId: string): Promise<PedidosData[]> {
  const response = await api.get('pedidos', { params: { empresaId } });

  // Mapeia os pedidos e usa diretamente o valor do tipo, assumindo que ele já está no formato correto do enum
  return response.data.map((pedido: any) => ({
    ...pedido,
    tipo: pedido.tipo === 'ENTRADA' ? TipoMovimentacao.ENTRADA : TipoMovimentacao.SAIDA,
  }));
}


// Função de remoção de pedidos
async function remove(id: string) {
  const response = await api.delete(`pedidos/${id}`);
  return response.data;
}

// Função de atualização de pedidos
async function update(data: UpdatePedidosData) {
  const id = data.id;
  const payload = {
    ...data,
    tipo: data.tipo === 'ENTRADA' ? TipoMovimentacao.ENTRADA : TipoMovimentacao.SAIDA,
  };

  const response = await api.patch(`pedidos/${id}`, payload);
  return response.data;
}

// Hook de leitura de pedidos
export function useRead() {
  const storedEmpresa = localStorage.getItem('EmpresaStorage');

  return useQuery<PedidosData[]>({
    queryKey: ['PEDIDOS'],
    queryFn: () => read(storedEmpresa || ''),
    onSuccess() {},
    onError() {},
  });
}

// Hook de criação de pedidos
export function useCreate() {
  const queryCliente = useQueryClient();
  return useMutation<any, AxiosError, CreatePedidosData>(create, {
    onSuccess(_: CreatePedidosData) {
      queryCliente.invalidateQueries({ queryKey: ['PEDIDOS'] });
      toast.success('Pedido cadastrado com sucesso!');
    },
    onError() {},
  });
}

// Hook de remoção de pedidos
export function useRemove() {
  const queryCliente = useQueryClient();
  return useMutation<any, AxiosError, string>(remove, {
    onSuccess(_: CreatePedidosData) {
      queryCliente.invalidateQueries({ queryKey: ['PEDIDO'] });
      toast.success('Pedido excluído com sucesso!');
    },
    onError() {},
  });
}

// Hook de atualização de pedidos
export function useUpdate() {
  const queryCliente = useQueryClient();
  return useMutation<any, AxiosError, UpdatePedidosData>(update, {
    onSuccess(_: UpdatePedidosData) {
      queryCliente.invalidateQueries({ queryKey: ['PEDIDO'] });
      toast.success('Pedido atualizado com sucesso!');
    },
    onError() { console.log("erro"); },
  });
}

// Hook principal que expõe as funções
export function usePedidos() {
  return {
    useRead,
    useCreate,
    useUpdate,
  };
}
