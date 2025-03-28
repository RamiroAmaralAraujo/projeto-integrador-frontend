// @/hook/queries/useUsuarios.tsx

import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { api } from '../../service/api';

import { toast } from 'react-toastify';

export interface UsuarioData {
  id: string;
  userName: string;
  email: string;
  cpf: string;
  password: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  createAt: string;
  updatedAt: string;
  master: boolean;
}

// Função para ler todos os usuários
export async function readUsuarios(): Promise<UsuarioData[]> {
  const response = await api.get("/usuarios");
  return response.data;
}

// Função para ler um único usuário
async function readUsuario(id: string): Promise<UsuarioData> {
  const response = await api.get(`usuarios/${id}`);
  return response.data;
}

// Hook para ler todos os usuários
export function useRead() {
  return useQuery<UsuarioData[], AxiosError>({
    queryKey: ['USUARIOS'],
    queryFn: readUsuarios,
    onSuccess: () => {
      // Opcional: Adicionar lógica de sucesso
    },
    onError: (error) => {
      toast.error(`Erro ao buscar usuários: ${error.message}`);
    },
  });
}

// Hook para ler um único usuário pelo ID
export function useReadUsuario(id: string) {
  return useQuery<UsuarioData, AxiosError>({
    queryKey: ['USUARIO', id],
    queryFn: () => readUsuario(id),
    onSuccess: () => {
      // Opcional: Adicionar lógica de sucesso
    },
    onError: (error) => {
      toast.error(`Erro ao buscar usuário: ${error.message}`);
    },
  });
}

// Hook centralizado para exportar todas as operações
export function useUsuarios() {
  return {
    useRead,
    useReadUsuario,
  };
}
