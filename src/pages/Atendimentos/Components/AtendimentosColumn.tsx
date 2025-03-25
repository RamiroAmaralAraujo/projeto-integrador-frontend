import { DataTableAtendimentos } from "@/components/DataTableAtendimentos/Index";
import { AtendimentosData, useAtendimentos } from "@/hook/queries/useAtendimentos";
import { ColumnDef } from "@tanstack/react-table";
import { Angry, Frown, Meh, Smile, Laugh, ArrowUpDown} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {ptBR} from "date-fns/locale/pt-BR";



export function TableAtendimentos() {
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
      accessorKey: "telefone",
      header: "Telefone",
      cell: ({ getValue }) => {
        const telefone = getValue() as string;
        return (
        <div className="flex gap-2 justify-center items-center">
         <a
            href={`https://wa.me/${telefone}?text=${encodeURIComponent(
            `Olá, observamos que um de seus atendimentos, teve uma nota abaixo do nosso padrão de qualidade. Poderíamos conversar sobre essa avaliação?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 hover:underline"
>
            {formatPhone(telefone)}
         </a>
          <FaWhatsapp size={20} color="green"/>
        </div>
        );
      },
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
      accessorKey: "empresaNome",
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
        const { icon: Icon, color } =
          notaIcons[nota as keyof typeof notaIcons] || {
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
        const timeZone = "America/Sao_Paulo"; // Define o fuso horário brasileiro
        const zonedDate = toZonedTime(date, timeZone); // Ajusta para o fuso correto
  
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
