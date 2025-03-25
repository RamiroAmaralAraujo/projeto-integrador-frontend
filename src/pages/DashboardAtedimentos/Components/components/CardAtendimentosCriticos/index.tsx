import { useRead } from "@/hook/queries/useAtendimentos";
import { MessageSquareWarning } from "lucide-react";

export function CardAtendimentosCriticos() {
  const { data: atendimentos } = useRead();

  if (!atendimentos) {
    return <div>Carregando...</div>;
  }

  const atendimentosCriticos = atendimentos.filter(
    (atendimento) => atendimento.nota === 1
  );

  const somatorioAtendimentosCriticos = atendimentosCriticos.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Atendimentos Críticos
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-red-500 font-semibold">
            {somatorioAtendimentosCriticos}
          </span>
          <div className="w-14 h-14 bg-red-300 rounded-full flex justify-center items-center text-red-700">
            <MessageSquareWarning size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
