import { useRead } from "@/hook/queries/useAtendimentos";
import { MessageSquareText } from "lucide-react";

interface CardAtendimentosAndamentoProps {
  startDate: string;
  endDate: string;
}

export function CardAtendimentosAndamento({ startDate, endDate }: CardAtendimentosAndamentoProps) {
  const { data: atendimentos } = useRead();

  if (!atendimentos) {
    return <div>Carregando...</div>;
  }

  const atendimentosFiltrados = atendimentos.filter((atendimento) => {
    const createdAt = new Date(atendimento.createdAt);
    return (
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  });

  const atendimentosAndamento = atendimentosFiltrados.filter(
    (atendimento) => atendimento.status !== "FECHADO"
  );

  const somatorioAtendimentosAndamento = atendimentosAndamento.length;

  return (
    <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
      <h1 className="font-bold text-brand-blue-500 text-2xl">
        Total Em Atendimento
      </h1>
      <div className="flex items-center justify-between gap-5 mt-5">
        <span className="text-2xl text-gray-500 font-semibold">
          {somatorioAtendimentosAndamento}
        </span>
        <div className="w-14 h-14 bg-gray-300 rounded-full flex justify-center items-center text-gray-700">
          <MessageSquareText size={30} />
        </div>
      </div>
    </div>
  );
}
