
import { useRead } from "@/hook/queries/useTicket";
import {  Ticket } from "lucide-react";

interface CardTicketsTotalProps {
  startDate: string;
  endDate: string;
}

export function CardTicketsTotal({ startDate, endDate }: CardTicketsTotalProps) {
  const { data: ticketsData } = useRead();

  if (!ticketsData) {
    return <div>Carregando...</div>;
  }

  // Filtrando os tickets de acordo com as datas passadas como propriedades
  const filteredTickets = ticketsData.filter((Tickets) => {
    const dataCriacao = Tickets.createdAt ? new Date(Tickets.createdAt) : null;
    return dataCriacao && dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate + "T23:59:59");
  });

  const somatorioTickets = filteredTickets.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Total de Tickets
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-gray-500 font-semibold">
            {somatorioTickets}
          </span>
          <div className="w-14 h-14 bg-gray-300 rounded-full flex justify-center items-center text-gray-700">
            <Ticket size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
