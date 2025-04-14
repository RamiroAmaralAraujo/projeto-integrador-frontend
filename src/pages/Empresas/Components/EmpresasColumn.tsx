import { ActionsTable } from "@/components/ActionsTableCell";
import AlertDelete from "@/components/Alerts/AlertDelete";
import AlertSelectEmpresa from "@/components/Alerts/AlertSelectEmpresa";
import { DataTableEmpresas } from "@/components/DataTableEmpresas";
import {
  EmpresasData,
  useEmpresas,
  useRemove,
  useSelectEmpresa,
} from "@/hook/queries/useEmpresas";
import { useDeleteAlertStore } from "@/store/DeleteAlertStore";
import { useEmpresasStore } from "@/store/Empresas/Index";
import { useSelectEmpresaStore } from "@/store/SelectEmpresaStore/Index";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { AuthContext } from '@/Context/AuthContext'
import { useContext } from 'react'
import { useReadUsuario } from '@/hook/queries/useUsuarios';

export function TableEmpresas() {
  const { useRead } = useEmpresas();
  const { mutateAsync: removeCategory } = useRemove();
  const { mutateAsync: teste } = useSelectEmpresa();
  const { data: empresas, isLoading, isFetching } = useRead();
  const handleChange = useEmpresasStore((state) => state.actions.handleChange);
  const handleChangeSelectEmpresa = useSelectEmpresaStore(
    (state) => state.actions.handleChangeSelectEmpresa
  );
  const openDeleteAlert = useDeleteAlertStore(
    (state) => state.actions.onOpenAlert
  );

  const { user } = useContext(AuthContext)
  const isMaster = user?.master;

  if (!isMaster) {
    const columns: ColumnDef<EmpresasData>[] = [
      {
        accessorKey: "empresaNome",
        header: ({ column }) => {
          return (
            <button
              className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              EMPRESA
              <ArrowUpDown className="ml-2 h-4 w-4  " />
            </button>
          );
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
        header: "Ações",
        accessorKey: "id",
        size: 120,
        cell: ({ getValue }) => {
          const empresaId = getValue() as string;
          const empresa = empresas?.find((empresa) => empresa.id === empresaId);
          return (
            <ActionsTable.Root
              onEdit={() => handleChange(empresa || null)}
              onDelete={() => openDeleteAlert(empresa?.id)}
              onSelectEmpresa={() => handleChangeSelectEmpresa(empresa || null)}
            />
          );
        },
      },
    ];
    return (
      <>
        <DataTableEmpresas
          columns={columns}
          data={empresas || []}
          isLoading={isLoading || isFetching}
        />
        <AlertDelete onDelete={removeCategory} />
        <AlertSelectEmpresa onSelectEmpresa={teste} />
      </>
    );
  } else if (isMaster) {
    const columns: ColumnDef<EmpresasData>[] = [
      {
        accessorKey: "empresaNome",
        header: ({ column }) => {
          return (
            <button
              className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              EMPRESA
              <ArrowUpDown className="ml-2 h-4 w-4  " />
            </button>
          );
        },
      },
      {
        accessorKey: "usuarioID",
        header: ({ column }) => {
          return (
            <button
              className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              USUÁRIO
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          );
        },
        cell: ({ getValue }) => {
          const usuarioId = getValue() as string;
          const { data: usuario, isLoading } = useReadUsuario(usuarioId);
      
          if (isLoading) return "Carregando...";
      
          return usuario?.email || "Não informado";
        },
      },
      {
        accessorKey: "cnpj_cpf",
        header: "CNPJ/CPF EMPRESA",
      },
      {
        header: "Ações",
        accessorKey: "id",
        size: 120,
        cell: ({ getValue }) => {
          const empresaId = getValue() as string;
          const empresa = empresas?.find((empresa) => empresa.id === empresaId);
          return (
            <ActionsTable.Root
              onEdit={() => handleChange(empresa || null)}
              onDelete={() => openDeleteAlert(empresa?.id)}
              onSelectEmpresa={() => handleChangeSelectEmpresa(empresa || null)}
            />
          );
        },
      },
    ];
    return (
      <>
        <DataTableEmpresas
          columns={columns}
          data={empresas || []}
          isLoading={isLoading || isFetching}
        />
        <AlertDelete onDelete={removeCategory} />
        <AlertSelectEmpresa onSelectEmpresa={teste} />
      </>
    );
  }
}
