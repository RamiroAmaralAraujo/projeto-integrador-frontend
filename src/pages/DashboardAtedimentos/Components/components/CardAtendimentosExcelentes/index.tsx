import { useRead } from "@/hook/queries/useAtendimentos";
import { MessageSquareHeart } from "lucide-react";

interface CardAtendimentosExcelentesProps {
  startDate: string;
  endDate: string;
}

export function CardAtendimentosExcelentes({ startDate, endDate }: CardAtendimentosExcelentesProps) {
  const { data: atendimentos } = useRead();

  if (!atendimentos) {
    return <div>Carregando...</div>;
  }

  // Filtrando os atendimentos com base nas datas
  const filteredAtendimentos = atendimentos.filter((atendimento) => {
    const dataCriacao = new Date(atendimento.createdAt);
    return (
      dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate + "T23:59:59")
    );
  });

  const atendimentosExcelentes = filteredAtendimentos.filter(
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
