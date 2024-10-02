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
import { useProdutos } from "@/hook/queries/useProdutos";

export function TablePedidos() {
  const { useRead: useReadPedidos } = usePedidos();
  const { useRead: useReadProdutos } = useProdutos();
  const { mutateAsync: removePedidos } = useRemove();

  const { data: pedidos, isLoading, isFetching } = useReadPedidos();
  const { data: produtos } = useReadProdutos();

  const handleChange = usePedidosStore((state) => state.actions.handleChange);
  const openDeleteAlert = useDeleteAlertPedidosStore(
    (state) => state.actions.onOpenAlert
  );

  // Mapeamento do ID do produto para o nome
  const getProdutoNome = (produtoId: string) => {
    const produto = produtos?.find((p) => p.id === produtoId);
    return produto ? produto.nome : "Produto não encontrado";
  };

  const columns: ColumnDef<PedidosData>[] = [
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
      accessorKey: "pedidoProdutos", 
      header: ({ column }) => (
        <button
          className="flex justify-center items-center p-2 hover:bg-gray-400 rounded-xl w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PRODUTOS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
      cell: ({ getValue }) => {
        const produtosArray = getValue() as {
          produtoId: string;
          quantidade: number;
        }[];
        return (
          <div className="text-center max-w-xs truncate">
            {produtosArray
              .map(
                (produto) =>
                  `${getProdutoNome(produto.produtoId)} (Qtd: ${produto.quantidade})`
              )
              .join(", ")}
          </div>
        );
      },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
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
          data={pedidos || []}
          isLoading={isLoading || isFetching}
        />
      </div>

      <AlertDeletePedido onDelete={removePedidos} />
    </>
  );
}
