import { useRead } from "@/hook/queries/useAtendimentos";
import { AlarmClock } from "lucide-react";

interface CardAtendimentosMediaTempoFilaProps {
  startDate: string;
  endDate: string;
}

export function CardAtendimentosMediaTempoFila({ startDate, endDate }: CardAtendimentosMediaTempoFilaProps) {
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
    (atendimento) => atendimento.emFila
  );

  const temposDeAtendimentos = atendimentosAndamento.map((atendimento) => {
    const createdAt = new Date(atendimento.createdAt).getTime();
    const updatedAt = new Date(atendimento.updatedAt).getTime();
    return updatedAt - createdAt;
  });

  const mediaTempoMs =
    temposDeAtendimentos.length > 0
      ? temposDeAtendimentos.reduce((a, b) => a + b, 0) / temposDeAtendimentos.length
      : 0;

  // Converter para horas e minutos
  const totalMinutes = Math.floor(mediaTempoMs / 1000 / 60);
  const horas = Math.floor(totalMinutes / 60);
  const minutos = totalMinutes % 60;

  const mediaFormatada =
    mediaTempoMs > 0
      ? horas > 0
        ? `${horas}h ${minutos}min`
        : `${minutos}min`
      : "Sem dados";

  return (
    <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
      <h1 className="font-bold text-brand-blue-500 text-2xl">
        Tempo Médio em Fila
      </h1>
      <div className="flex items-center justify-between gap-5 mt-5">
        <span className="text-2xl text-yellow-500 font-semibold">
          {mediaFormatada}
        </span>
        <div className="w-14 h-14 bg-yellow-300 rounded-full flex justify-center items-center text-yellow-700">
          <AlarmClock size={30} />
        </div>
      </div>
    </div>
  );
}
