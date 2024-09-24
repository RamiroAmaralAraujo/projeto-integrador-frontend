// @/pages/Categorias/Components/FormCategorias.tsx

import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardPlus, AlignLeft, FolderPen } from "lucide-react";

import { Dialog } from "@/components/Dialog";
import { FormRoot } from "@/components/FormRoot"; // Verifique o caminho correto
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useCategorias } from "@/hook/queries/useCategorias";
import { useCategoriasStore } from "@/store/Categorias/Index";
import { Select } from "@/components/ui/select";

const CreateCategoriasSchema = z.object({
  id: z.string().optional(),
  nome: z.string().nonempty("Nome da Categoria é obrigatório."),
  descricao: z.string().optional(),
  parentId: z.string().optional(),
  empresaId: z.string().optional(),
});

export type CreateCategoriasData = z.infer<typeof CreateCategoriasSchema>;
export type UpdateCategoriasData = CreateCategoriasData & { id: string };

export function FormCategorias() {
  const { empresaSelecionada } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateCategoriasData>({
    // resolver: zodResolver(CreateCategoriasSchema),
  });

  const {
    data: currentCategory,
    handleCloseDialog,
    isOpen,
  } = useCategoriasStore((state) => ({
    data: state.categorias, // Supondo que 'categorias' seja a categoria atual sendo editada
    handleCloseDialog: state.actions.handleCloseDialog,
    isOpen: state.isOpen,
  }));

  const { useCreate, useUpdate, useRead } = useCategorias();
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useRead();

  const {
    mutateAsync: createCategorias,
    isLoading: isLoadingCreateCategorias,
  } = useCreate();
  const {
    mutateAsync: updateCategorias,
    isLoading: isLoadingUpdateCategorias,
  } = useUpdate();

  // Preencher o formulário quando uma categoria estiver sendo editada
  useEffect(() => {
    if (currentCategory) {
      setValue("id", currentCategory.id);
      setValue("nome", currentCategory.nome);
      setValue("descricao", currentCategory.descricao || "");
      setValue("parentId", currentCategory.parentId || "");
      setValue("empresaId", empresaSelecionada?.id || "");
    } else {
      reset(); // Resetar o formulário para criação
    }
  }, [currentCategory, setValue, reset, empresaSelecionada]);

  async function submitCategorias(newCategorias: CreateCategoriasData) {
    const categoriasId = newCategorias.id;
    const empresaId = empresaSelecionada?.id;

    if (categoriasId) {
      // Atualizar categoria existente
      await updateCategorias({ id: categoriasId, ...newCategorias });
    } else {
      // Criar nova categoria
      await createCategorias({ empresaId: empresaId || "", ...newCategorias });
    }
    handleCloseDialog();
  }

  const isLoadingCreateOrUpdateCategorias =
    isLoadingCreateCategorias || isLoadingUpdateCategorias;
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Trate os estados de loading e erro para as categorias
  if (isLoadingCategories) return <p>Carregando categorias...</p>;
  if (categoriesError)
    return <p>Erro ao carregar categorias: {categoriesError.message}</p>;

  // Filtrar a categoria atual para evitar que ela seja selecionada como pai de si mesma
  const filteredCategories = categoriesData?.filter(
    (category) => category.id !== currentCategory?.id
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title="Cadastro de Categorias" icon={<ClipboardPlus />}>
        <FormRoot onSubmit={handleSubmit(submitCategorias)}>
          <div className="grid-cols-2 flex gap-2">
            <div className="w-full">
              <Input
                defaultValue={currentCategory ? currentCategory.nome : ""}
                icon={<FolderPen size={20} />}
                label="Nome da Categoria*"
                {...register("nome")}
                error={errors.nome}
              />
            </div>
          </div>

          <Input
            icon={<AlignLeft size={20} />}
            defaultValue={currentCategory ? currentCategory.descricao : ""}
            type="text"
            label="Descrição"
            {...register("descricao")}
            error={errors.descricao}
          />

          <div className="w-full">
            <Select
              label="Categoria Pai"
              id="parentId"
              {...register("parentId")}
              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                sm:text-sm rounded-md`}
              defaultValue={
                currentCategory ? currentCategory.parentId || "" : ""
              }
              options={[
                { value: "", label: "Nenhuma" },
                ...(filteredCategories?.map((category) => ({
                  value: category.id,
                  label: category.nome,
                })) || []),
              ]}
            />
            {errors.parentId && (
              <p className="mt-2 text-sm text-red-600">
                {errors.parentId.message}
              </p>
            )}
          </div>

          <Dialog.Actions isLoading={isLoadingCreateOrUpdateCategorias} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}
