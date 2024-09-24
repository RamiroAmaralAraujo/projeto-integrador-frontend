import React, { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ClipboardPlus, AlignLeft, ScanBarcode, CircleDollarSign, PackageOpen } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog } from "@/components/Dialog";
import { FormRoot } from "../../../components/FormRoot";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import { RegistroProdutos } from "@/components/RegistroProdutos/RegistroProdutos";
import { AuthContext } from "@/Context/AuthContext";
import { useProdutos } from "@/hook/queries/useProdutos";
import { useCategorias } from "@/hook/queries/useCategorias";
import { useProdutosStore } from "@/store/Produtos/Index";
import { queryClient } from "@/service/reactQuery";

// Schema de validação com Zod
const CreateProdutosSchema = z.object({
  id: z.string().optional(),
  nome: z.string().nonempty("Nome do Produto é obrigatório."),
  descricao: z.string().optional(),
  preco: z.number().optional(),
  quantidade: z.number().optional(),
  sku: z.string().optional(),
  prod_url: z.string().optional(),
  categoriaId: z.string().optional(),
  empresaId: z.string().optional(),
});

// Tipos derivados do schema
export type CreateProdutosData = z.infer<typeof CreateProdutosSchema>;
export type UpdateProdutosData = CreateProdutosData & { id: string };

export function FormProdutos() {
  const [preco, setPreco] = useState("0");

  // Contexto de autenticação para obter a empresa selecionada
  const { empresaSelecionada } = useContext(AuthContext);

  // React Hook Form com validação Zod
  const {
    handleSubmit,
    control, // Usaremos Controller para componentes personalizados
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateProdutosData>({
    resolver: zodResolver(CreateProdutosSchema),
  });

  // Gerenciador de estado para produtos
  const {
    data: produtoData,
    handleCloseDialog,
    isOpen,
  } = useProdutosStore((state) => ({
    data: state.produtos,
    handleCloseDialog: state.actions.handleCloseDialog,
    isOpen: state.isOpen,
  }));

  // Hooks para criar e atualizar produtos
  const { useCreate, useUpdate } = useProdutos();
  const { mutateAsync: createProdutos, isLoading: isLoadingCreateProdutos } =
    useCreate();
  const { mutateAsync: updateProdutos, isLoading: isLoadingUpdateProdutos } =
    useUpdate();

  // Hook para ler categorias
  const { useRead } = useCategorias();
  const {
    data: categorias,
    error: errorCategorias,
  } = useRead();

  // Manipulador de mudança no campo de preço
  const handleChangePreco = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreco(e.target.value);
  };

  // Função de submissão do formulário
  async function submitProdutos(newProdutos: CreateProdutosData) {
    const produtosId = produtoData?.id;
    const empresaId = empresaSelecionada?.id;

    // Atualiza o preço com o valor numérico
    newProdutos.preco = parseFloat(preco);

    try {
      if (produtosId) {
        // Atualiza um produto existente
        await updateProdutos({ id: produtosId, ...newProdutos });
        queryClient.invalidateQueries({ queryKey: ["PRODUTOS"] });
      } else {
        // Cria um novo produto
        await createProdutos({ empresaId: empresaId!, ...newProdutos });
        queryClient.invalidateQueries({ queryKey: ["PRODUTOS"] });
      }
      
      // Fechar o diálogo após a criação ou edição
      handleCloseDialog();

    } catch (error) {
      console.error("Erro ao criar ou atualizar o produto", error);
    }
  }

  const isLoadingCreateOrUpdateProdutos =
    isLoadingCreateProdutos || isLoadingUpdateProdutos;

  // Resetar o formulário quando o diálogo for fechado
  useEffect(() => {
    if (!isOpen) {
      reset();
      setPreco("0");
    }
  }, [isOpen, reset]);

  // Preencher o preço ao editar um produto
  useEffect(() => {
    if (produtoData) {
      setPreco(produtoData.preco.toString());
    } else {
      setPreco("0");
    }
  }, [produtoData]);

  // Manipulador para sucesso no upload da imagem
  const handleUploadSuccess = (fileName: string) => {
    setValue("prod_url", fileName);
  };

  // Preparar opções para o Select
  const selectOptions =
    categorias?.map((categoria) => ({
      value: categoria.id,
      label: categoria.nome,
    })) || [];

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title="Cadastro de Produtos" icon={<ClipboardPlus />}>
        <FormRoot onSubmit={handleSubmit(submitProdutos)}>
          {/* Nome e Preço do Produto */}
          <div className="grid-cols-2 flex gap-2">
            <div className="w-full">
              <Input
                defaultValue={produtoData ? produtoData.nome : ""}
                icon={<PackageOpen size={20} />}
                label="Nome do Produto*"
                {...register("nome")}
                error={errors.nome}
              />
            </div>
            <div className="w-full">
              <Input
                defaultValue={produtoData ? produtoData.preco.toFixed(2) : ""}
                type="number"
                step="0.01"
                icon={<CircleDollarSign size={20} />}
                label="Preço*"
                {...register("preco", {
                  valueAsNumber: true,
                })}
                onChange={handleChangePreco}
                error={errors.preco}
              />
            </div>
          </div>

          {/* Descrição do Produto */}
          <div className="w-full mt-4">
            <Input
              icon={<AlignLeft size={20} />}
              defaultValue={produtoData ? produtoData.descricao : ""}
              type="text"
              label="Descrição*"
              {...register("descricao")}
              error={errors.descricao}
            />
          </div>

          {/* Categoria e SKU */}
          <div className="grid-cols-2 flex gap-2 mt-4">
            <div className="w-full">
              <Controller
                control={control}
                name="categoriaId"
                defaultValue={produtoData ? produtoData.categoriaId : ""}
                render={({ field }) => (
                  <Select
                    label="Categoria*"
                    options={selectOptions}
                    error={errors.categoriaId}
                    {...field}
                  />
                )}
              />
              {errorCategorias && (
                <span className="text-red-500 text-xs">
                  Erro ao carregar categorias
                </span>
              )}
            </div>

            <div className="w-full">
              <Input
                defaultValue={produtoData ? produtoData.sku : ""}
                icon={<ScanBarcode size={20} />}
                label="SKU*"
                {...register("sku")}
                error={errors.sku}
              />
            </div>
          </div>

          {/* Upload de Imagem e Registro de Produtos */}
          <div className="grid-cols-2 flex gap-2 mt-4">
            <div className="w-full">
              <UploadImage onUploadSuccess={handleUploadSuccess} />
            </div>
            <div className="w-full">
              <RegistroProdutos />
            </div>
          </div>

          {/* Ações do Diálogo */}
          <Dialog.Actions isLoading={isLoadingCreateOrUpdateProdutos} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}
