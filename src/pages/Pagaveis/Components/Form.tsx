import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardPlus, UsersRound, UserRound, Wallet, BadgeDollarSign, BadgePercent, DollarSign, AlignLeft } from 'lucide-react';
import { Dialog } from '@/components/Dialog';
import { FormRoot } from '../../../components/FormRoot';
import { Input } from '@/components/ui/input';
import { ToggleTipoDuplicata } from '@/components/ToggleTipoPagamento/ToggleTipoPagamento';
import { UploadImage } from '@/components/UploadImage/UploadImage';
import { RegistroDuplicatas } from '@/components/RegistroDuplicatas/RegistroDuplicatas';
import SignaturePad from '@/components/SignaturePad/SignaturePad';
import { useContext, useEffect } from 'react';
import { useDuplicatas } from '@/hook/queries/useDuplicatas';
import { useDuplicatasStore } from '@/store/Duplicatas/Index';
import { AuthContext } from '@/Context/AuthContext';
import { queryClient } from '@/service/reactQuery';
import { z } from 'zod';

const CreateDuplicatasSchema = z.object({
  id: z.string().optional(),
  tipoPag: z.boolean(),
  pessoaRef: z.string().nonempty('Informe a pessoa/empresa.'),
  vencimento: z.string().nonempty('Vencimento obrigatório'),
  data_Pag_Receb: z.string().nullable().optional(),
  descricao: z.string().nonempty('Descrição obrigatória'),
  valorLiq: z.number().min(0),
  desconto: z.number().min(0),
  descontoPorcento: z.number().min(0),
  acresc: z.number().min(0),
  acrescPorcento: z.number().min(0),
  valorFinal: z.number().min(0),
  responsavel: z.string().optional(),
  comp_url: z.string().optional(),
  ass_url: z.string().optional(),
  empresaId: z.string().optional(),
});

type CreateDuplicatasData = z.infer<typeof CreateDuplicatasSchema>;

export function FormDuplicatas() {
  const { empresaSelecionada } = useContext(AuthContext);
  const { data, handleCloseDialog, isOpen } = useDuplicatasStore(state => ({
    data: state.duplicatas,
    handleCloseDialog: state.actions.handleCloseDialog,
    isOpen: state.isOpen
  }));
  const { useCreate, useUpdate } = useDuplicatas();
  const { mutateAsync: createDuplicatas, isLoading: loadingCreate } = useCreate();
  const { mutateAsync: updateDuplicatas, isLoading: loadingUpdate } = useUpdate();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CreateDuplicatasData>({
    resolver: zodResolver(CreateDuplicatasSchema),
    defaultValues: {
      id: undefined,
      tipoPag: false,
      pessoaRef: '',
      responsavel: '',
      vencimento: '',
      data_Pag_Receb: null,
      descricao: '',
      valorLiq: 0,
      desconto: 0,
      descontoPorcento: 0,
      acresc: 0,
      acrescPorcento: 0,
      valorFinal: 0,
      comp_url: '',
      ass_url: '',
      empresaId: empresaSelecionada?.id
    }
  });

  // Reação aos dados de edição
  useEffect(() => {
    if (data) {
      const defaultVenc = data.vencimento ? new Date(data.vencimento).toISOString().split('T')[0] : '';
      const defaultPag = data.data_Pag_Receb ? new Date(data.data_Pag_Receb).toISOString().split('T')[0] : '';
      reset({
        id: data.id,
        tipoPag: data.tipoPag,
        pessoaRef: data.pessoaRef,
        responsavel: data.responsavel || '',
        vencimento: defaultVenc,
        data_Pag_Receb: defaultPag || undefined,
        descricao: data.descricao,
        valorLiq: Number(data.valorLiq),
        desconto: Number(data.desconto),
        descontoPorcento: Number(data.descontoPorcento),
        acresc: Number(data.acresc),
        acrescPorcento: Number(data.acrescPorcento),
        valorFinal: Number(data.valorFinal),
        comp_url: data.comp_url || undefined,
        ass_url: data.ass_url || undefined,
        empresaId: data.empresaId || empresaSelecionada?.id
      });
    } else if (!isOpen) {
      reset();
    }
  }, [data, isOpen, reset]);

  // Cálculo inline do valor final
  const handleRecalculate = (liquido: number, desc: number, descPorc: number, acre: number, acrePorc: number) => {
    const valor = liquido - desc + acre - (descPorc / 100) * liquido + (acrePorc / 100) * liquido;
    setValue('valorFinal', parseFloat(valor.toFixed(2)), { shouldDirty: true });
  };

  const liquido = watch('valorLiq');
  const desc = watch('desconto');
  const descPorc = watch('descontoPorcento');
  const acre = watch('acresc');
  const acrePorc = watch('acrescPorcento');

  useEffect(() => {
    handleRecalculate(liquido, desc, descPorc, acre, acrePorc);
  }, [liquido, desc, descPorc, acre, acrePorc]);

  // Conversão de datas para ISO
  function parseDate(dateString: string): Date | null {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  async function submitDuplicatas(formData: CreateDuplicatasData) {
    // Ajuste de datas (mesma lógica antiga)
    const vencDate = parseDate(formData.vencimento);
    if (vencDate) {
      vencDate.setTime(vencDate.getTime() + vencDate.getTimezoneOffset() * 60000);
      vencDate.setHours(0,0,0,0);
      if (vencDate.getDate() !== parseInt(formData.vencimento.split('-')[2])) {
        vencDate.setDate(parseInt(formData.vencimento.split('-')[2]));
      }
      formData.vencimento = vencDate.toISOString();
    }
    if (formData.data_Pag_Receb) {
      const pagDate = parseDate(formData.data_Pag_Receb as string);
      if (pagDate) {
        pagDate.setTime(pagDate.getTime() + pagDate.getTimezoneOffset() * 60000);
        pagDate.setHours(0,0,0,0);
        if (pagDate.getDate() !== parseInt((formData.data_Pag_Receb as string).split('-')[2])) {
          pagDate.setDate(parseInt((formData.data_Pag_Receb as string).split('-')[2]));
        }
        formData.data_Pag_Receb = pagDate.toISOString();
      } else {
        formData.data_Pag_Receb = null;
      }
    }

    formData.empresaId = empresaSelecionada?.id;
    if (formData.id) {
      await updateDuplicatas(formData);
      queryClient.invalidateQueries(['DUPLICATAS']);
    } else {
      await createDuplicatas(formData);
    }
    handleCloseDialog();
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title="Cadastro Duplicatas" icon={<ClipboardPlus />}>
        <FormRoot onSubmit={handleSubmit(submitDuplicatas)}>
          <div className="grid grid-cols-2 gap-2">
            <Controller
              control={control}
              name="pessoaRef"
              render={({ field }) => (
                <Input
                  icon={<UsersRound size={20} />}
                  label="Pessoa / Empresa*"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.pessoaRef}
                />
              )}
            />
            <Controller
              control={control}
              name="responsavel"
              render={({ field }) => (
                <Input
                  icon={<UserRound size={20} />}
                  label="Responsável"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.responsavel}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Controller
              control={control}
              name="valorLiq"
              render={({ field }) => (
                <Input
                  accept="number"
                  icon={<Wallet size={20} />}
                  label="Valor Líquido*"
                  value={field.value.toString()}
                  onChange={e => {
                    const v = parseFloat(e.target.value) || 0;
                    field.onChange(v);
                  }}
                  error={errors.valorLiq}
                />
              )}
            />
            <Controller
              control={control}
              name="desconto"
              render={({ field }) => (
                <Input
                  accept="number"
                  icon={<BadgeDollarSign size={20} />}
                  label="Desconto R$*"
                  value={field.value.toString()}
                  onChange={e => {
                    const v = parseFloat(e.target.value) || 0;
                    field.onChange(v);
                  }}
                  error={errors.desconto}
                />
              )}
            />
            <Controller
              control={control}
              name="descontoPorcento"
              render={({ field }) => (
                <Input
                  accept="number"
                  icon={<BadgePercent size={20} />}
                  label="Desconto %*"
                  value={field.value.toString()}
                  onChange={e => {
                    const v = parseFloat(e.target.value) || 0;
                    field.onChange(v);
                  }}
                  error={errors.descontoPorcento}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Controller
              control={control}
              name="valorFinal"
              render={({ field }) => (
                <Input
                  icon={<DollarSign size={20} />}
                  label="Valor Final*"
                  value={field.value.toString()}
                  readOnly
                  error={errors.valorFinal}
                />
              )}
            />
            <Controller
              control={control}
              name="acresc"
              render={({ field }) => (
                <Input
                  accept="number"
                  icon={<BadgeDollarSign size={20} />}
                  label="Acréscimo R$*"
                  value={field.value.toString()}
                  onChange={e => {
                    const v = parseFloat(e.target.value) || 0;
                    field.onChange(v);
                  }}
                  error={errors.acresc}
                />
              )}
            />
            <Controller
              control={control}
              name="acrescPorcento"
              render={({ field }) => (
                <Input
                  accept="number"
                  icon={<BadgePercent size={20} />}
                  label="Acréscimo %*"
                  value={field.value.toString()}
                  onChange={e => {
                    const v = parseFloat(e.target.value) || 0;
                    field.onChange(v);
                  }}
                  error={errors.acrescPorcento}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="descricao"
            render={({ field }) => (
              <Input
                icon={<AlignLeft size={20} />}
                label="Descrição*"
                value={field.value}
                onChange={field.onChange}
                error={errors.descricao}
              />
            )}
          />

          <div className="grid grid-cols-3 gap-2">
            <Controller
              control={control}
              name="vencimento"
              render={({ field }) => (
                <Input
                  type="date"
                  label="Vencimento*"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.vencimento}
                />
              )}
            />
            <Controller
              control={control}
              name="data_Pag_Receb"
              render={({ field }) => (
                <Input
                  type="date"
                  label="Data Pagamento/Recebimento"
                  value={field.value || ''}
                  onChange={field.onChange}
                  error={errors.data_Pag_Receb}
                />
              )}
            />
            <Controller
              control={control}
              name="tipoPag"
              render={({ field }) => (
                <ToggleTipoDuplicata
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex gap-2">
            <UploadImage onUploadSuccess={file => setValue('comp_url', file)} />
            <SignaturePad onUploadSuccess={file => setValue('ass_url', file)} />
            <RegistroDuplicatas />
          </div>

          <Dialog.Actions isLoading={loadingCreate || loadingUpdate} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}
