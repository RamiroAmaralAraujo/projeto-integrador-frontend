import { useState } from "react";
import { ActionsTable } from "@/components/ActionsTableCell";
import AlertDeleteProduto from "@/components/AlertDeleteProduto/index";
import { DataTableProdutos } from "@/components/DataTableProdutos";
import { ProdutosData, useProdutos } from "@/hook/queries/useProdutos";
import { useRemove } from "@/hook/queries/useProdutos";
import { useDeleteAlertProdutosStore } from "@/store/DeleteAlertProdutosStore";
import { useProdutosStore } from "@/store/Produtos/Index";
import { useCategorias } from "@/hook/queries/useCategorias";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button"; // Caminho atualizado

export function TableProdutos() {
  const { useRead: useReadProdutos } = useProdutos();
  const { useRead: useReadCategorias } = useCategorias();
  const { mutateAsync: removeProdutos } = useRemove();
  const { data: produtos, isLoading, isFetching } = useReadProdutos();
  const { data: categorias } = useReadCategorias();

  const handleChange = useProdutosStore((state) => state.actions.handleChange);
  const openDeleteAlert = useDeleteAlertProdutosStore(
    (state) => state.actions.onOpenAlert
  );

  // Função para obter o nome da categoria pelo ID
  const getCategoriaNome = (categoriaId: string) => {
    const categoria = categorias?.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nome : "Categoria não encontrada";
  };

  // Configuração da paginação
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Número máximo de produtos por página

  const handleNextPage = () => {
    if (produtos && (currentPage + 1) * itemsPerPage < produtos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Define os dados da página atual
  const currentData = produtos?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const columns: ColumnDef<ProdutosData>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => (
        <button
          className="flex p-2 justify-center items-center hover:bg-gray-400 rounded-xl w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PRODUTO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
    },
    {
      accessorKey: "preco",
      header: "PREÇO",
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
        return getCategoriaNome(categoriaId);
      },
    },
    {
      accessorKey: "quantidade",
      header: "Quantidade",
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
      <div className="overflow-x-auto">
        <DataTableProdutos
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
          disabled={(currentPage + 1) * itemsPerPage >= (produtos?.length || 0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
        />
      </div>
      <AlertDeleteProduto onDelete={removeProdutos} />
    </>
  );
}
