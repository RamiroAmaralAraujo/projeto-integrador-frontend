import { ActionsTable } from "@/components/ActionsTableCell";
import AlertDeleteCategoria from "@/components/AlertDeleteCategoria/index";
import { DataTableCategorias } from "@/components/DataTableCategorias";
import { CategoriasData, useCategorias } from "@/hook/queries/useCategorias";
import { useRemove } from "@/hook/queries/useCategorias";
import { useDeleteAlertCategoriasStore } from "@/store/DeleteAlertCategoriasStore";
import { useCategoriasStore } from "@/store/Categorias/Index";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export function TableCategorias() {
  const { useRead } = useCategorias();
  const { mutateAsync: removeCategorias } = useRemove();
  const { data: categorias, isLoading, isFetching } = useRead();
  const handleChange = useCategoriasStore(
    (state) => state.actions.handleChange
  );
  const openDeleteAlert = useDeleteAlertCategoriasStore(
    (state) => state.actions.onOpenAlert
  );

  const columns: ColumnDef<CategoriasData>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CATEGORIA NOME
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        );
      },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
    },
    {
      header: "Ações",
      accessorKey: "id",
      size: 120,
      cell: ({ getValue }) => {
        const categoriaId = getValue() as string;
        const categoria = categorias?.find(
          (categoria) => categoria.id === categoriaId
        );
        return (
          <ActionsTable.Root
            onEdit={() => handleChange(categoria || null)}
            onDelete={() => openDeleteAlert(categoria?.id)}
          />
        );
      },
    },
  ];

  return (
    <>
      <DataTableCategorias
        columns={columns}
        data={categorias || []}
        isLoading={isLoading || isFetching}
      />
      <AlertDeleteCategoria onDelete={removeCategorias} />
    </>
  );
}
