import { DataTableAtendimentos } from "@/components/DataTableAtendimentos/Index";
import {
  AtendimentosData,
  useAtendimentos,
} from "@/hook/queries/useAtendimentos";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Angry, Frown, Meh, Smile, Laugh, ArrowUpDown } from "lucide-react";
import { FaWhatsapp , FaTelegram } from "react-icons/fa";
import { useAuth } from "@/Context/AuthContext";
import { useEmpresas } from "@/hook/queries/useEmpresas";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale/pt-BR";

export function TableAtendimentos() {
  const { user } = useAuth();

  const { useRead: useReadEmpresas } = useEmpresas();
  const { data: empresas } = useReadEmpresas();

  const { useRead } = useAtendimentos();
  const { data: atendimentos, isLoading, isFetching } = useRead();

  // Função para formatar telefone no padrão (DD) 9 XXXX-XXXX
  const formatPhone = (phone: string) => {
    if (!phone || phone.length < 12) return phone; // Retorna como está se for inválido
    const ddd = phone.slice(2, 4);
    const secondPart = phone.slice(4, 8);
    const thirdPart = phone.slice(8, 13);
    return `(${ddd}) ${secondPart}-${thirdPart}`;
  };

  const getEmpresaNome = (empresaId: string): string => {
    const empresa = empresas?.find((emp) => emp.id === empresaId);
    return empresa ? empresa.empresaNome : "Empresa não encontrada";
  };
  
  // Mapeamento de notas para ícones e cores
  const notaIcons = {
    1: { icon: Angry, color: "text-red-500" },
    2: { icon: Frown, color: "text-orange-500" },
    3: { icon: Meh, color: "text-yellow-500" },
    4: { icon: Smile, color: "text-blue-500" },
    5: { icon: Laugh, color: "text-green-500" },
  };

  const columns: ColumnDef<AtendimentosData>[] = [
    {
      accessorKey: "protocolo",
      header: "Protocolo",
    },
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            SOLICITANTE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      size: 200,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <span
            className="block max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis text-center"
            title={info.getValue() as string} // Mostrar o nome completo ao passar o mouse
          >
            {info.getValue() as string}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "telefone",
      header: "Contato",
      cell: ({ row }) => {
        const telefone = row.getValue("telefone") as string;
        const protocolo = row.getValue("protocolo") as string;
        const nome = row.getValue("nome") as string;
        const empresa = getEmpresaNome(row.getValue("empresaId") as string);
        const nota = row.getValue("nota") as number;
        const data = row.getValue("createdAt") as string;
        const isWhatsApp = row.getValue("plataforma") === "WHATSAPP";
    
        const responsavel = user?.userName || "Irineu";
    
        const formattedDate = new Date(data).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
    
        const mensagem = `Olá, ${nome}! Tudo bem? 😊\n\nMeu nome é ${responsavel} e faço parte da equipe de atendimento da CoreCommerce.\n\nNotamos que o atendimento realizado em *${formattedDate}* para a empresa *${empresa}* com o protocolo *#${protocolo}* recebeu uma nota de *${nota}/5* e não atingiu nossas expectativas de qualidade. Gostaríamos de entender melhor o que aconteceu para podermos melhorar nossos serviços.\n\nPoderia compartilhar um pouco mais sobre a sua experiência? Estamos aqui para ajudar e garantir a melhor experiência para você!\n\nDesde já, agradecemos sua colaboração e feedback! 💙`;
    
        const linkWhatsapp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    
        return (
          <div className="flex gap-2 justify-center items-center">
            <a
              href={isWhatsApp ? linkWhatsapp : `https://t.me/${telefone}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${isWhatsApp ? "hover:text-green-500" : "hover:text-blue-500"}`}
            >
              {isWhatsApp ? formatPhone(telefone) : `@${telefone}`}
            </a>
          </div>
        );
      },
    },
    {
      accessorKey: "plataforma",
      header: "Plataforma",
      cell: ({ row }: { row: Row<AtendimentosData> }) => {
        const plataforma = row.getValue("plataforma") as string;
        return (
          <div className="flex justify-center items-center">
            <span
            title={plataforma} 
            className={`w-8 h-8 flex justify-center items-center ${
              plataforma === "WHATSAPP" ? "bg-green-500": plataforma === "TELEGRAM" ? "bg-blue-500" :  ""
              }  text-white font-bold  rounded-full`}
            >
              {plataforma === 'WHATSAPP' ? <FaWhatsapp size={22}/>: plataforma === "TELEGRAM" ? <FaTelegram size={22}/> : ""}   
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "empresaId",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EMPRESA
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      size: 200,
      cell: (info) => {
        const empresaId = info.getValue() as string;
        const empresaNome = getEmpresaNome(empresaId);
        return (
          <div className="flex justify-center items-center">
            <span
              className="block max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis text-center"
              title={empresaNome}
            >
              {empresaNome}
            </span>
          </div>
        );
      },
    },    
    {
      accessorKey: "nota",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            AVALIAÇÃO
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ getValue }) => {
        const nota = getValue() as number;
        const { icon: Icon, color } = notaIcons[
          nota as keyof typeof notaIcons
        ] || {
          icon: Meh,
          color: "text-gray-500",
        };

        return (
          <div className="flex justify-center items-center">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Data / Hora",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        const timeZone = "America/Sao_Paulo";
        const zonedDate = toZonedTime(date, timeZone);

        return format(zonedDate, `dd/MM/yyyy 📆  HH:mm 🕑`, { locale: ptBR });
      },
    },
  ];

  return (
    <DataTableAtendimentos
      columns={columns}
      data={atendimentos || []}
      isLoading={isLoading || isFetching}
    />
  );
}
