import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ClipboardPlus, AlignLeft, Trash, Plus } from "lucide-react";
import { Dialog } from "@/components/Dialog";
import { FormRoot } from "../../../components/FormRoot";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { z } from "zod";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { usePedidos } from "@/hook/queries/usePedidos";
import { usePedidosStore } from "@/store/Pedidos/Index";
import { ToggleTipoPedido } from "@/components/ToggleTipoPedido/ToggleTipoPedido";
import { useProdutos } from "@/hook/queries/useProdutos";
import { queryClient } from "@/service/reactQuery";
import { TipoMovimentacao } from "@/enums/TipoMovimentacao";

const CreatePedidosSchema = z.object({
  id: z.string().optional(),
  idPedido: z.number().optional(),
  tipo: z.enum([TipoMovimentacao.ENTRADA, TipoMovimentacao.SAIDA]),
  produtos: z.array(
    z.object({
      produtoId: z.string(),
      quantidade: z.number().min(1, "Quantidade deve ser no mínimo 1"),
    })
  ),
  empresaId: z.string().optional(),
  observacao: z.string().optional(),
  data: z.string(),
});

export type CreatePedidosData = z.infer<typeof CreatePedidosSchema>;
export type UpdatePedidosData = CreatePedidosData;

export function FormPedidos() {
  const [tipo, settipo] = useState<TipoMovimentacao>(TipoMovimentacao.SAIDA);
  const { empresaSelecionada } = useContext(AuthContext);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreatePedidosData>({
    defaultValues: {
      produtos: [{ produtoId: "", quantidade: 1 }],
      tipo: TipoMovimentacao.SAIDA,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "produtos",
  });

  const { data, handleCloseDialog, isOpen } = usePedidosStore((state) => ({
    data: state.pedidos,
    handleCloseDialog: state.actions.handleCloseDialog,
    isOpen: state.isOpen,
  }));

  const { useCreate, useUpdate } = usePedidos();
  const { mutateAsync: createPedidos, isLoading: isLoadingCreatePedidos } = useCreate();
  const { mutateAsync: updatePedidos, isLoading: isLoadingUpdatePedidos } = useUpdate();

  const { useRead } = useProdutos();
  const { data: produtos } = useRead();

  useEffect(() => {
    if (data) {
      setValue("observacao", data.observacao || "");
      setValue("data", data.data ? new Date(data.data).toISOString().split("T")[0] : "");
      setValue("produtos", data.produtos || [{ produtoId: "", quantidade: 1 }]);
      settipo(data.tipo || TipoMovimentacao.SAIDA);
    } else {
      reset();
      settipo(TipoMovimentacao.SAIDA);
    }
  }, [data, setValue, reset]);

  function parseDate(dateString: string): Date | null {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  async function submitPedidos(newPedidos: CreatePedidosData) {
    newPedidos.tipo = tipo;

    const dataDate = parseDate(newPedidos.data);
    if (!dataDate) {
      console.error("Data inválida!");
      return;
    }

    dataDate.setTime(dataDate.getTime() + dataDate.getTimezoneOffset() * 60 * 1000);
    dataDate.setHours(0, 0, 0, 0);

    if (dataDate.getDate() !== parseInt(newPedidos.data.split("-")[2])) {
      dataDate.setDate(parseInt(newPedidos.data.split("-")[2]));
    }

    newPedidos.data = dataDate.toISOString();
    newPedidos.tipo = tipo;

    const pedidosId = data?.id;
    const empresaId = empresaSelecionada?.id;

    if (pedidosId) {
      await updatePedidos({ id: pedidosId, ...newPedidos });
      queryClient.invalidateQueries({ queryKey: ["PEDIDOS"] });
    } else {
      await createPedidos({ empresaId: empresaId, ...newPedidos });
    }

    reset();
    handleCloseDialog();
  }

  const isLoadingCreateOrUpdatePedidos = isLoadingCreatePedidos || isLoadingUpdatePedidos;

  const selectOptions =
    produtos?.map((produto) => ({
      value: produto.id,
      label: produto.nome,
    })) || [];

  const produtosForm = watch("produtos") || [];

  const totalPedido = produtosForm.reduce((acc, item) => {
    const produto = produtos?.find((p) => p.id === item.produtoId);
    if (!produto) return acc;
    return acc + produto.preco * item.quantidade;
  }, 0);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title="Cadastro Pedidos" icon={<ClipboardPlus />}>
        <FormRoot onSubmit={handleSubmit(submitPedidos)}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 w-full mt-4 mb-4">
              <Input type="date" label="Data*" {...register("data")} error={errors.data} />
              <ToggleTipoPedido value={tipo} onChange={(value: TipoMovimentacao) => settipo(value)} />
            </div>

            <Input icon={<AlignLeft size={20} />} type="text" label="Observação" {...register("observacao")} error={errors.observacao} />

            <div className="w-full">
              <h2 className="text-xl mb-4">Produtos Adicionados</h2>
              <div className="border rounded-2xl p-4 h-80 overflow-y-scroll overflow-x-hidden">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <Controller
                      control={control}
                      name={`produtos.${index}.produtoId`}
                      render={({ field }) => (
                        <Select
                          label="Produto*"
                          text="Selecione o Produto"
                          options={selectOptions}
                          error={errors.produtos?.[index]?.produtoId}
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`produtos.${index}.quantidade`}
                      render={({ field }) => (
                        <Input
                          type="number"
                          customSize="w-[130px]"
                          label="Quantidade*"
                          error={errors.produtos?.[index]?.quantidade}
                          {...field}
                        />
                      )}
                    />

                    <Input
                      type="text"
                      customSize="w-[150px]"
                      label="Total"
                      value={(() => {
                        const produtoId = watch(`produtos.${index}.produtoId`);
                        const quantidade = watch(`produtos.${index}.quantidade`) || 0;
                        const produto = produtos?.find((p) => p.id === produtoId);
                        return produto
                          ? `R$ ${(produto.preco * quantidade).toFixed(2)}`
                          : "R$ 0,00";
                      })()}
                      readOnly
                    />

                    <button
                      type="button"
                      onClick={() => fields.length > 1 && remove(index)}
                      className={`text-red-600 ${fields.length <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={fields.length <= 1}
                    >
                      <div className="bg-gray-300 rounded-full hover:bg-gray-200 text-red-700 p-2">
                        <Trash size={20} />
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => append({ produtoId: "", quantidade: 1 })}
                className="mt-4 text-blue-600"
              >
                <div className="bg-gray-300 rounded-full hover:bg-gray-200 text-brand-blue-400 p-2">
                  <Plus size={20} />
                </div>
              </button>
            </div>

            <div className="text-right mt-4 font-bold text-lg">
              Total do Pedido: R$ {totalPedido.toFixed(2)}
            </div>
          </div>

          <Dialog.Actions isLoading={isLoadingCreateOrUpdatePedidos} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}