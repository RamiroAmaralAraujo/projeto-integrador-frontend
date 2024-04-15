import { ActionsTable } from "@/components/ActionsTableCell"
import AlertDeleteDuplicata from "@/components/AlertDeleteDuplicata/index"
import { DataTableDuplicatas } from "@/components/DataTableDuplicatas"
import { DuplicatasData, useDuplicatas } from "@/hook/queries/useDuplicatas"
import { useRemove } from "@/hook/queries/useDuplicatas"
import { useDeleteAlertDuplicatasStore } from "@/store/DeleteAlertDuplicatasStore"
import { useDuplicatasStore } from "@/store/Duplicatas/Index"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export function TablePagaveis() {
  const { useRead } = useDuplicatas()
  const { mutateAsync: removeDuplicatas } = useRemove()
  const { data: duplicatas, isLoading, isFetching } = useRead()
  const handleChange = useDuplicatasStore((state) => state.actions.handleChange)
  const openDeleteAlert = useDeleteAlertDuplicatasStore((state) => state.actions.onOpenAlert,)




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
      header: "Pagável",
    },
    {
      accessorKey: "vencimento",
      header: "Vencimento",
    },
    {
      accessorKey: "data_Pag_Receb",
      header: "Pagamento / Recebimento",
    },
    {
      accessorKey: "valorFinal",
      header: "Valor Total",
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
    </>
  )
}