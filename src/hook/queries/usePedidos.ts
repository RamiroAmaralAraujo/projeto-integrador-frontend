import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { api } from '../../service/api';
import { toast } from 'react-toastify';
import { CreatePedidosData, UpdatePedidosData } from '@/pages/Pedidos/Components/Form';
import { TipoMovimentacao } from '@/enums/TipoMovimentacao'; // Enum para TipoMovimentacao

// Interface para os dados de um Produto dentro de um Pedido
export interface PedidoProdutosData {
  produtoId: string;
  quantidade: number;  // A quantidade deve ser um número
}

// Interface para os dados de Pedidos
export interface PedidosData {
  id: string;
  identificador: string;
  tipo: TipoMovimentacao;
  empresaId: string;
  observacao: string;
  data: Date;
  createdAt: Date;
  updatedAt: Date;
  produtos: PedidoProdutosData[];  // Produtos associados ao pedido
}

interface BackendError {
  message: string;
}

// Tipo para representar cada produto dentro de um pedido
export type PedidoProdutosInput = CreatePedidosData['produtos'][number];

// Função de criação de pedidos
async function create(data: CreatePedidosData) {
  // O payload agora segue o formato correto
  const payload = {
    identificador: data.identificador,
    tipo: data.tipo === 'ENTRADA' ? TipoMovimentacao.ENTRADA : TipoMovimentacao.SAIDA,
    observacao: data.observacao,
    empresaId: data.empresaId,
    data: data.data,
    produtos: data.produtos.map((produto) => ({
      produtoId: produto.produtoId,
      quantidade: Number(produto.quantidade),  // Certifique-se de que a quantidade é um número
    })),
  };

  const response = await api.post('pedidos', payload);
  return response.data;
}

// Função de leitura de pedidos
async function read(empresaId: string): Promise<PedidosData[]> {
  const response = await api.get('pedidos', { params: { empresaId } });

  // Mapeia os pedidos e os produtos associados
  return response.data.map((pedido: any) => ({
    ...pedido,
    tipo: pedido.tipo === 'ENTRADA' ? TipoMovimentacao.ENTRADA : TipoMovimentacao.SAIDA,
    produtos: pedido.pedidoProdutos.map((pp: any) => ({
      produtoId: pp.produtoId,
      quantidade: pp.quantidade,
    })),
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
    identificador: data.identificador,
    tipo: data.tipo === 'ENTRADA' ? TipoMovimentacao.ENTRADA : TipoMovimentacao.SAIDA,
    observacao: data.observacao,
    empresaId: data.empresaId,
    data: data.data,
    produtos: data.produtos.map((produto) => ({
      produtoId: produto.produtoId,
      quantidade: Number(produto.quantidade),  // Certifique-se de que a quantidade é um número
    })),
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
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError<BackendError>, CreatePedidosData>(create, {
    onSuccess(_: CreatePedidosData) {
      queryClient.invalidateQueries({ queryKey: ['PEDIDOS'] });
      toast.success('Pedido cadastrado com sucesso!');
    },
    onError(error: AxiosError<BackendError>) {
      // Acessa a mensagem de erro se estiver presente, caso contrário usa uma mensagem padrão
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar pedido.';
      toast.error(`Erro: ${errorMessage}`);
    },
  });
}

// Hook de remoção de pedidos
export function useRemove() {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, string>(remove, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['PEDIDOS'] });
      toast.success('Pedido excluído com sucesso!');
    },
    onError() {
      toast.error('Erro ao excluir pedido.');
    },
  });
}

// Hook de atualização de pedidos
export function useUpdate() {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, UpdatePedidosData>(update, {
    onSuccess(_: UpdatePedidosData) {
      queryClient.invalidateQueries({ queryKey: ['PEDIDOS'] });
      toast.success('Pedido atualizado com sucesso!');
    },
    onError() {
      toast.error('Erro ao atualizar pedido.');
    },
  });
}

// Hook principal que expõe as funções
export function usePedidos() {
  return {
    useRead,
    useCreate,
    useUpdate,
    useRemove,
  };
}
