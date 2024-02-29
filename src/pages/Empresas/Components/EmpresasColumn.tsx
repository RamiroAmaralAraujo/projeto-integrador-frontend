import { ActionsTable } from "@/components/ActionsTableCell"
import AlertDelete from "@/components/AlertDelete"
import { DataTable } from "@/components/DataTable"
import { EmpresasData, useEmpresas, useRemove } from "@/hook/queries/useEmpresas"
import { useDeleteAlertStore } from "@/store/DeleteAlertStore"
import { useEmpresasStore } from "@/store/Empresas/Index"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export function TableEmpresas() {
  const { useRead } = useEmpresas()
  const { mutateAsync: removeCategory } = useRemove()
  const { data: empresas, isLoading, isFetching } = useRead()
  const handleChange = useEmpresasStore((state) => state.actions.handleChange)
  const openDeleteAlert = useDeleteAlertStore((state) => state.actions.onOpenAlert,)




  const columns: ColumnDef<EmpresasData>[] = [
    {
      accessorKey: "empresaNome",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EMPRESA NOME
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        )
      },
    },
    {
      accessorKey: "cnpj_cpf",
      header: "CNPJ/CPF",
    },
    {
      accessorKey: "endereco",
      header: "Endereço",
    },
    {
      accessorKey: "bairro",
      header: "Bairro",
    },
    {
      accessorKey: "cidade",
      header: "Cidade",
    },
    {
      accessorKey: "uf",
      header: "UF",
    },
    {
      accessorKey: "cep",
      header: "CEP",
    },
    {
      header: 'Ações',
      accessorKey: 'id',
      size: 120,
      cell: ({ getValue }) => {
        const empresaId = getValue() as string
        const empresa = empresas?.find(
          (empresa) => empresa.id === empresaId,
        )
        return (
          <ActionsTable.Root
            onEdit={() => handleChange(empresa || null)}
            onDelete={() => openDeleteAlert(empresa?.id)}
          />
        )
      },
    },
  ]

  return (
    <>

      <DataTable
        columns={columns}
        data={empresas || []}
        isLoading={isLoading || isFetching}
      />
      <AlertDelete onDelete={removeCategory} />
    </>
  )
}