import { useState, useContext } from "react";
import { Textarea } from "../ui/textarea";
import { useTicketStore } from "@/store/Ticket/Index";
import { AuthContext } from "@/Context/AuthContext";
import { SquarePen, Send } from "lucide-react";
import { toast } from "react-toastify";
import { useQueryClient } from 'react-query';

export function MensagensTicketForm() {
  const [mensagem, setMensagem] = useState("");
  const { data } = useTicketStore((state) => ({ data: state.ticket }));
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const enviarMensagem = async () => {

    const payload = {
      usuarioID: user?.sub ?? "",
      ticketId: data?.id ?? "",
      mensagem,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://core-commerce-api.onrender.com/ticketmensagem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log("Mensagem enviada:", result);
      setMensagem("")
      toast.success("Mensagem enviada com sucesso!")
      await queryClient.invalidateQueries(['TICKETMENSAGENS'])
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err)
    }
  };

  return (
    <div className="">
      <Textarea
        label="Mensagem"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        maxLength={1500}
        customSize="w-full h-32"
        icon={<SquarePen size={20} />}
      />

      <div className="flex w-full items-end justify-end">
      <button
        onClick={enviarMensagem}
        className="mt-2 flex items-center gap-2 bg-brand-blue-500 text-white px-4 py-2 rounded hover:bg-brand-blue-400"
      >
        <Send size={16} />
      </button>
      </div>
    </div>
  );
}
