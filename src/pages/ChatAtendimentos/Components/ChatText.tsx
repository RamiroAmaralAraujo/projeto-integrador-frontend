import { AuthContext } from "@/Context/AuthContext";
import { useAtendimentos } from "@/hook/queries/useAtendimentos";
import { useChatStore } from "@/store/MensagemAtendimentoStore";
import { Send } from "lucide-react";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import socket from "../lib/socket";

export function ChatText() {
  const [mensagem, setMensagem] = useState("");
  const { data } = useChatStore((state) => ({ data: state.atendimentoId }));
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const atendimentoId = data?.id;

  const { useReadAtendimentoById } = useAtendimentos();
  const { data: atendimento } = useReadAtendimentoById(atendimentoId ?? "");



  const enviarMensagem = async () => {
    if (!mensagem.trim()) {
      return;
    }

    const payload = {
      usuarioID: user?.sub ?? "",
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
      status: "ANDAMENTO"
    }

    try {
      console.log("Payload sendo enviado:", payload);
      const apiUrl = import.meta.env.VITE_API;
      const response = await fetch(
        `${apiUrl}atendimento-mensagem`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );


      const result = await response.json();
      console.log("Mensagem enviada Normal:", result);

      const responseWpp = await fetch(
        "http://localhost:4000/api/send-message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadWpp),
        }
      );

      const resultwpp = await responseWpp.json();
      console.log("Mensagem enviada WPP:", resultwpp);



      const responseAtendimento = await fetch(
        `${apiUrl}atendimento/${atendimentoId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadAtendimento),
        }
      );

      const resulAtendimento = await responseAtendimento.json();
      console.log("Mensagem enviada Atendimento:", resulAtendimento);

      // Emitir a mensagem via WebSocket para os clientes conectados
      socket.emit("novaMensagem", payload); // Envia a nova mensagem via WebSocket

      setMensagem("");
      toast.success("Mensagem enviada com sucesso!");
      await queryClient.invalidateQueries(["ATENDIMENTOMENSAGENS"]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div className="flex gap-4 justify-center items-center bg-gray-100 shadow-xl rounded-xl p-2">
      <textarea
        placeholder="Digite sua mensagem..."
        className="w-full h-20 p-4 rounded-xl bg-gray-100 focus:outline-none resize-none text-brand-blue-500"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        onClick={enviarMensagem}
        className="mt-2 flex items-center gap-2 text-brand-blue-400 hover:text-brand-blue-300 px-4 py-2 rounded"
      >
        <Send size={35}/>
      </button>
    </div>
  );
}
