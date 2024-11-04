import { useState } from "react";
import { ActionsTable } from "@/components/ActionsTableCell";
import AlertDeletePedido from "@/components/AlertDeletePedido/index";
import { DataTablePedidos } from "@/components/DataTablePedidos";
import { PedidosData, usePedidos } from "@/hook/queries/usePedidos";
import { useRemove } from "@/hook/queries/usePedidos";
import { useDeleteAlertPedidosStore } from "@/store/DeleteAlertPedidosStore";
import { usePedidosStore } from "@/store/Pedidos/Index";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { PackagePlus, PackageMinus } from "lucide-react";
import { TipoMovimentacao } from "@/enums/TipoMovimentacao";
import { Button } from "@/components/ui/button";

// Substitua pelo caminho correto do componente Button ou use um botão nativo
 // Ajuste este caminho conforme a localização correta do seu componente Button

export function TablePedidos() {
  const { useRead: useReadPedidos } = usePedidos();
  const { mutateAsync: removePedidos } = useRemove();
  const { data: pedidos, isLoading, isFetching } = useReadPedidos();

  const handleChange = usePedidosStore((state) => state.actions.handleChange);
  const openDeleteAlert = useDeleteAlertPedidosStore(
    (state) => state.actions.onOpenAlert
  );

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Função para alternar entre as páginas
  const handleNextPage = () => {
    if (pedidos && (currentPage + 1) * itemsPerPage < pedidos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Define os dados da página atual
  const currentData = pedidos?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const columns: ColumnDef<PedidosData>[] = [
    {
      accessorKey: "idPedido",
      header: ({ column }) => (
        <button
          className="flex justify-center items-center p-2 hover:bg-gray-400 rounded-xl w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
    },
    {
      accessorKey: "data",
      header: ({ column }) => (
        <button
          className="flex justify-center items-center p-2 hover:bg-gray-400 rounded-xl w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DATA
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue() as string);
        const formattedDate = dateValue.toLocaleDateString("pt-BR");
        return <span className="text-center">{formattedDate}</span>;
      },
    },
    {
      accessorKey: "observacao",
      header: "Observação",
      cell: ({ getValue }) => (
        <div className="text-center max-w-md truncate overflow-hidden">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "tipo",
      header: ({ column }) => (
        <button
          className="flex justify-center items-center p-2 hover:bg-gray-400 rounded-xl w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TIPO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
      cell: ({ getValue }) => {
        const tipo = getValue() as TipoMovimentacao;
        return (
          <div className="flex justify-center items-center">
            {tipo === TipoMovimentacao.ENTRADA ? (
              <PackagePlus className="h-6 w-6 text-green-500" />
            ) : (
              <PackageMinus className="h-6 w-6 text-red-500" />
            )}
          </div>
        );
      },
    },
    {
      header: "Ações",
      accessorKey: "id",
      cell: ({ getValue }) => {
        const pedidoId = getValue() as string;
        const pedido = pedidos?.find((pedido) => pedido.id === pedidoId);
        return (
          <div className="flex justify-center">
            <ActionsTable.Root
              onEdit={() => handleChange(pedido || null)}
              onDelete={() => openDeleteAlert(pedido?.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <DataTablePedidos
          columns={columns}
          data={currentData || []}
          isLoading={isLoading || isFetching}
        />
      </div>
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
          disabled={pedidos ? (currentPage + 1) * itemsPerPage >= pedidos.length : true}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
        />
      </div>
      <AlertDeletePedido onDelete={removePedidos} />
    </>
  );
}
