
import { useRead } from "@/hook/queries/useTicket";
import { TicketCheck } from "lucide-react";

interface CardTicketsExcelentesProps {
  startDate: string;
  endDate: string;
}

export function CardTicketsExcelentes({ startDate, endDate }: CardTicketsExcelentesProps) {
  const { data: tickets } = useRead();

  if (!tickets) {
    return <div>Carregando...</div>;
  }

  // Filtrando os tickets com base nas datas
  const filteredTickets = tickets.filter((tickets) => {
    const dataCriacao = new Date(tickets.createdAt ?? 0);
    return (
      dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate + "T23:59:59")
    );
  });

  const ticketsExcelentes = filteredTickets.filter(
    (tickets) => tickets.avaliacao === 5
  );

  const somatorioTicketsExcelentes = ticketsExcelentes.length;

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Tickets Ótimos
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-green-500 font-semibold">
            {somatorioTicketsExcelentes}
          </span>
          <div className="w-14 h-14 bg-green-300 rounded-full flex justify-center items-center text-green-700">
            <TicketCheck size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
