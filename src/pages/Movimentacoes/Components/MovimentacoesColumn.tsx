import { DataTableMovimentacoes } from "@/components/DataTableMovimentacoes";
import { usePedidos } from "@/hook/queries/usePedidos";
import { useProdutos } from "@/hook/queries/useProdutos";
import { ColumnDef } from "@tanstack/react-table";
import { TipoMovimentacao } from "@/enums/TipoMovimentacao";
import { PackagePlus, PackageMinus, ArrowUpDown } from "lucide-react";

export function TableMovimentacoes() {
  const { useRead: useReadPedidos } = usePedidos();
  const { useRead: useReadProdutos } = useProdutos();

  const { data: pedidos, isLoading: isLoadingPedidos, isFetching } = useReadPedidos();
  const { data: produtos, isLoading: isLoadingProdutos } = useReadProdutos();

  // Criando um mapeamento de produtoId para o nome do produto
  const produtoMap = produtos?.reduce((map, produto) => {
    map[produto.id] = produto.nome;
    return map;
  }, {} as Record<string, string>) || {};

  // Ajustando os dados para expandir cada pedido em múltiplas linhas, uma para cada produto
  const data = pedidos?.flatMap((pedido) => 
    pedido.produtos.map((produto) => ({
      ...pedido,
      produtoNome: produtoMap[produto.produtoId] || "Produto não encontrado",
      quantidade: produto.quantidade,
    }))
  ) || [];

  // Configuração das colunas
  const columns: ColumnDef<typeof data[0]>[] = [
    {
      accessorKey: "produtoNome",
      header: ({ column }) => (
        <button
          className="flex justify-center items-center p-2 hover:bg-gray-400 rounded-xl w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PRODUTO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
      cell: ({ getValue }) => (
        <span className="text-center">{String(getValue())}</span>
      ),
    },
    {
      accessorKey: "quantidade",
      header: ({ column }) => (
        <button
          className="flex justify-center items-center p-2 hover:bg-gray-400 rounded-xl w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          QUANTIDADE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
      cell: ({ getValue }) => (
        <span className="text-center">{String(getValue())}</span>
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
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <DataTableMovimentacoes
          columns={columns}
          data={data}
          isLoading={isLoadingPedidos || isFetching || isLoadingProdutos}
        />
      </div>
    </>
  );
}
