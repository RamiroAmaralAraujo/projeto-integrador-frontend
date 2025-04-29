import { useRead } from "@/hook/queries/useAtendimentos";
import { Bot  } from "lucide-react";

interface CardAtendimentosBotProps {
  startDate: string;
  endDate: string;
}

export function CardAtendimentosBot({ startDate, endDate }: CardAtendimentosBotProps) {
  const { data: atendimentos } = useRead();

  if (!atendimentos) {
    return <div>Carregando...</div>;
  }

  // Filtrando os atendimentos críticos com base nas datas
  const atendimentosBot = atendimentos.filter((atendimento) => {
    const dataCriacao = new Date(atendimento.createdAt);
    return (
      !atendimento.supHumano  &&
      dataCriacao >= new Date(startDate) &&
      dataCriacao <= new Date(endDate + "T23:59:59")
    );
  });

  const somatorioAtendimentosBot = atendimentosBot.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mt-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Atendimentos Realizados por Bot.
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-blue-500 font-semibold">
            {somatorioAtendimentosBot}
          </span>
          <div className="w-14 h-14 bg-blue-300 rounded-full flex justify-center items-center text-blue-700">
            <Bot   size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
