// @/hook/queries/useCategorias.tsx

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { api } from '../../service/api';

import { toast } from 'react-toastify';
import { CreateCategoriasData, UpdateCategoriasData } from '@/pages/Categorias/Components/Form'; 

export interface CategoriasData {
  id: string;
  nome: string;
  descricao: string;
  parentId: string | null;
  empresaId: string;
  createdAt: string; // Se bugar algo, voltar para "Date"
  updatedAt: string;
}

// Função para criar uma nova categoria
async function createCategoria(data: CreateCategoriasData): Promise<CategoriasData> {
  const response = await api.post('categorias', data);
  return response.data;
}

// Função para ler as categorias da empresa
async function readCategorias(empresaId: string): Promise<CategoriasData[]> {
  const response = await api.get('categorias', { params: { empresaId } });
  return response.data;
}

// Função para remover uma categoria
async function removeCategoria(id: string): Promise<void> {
  await api.delete(`categorias/${id}`);
}

// Função para atualizar uma categoria existente
async function updateCategoria(data: UpdateCategoriasData): Promise<CategoriasData> {
  const id = data.id;
  const response = await api.patch(`categorias/${id}`, data);
  return response.data;
}

// Hook para ler as categorias
export function useRead() {
  const storedEmpresa = localStorage.getItem('EmpresaStorage') || '';

  return useQuery<CategoriasData[], AxiosError>({
    queryKey: ['CATEGORIAS', storedEmpresa],
    queryFn: () => readCategorias(storedEmpresa),
    onSuccess: () => {
      // Opcional: Adicione lógica de sucesso aqui
    },
    onError: (error) => {
      toast.error(`Erro ao buscar categorias: ${error.message}`);
    },
  });
}

// Hook para criar uma nova categoria
export function useCreate() {
  const queryClient = useQueryClient();
  return useMutation<CategoriasData, AxiosError, CreateCategoriasData>(createCategoria, {
    onSuccess: () => {
      queryClient.invalidateQueries(['CATEGORIAS']);
      toast.success('Categoria cadastrada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao criar categoria: ${error.message}`);
    },
  });
}

// Hook para remover uma categoria
export function useRemove() {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>(removeCategoria, {
    onSuccess: () => {
      queryClient.invalidateQueries(['CATEGORIAS']);
      toast.success('Categoria excluída com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao excluir categoria: ${error.message}`);
    },
  });
}

// Hook para atualizar uma categoria
export function useUpdate() {
  const queryClient = useQueryClient();
  return useMutation<CategoriasData, AxiosError, UpdateCategoriasData>(updateCategoria, {
    onSuccess: () => {
      queryClient.invalidateQueries(['CATEGORIAS']);
      toast.success('Categoria atualizada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar categoria: ${error.message}`);
    },
  });
}

// Hook centralizado para exportar todas as operações
export function useCategorias() {
  return {
    useRead,
    useCreate,
    useUpdate,
    useRemove,
  };
}
