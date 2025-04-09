import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlignLeft, Ticket, SquarePen   } from "lucide-react";

import { Dialog } from "@/components/Dialog";
import { FormRoot } from "../../../components/FormRoot";
import { z } from "zod";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { queryClient } from "@/service/reactQuery";
import { useTicketStore } from "@/store/Ticket/Index";
import { useTicket } from "@/hook/queries/useTicket";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { format } from "date-fns"
import { useUsuarios } from "@/hook/queries/useUsuarios";
import { MensagemHistorico } from "@/components/MensagensTickets/MensagemHistorico";
import { MensagensTicketForm } from "@/components/MensagensTickets";


const CreateTicketSchema = z.object({
  id: z.string().optional(),
  titulo: z.string().nonempty({ message: "Título é obrigatório" }),
  descricao: z.string().nonempty({ message: "Descrição é obrigatória" }),
  usuarioID: z.string().optional(),
  responsavelId: z.string().optional(),
  avaliacao: z.number().optional(),
  numero: z.string().optional(),
  prioridade: z.enum(["BAIXA", "MEDIA", "ALTA", "URGENTE"]),
  status: z.enum(["ABERTO", "FECHADO", "ANDAMENTO"]),
  categoria: z.enum(["SUPORTE", "COMERCIAL", "FINANCEIRO"]),
  createdAt: z.date().optional(),
});


export type CreateTicketData = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketData = CreateTicketData

export function Form() {
  const { user } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateTicketData>({
    resolver: zodResolver(CreateTicketSchema),
    defaultValues: {
      categoria: undefined,
      prioridade: undefined,
      status: "ABERTO",
    }
  });
  

  const { data, handleCloseDialog, isOpen } = useTicketStore((state) => ({
    data: state.ticket,
    handleCloseDialog: state.actions.handleCloseDialog,
    isOpen: state.isOpen,
  }));

  const { useCreate, useUpdate } = useTicket();
  const { mutateAsync: createTicket, isLoading: isLoadingCreateTicket } =
    useCreate();
  const { mutateAsync: updateTicket, isLoading: isLoadingUpdateTicket } =
    useUpdate();


    const { useReadUsuario } = useUsuarios();

    const responsavelId = data?.responsavelId;

    const { data: usuarioResponsavel } = useReadUsuario(responsavelId || "");



     

    const submitTicket = async (formData: CreateTicketData) => {
      const TicketId = data?.id;
      const usuarioID = user?.sub;

      const numeroAleatorio = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
      const payload = {
        ...formData,
        usuarioID: formData.usuarioID ?? usuarioID,
        responsavelId: formData.responsavelId ?? undefined,
        avaliacao: formData.avaliacao ?? 0,
        numero: formData.numero ?? numeroAleatorio,
      };
    
      if (TicketId) {
        await updateTicket({ id: TicketId, ...payload });
        queryClient.invalidateQueries({ queryKey: ["TICKET"] });
      } else {
        await createTicket(payload);
      }
    
      handleCloseDialog();
    };
    

  const isLoading = isLoadingCreateTicket || isLoadingUpdateTicket;

  const selectOptionsCategoria = [
    { value: "SUPORTE", label: "Suporte" },
    { value: "COMERCIAL", label: "Comercial" },
    { value: "FINANCEIRO", label: "Financeiro" },
  ];

  const selectOptionsPrioridade = [
    { value: "BAIXA", label: "Baixa" },
    { value: "MEDIA", label: "Média" },
    { value: "ALTA", label: "Alta" },
    { value: "URGENTE", label: "Urgente" },
  ];

  const selectOptionsStatus = [
    { value: "ABERTO", label: "Aberto" },
    { value: "ANDAMENTO", label: "Em andamento" },
    { value: "FECHADO", label: "Fechado" },
  ];


  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  

  useEffect(() => {
    if (data) {
      setValue("titulo", data.titulo || "");
      setValue("descricao", data.descricao || "");
      setValue("usuarioID", data.usuarioID|| "");
      setValue("createdAt", data.createdAt || "");
      setValue("avaliacao", data.avaliacao || 0);
      setValue("numero", data.numero || "");
  
      setValue("categoria", data.categoria as "SUPORTE" | "COMERCIAL" | "FINANCEIRO");
      setValue("prioridade", data.prioridade as "BAIXA" | "MEDIA" | "ALTA" | "URGENTE");
      setValue("status", data.status as "ABERTO" | "FECHADO" | "ANDAMENTO" || "ABERTO");
    } else {
      reset(); 
    }
  }, [data, setValue, reset]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title="Tickets de Atendimento" icon={<Ticket />}>
        <FormRoot onSubmit={handleSubmit(submitTicket)}>
          <div className="flex flex-col md:flex-row gap-4 ">
            <div className="flex-1 ">
              <Input
                icon={<AlignLeft size={20} />}
                type="text"
                label="Assunto"
                {...register("titulo")}
                error={errors.titulo}
              />
            </div>

            <div className=" flex  ">
              <Input
                className=" cursor-not-allowed"
                type="text"
                label="Data de Criação"
                value={data?.createdAt ? format(new Date(data.createdAt), "dd/MM/yyyy") : ""}
                readOnly={true}
              />
            </div>
            
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Controller
                control={control}
                name="categoria"
                render={({ field }) => (
                  <Select
                    label="Categoria"
                    text="Categoria"
                    options={selectOptionsCategoria}
                    error={errors.categoria}
                    {...field}
                    
                  />
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                control={control}
                name="prioridade"
                render={({ field }) => (
                  <Select
                    label="Prioridade"
                    text="Prioridade"
                    options={selectOptionsPrioridade}
                    error={errors.prioridade}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex-1">
              <Input
                className="cursor-not-allowed bg-red-400"
                type="text"
                label="Responsavel"
                value={usuarioResponsavel?.userName || ""}
                readOnly={true}
              />
            </div>

            <div className="flex-1">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    label="Status"
                    text="Status"
                    options={selectOptionsStatus}
                    error={errors.status}
                    {...field}
                  />
                )}
              />
            </div>  
          </div>

          <div className="flex gap-4">
            <div className="mt-4 flex-1">
              <Textarea 
              maxLength={1500}
              customSize="w-full h-32"
              icon={<SquarePen size={20} />}
              label="Descrição"
              {...register("descricao")}
                error={errors.descricao}
              />
            </div>
            <div className="mt-4 flex-1">
            <MensagensTicketForm />
            </div>
          </div>
          
          
          

          <div className="w-full h-64 p-6 border-brand-blue-500 border-2  rounded-xl overflow-y-auto">
          <MensagemHistorico /> 
          </div>

          

          <Dialog.Actions isLoading={isLoading} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}
