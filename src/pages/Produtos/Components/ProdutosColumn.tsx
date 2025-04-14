import { ActionsTable } from "@/components/ActionsTableCell";
import AlertDeleteProduto from "@/components/Alerts/AlertDeleteProduto/index";
import { DataTableProdutos } from "@/components/DataTableProdutos";
import { ProdutosData, useProdutos } from "@/hook/queries/useProdutos";
import { useRemove } from "@/hook/queries/useProdutos";
import { useDeleteAlertProdutosStore } from "@/store/DeleteAlertProdutosStore";
import { useProdutosStore } from "@/store/Produtos/Index";
import { useCategorias } from "@/hook/queries/useCategorias";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export function TableProdutos() {
  const { useRead: useReadProdutos } = useProdutos();
  const { useRead: useReadCategorias } = useCategorias(); // Lendo as categorias
  const { mutateAsync: removeProdutos } = useRemove();
  const { data: produtos, isLoading, isFetching } = useReadProdutos();
  const { data: categorias } = useReadCategorias(); // Obtendo as categorias

  const handleChange = useProdutosStore((state) => state.actions.handleChange);
  const openDeleteAlert = useDeleteAlertProdutosStore(
    (state) => state.actions.onOpenAlert
  );

  // Função para obter o nome da categoria pelo ID
  const getCategoriaNome = (categoriaId: string) => {
    const categoria = categorias?.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nome : "Categoria não encontrada";
  };

  const columns: ColumnDef<ProdutosData>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PRODUTO
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        );
      },
    },
    {
      accessorKey: "preco",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PREÇO
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        );
      },
      cell: ({ getValue }) => {
        const valor = getValue() as number;
        const formattedValor = `R$ ${valor.toFixed(2)}`;
        return <span>{formattedValor}</span>;
      },
    },
    {
      accessorKey: "categoriaId",
      header: "Categoria",
      cell: ({ getValue }) => {
        const categoriaId = getValue() as string;
        return getCategoriaNome(categoriaId); // Mostrando o nome da categoria
      },
    },
    {
      accessorKey: "quantidade",
      header: ({ column }) => {
        return (
          <button
            className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            QUANTIDADE
            <ArrowUpDown className="ml-2 h-4 w-4  " />
          </button>
        );
      },
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      header: "Ações",
      accessorKey: "id",
      size: 120,
      cell: ({ getValue }) => {
        const produtoId = getValue() as string;
        const produto = produtos?.find((produto) => produto.id === produtoId);
        return (
          <ActionsTable.Root
            onEdit={() => handleChange(produto || null)}
            onDelete={() => openDeleteAlert(produto?.id)}
          />
        );
      },
    },
  ];

  return (
    <>
      <DataTableProdutos
        columns={columns}
        data={produtos || []}
        isLoading={isLoading || isFetching}
      />
      <AlertDeleteProduto onDelete={removeProdutos} />
    </>
  );
}