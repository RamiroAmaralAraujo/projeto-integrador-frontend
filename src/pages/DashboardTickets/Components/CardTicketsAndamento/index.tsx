import { useRead } from "@/hook/queries/useTicket";
import {  TicketSlash } from "lucide-react";

interface CardTicketsAndamentoProps {
  startDate: string;
  endDate: string;
}

export function CardTicketsAndamento({ startDate, endDate }: CardTicketsAndamentoProps) {
  const { data: tickets } = useRead();

  if (!tickets) {
    return <div>Carregando...</div>;
  }

  const ticketsFiltrados = tickets.filter((ticket) => {
    const createdAt = ticket.createdAt ? new Date(ticket.createdAt) : null;
    return (
      createdAt &&
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  });

  const ticketsAndamento = ticketsFiltrados.filter(
    (ticket) => ticket.status !== "FECHADO"
  );

  const somatorioTicketsAndamento = ticketsAndamento.length;

  return (
    <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
      <h1 className="font-bold text-brand-blue-500 text-2xl">
        Total de Tickets em andamento
      </h1>
      <div className="flex items-center justify-between gap-5 mt-5">
        <span className="text-2xl text-gray-500 font-semibold">
          {somatorioTicketsAndamento}
        </span>
        <div className="w-14 h-14 bg-gray-300 rounded-full flex justify-center items-center text-gray-700">
          <TicketSlash size={30} />
        </div>
      </div>
    </div>
  );
}
