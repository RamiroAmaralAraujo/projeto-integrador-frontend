import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../../service/api";
import { PlataformaAtendimento } from "@/enums/PlataformaAtendimento";
import { Status } from "@/enums/Status";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface AtendimentosData {
  id: string;
  protocolo: string;
  telefone: string;
  nome: string;
  nota: number;
  createdAt: Date;
  empresaId: string;
  plataforma: PlataformaAtendimento;
  status: Status;
  fotoperfil: string;
  supHumano: boolean;
}

async function read() {
  const response = await api.get("atendimento");

  return response.data;
}

async function update(data: AtendimentosData) {
  const id = data.id;
  const response = await api.patch(`atendimento/${id}`, data);
  return response.data;
}

async function readById(atendimentoId: string) {
  const response = await api.get(`atendimento/${atendimentoId}`);
  return response.data;
}

export function useRead() {
  return useQuery<[AtendimentosData]>({
    queryKey: ["ATENDIMENTOS"],
    queryFn: () => read(),
    onSuccess() {},
    onError() {},
  });
}

export function useReadAtendimentoById(atendimentoId: string) {
  return useQuery<AtendimentosData>({
    queryKey: ["ATENDIMENTO", atendimentoId],
    queryFn: () => readById(atendimentoId),
    enabled: !!atendimentoId,
  });
}

export function useFinalizaAtendimento() {
  const queryCliente = useQueryClient();
  return useMutation<any, AxiosError, AtendimentosData>(update, {
    onSuccess(_: AtendimentosData) {
      queryCliente.invalidateQueries({ queryKey: ["ATENDIMENTO"] });
      toast.success("Atendimento Finalizado com Sucesso!");
    },
    onError() {
      console.log("erro");
    },
  });
}

export function useAtendimentos() {
  return {
    useRead,
    useReadAtendimentoById,
  };
}
