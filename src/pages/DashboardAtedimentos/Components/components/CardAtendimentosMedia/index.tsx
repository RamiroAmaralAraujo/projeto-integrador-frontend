import { useRead } from "@/hook/queries/useAtendimentos";
import { MessageSquareMore, Angry, Frown, Meh, Smile, Laugh } from "lucide-react";

export function CardAtendimentosMedia() {
  const { data: atendimentos } = useRead();

  if (!atendimentos) {
    return <div>Carregando...</div>;
  }

  // Calculando a média das notas
  const totalAtendimentos = atendimentos.length;
  const somatorioNotas = atendimentos.reduce((total, atendimento) => total + Number(atendimento.nota), 0);
  const mediaAtendimentos = totalAtendimentos > 0 ? (somatorioNotas / totalAtendimentos).toFixed(2) : 0;

  // Função para determinar a cor da média
  const getMediaColor = (media: number) => {
    if (media >= 4 && media <= 5) return "green";
    if (media >= 3 && media < 4) return "yellow";
    if (media >= 2 && media < 3) return "orange";
    if (media >= 1 && media < 2) return "red";
    return "gray";
  };

  // Função para determinar o ícone da média
  const getMediaIcon = (media: number) => {
    if (media >= 4.5 && media <= 5) return <Laugh size={30} />;
    if (media >= 4 && media < 4.5) return <Smile size={30} />;
    if (media >= 3 && media < 4) return <Meh size={30} />;
    if (media >= 2 && media < 3) return <Frown size={30} />;
    if (media >= 1 && media < 2) return <Angry size={30} />;
    return <MessageSquareMore size={30} />;
  };

  return (
    <>
      <div className="bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4">
        <h1 className="font-bold text-brand-blue-500 text-2xl">
          Atendimentos Média
        </h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className={`text-2xl font-semibold text-${getMediaColor(Number(mediaAtendimentos))}-500`}>
            {mediaAtendimentos}
          </span>
          <div className={`w-14 h-14 bg-${getMediaColor(Number(mediaAtendimentos))}-300 rounded-full flex justify-center items-center text-${getMediaColor(Number(mediaAtendimentos))}-700`}>
            {getMediaIcon(Number(mediaAtendimentos))}
          </div>
        </div>
      </div>
    </>
  );
}
