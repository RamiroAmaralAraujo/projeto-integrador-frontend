import { DataTableUsuarios } from "@/components/DataTableUsuarios";
import { useEmpresas } from "@/hook/queries/useEmpresas";
import { UsuarioData, useUsuarios } from "@/hook/queries/useUsuarios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Store ,SearchX } from 'lucide-react';

export function TableUsuarios() {
 
  const { useRead: useReadUsuarios } = useUsuarios();
  const { useRead: useReadEmpresas } = useEmpresas();

  const { data: usuarios, isLoading: isLoading, isFetching: isFetching } = useReadUsuarios();
  const { data: empresas} = useReadEmpresas();


  const usuariosComEmpresas = usuarios?.map((usuario) => {
    const empresasDoUsuario = empresas?.filter((empresa) => empresa.usuarioID === usuario.id) || [];
  
    return {
      ...usuario,
      empresaNome: empresasDoUsuario.length > 0 
        ? empresasDoUsuario.map((empresa) => ({
            nome: empresa.empresaNome,
            icone: <Store className="inline-block w-4 h-4 text-white" />,
          }))
        : [],
    };
  }) || [];
  


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
      accessorKey: "empresaNome",
      header: "Empresas",
      size: 200,
      cell: (info) => {
        const empresas = info.getValue() as { nome: string; icone: JSX.Element }[];
    
        return empresas.length > 0 ? (
          <div className="flex flex-col justify-center items-center">
            {empresas.map((empresa, index) => (
              <div key={index} className="flex items-center gap-1 bg-brand-blue-500 m-1 rounded-full px-2 py-1 text-white">
                {empresa.icone}
                <span>{empresa.nome}</span>
              </div>
            ))}
          </div>
        ) : (
          <SearchX  size={24} className="inline-block text-red-500" />
        );
      },
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
        data={usuariosComEmpresas}
        isLoading={isLoading || isFetching}
      />
    </>
  );
}
