import { ActionsTable } from "@/components/ActionsTableCell";
import AlertDeleteTicket from "@/components/AlertDeleteTicket";
import AlertSelectResponsavel from "@/components/AlertSelectResponsavel";
import { DataTableTicket } from "@/components/DataTableTicket";
import { AuthContext } from "@/Context/AuthContext";
import { TicketData, useRemove, useSelectResponsavel, useTicket } from "@/hook/queries/useTicket";
// import { useDeleteAlertTicketStore } from "@/store/DeleteAlertTicketStore/Index";
import { useSelectResponsavelStore } from "@/store/SelectResponsavelStore";
import { useTicketStore } from "@/store/Ticket/Index";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown , Clock, CircleDashed, CheckCircle, UserRoundSearch } from "lucide-react";
import { useContext, useMemo } from "react";
import { LiaCircle, LiaExclamationCircleSolid} from "react-icons/lia";
import { PiCaretCircleUp, PiCaretCircleDown, PiQuestion } from "react-icons/pi";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale/pt-BR";
import { useUsuarios } from "@/hook/queries/useUsuarios";



export function TableTicket() {
  const { useRead } = useTicket();
  const { mutateAsync: removeTicket} = useRemove();
  const { mutateAsync: teste } = useSelectResponsavel();
  const { data: ticket, isLoading, isFetching } = useRead();
  const handleChange = useTicketStore((state) => state.actions.handleChange);
  
  const handleChangeSelectResponsavel = useSelectResponsavelStore(
    (state) => state.actions.handleChangeSelectResponsavel
  );

  // const openDeleteAlert = useDeleteAlertTicketStore(
  //   (state) => state.actions.onOpenAlert
  // );


  const { user } = useContext(AuthContext)
  const isMaster = user?.master;


  const { useRead: useReadUsuarios } = useUsuarios();
  const { data: usuarios } = useReadUsuarios();

  const responsaveisMap = useMemo(() => {
    const map = new Map<string, string>();
    usuarios?.forEach((usuario) => {
      map.set(usuario.id, usuario.userName);
    });
    return map;
  }, [usuarios]);





    const columns: ColumnDef<TicketData>[] = [
      {
        accessorKey: "numero",
        header: ({ column }) => {
          return (
            <button
              className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Ticket Nº
              <ArrowUpDown className="ml-2 h-4 w-4  " />
            </button>
          );
        },
      },
      {
        accessorKey: "prioridade",
        header: "Prioridade",
        cell: ({ row }) => {
          const prioridade = row.getValue("prioridade") as string;
          return (
            <div className="flex justify-center items-center">
              <span
              className={`w-8 h-8 flex justify-center items-center ${
                  prioridade === "BAIXA" ? "bg-green-500": prioridade === "MEDIA" ? "bg-yellow-500" : prioridade === "ALTA" ? "bg-orange-500" : prioridade === "URGENTE" ? "bg-red-500": "bg-gray-500"
                }  text-white font-bold  rounded-full`}
              >
                {prioridade === 'BAIXA' ? <PiCaretCircleDown size={19}/>: prioridade === "MEDIA" ? <LiaCircle size={19}/> : prioridade === "ALTA" ?  <PiCaretCircleUp size={19}/> : prioridade === "URGENTE" ? <LiaExclamationCircleSolid size={19} /> : <PiQuestion size={19} /> }   
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "categoria",
        header: "Categoria",
      }, 
      {
        accessorKey: "responsavelId",
        header: "Responsável",
        cell: ({ row }) => {
          const responsavelId = row.getValue("responsavelId") as string;
          const nomeResponsavel = responsaveisMap.get(responsavelId);
      
          return (
            <div className="flex justify-center items-center">
              <span>
                {nomeResponsavel || <UserRoundSearch />}
              </span>
            </div>
          );
        }
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <div className="flex justify-center items-center">
              <span
                className={`w-8 h-8 flex justify-center items-center ${
                  status === "ABERTO" ? "bg-gray-500": status === "ANDAMENTO" ? "bg-yellow-500" :  "bg-brand-blue-500" 
                } text-white font-bold py-1 px-2 rounded-full`}
              >
                {status === 'ABERTO' ? <CircleDashed />: status === "ANDAMENTO" ? <Clock /> :  <CheckCircle /> }   
              </span>
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
      {
        header: "Ações",
        accessorKey: "id",
        size: 120,
        cell: ({ getValue }) => {
          const ticketId = getValue() as string;
          const selectedTicket = ticket?.find((t) => t.id === ticketId);
          return isMaster ? (
            <ActionsTable.Root
              onInformacao={() => handleChange(selectedTicket || null)}
              onIdentificaResp={() => handleChangeSelectResponsavel(selectedTicket || null)}
            />
          ) : (
            <ActionsTable.Root
            onInformacao={() => handleChange(selectedTicket || null)}
              
            />
          );
          
        },
      },
    ];
    return (
      <>
        <DataTableTicket
          columns={columns}
          data={ticket || []}
          isLoading={isLoading || isFetching}
        />
        <AlertDeleteTicket onDelete={removeTicket} />
        <AlertSelectResponsavel onSelectResponsavel={teste} />
      </>
    );
}
