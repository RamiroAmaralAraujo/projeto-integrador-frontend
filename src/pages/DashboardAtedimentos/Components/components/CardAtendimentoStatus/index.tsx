import { useRead } from "@/hook/queries/useAtendimentos";

interface CardAtendimentoStatusProps {
  startDate: string;
  endDate: string;
}

export function CardAtendimentoStatus({ startDate, endDate }: CardAtendimentoStatusProps) {
  const { data } = useRead();
  const atendimentos = data;

  const atendimentosFiltrados = atendimentos?.filter((atendimento) => {
    const createdAt = new Date(atendimento.createdAt);
    return (
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  }) || [];

  const Aberto = atendimentosFiltrados.filter(atendimento => atendimento.status === "ABERTO").length ?? 0;
  const Andamento = atendimentosFiltrados.filter(atendimento => atendimento.status === "ANDAMENTO").length ?? 0;
  const Fechado = atendimentosFiltrados.filter(atendimento => atendimento.status === "FECHADO").length ?? 0;

  const total = Aberto + Andamento + Fechado;

  const percentage = (value: number) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-xl p-6 mb-4">
      <h1 className="font-bold text-brand-blue-500 text-2xl">
        Status dos Atendimentos
      </h1>

      {/* Barra de progresso */}
      <div className="mt-8 w-full bg-gray-200 rounded-full h-6 overflow-hidden flex">
        <div
          className="h-full bg-green-400 transition-all duration-500"
          style={{ width: `${percentage(Fechado)}%` }}
        />
        <div
          className="h-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${percentage(Andamento)}%` }}
        />
        <div
          className="h-full bg-red-400 transition-all duration-500"
          style={{ width: `${percentage(Aberto)}%` }}
        />
      </div>

      {/* Legenda */}
      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full" />
          Fechado: {Fechado}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          Andamento: {Andamento}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full" />
          Aberto: {Aberto}
        </div>
      </div>
    </div>
  );
}
