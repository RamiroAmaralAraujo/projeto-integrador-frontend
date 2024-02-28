import { DataTable } from "@/components/DataTable"
import { EmpresasData, useEmpresas } from "@/hook/queries/useEmpresas"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export function TableEmpresas() {
  const { useRead } = useEmpresas()
  const { data: empresas, isLoading, isFetching } = useRead()




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
  ]

  return (
    <>

      <DataTable
        columns={columns}
        data={empresas || []}
        isLoading={isLoading || isFetching}
      />
    </>
  )
}