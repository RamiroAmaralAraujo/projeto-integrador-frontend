import { useRead } from "@/hook/queries/useTicket";
import { AlarmClockCheck } from "lucide-react";

interface CardTicketsMediaTempoProps {
  startDate: string;
  endDate: string;
}

export function CardTicketsMediaTempo({ startDate, endDate }: CardTicketsMediaTempoProps) {
  const { data: tickets } = useRead();

  if (!tickets) {
    return <div>Carregando...</div>;
  }

  const ticketsFiltrados = tickets.filter((atendimento) => {
    const createdAt = atendimento.createdAt ? new Date(atendimento.createdAt) : null;
    return (
      createdAt &&
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  });

  const ticketsFechados = ticketsFiltrados.filter(
    (atendimento) => atendimento.status === "FECHADO"
  );

  const temposDeTickets = ticketsFechados.map((atendimento) => {
    const createdAt = atendimento.createdAt ? new Date(atendimento.createdAt).getTime() : 0;
    const updatedAt = atendimento.updatedAt ? new Date(atendimento.updatedAt).getTime() : 0;
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
        Tempo Médio Finalização Ticket
      </h1>
      <div className="flex items-center justify-between gap-5 mt-5">
        <span className="text-2xl text-green-500 font-semibold">
          {mediaFormatada}
        </span>
        <div className="w-14 h-14 bg-green-300 rounded-full flex justify-center items-center text-green-700">
          <AlarmClockCheck size={30} />
        </div>
      </div>
    </div>
  );
}
