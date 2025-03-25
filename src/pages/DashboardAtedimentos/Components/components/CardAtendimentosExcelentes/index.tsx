import { useRead } from "@/hook/queries/useAtendimentos";
import { MessageSquareHeart } from "lucide-react";

export function CardAtendimentosExcelentes() {
  const { data: atendimentos } = useRead();

  if (!atendimentos) {
    return <div>Carregando...</div>;
  }

  const atendimentosExcelentes = atendimentos.filter(
    (atendimento) => atendimento.nota === 5
  );

  const somatorioAtendimentosExcelentes = atendimentosExcelentes.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Atendimentos Ótimos
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-green-500 font-semibold">
            {somatorioAtendimentosExcelentes}
          </span>
          <div className="w-14 h-14 bg-green-300 rounded-full flex justify-center items-center text-green-700">
            <MessageSquareHeart size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
