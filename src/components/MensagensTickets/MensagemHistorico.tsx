import { UserRound } from "lucide-react";
import LogoSemFundoAzul from "../../assets/LogoSemFundoAzul.svg";
import NotResult from "../../assets/NotResult.svg";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useRead } from "@/hook/queries/useMensagensTicket";
import { useReadUsuario } from "@/hook/queries/useUsuarios";
import { MensagensTicketData } from "@/hook/queries/useMensagensTicket";

type MensagemProps = {
  nome: string;
  mensagem: string;
  dataHora: string;
  isMaster?: boolean;
  foto?: string;
};

function Mensagem({
  nome,
  mensagem,
  dataHora,
  isMaster = false,
}: MensagemProps) {
  return (
    <div
      className={`w-full flex ${isMaster ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`rounded-2xl w-5/6 p-4 mb-4 shadow-md ${
          isMaster ? "bg-brand-blue-200" : "bg-brand-blue-100"
        } text-brand-blue-500`}
      >
        <div className="flex items-baseline gap-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {isMaster ? (
                <img src={LogoSemFundoAzul} width={20} alt="Logo" />
              ) : (
                <UserRound width={20} />
              )}
              <span className="font-bold">{nome}</span>
            </div>
            <span className="text-xs">{dataHora}</span>
          </div>
        </div>
        <div className="mt-2">{mensagem}</div>
      </div>
    </div>
  );
}

function MensagemComUsuario({ msg }: { msg: MensagensTicketData }) {
  const { data: usuario, isLoading } = useReadUsuario(msg.usuarioID);

  if (isLoading) return null;

  const nome = usuario?.userName ?? "Desconhecido";
  const isMaster = usuario?.master ?? false;
  const dataHora = format(
    new Date(msg.createdAt),
    "'às' HH:mm'h' 'em' dd/MM/yyyy",
    { locale: ptBR }
  );

  return (
    <Mensagem
      nome={nome}
      mensagem={msg.mensagem}
      dataHora={dataHora}
      isMaster={isMaster}
    />
  );
}

export function MensagemHistorico() {
  const { data: mensagens, isLoading } = useRead();

  if (isLoading)
    return (
      <>
        <div className="flex justify-start mb-4">
          <div className="w-5/6 h-32 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
        <div className="flex justify-end mb-4">
          <div className="w-5/6 h-32 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </>
    );

  if (!mensagens || mensagens.length === 0)
    return (
      <>
        <div className="flex justify-center items-center flex-col">
          <div>
            <h1 className="font-bold text-lg text-brand-blue-500">
              Ainda não foram adicionadas mensagens à esse Ticket.
            </h1>
          </div>
          <div className="flex justify-center items-center -mt-6">
            <img src={NotResult} alt="" width={200} />
          </div>
        </div>
      </>
    );

  return (
    <div className="w-full">
      {mensagens?.map((msg) => <MensagemComUsuario key={msg.id} msg={msg} />)}
    </div>
  );
}
