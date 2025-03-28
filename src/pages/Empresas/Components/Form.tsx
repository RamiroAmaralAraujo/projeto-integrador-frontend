import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Store,
  Building,
  MapPinned,
  MapPin,
  Building2,
  Home,
  Flag,
} from "lucide-react";
import { TiBusinessCard } from "react-icons/ti";

import { useEmpresasStore } from "@/store/Empresas/Index";

import { Dialog } from "@/components/Dialog";
import { FormRoot } from "../../../components/FormRoot";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useEmpresas } from "@/hook/queries/useEmpresas";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { queryClient } from "@/service/reactQuery";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import { RegistroEmpresas } from "@/components/RegistroEmpresas/RegistroEmpresas";

const CreateEmpresasSchema = z.object({
  id: z.string().optional(),
  empresaNome: z
    .string()
    .nonempty({ message: "Nome da Empresa é obrigatório" }),
  cnpj_cpf: z.string().nonempty({ message: "CNPJ ou CPF é obrigatório" }),
  endereco: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  logo_url: z.string().optional(),
  cep: z.string().optional(),
  usuarioID: z.string().optional(),
});

export type CreateEmpresasData = z.infer<typeof CreateEmpresasSchema>;
export type UpdateEmpresasData = CreateEmpresasData;

export function Form() {
  const { user } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEmpresasData>({
    resolver: zodResolver(CreateEmpresasSchema),
  });

  const { data, handleCloseDialog, isOpen } = useEmpresasStore((state) => {
    return {
      data: state.empresas,
      handleCloseDialog: state.actions.handleCloseDialog,
      isOpen: state.isOpen,
    };
  });
  const { useCreate, useUpdate } = useEmpresas();
  const { mutateAsync: createEmpresas, isLoading: isLoadingCreateEmpresas } =
    useCreate();
  const { mutateAsync: updateEmpresas, isLoading: isLoadingUpdateCategory } =
    useUpdate();

  async function submitEmpresas(newEmpresas: CreateEmpresasData) {
    const empresasId = data?.id;
    const usuarioID = user?.sub;

    if (empresasId) {
      await updateEmpresas({ id: empresasId, ...newEmpresas });
      queryClient.invalidateQueries({ queryKey: ["EMPRESAS"] });
      handleCloseDialog();
      return;
    }

    await createEmpresas({ usuarioID: usuarioID, ...newEmpresas });
    handleCloseDialog();
  }

  const isLoadingCreateOrUpdateEmpresas =
    isLoadingCreateEmpresas || isLoadingUpdateCategory;

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (data) {
      setValue("empresaNome", data.empresaNome || "");
      setValue("cnpj_cpf", data.cnpj_cpf?.toString() || "");
      setValue("endereco", data.endereco?.toString() || "");
      setValue("bairro", data.bairro?.toString() || "");
      setValue("cidade", data.cidade?.toString() || "");
      setValue("uf", data.uf?.toString() || "");
      setValue("cep", data.cep?.toString() || "");
    } else {
      reset();
    }
  }, [data, setValue, reset]);  

  const handleUploadLogoSuccess = (fileName: string) => {
    setValue("logo_url", fileName);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title="Cadastro Empresa" icon={<Store />}>
        <FormRoot onSubmit={handleSubmit(submitEmpresas)}>
          <Input
            icon={<Building size={20} />}
            label="Empresa Nome*"
            {...register("empresaNome")}
            error={errors.empresaNome}
          />

          <Input
            icon={<TiBusinessCard size={20} />}
            label="CNPJ/CPF*"
            maskType="cnpj_cpf"
            maxLength={18}
            {...register("cnpj_cpf")}
            error={errors.cnpj_cpf}
          />

          <div className="grid-cols-2 flex gap-2">
            <div className="w-full">
              <Input
                icon={<MapPinned size={20} />}
                label="Endereço"
                {...register("endereco")}
                error={errors.endereco}
              />
            </div>
            <Input
              icon={<Home size={20} />}
              label="Bairro"
              {...register("bairro")}
              error={errors.bairro}
            />
          </div>
          <div className="grid-cols-2 flex gap-2">
            <div className="w-full">
              <Input
                icon={<Building2 size={20} />}
                label="Cidade"
                {...register("cidade")}
                error={errors.cidade}
              />
            </div>

            <Input
              icon={<Flag size={20} />}
              label="UF"
              maxLength={2}
              {...register("uf")}
              error={errors.uf}
            />

            <Input
              icon={<MapPin size={20} />}
              label="CEP"
              maxLength={8}
              maskType="cep"
              {...register("cep")}
              error={errors.cep}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="w-full">
              <UploadImage onUploadSuccess={handleUploadLogoSuccess} />
            </div>
            <div className="w-full">
              <RegistroEmpresas />
            </div>
          </div>

          <Dialog.Actions isLoading={isLoadingCreateOrUpdateEmpresas} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}
