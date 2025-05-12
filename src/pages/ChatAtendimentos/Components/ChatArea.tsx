import {
  MensagensAtendimentoData,
  useRead,
} from "@/hook/queries/useMensagensAtendimento";
import LogoSemFundoAzul from "../../../assets/LogoSemFundoAzul.svg";
import IconeUsuario from "../../../assets/IconeUsuario.jpg"

import { useReadUsuario } from "@/hook/queries/useUsuarios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { UserRound } from "lucide-react";
import { useAtendimentos } from "@/hook/queries/useAtendimentos";
import { useChatStore } from "@/store/MensagemAtendimentoStore";
import { ChatText } from "./ChatText";
import { SkeletonMensagem } from "./SkeletonMensagem";

import { useEffect, useRef, useState } from "react";

import socket from "../lib/socket";
import { Status } from "@/enums/Status";
import { ChatFinaliza } from "./ChatFinaliza";
import { ChatInformacao } from "./ChatInformacao";

type MensagemProps = {
  nome: string;
  mensagem: string;
  dataHora: string;
  envioAtendente?: boolean;
  status?: Status;
  foto?: string;
};

function Mensagem({ nome, mensagem, dataHora, envioAtendente }: MensagemProps) {
  return (
    <div
      className={`w-full flex ${!envioAtendente ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`rounded-2xl w-5/6 p-4 mb-4 shadow-md ${
          envioAtendente ? "bg-brand-blue-200" : "bg-brand-blue-100"
        } text-brand-blue-500`}
      >
        <div className="flex items-baseline gap-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {envioAtendente ? (
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

function MensagemComUsuario({ msg }: { msg: MensagensAtendimentoData }) {
  if (msg.usuarioID === null) {
    return <MensagemCliente msg={msg} />;
  }
  return <MensagemAtendente msg={msg} />;
}

function MensagemCliente({ msg }: { msg: MensagensAtendimentoData }) {
  const atendimentoData = useChatStore((state) => state.atendimentoId);
  const atendimentoId = atendimentoData?.id;

  const { useReadAtendimentoById } = useAtendimentos();
  const { data: atendimento } = useReadAtendimentoById(atendimentoId ?? "");

  const nome = atendimento?.nome ?? "Cliente";
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
      envioAtendente={false}
    />
  );
}

function MensagemAtendente({ msg }: { msg: MensagensAtendimentoData }) {
  const { data: usuario, isLoading } = useReadUsuario(msg.usuarioID!);

  if (isLoading) return null;

  const nome = usuario?.userName ?? "Atendente";
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
      envioAtendente={true}
    />
  );
}

export function ChatArea() {
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const mensagensContainerRef = useRef<HTMLDivElement | null>(null);
  const [mensagens, setMensagens] = useState<MensagensAtendimentoData[]>([]);

  const atendimentoData = useChatStore((state) => state.atendimentoId);
  const atendimentoId = atendimentoData?.id;

  useEffect(() => {
    if (mensagensContainerRef.current) {
      mensagensContainerRef.current.scrollTo({
        top: mensagensContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [mensagens]);

  useEffect(() => {
    if (!atendimentoId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("joinRoom", atendimentoId);

    const novaMensagemHandler = (novaMsg: MensagensAtendimentoData) => {
      setMensagens((prev) => [...prev, novaMsg]);
    };

    socket.on("novaMensagem", novaMensagemHandler);

    return () => {
      socket.off("novaMensagem", novaMensagemHandler);
    };
  }, [atendimentoId]);

  const { useReadAtendimentoById } = useAtendimentos();
  const { data: atendimento } = useReadAtendimentoById(atendimentoId ?? "");

  const { data: mensagensIniciais, isLoading } = useRead();

  useEffect(() => {
    if (mensagensIniciais) {
      setMensagens(mensagensIniciais);
    }
  }, [mensagensIniciais]);

  if (isLoading || !mensagens) {
    return <SkeletonMensagem />;
  }

  const status = atendimento?.status;
  const possuiFoto = atendimento?.fotoperfil !== null
  const plataforma = atendimento?.plataforma;

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-3xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-full">
          {atendimento && (
            <>
              <div
                onClick={() => setMostrarDetalhes((prev) => !prev)}
                className="flex justify-start items-center w-full cursor-pointer hover:opacity-80 transition"
              >
                {plataforma === "WHATSAPP" ? (
                  <img
                    className="w-16 rounded-full object-cover"
                    src={
                      possuiFoto
                        ? `https://core-commerce.s3.sa-east-1.amazonaws.com/${atendimento?.fotoperfil}`
                        : IconeUsuario
                    }
                    alt="Foto do usuário"
                  />
                ) : plataforma === "TELEGRAM" ? (
                  <div className="w-16 h-16 rounded-full bg-brand-blue-500 flex items-center justify-center text-white font-bold">
                    <span className="font-light text-4xl">{atendimento?.nome.slice(0, 2).toUpperCase()}</span>
                  </div>
                ) : null}
                <div className="ml-4">
                  <h2 className="text-2xl font-semibold">
                    {atendimento?.nome}
                  </h2>
                </div>
              </div>

              {atendimento.status !== 'FECHADO' && (
                <div className="flex justify-end">
                <ChatFinaliza />
              </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex h-full gap-4">
        <div
          ref={mensagensContainerRef}
          className={`${mostrarDetalhes ? "w-2/3" : "w-full"} max-h-[570px] overflow-y-auto bg-gray-100 p-4 rounded-3xl shadow-lg mb-4 ${status === "FECHADO" ? "opacity-50" : ""}`}
        >
          <div className="space-y-4">
            <div className="w-full">
              {mensagens.map((msg) => (
                <MensagemComUsuario key={msg.id} msg={msg} />
              ))}
            </div>
          </div>
        </div>
       
        {mostrarDetalhes && (
           <ChatInformacao />
        )}
       
      </div>

      {status !== "FECHADO" && <ChatText />}
    </div>
  );
}
