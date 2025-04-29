
import { useRead } from "@/hook/queries/useTicket";
import { TicketX } from "lucide-react";

interface CardTicketsCriticosProps {
  startDate: string;
  endDate: string;
}

export function CardTicketsCriticos({ startDate, endDate }: CardTicketsCriticosProps) {
  const { data: tickets } = useRead();

  if (!tickets) {
    return <div>Carregando...</div>;
  }

  // Filtrando os tickets críticos com base nas datas
  const ticketsCriticos = tickets.filter((atendimento) => {
    const dataCriacao = atendimento.createdAt ? new Date(atendimento.createdAt) : null;
    return (
      atendimento.avaliacao === 1 &&
      dataCriacao && dataCriacao >= new Date(startDate) &&
      dataCriacao <= new Date(endDate + "T23:59:59")
    );
  });

  const somatorioTicketsCriticos = ticketsCriticos.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Tickets Críticos
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-red-500 font-semibold">
            {somatorioTicketsCriticos}
          </span>
          <div className="w-14 h-14 bg-red-300 rounded-full flex justify-center items-center text-red-700">
            <TicketX size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
