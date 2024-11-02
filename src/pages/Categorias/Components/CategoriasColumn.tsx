import { useState } from "react";
import { ActionsTable } from "@/components/ActionsTableCell";
import AlertDeleteCategoria from "@/components/AlertDeleteCategoria/index";
import { DataTableCategorias } from "@/components/DataTableCategorias";
import { CategoriasData, useCategorias } from "@/hook/queries/useCategorias";
import { useRemove } from "@/hook/queries/useCategorias";
import { useDeleteAlertCategoriasStore } from "@/store/DeleteAlertCategoriasStore";
import { useCategoriasStore } from "@/store/Categorias/Index";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // Configuração da paginação
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Número máximo de categorias por página

  const handleNextPage = () => {
    if (categorias && (currentPage + 1) * itemsPerPage < categorias.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Define os dados da página atual
  const currentData = categorias?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const columns: ColumnDef<CategoriasData>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => (
        <button
          className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CATEGORIA
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
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
      accessorKey: "descricao",
      header: "Descrição",
      size: 400,
      cell: (info) => <span className="truncate">{info.getValue() as string}</span>,
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
      <div className="overflow-x-auto">
        <DataTableCategorias
          columns={columns}
          data={currentData || []}
          isLoading={isLoading || isFetching}
        />
      </div>
      {/* Botões de navegação */}
      <div className="flex justify-end mt-4 mr-14 space-x-4">
        <Button
          label="Anterior"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
        />
        <Button
          label="Próximo"
          onClick={handleNextPage}
          disabled={(currentPage + 1) * itemsPerPage >= (categorias?.length || 0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
        />
      </div>
      <AlertDeleteCategoria onDelete={removeCategorias} />
    </>
  );
}
