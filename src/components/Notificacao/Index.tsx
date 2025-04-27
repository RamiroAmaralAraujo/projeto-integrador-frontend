import { Bell, BellDot } from "lucide-react";
import { useState } from "react";
import { NotificacaoExpanded } from "./NotificacaoExpanded";
import { useQueryClient } from "react-query";
import { useRead as useReadNotificacao } from "@/hook/queries/useNotificacaoTicketStatus";

export function Notificacao() {
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const { data: notificacao = [] } = useReadNotificacao();
  const novasNotificacoes = notificacao.some((n) => !n.isRead);

  const queryClient = useQueryClient();

  const handleToggle = () => {
    queryClient.invalidateQueries(["NOTIFICACAOTICKET"]);

    setMostrarDetalhes((prev) => !prev);
  };

  return (
    <div className="relative">
      <div onClick={handleToggle}>
        <div className="bg-gray-50 text-brand-blue-500 w-16 h-16 rounded-2xl flex justify-center items-center mr-14 hover:bg-gray-100 cursor-pointer">
          {novasNotificacoes ? (
            <BellDot size={30} className="text-red-500 animate-pulse"/>
          ) : (
            <Bell size={30} />
          )}
        </div>
      </div>

      <div
        className={`absolute right-0 top-20 transition-all duration-300 ease-in-out ${
          mostrarDetalhes ? "opacity-100 scale-100 max-h-[1000px]" : "opacity-0 scale-95 max-h-0 overflow-hidden"
        }`}
      >
        <NotificacaoExpanded />
      </div>
    </div>
  );
}
