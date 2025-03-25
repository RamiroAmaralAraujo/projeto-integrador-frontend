import { DataTableUsuarios } from "@/components/DataTableUsuarios";
import { UsuarioData, useUsuarios } from "@/hook/queries/useUsuarios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export function TableUsuarios() {
  const { useRead } = useUsuarios();
  const { data: usuarios, isLoading, isFetching } = useRead();

  const columns: ColumnDef<UsuarioData>[] = [
    {
      accessorKey: "userName",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      size: 200,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <span
            className="block max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis text-center"
            title={info.getValue() as string}
          >
            {info.getValue() as string}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "E-mail",
      size: 250,
      cell: (info) => (
        <span className="truncate">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "cpf",
      header: "CPF",
      size: 150,
      cell: (info) => (
        <span className="truncate">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "master",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Master
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      size: 200,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <span className="truncate">{info.getValue() ? "Sim" : "Não"}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTableUsuarios
        columns={columns}
        data={usuarios || []}
        isLoading={isLoading || isFetching}
      />
    </>
  );
}
