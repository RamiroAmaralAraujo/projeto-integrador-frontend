import { useRead } from "@/hook/queries/useAtendimentos";
import { Speech } from "lucide-react";


interface CardAtendimentosHumanoProps {
  startDate: string;
  endDate: string;
}

export function CardAtendimentosHumano({ startDate, endDate }: CardAtendimentosHumanoProps) {
  const { data: atendimentos } = useRead();

  if (!atendimentos) {
    return <div>Carregando...</div>;
  }

  // Filtrando os atendimentos críticos com base nas datas
  const atendimentosHumano = atendimentos.filter((atendimento) => {
    const dataCriacao = new Date(atendimento.createdAt);
    return (
      atendimento.supHumano  &&
      dataCriacao >= new Date(startDate) &&
      dataCriacao <= new Date(endDate + "T23:59:59")
    );
  });

  const somatorioAtendimentosHumano = atendimentosHumano.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mt-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Atendimentos Realizados por Humano.
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-gay-500 font-semibold">
            {somatorioAtendimentosHumano}
          </span>
          <div className="w-14 h-14 bg-gray-300 rounded-full flex justify-center items-center text-gray-700">
            <Speech   size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
