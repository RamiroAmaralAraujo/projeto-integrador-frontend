import { useRead } from "@/hook/queries/useAtendimentos";
import { MessageSquareText } from "lucide-react";

export function CardAtendimentosTotal() {
  const { data: atendimentosData } = useRead();

  if (!atendimentosData) {
    return <div>Carregando...</div>;
  }

  const somatorioAtendimentos = atendimentosData.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Total de Atendimentos
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-gray-500 font-semibold">
            {somatorioAtendimentos}
          </span>
          <div className="w-14 h-14 bg-gray-300 rounded-full flex justify-center items-center text-gray-700">
            <MessageSquareText size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
