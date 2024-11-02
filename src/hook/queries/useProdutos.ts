import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { api } from '../../service/api';
import { toast } from 'react-toastify';
import { CreateProdutosData, UpdateProdutosData } from '@/pages/Produtos/Components/Form';

// Definindo a interface de dados para o produto
export interface ProdutosData {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  sku: string;
  quantidade: string;
  categoriaId: string;
  EmpresaId: string;
  prod_url: string;
  createdAt: Date;
  updatedAt: Date;
}

// Função para criar um novo produto
async function create(data: CreateProdutosData) {
  const response = await api.post('produtos', data);
  return response.data;
}

// Função para ler produtos de uma empresa específica
async function read(empresaId: string) {
  const response = await api.get('produtos', { params: { empresaId } });
  return response.data;
}

// Função para remover um produto pelo ID
async function remove(id: string) {
  const response = await api.delete(`produtos/${id}`);
  return response.data;
}

// Função para atualizar um produto existente
async function update(data: UpdateProdutosData) {
  const id = data.id;
  const response = await api.patch(`produtos/${id}`, data);
  return response.data;
}

// Hook para leitura de produtos, utiliza empresa armazenada no localStorage
export function useRead() {
  const storedEmpresa = localStorage.getItem('EmpresaStorage') || '';

  return useQuery<ProdutosData[]>({
    queryKey: ['PRODUTOS'],
    queryFn: () => read(storedEmpresa),
    onSuccess() {
    },
    onError(error: unknown) {
      const axiosError = error as AxiosError;
      toast.error(`Erro ao carregar produtos: ${axiosError.message}`);
    },
  });
}

// Hook para criação de um novo produto
export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateProdutosData>(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['PRODUTOS']);
      toast.success('Produto cadastrado com sucesso!');
    },
    onError: (error: AxiosError) => {
      toast.error(`Erro ao cadastrar produto: ${error.message}`);
    },
  });
}

// Hook para remoção de um produto
export function useRemove() {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['PRODUTOS']);
      toast.success('Produto excluído com sucesso!');
    },
    onError: (error: AxiosError) => {
      toast.error(`Erro ao excluir produto: ${error.message}`);
    },
  });
}

// Hook para atualização de um produto
export function useUpdate() {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, UpdateProdutosData>(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['PRODUTOS']);
      toast.success('Produto atualizado com sucesso!');
    },
    onError: (error: AxiosError) => {
      toast.error(`Erro ao atualizar produto: ${error.message}`);
    },
  });
}

// Exporta os hooks de produto em um único objeto
export function useProdutos() {
  return {
    useRead,
    useCreate,
    useRemove,
    useUpdate,
  };
}
