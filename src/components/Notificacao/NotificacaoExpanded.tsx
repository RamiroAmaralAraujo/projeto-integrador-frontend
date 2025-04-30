import { Ticket, Check, MessageCircle, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  useRead as useReadNotificacao,
  useUpdate,
} from "@/hook/queries/useNotificacaoStatus";
import { queryClient } from "@/service/reactQuery";
import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";

export function NotificacaoExpanded() {
  const { data: notificacao = [] } = useReadNotificacao();
  const { user } = useContext(AuthContext);
  const usuario = user?.sub;

  const { mutate } = useUpdate();
  const navigate = useNavigate();

  const handleMarkAsRead = (notificacaoId: string) => {
    mutate(
      { id: notificacaoId, isRead: true },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["NOTIFICACAO"]);
        },
      }
    );
  };

  const handleMarkAllAsRead = () => {
    notificacao.forEach((notificacao) => {
      if (!notificacao.isRead) handleMarkAsRead(notificacao.id);
    });
    queryClient.invalidateQueries(["NOTIFICACAO"]);
  };

  const handleMarkExcluida = (notificacaoId: string) => {
    mutate({ id: notificacaoId, isExcluida: true });
  };

  const novasNotificacoes = notificacao
    .filter((n) => !n.isRead && n.updatedAt)
    .filter((n) => n.userId === usuario || n.userId === null)
    .sort(
      (a, b) =>
        new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
    );

  const notificacoesLidas = notificacao
    .filter((n) => n.isRead && n.updatedAt)
    .filter((n) => n.userId === usuario || n.userId === null)
    .filter((n) => !n.isExcluida)
    .sort(
      (a, b) =>
        new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
    );

  return (
    <div className="relative w-[400px] shadow-xl rounded-3xl mr-14 bg-white max-h-[400px] overflow-y-auto">
      <div className="sticky top-0 z-[9999] bg-gray-50 flex justify-between py-4 px-6 border-b border-gray-200">
        <span className="font-bold text-brand-blue-500 flex items-center">
          Notificações
        </span>
        {novasNotificacoes.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-brand-blue-300 text-xs font-bold hover:text-brand-blue-200"
          >
            MARCAR TODAS COMO LIDAS
          </button>
        )}
      </div>

      {/* NOVAS NOTIFICAÇÕES */}
      <div
        className="divide-y-2 divide-gray-200"
        onClick={() => navigate("/tickets")}
      >
        {novasNotificacoes.length > 0 ? (
          novasNotificacoes.map((notificacao) => (
            <div
              key={notificacao.id}
              className="flex gap-6 py-4 px-8 bg-white items-center cursor-pointer"
              onClick={() => notificacao.ticketId ?? null}
            >
              {notificacao.atendimento?.status === "ABERTO" ? (
                <MessageCircle
                  className={`w-8 h-8 ${
                    notificacao.atendimento.status === "ABERTO"
                      ? "text-red-500"
                      : "text-brand-blue-500"
                  }`}
                />
              ) : (
                <Ticket
                  className={`w-8 h-8 ${
                    notificacao.ticket?.status === "ABERTO"
                      ? "text-red-500"
                      : "text-brand-blue-500"
                  }`}
                />
              )}

              <div className="flex-1 flex flex-col gap-2">
                <p className="text-sm leading-relaxed text-brand-blue-500">
                  <span>
                    {notificacao.ticket
                      ? notificacao.ticket.status === "ABERTO"
                        ? "Ticket criado, Nº"
                        : "Seu Ticket de Nº"
                      : notificacao.atendimento?.status === "ABERTO"
                        ? "Novo Chat, Nº"
                        : "Atendimento atualizado, Nº"}
                  </span>
                  <span className="font-bold">
                    #
                    {notificacao.ticket?.numero ||
                      notificacao.atendimento?.protocolo}
                  </span>
                  {notificacao.ticket?.status === "ANDAMENTO" &&
                    !notificacao.atendimento &&
                    " foi atualizado."}
                </p>
                <div className="text-xxs flex text-zinc-400 items-center gap-1">
                  <span>
                    {formatDistanceToNow(new Date(notificacao.updatedAt!), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 self-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsRead(notificacao.id);
                  }}
                  className="text-zinc-50 w-8 h-8 rounded flex items-center justify-center bg-brand-blue-500 hover:bg-brand-blue-400"
                >
                  <Check className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-sm text-gray-400 bg-white">
            Nenhuma nova notificação.
          </div>
        )}
      </div>

      {/* NOTIFICAÇÕES LIDAS */}
      {notificacoesLidas.length > 0 && (
        <div className="bg-gray-100">
          <div className="text-xs font-bold text-zinc-500 uppercase px-6 pt-4 pb-2">
            Lidas
          </div>
          <div className="divide-y divide-gray-300">
            {notificacoesLidas.map((notificacao) => (
              <div
                key={notificacao.id}
                className="flex gap-6 py-4 px-8 bg-gray-100 items-center opacity-70"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <p className="text-sm leading-relaxed text-gray-500">
                  <span>
                    {notificacao.ticket
                      ? notificacao.ticket.status === "ABERTO"
                        ? "Ticket criado, Nº"
                        : "Seu Ticket de Nº"
                      : notificacao.atendimento?.status === "ABERTO"
                        ? "Novo Chat, Nº"
                        : "Atendimento atualizado, Nº"}
                  </span>
                    <span className="font-bold">
                      
                      #
                      {notificacao.ticket?.numero ||
                        notificacao.atendimento?.protocolo}
                    </span>
                    {notificacao.ticket?.status === "ANDAMENTO" &&
                    !notificacao.atendimento &&
                    " foi atualizado."}
                  </p>
                  <div className="text-xxs flex text-zinc-400 items-center gap-1">
                    <span>
                      {formatDistanceToNow(new Date(notificacao.updatedAt!), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkExcluida(notificacao.id);
                    }}
                    className="text-zinc-50 w-8 h-8 rounded flex items-center justify-center bg-gray-500 hover:bg-gray-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
