import { useForm, Controller } from "react-hook-form";
import { ClipboardPlus, Wallet, AlignLeft } from "lucide-react";
import { Dialog } from "@/components/Dialog";
import { FormRoot } from "../../../components/FormRoot";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { usePedidos } from "@/hook/queries/usePedidos";
import { usePedidosStore } from "@/store/Pedidos/Index";
import { ToggleTipoPedido } from "@/components/ToggleTipoPedido/ToggleTipoPedido";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import { RegistroPedidos } from "@/components/RegistroPedidos/RegistroPedidos";
import { useProdutos } from "@/hook/queries/useProdutos";
import { queryClient } from "@/service/reactQuery";
import { TipoMovimentacao } from "@/enums/TipoMovimentacao";

// Atualize o schema para aceitar o tipo do enum
const CreatePedidosSchema = z.object({
  id: z.string().optional(),
  tipo: z.enum([TipoMovimentacao.ENTRADA, TipoMovimentacao.SAIDA]),
  quantidade: z.number(),
  produtoId: z.string(),
  empresaId: z.string().optional(),
  descricao: z.string().optional(),
  ped_url: z.string().optional(),
  data: z.string(),
});

export type CreatePedidosData = z.infer<typeof CreatePedidosSchema>;
export type UpdatePedidosData = CreatePedidosData;

export function FormPedidos() {
  const [quantidade, setQuantidade] = useState("0");
  const [tipo, settipo] = useState<TipoMovimentacao>(TipoMovimentacao.SAIDA);

  const { empresaSelecionada } = useContext(AuthContext);
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreatePedidosData>();

  const { data, handleCloseDialog, isOpen } = usePedidosStore((state) => {
    return {
      data: state.pedidos,
      handleCloseDialog: state.actions.handleCloseDialog,
      isOpen: state.isOpen,
    };
  });

  const { useCreate, useUpdate } = usePedidos();
  const { mutateAsync: createPedidos, isLoading: isLoadingCreatePedidos } =
    useCreate();
  const { mutateAsync: updatePedidos, isLoading: isLoadingUpdatePedidos } =
    useUpdate();

  const { useRead } = useProdutos();
  const { data: produtos } = useRead();

  const handleChangeQuantidade = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidade(e.target.value);
  };

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

    dataDate.setTime(
      dataDate.getTime() + dataDate.getTimezoneOffset() * 60 * 1000
    );
    dataDate.setHours(0, 0, 0, 0);
    if (dataDate.getDate() !== parseInt(newPedidos.data.split("-")[2])) {
      dataDate.setDate(parseInt(newPedidos.data.split("-")[2]));
    }

    newPedidos.data = dataDate.toISOString();
    newPedidos.tipo = tipo;

    const pedidosId = data?.id;
    const empresaId = empresaSelecionada?.id;
    newPedidos.quantidade = parseInt(quantidade);

    if (pedidosId) {
      await updatePedidos({ id: pedidosId, ...newPedidos });
      queryClient.invalidateQueries({ queryKey: ["PEDIDOS"] });
    } else {
      await createPedidos({ empresaId: empresaId, ...newPedidos });
    }
    handleCloseDialog();
  }

  const isLoadingCreateOrUpdatePedidos =
    isLoadingCreatePedidos || isLoadingUpdatePedidos;

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (data) {
      setQuantidade(data.quantidade.toString());
      settipo(data.tipo); // Definir diretamente o tipo vindo de `data`
    } else {
      setQuantidade("0");
      settipo(TipoMovimentacao.SAIDA); // Valor padrão
    }
  }, [data]);

  const handleUploadSuccess = (fileName: string) => {
    setValue("ped_url", fileName);
  };

  const defaultData =
    data && data.data ? new Date(data.data).toISOString().split("T")[0] : "";

  const selectOptions =
    produtos?.map((produto) => ({
      value: produto.id,
      label: produto.nome,
    })) || [];

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title="Cadastro Pedidos" icon={<ClipboardPlus />}>
        <FormRoot onSubmit={handleSubmit(submitPedidos)}>
          <div className="grid-cols-2 flex gap-2">
            <div className="w-full">
              <Controller
                control={control}
                name="produtoId"
                defaultValue={data ? data.produtoId : ""}
                render={({ field }) => (
                  <Select
                    label="Produto*"
                    options={selectOptions}
                    error={errors.produtoId}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="w-full">
              <Input
                defaultValue={data ? data.quantidade?.toFixed(0) : ""}
                type="number"
                icon={<Wallet size={20} />}
                label="Quantidade*"
                {...register("quantidade")}
                onChange={handleChangeQuantidade}
                error={errors.quantidade}
              />
            </div>
          </div>

          <Input
            icon={<AlignLeft size={20} />}
            defaultValue={data ? data.descricao?.toString() ?? "" : ""}
            type="text"
            label="Descrição*"
            {...register("descricao")}
            error={errors.descricao}
          />

          <div className="grid-cols-2 flex gap-2">
            <div className="w-full">
              <Input
                type="date"
                defaultValue={defaultData}
                label="Data*"
                {...register("data")}
                error={errors.data}
              />
            </div>
            <div className="w-full justify-center flex">
              <ToggleTipoPedido
                value={tipo}
                onChange={(value: TipoMovimentacao) => {
                  console.log("Novo tipo selecionado:", value);
                  settipo(value);
                }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-full h-full flex gap-2">
              <div className="w-full">
                <UploadImage onUploadSuccess={handleUploadSuccess} />
              </div>
              <div className="w-full">
                <RegistroPedidos />
              </div>
            </div>
          </div>
          <Dialog.Actions isLoading={isLoadingCreateOrUpdatePedidos} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}
