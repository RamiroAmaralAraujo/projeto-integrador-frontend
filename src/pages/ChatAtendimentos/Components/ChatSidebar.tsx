import { Input } from "@/components/ui/input";
import SelectFilter from "@/components/ui/selectFilter";
import { useAtendimentos } from "@/hook/queries/useAtendimentos";
import { useChatStore } from "@/store/MensagemAtendimentoStore";
import { useState } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

export function ChatSidebar() {
  const { useRead } = useAtendimentos();
  const { data, isLoading, isError } = useRead();

  const setAtendimentoId = useChatStore((state) => state.setAtendimentoId);
  const setSelectedId = useChatStore((state) => state.setSelectedId);
  const selectedId = useChatStore((state) => state.selectedId);

  const [showAtendimentoAberto, setshowAtendimentoAberto] = useState(true);
  const [showAtendimentoFechado, setshowAtendimentoFechado] = useState(false);
  const [showAtendimentoAndamento, setshowAtendimentoAndamento] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const TodosFiltros =
    showAtendimentoAberto || showAtendimentoFechado || showAtendimentoAndamento;

  const allowedStatus = [
    showAtendimentoAberto && "ABERTO",
    showAtendimentoFechado && "FECHADO",
    showAtendimentoAndamento && "ANDAMENTO",
  ].filter(Boolean);

  const atendimentosData = data?.filter((atendimento: any) => {
    const statusMatch = TodosFiltros
      ? allowedStatus.includes(atendimento.status)
      : true;
    const searchMatch =
      atendimento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.protocolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.telefone.toLowerCase().includes(searchTerm.toLowerCase())


    return statusMatch && searchMatch;
  });

  const handleSelectAtendimento = (id: string) => {
    setAtendimentoId(id);
    setSelectedId(id);
  };

  return (
    <div className="h-full w-full p-4 flex flex-col gap-6 overflow-y-auto bg-gray-50 rounded-3xl shadow-xl">
      
        <div>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Filtro de Atendimento"
          />
        </div>

        <div className="flex gap-2 w-full justify-center items-center ">
          <div className="w-1/3">
            <SelectFilter
              widthClass="W-24"
              heightClass="h-11"
              label="Novos"
              isSelected={showAtendimentoAberto}
              onClick={() => {
                setshowAtendimentoAberto(!showAtendimentoAberto);
                if (!showAtendimentoAberto) setshowAtendimentoFechado(false);
              }}
            />
          </div>

          <div className="w-1/3">
            <SelectFilter
              widthClass="w-full"
              heightClass="h-11"
              label="Andamento"
              isSelected={showAtendimentoAndamento}
              onClick={() => {
                setshowAtendimentoAndamento(!showAtendimentoAndamento);
                if (!showAtendimentoAndamento) {
                  setshowAtendimentoAberto(false);
                  setshowAtendimentoFechado(false);
                }
              }}
            />
          </div>

          <div className="w-1/3">
            <SelectFilter
              widthClass="w-full"
              heightClass="h-11"
              label="Fechados"
              isSelected={showAtendimentoFechado}
              onClick={() => {
                setshowAtendimentoFechado(!showAtendimentoFechado);
                if (!showAtendimentoFechado) setshowAtendimentoAberto(false);
              }}
            />
          </div>
        </div>
      

      {isLoading && <p className="text-center text-gray-500">Carregando...</p>}
      {isError && (
        <p className="text-center text-red-500">
          Erro ao carregar atendimentos
        </p>
      )}

      <div className="flex flex-col gap-4">
        {atendimentosData?.map((atendimento) => {
          const isSelected = atendimento.id === selectedId;

          return (
            <div
              key={atendimento.id}
              onClick={() => handleSelectAtendimento(atendimento.id)}
              className={`p-4 rounded-xl shadow-lg cursor-pointer transition-all ${
                isSelected
                  ? "bg-brand-blue-400 text-white"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            >
              <div className="flex justify-around items-center">
                <div>
                  <h2 className="font-semibold">{atendimento.nome}</h2>
                  <div className="flex items-baseline gap-1">
                    <p className="text-base ">Protocolo:</p>
                    <span className="font-semibold">
                      {atendimento.protocolo}
                    </span>
                  </div>
                </div>
                <span
                  title={atendimento.plataforma}
                  className={`w-8 h-8 flex justify-center items-center ${
                    atendimento.plataforma === "WHATSAPP"
                      ? "bg-green-500"
                      : atendimento.plataforma === "TELEGRAM"
                        ? "bg-blue-500"
                        : ""
                  }  text-white font-bold  rounded-full`}
                >
                  {atendimento.plataforma === "WHATSAPP" ? (
                    <FaWhatsapp size={22} />
                  ) : atendimento.plataforma === "TELEGRAM" ? (
                    <FaTelegram size={22} />
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
          );
        })}

        {atendimentosData?.length === 0 && !isLoading && (
          <p className="text-center text-gray-400">
            Nenhum atendimento localizado.
          </p>
        )}
      </div>
    </div>
  );
}
