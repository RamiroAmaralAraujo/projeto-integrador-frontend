import { useContext, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useAtendimentos } from "@/hook/queries/useAtendimentos";
import { useChatStore } from "@/store/MensagemAtendimentoStore";
import { Send } from "lucide-react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import socket from "../lib/socket";

export function ChatText() {
  const [mensagem, setMensagem] = useState("");
  const [sugestoes, setSugestoes] = useState<string[]>([]);
  const { data } = useChatStore((state) => ({ data: state.atendimentoId }));
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mensagensPreDefinidas = [
    `Bom dia, tudo bem? Meu nome é ${user?.userName}, serei o responsável por lhe atender agora. Em que posso ajudar?`,
    `Boa tarde, tudo bem? Meu nome é ${user?.userName}, serei o responsável por lhe atender agora. Em que posso ajudar?`,
    `Boa noite, tudo bem? Meu nome é ${user?.userName}, serei o responsável por lhe atender agora. Em que posso ajudar?`,
    "Verificamos aqui e seu atendimento já está em andamento. Em breve teremos uma atualização.",
    "Poderia, por gentileza, informar mais detalhes para que possamos continuar com o atendimento?",
    "Estamos validando as informações e logo retornamos com uma resposta.",
    "Seu atendimento está sendo processado. Agradecemos pela paciência.",
    "Identificamos seu chamado e já iniciamos a análise com a equipe responsável.",
    "Houve uma atualização recente no seu atendimento. Por favor, verifique se está tudo certo.",
    "Estamos com um volume alto de solicitações, mas sua demanda será tratada o mais breve possível.",
    "O seu caso foi encaminhado ao setor responsável. Assim que tivermos uma resposta, entraremos em contato.",
    "Finalizamos o atendimento conforme solicitado. Caso tenha mais alguma dúvida, ficamos à disposição!",
    "A equipe Core Commerce agradece o contato! Se precisar de algo mais, estamos a disposição.",
    "Encaminhamos as informações para o responsável técnico. Em breve você será atualizado.",
    "Nosso sistema registrou sua solicitação com sucesso.",
    "A documentação foi recebida. Assim que validarmos, retornamos com os próximos passos.",
    "Por favor nos envie o ID do seu Anydesk e aceite a solicitação de conexão.",
    "Segue o Link Para download do aplicativo de conexão remota Anydesk - https://anydesk.com/pt/downloads/thank-you?dv=win_exe.",
  ];

  const atendimentoId = data?.id;
  const { useReadAtendimentoById } = useAtendimentos();
  const { data: atendimento } = useReadAtendimentoById(atendimentoId ?? "");

  function normalizarTexto(texto: string) {
    return texto
      .normalize("NFD") // separa acento das letras
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^\w\s]/gi, "") // remove pontuação
      .toLowerCase(); // tudo minúsculo
  }

  function filtrarSugestoes(texto: string) {
    const termo = normalizarTexto(texto);
    const termosSeparados = termo.split(" ").filter(Boolean); // divide por palavras

    const filtradas = mensagensPreDefinidas.filter((msg) => {
      const msgNormalizada = normalizarTexto(msg);

      // verifica se TODAS as palavras digitadas estão presentes na mensagem
      return termosSeparados.every((palavra) =>
        msgNormalizada.includes(palavra)
      );
    });

    setSugestoes(texto.length > 1 ? filtradas : []);
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = e.target.value;
    setMensagem(texto);
    filtrarSugestoes(texto);
  };

  const selecionarSugestao = (sugestao: string) => {
    setMensagem(sugestao);
    setSugestoes([]);
  };

  const enviarMensagem = async () => {
    if (!mensagem.trim() || !user?.sub) return;

    const payload = {
      usuarioID: user.sub,
      atendimentoId: data?.id ?? "",
      autor: "ATENDENTE",
      mensagem,
      createdAt: new Date().toISOString(),
    };

    const payloadWpp = {
      mensagem,
      numero: atendimento?.telefone,
    };

    const payloadAtendimento = {
      status: "ANDAMENTO",
      emFila: true,
    };

    try {
      const apiUrl = import.meta.env.VITE_API;

      await fetch(`${apiUrl}atendimento-mensagem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await fetch("http://localhost:4000/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadWpp),
      });

      await fetch(`${apiUrl}atendimento/${atendimentoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadAtendimento),
      });

      socket.emit("novaMensagem", payload);
      setMensagem("");
      setSugestoes([]);
      toast.success("Mensagem enviada com sucesso!");
      await queryClient.invalidateQueries(["ATENDIMENTOMENSAGENS"]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      toast.error("Erro ao enviar a mensagem.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div>
      <div className="relative">
        {sugestoes.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-white shadow-md  -mt-14 rounded p-1 max-h-20 overflow-y-auto">
            {sugestoes.map((s, index) => (
              <li
                key={index}
                className="p-2 hover:bg-blue-100 cursor-pointer text-sm"
                onClick={() => selecionarSugestao(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-4 justify-center items-center bg-gray-100 shadow-xl rounded-xl p-2">
        <textarea
          placeholder="Digite sua mensagem..."
          className="w-full h-20 p-4 rounded-xl bg-gray-100 focus:outline-none resize-none text-brand-blue-500"
          value={mensagem}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={enviarMensagem}
          className="mt-2 flex items-center gap-2 text-brand-blue-400 hover:text-brand-blue-300 px-4 py-2 rounded"
        >
          <Send size={35} />
        </button>
      </div>
    </div>
  );
}
