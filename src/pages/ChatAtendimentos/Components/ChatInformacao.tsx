import { useAtendimentos } from "@/hook/queries/useAtendimentos";
import { useReadEmpresaById } from "@/hook/queries/useEmpresas";
import { useChatStore } from "@/store/MensagemAtendimentoStore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import IconeUsuario from "../../../assets/IconeUsuario.jpg"

export function ChatInformacao() {
  const atendimentoData = useChatStore((state) => state.atendimentoId);
  const atendimentoId = atendimentoData?.id;

  const { useReadAtendimentoById } = useAtendimentos();
  const { data: atendimento } = useReadAtendimentoById(atendimentoId ?? "");

  const EmpresaId = atendimento?.empresaId
  const { data: EmpresaAtendimento } = useReadEmpresaById(EmpresaId ?? "");


  const formatPhone = (phone: string) => {
    if (!phone || phone.length < 12) return phone; // Retorna como está se for inválido
    const ddd = phone.slice(2, 4);
    const secondPart = phone.slice(4, 8);
    const thirdPart = phone.slice(8, 13);
    return `(${ddd}) ${secondPart}-${thirdPart}`;
  };

  const telefone = atendimento?.telefone
  const possuiFoto = atendimento?.fotoperfil !== null
  

  return (
    <>
      <div className="w-1/3 overflow-y-auto bg-gray-100 p-4 rounded-3xl shadow-lg mb-4 flex flex-col justify-center items-center">
        
        
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-56 rounded-full"
            src={ possuiFoto ? `https://core-commerce.s3.sa-east-1.amazonaws.com/${atendimento?.fotoperfil}` : IconeUsuario}
            alt=""
          />

          <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-brand-blue-500 mt-8 text-center">
            {atendimento?.nome}
          </h1>
          <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-2xl font-semibold">{formatPhone(telefone ?? "").toString()}</span>
          <span
            title={atendimento?.plataforma}
            className={`w-8 h-8 flex justify-center items-center  ${
              atendimento?.plataforma === "WHATSAPP"
                ? "bg-green-500"
                : atendimento?.plataforma === "TELEGRAM"
                  ? "bg-blue-500"
                  : ""
            }  text-white font-bold  rounded-full`}
          >
            {atendimento?.plataforma === "WHATSAPP" ? (
              <FaWhatsapp size={25} />
            ) : atendimento?.plataforma === "TELEGRAM" ? (
              <FaTelegram size={25} />
            ) : (
              ""
            )}
          </span>
          </div>
          </div>
        </div>
        
       
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-lg font-semibold">
            Atendimento Solicitado para empresa:
          </h1>
          <span className="text-lg font-bold">{EmpresaAtendimento?.empresaNome}</span>
          <span className="text-lg font-bold">CNPJ: {EmpresaAtendimento?.cnpj_cpf}</span>
        </div>

        <div className="flex gap-2 items-center mt-6">
          <span className="text-lg font-semibold">
            {atendimento?.createdAt
              ? format(
                  new Date(atendimento.createdAt),
                  "'Início às' HH:mm'h' 'em' dd/MM/yyyy",
                  { locale: ptBR }
                )
              : ""}
          </span>
        </div>
        
      </div>
    </>
  );
}
