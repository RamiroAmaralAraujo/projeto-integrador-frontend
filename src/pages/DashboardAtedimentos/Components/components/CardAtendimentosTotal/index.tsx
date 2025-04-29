import { useRead } from "@/hook/queries/useAtendimentos";
import { MessageSquareText } from "lucide-react";

interface CardAtendimentosTotalProps {
  startDate: string;
  endDate: string;
}

export function CardAtendimentosTotal({ startDate, endDate }: CardAtendimentosTotalProps) {
  const { data: atendimentosData } = useRead();

  if (!atendimentosData) {
    return <div>Carregando...</div>;
  }

  // Filtrando os atendimentos de acordo com as datas passadas como propriedades
  const filteredAtendimentos = atendimentosData.filter((atendimento) => {
    const dataCriacao = new Date(atendimento.createdAt);
    return dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate + "T23:59:59");
  });

  const somatorioAtendimentos = filteredAtendimentos.length;

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
