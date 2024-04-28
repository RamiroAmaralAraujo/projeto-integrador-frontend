import { ActionsTable } from "@/components/ActionsTableCell"
import AlertDeleteDuplicata from "@/components/AlertDeleteDuplicata/index"
import ShareAlertDuplicatass from "@/components/AlertShareDuplicata"
import { DataTableDuplicatas } from "@/components/DataTableDuplicatas"
import { DuplicatasData, useDuplicatas } from "@/hook/queries/useDuplicatas"
import { useRemove } from "@/hook/queries/useDuplicatas"
import { useDeleteAlertDuplicatasStore } from "@/store/DeleteAlertDuplicatasStore"
import { useDuplicatasStore } from "@/store/Duplicatas/Index"
import { useShareAlertDuplicatasStore } from "@/store/ShareAlertDuplicatasStore"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { HandCoins, Receipt, CircleDashed } from 'lucide-react';
import { MdOutlineCheckCircle } from "react-icons/md";
import { TbAlertCircle } from "react-icons/tb";



export function TablePagaveis() {
  const { useRead } = useDuplicatas()
  const { mutateAsync: removeDuplicatas } = useRemove()
  const { data: duplicatas, isLoading, isFetching } = useRead()
  const handleChange = useDuplicatasStore((state) => state.actions.handleChange)
  const openDeleteAlert = useDeleteAlertDuplicatasStore((state) => state.actions.onOpenAlert,)
  const openPrintAlert = useShareAlertDuplicatasStore((state) => state.actions.handleChangeSelectDuplicata,)





  const columns: ColumnDef<DuplicatasData>[] = [
    {
      accessorKey: "pessoaRef",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PESSOA/EMPRESA
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        )
      },
    },
    {
      accessorKey: "tipoPag",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            TIPO
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        )
      },
      cell: ({ getValue }) => {
        const isPagavel = getValue() as boolean;
        return (
          <div className="flex justify-center items-center">
            {isPagavel ? <Receipt className="h-6 w-6 text-red-500" /> : <HandCoins className="h-6 w-6 text-green-500" />}
          </div>
        );
      },
    },
    {
      accessorKey: "vencimento",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            VENCIMENTO
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        )
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue() as string);
        const formattedDate = dateValue.toLocaleDateString('pt-BR');
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "data_Pag_Receb",
      id: '1',
      header: "Pagamento / Recebimento",
      cell: ({ getValue }) => {
        const rawValue = getValue();
        if (rawValue === null) {
          return
        }
        const dateValue = new Date(rawValue as string);
        const formattedDate = dateValue.toLocaleDateString('pt-BR');
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "data_Pag_Receb",
      id: '2',
      header: "Status",
      cell: ({ row }) => {
        const dataPagamento = row.original.data_Pag_Receb as Date | null;
        const vencimentoString = row.original.vencimento as unknown as string;
        const vencimento = new Date(vencimentoString);
        const dataAtual = new Date();

        if (dataPagamento === null) {
          if (vencimento.getTime() > dataAtual.getTime()) {
            return <div className="text-yellow-500 justify-center items-center flex"><CircleDashed size={25} /></div>;
          } else {
            return <div className="text-red-700 justify-center items-center flex "><TbAlertCircle size={28} /></div>;
          }
        } else {
          return <div className="text-green-700 justify-center items-center flex"><MdOutlineCheckCircle size={28} /></div>;
        }
      },
    },
    {
      accessorKey: "valorFinal",
      header: "Valor Total",
      cell: ({ getValue }) => {
        const valor = getValue() as number;
        const formattedValor = `R$ ${valor.toFixed(2)}`;
        return <span>{formattedValor}</span>;
      },
    },
    {
      header: 'Ações',
      accessorKey: 'id',
      size: 120,
      cell: ({ getValue }) => {
        const duplicataId = getValue() as string
        const duplicata = duplicatas?.find(
          (duplicata) => duplicata.id === duplicataId,
        )
        return (
          <ActionsTable.Root
            onEdit={() => handleChange(duplicata || null)}
            onDelete={() => openDeleteAlert(duplicata?.id)}
            onPrint={() => openPrintAlert(duplicata || null)}
          />
        )
      },
    },
  ]

  return (
    <>

      <DataTableDuplicatas
        columns={columns}
        data={duplicatas || []}
        isLoading={isLoading || isFetching}
      />
      <AlertDeleteDuplicata onDelete={removeDuplicatas} />
      <ShareAlertDuplicatass />
    </>
  )
}