import { ActionsTable } from "@/components/ActionsTableCell";
// import AlertDeleteTicket from "@/components/Alerts/AlertDeleteTicket";
import AlertSelectResponsavel from "@/components/Alerts/AlertSelectResponsavel";
import { DataTableTicket } from "@/components/DataTableTicket";
import { AuthContext } from "@/Context/AuthContext";
import { TicketData, useAvaliaTicket, useFinalizaAtendimento, useSelectResponsavel, useTicket } from "@/hook/queries/useTicket";
// import { useDeleteAlertTicketStore } from "@/store/DeleteAlertTicketStore/Index";
import { useSelectResponsavelStore } from "@/store/SelectResponsavelStore";
import { useTicketStore } from "@/store/Ticket/Index";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown , Clock, CircleDashed, CheckCircle, UserRoundSearch, Angry, Frown, Meh, Smile, Laugh, Circle} from "lucide-react";
import { useContext, useMemo } from "react";
import { LiaCircle, LiaExclamationCircleSolid} from "react-icons/lia";
import { PiCaretCircleUp, PiCaretCircleDown, PiQuestion } from "react-icons/pi";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale/pt-BR";
import { useUsuarios } from "@/hook/queries/useUsuarios";
import AlertFinalizaAtendimento from "@/components/Alerts/AlertFinalizaAtendimento";
import { useFinalizaAtendimentoStore } from "@/store/SelectFinalizaTicketStore/index.";
import AlertAvaliaTicket from "@/components/Alerts/AlertAvaliaTicket";
import { useAvaliaTicketStore } from "@/store/AvaliaTicketStore";



export function TableTicket() {
  const { useRead } = useTicket();
  // const { mutateAsync: removeTicket} = useRemove();
  const { mutateAsync: AvaliaTicket } = useAvaliaTicket();
  const { mutateAsync: FinalizaAtendimento } = useFinalizaAtendimento();
  const { mutateAsync: teste } = useSelectResponsavel();
  const { data: ticket, isLoading, isFetching } = useRead();
  const handleChange = useTicketStore((state) => state.actions.handleChange);
  
  const handleChangeSelectResponsavel = useSelectResponsavelStore(
    (state) => state.actions.handleChangeSelectResponsavel
  );

  const handleChangeFinalizaAtendimento = useFinalizaAtendimentoStore(
    (state) => state.actions.handleChangeFinalizaAtendimento
  );

  const handleChangeAvaliaTicket = useAvaliaTicketStore(
    (state) => state.actions.handleChangeAvaliaTicket
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

  const notaIcons = {
    1: { icon: Angry, color: "text-red-500" },
    2: { icon: Frown, color: "text-orange-500" },
    3: { icon: Meh, color: "text-yellow-500" },
    4: { icon: Smile, color: "text-blue-500" },
    5: { icon: Laugh, color: "text-green-500" },
  };





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
      ...(isMaster ? [
        {
          accessorKey: "prioridade",
          header: "Prioridade",
          cell: ({ row }: { row: Row<TicketData> }) => {
            const prioridade = row.getValue("prioridade") as string;
            return (
              <div className="flex justify-center items-center">
                <span
                className={`w-8 h-8 flex justify-center items-center ${
                    prioridade === "BAIXA" ? "bg-brand-blue-300": prioridade === "MEDIA" ? "bg-yellow-500" : prioridade === "ALTA" ? "bg-orange-500" : prioridade === "URGENTE" ? "bg-red-500": "bg-gray-500"
                  }  text-white font-bold  rounded-full`}
                >
                  {prioridade === 'BAIXA' ? <PiCaretCircleDown size={19}/>: prioridade === "MEDIA" ? <LiaCircle size={19}/> : prioridade === "ALTA" ?  <PiCaretCircleUp size={19}/> : prioridade === "URGENTE" ? <LiaExclamationCircleSolid size={19} /> : <PiQuestion size={19} /> }   
                </span>
              </div>
            );
          },
        },
      ] : []), 
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
        accessorKey: "avaliacao",
        header: ({ column }) => {
          return (
            <button
              className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              NOTA
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          );
        },
        cell: ({ getValue }) => {
          const nota = getValue() as number;
          const { icon: Icon, color } = notaIcons[
            nota as keyof typeof notaIcons
          ] || {
            icon: Circle  ,
            color: "text-gray-200",
          };
  
          return (
            <div className="flex justify-center items-center">
              <Icon className={`h-8 w-8 ${color}`} />
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
        
          if (!selectedTicket) return null;
        
          if (selectedTicket.status === "ABERTO" && isMaster){
            return (
              <ActionsTable.Root
                onInformacao={() => handleChange(selectedTicket)}
                onIdentificaResp={() => handleChangeSelectResponsavel(selectedTicket)}
                
              />
            );
          }else if (selectedTicket.status === "ANDAMENTO" && isMaster) {
            return (
              <ActionsTable.Root
                onInformacao={() => handleChange(selectedTicket)}
                onFinalizar={() => handleChangeFinalizaAtendimento(selectedTicket)}
                onIdentificaResp={() => handleChangeSelectResponsavel(selectedTicket)}
              />
            );
          }else if (selectedTicket.status === "FECHADO" && !isMaster && selectedTicket.avaliacao === 0) {
            return (
              <ActionsTable.Root
                onInformacao={() => handleChange(selectedTicket)}
                onAvaliar={() => handleChangeAvaliaTicket(selectedTicket)}
              />
            );
          }else if (selectedTicket.status === "FECHADO" && !isMaster && selectedTicket.avaliacao !== 0) {
            return (
              <ActionsTable.Root
                onInformacao={() => handleChange(selectedTicket)}
              />
            );
          }else if (selectedTicket.status === "FECHADO" && isMaster) {
            return (
              <ActionsTable.Root
                onInformacao={() => handleChange(selectedTicket)}
              />
            );
          }else if (selectedTicket.status === "ANDAMENTO" || selectedTicket.status === "ABERTO" && !isMaster) {
            return (
              <ActionsTable.Root
                onInformacao={() => handleChange(selectedTicket)}
              />
            );
          }
        
          
        
          return null;
        }
      },
    ];
    return (
      <>
        <DataTableTicket
          columns={columns}
          data={ticket || []}
          isLoading={isLoading || isFetching}
        />
        {/* <AlertDeleteTicket onDelete={removeTicket} /> */}
        <AlertAvaliaTicket onAvaliaTicket={AvaliaTicket} />
        <AlertSelectResponsavel onSelectResponsavel={teste} />
        <AlertFinalizaAtendimento onFinalizaAtendimento={FinalizaAtendimento}/>
      </>
    );
}
