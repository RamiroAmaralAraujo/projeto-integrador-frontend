import { useRead } from "@/hook/queries/useTicket";
import { AlarmClock } from "lucide-react";

interface CardTicketsMediaTempoFilaProps {
  startDate: string;
  endDate: string;
}

export function CardTicketsMediaTempoFila({ startDate, endDate }: CardTicketsMediaTempoFilaProps) {
  const { data: tickets } = useRead();

  if (!tickets) {
    return <div>Carregando...</div>;
  }

  const ticketsFiltrados = tickets.filter((ticket) => {
    const createdAt = ticket.createdAt ? new Date(ticket.createdAt) : new Date(0);
    return (
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  });

  const ticketsAndamento = ticketsFiltrados.filter(
    (ticket) => ticket.status === "ANDAMENTO"
  );

  const temposDeTickets = ticketsAndamento.map((ticket) => {
    const createdAt = ticket.createdAt ? new Date(ticket.createdAt).getTime() : 0;
    const updatedAt = ticket.updatedAt ? new Date(ticket.updatedAt).getTime() : 0;
    return updatedAt - createdAt;
  });

  const mediaTempoMs =
    temposDeTickets.length > 0
      ? temposDeTickets.reduce((a, b) => a + b, 0) / temposDeTickets.length
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
        Tempo Médio para atribuição de Responsável
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
