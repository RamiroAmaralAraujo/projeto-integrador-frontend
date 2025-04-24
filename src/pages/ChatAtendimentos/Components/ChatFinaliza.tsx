import AlertFinalizaChat from "@/components/Alerts/AlertFinalizaChat";
import { useFinalizaAtendimento, useReadAtendimentoById } from "@/hook/queries/useAtendimentos";

import { useFinalizaChatStore } from "@/store/FinalizaChatStore/Index";
import { useChatStore } from "@/store/MensagemAtendimentoStore";

export function ChatFinaliza() {
  const { mutateAsync: FinalizaChat } = useFinalizaAtendimento();
  
  const selectedId = useChatStore((state) => state.selectedId);
  const DataAtendimento = useReadAtendimentoById(selectedId || "")

  const handleChangeFinalizaChat = useFinalizaChatStore(
    (state) => state.actions?.handleChangeFinalizaChat
  );

  return (
    <>
      <button
        onClick={() => handleChangeFinalizaChat(DataAtendimento.data || null)}
        className="bg-brand-blue-500 text-white w-48 h-14 rounded-xl font-bold hover:bg-brand-blue-400"
      >
        Finalizar Atendimento
      </button>
      <AlertFinalizaChat onFinalizaChat={FinalizaChat} />
    </>
  );
}
