import { useRead } from "@/hook/queries/useTicket"


interface CardTicketStatusProps {
  startDate: string
  endDate: string
}

export function CardTicketStatus({ startDate, endDate }: CardTicketStatusProps) {
  const { data } = useRead()
  const tickets = data

  const ticketsFiltrados = tickets?.filter((ticket) => {
    const createdAt = ticket.createdAt ? new Date(ticket.createdAt) : null
    return (
      createdAt &&
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    )
  }) || []

  const Aberto = ticketsFiltrados.filter(ticket => ticket.status === "ABERTO").length ?? 0
  const Andamento = ticketsFiltrados.filter(ticket => ticket.status === "ANDAMENTO").length ?? 0
  const Fechado = ticketsFiltrados.filter(ticket => ticket.status === "FECHADO").length ?? 0

  const total = Aberto + Andamento + Fechado

  const percentage = (value: number) => {
    return total > 0 ? (value / total) * 100 : 0
  }

  return (
    <div className="bg-white w-full rounded-2xl shadow-xl p-6 mb-4">
      <h1 className="font-bold text-brand-blue-500 text-2xl">
        Status dos Tickets
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
  )
}
