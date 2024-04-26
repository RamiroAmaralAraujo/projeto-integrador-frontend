import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardPlus, UsersRound, UserRound, Wallet, BadgePercent, DollarSign, AlignLeft, FilePen, BadgeDollarSign } from 'lucide-react';




import { Dialog } from '@/components/Dialog'
import { FormRoot } from '../../../components/FormRoot'
import { Input } from '@/components/ui/input'


import { z } from 'zod'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { useDuplicatas } from '@/hook/queries/useDuplicatas'
import { useDuplicatasStore } from '@/store/Duplicatas/Index'
import { ToggleTipoDuplicata } from '@/components/ToggleTipoPagamento/ToggleTipoPagamento'
import { UploadImage } from '@/components/UploadImage/UploadImage'
import { AssinaturaPad } from '@/components/SignaturePad/SignaturePad'
import { RegistroDuplicatas } from '@/components/RegistroDuplicatas/RegistroDuplicatas';
import { queryClient } from '@/service/reactQuery';




const CreateDuplicatasSchema = z.object({
  id: z.string().optional(),
  tipoPag: z.boolean(),
  pessoaRef: z.string().nonempty('Não é possivel cria uma duplicata sem informar a pessoa referente.'),
  vencimento: z.string(),
  data_Pag_Receb: z.string().nullable(),
  descricao: z.string(),
  valorLiq: z.number(),
  desconto: z.number(),
  descontoPorcento: z.number(),
  acresc: z.number(),
  acrescPorcento: z.number(),
  valorFinal: z.number(),
  responsavel: z.string(),
  comp_url: z.string(),
  ass_url: z.string(),
  documento: z.number(),
  empresaId: z.string().optional(),
})

export type CreateDuplicatasData = z.infer<typeof CreateDuplicatasSchema>
export type UpdateDuplicatasData = CreateDuplicatasData




export function FormDuplicatas() {

  const [valorLiquido, setValorLiquido] = useState('0');
  const [desconto, setDesconto] = useState('0');
  const [acrescimo, setAcrescimo] = useState('0');
  const [valorFinalAuto, setValorFinalAuto] = useState('0');
  const [descontoPorcento, setDescontoPorcento] = useState('0')
  const [acrescimoPorcento, setAcrescimoPorcento] = useState('0')

  const [tipoPag, setTipoPag] = useState<boolean>(false)

  const { empresaSelecionada } = useContext(AuthContext)
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateDuplicatasData>({
    // resolver: zodResolver(CreateDuplicatasSchema),
  })

  const { data, handleCloseDialog, isOpen } = useDuplicatasStore((state) => {
    return {
      data: state.duplicatas,
      handleCloseDialog: state.actions.handleCloseDialog,
      isOpen: state.isOpen,
    }
  })
  const { useCreate, useUpdate } = useDuplicatas()
  const { mutateAsync: createDuplicatas, isLoading: isLoadingCreateDuplicatas } = useCreate()
  const { mutateAsync: updateDuplicatas, isLoading: isLoadingUpdateDuplicatas } = useUpdate()

  const handleChangeValorLiquido = (e: { target: { value: SetStateAction<string> } }) => {
    setValorLiquido(e.target.value);
    calcularValorFinal();
  };

  const handleChangeDesconto = (e: { target: { value: SetStateAction<string> } }) => {
    setDesconto(e.target.value);
    calcularValorFinal();
  };

  const handleChangeDescontoPorcento = (e: { target: { value: SetStateAction<string> } }) => {
    setDescontoPorcento(e.target.value);
    calcularValorFinal();
  };

  const handleChangeAcrescimo = (e: { target: { value: SetStateAction<string> } }) => {
    setAcrescimo(e.target.value);
    calcularValorFinal();
  };

  const handleChangeAcrescimoPorcento = (e: { target: { value: SetStateAction<string> } }) => {
    setAcrescimoPorcento(e.target.value);
    calcularValorFinal();
  };

  const calcularValorFinal = () => {
    const liquido = parseFloat(valorLiquido) || 0;
    const desc = parseFloat(desconto) || 0;
    const acre = parseFloat(acrescimo) || 0;
    const descPorcento = parseFloat(descontoPorcento) || 0
    const acrePorcento = parseFloat(acrescimoPorcento) || 0
    const valorFinal = (liquido - desc + acre - ((descPorcento / 100) * liquido) + ((acrePorcento / 100) * liquido));
    setValorFinalAuto(valorFinal.toFixed(2).toString());
  };




  function parseDate(dateString: string): Date | null {
    const date = new Date(dateString);
    // Verifica se a data é válida
    return isNaN(date.getTime()) ? null : date;
  }

  async function submitDuplicatas(newDuplicatas: CreateDuplicatasData) {
    const vencimentoDate = parseDate(newDuplicatas.vencimento);
    if (!vencimentoDate) {
      console.error("Data de vencimento inválida!");
      return;
    }

    // Define o fuso horário para 'America/Sao_Paulo'
    vencimentoDate.setTime(vencimentoDate.getTime() + vencimentoDate.getTimezoneOffset() * 60 * 1000);
    // Define a hora para 03:00:00
    vencimentoDate.setHours(0, 0, 0, 0);

    // Verifica se o dia foi definido corretamente
    if (vencimentoDate.getDate() !== parseInt(newDuplicatas.vencimento.split('-')[2])) {
      // Se não for o dia correto, ajusta para o dia correto
      vencimentoDate.setDate(parseInt(newDuplicatas.vencimento.split('-')[2]));
    }

    newDuplicatas.vencimento = vencimentoDate.toISOString();

    // O mesmo para a data de Pagamento/Recebimento
    if (newDuplicatas.data_Pag_Receb !== null) {
      const dataPagRecebDate = parseDate(newDuplicatas.data_Pag_Receb)
      if (dataPagRecebDate) {
        dataPagRecebDate.setTime(dataPagRecebDate.getTime() + dataPagRecebDate.getTimezoneOffset() * 60 * 1000);
        dataPagRecebDate.setHours(0, 0, 0, 0);

        // Verifica e ajusta o dia, se necessário
        if (dataPagRecebDate.getDate() !== parseInt(newDuplicatas.data_Pag_Receb.split('-')[2])) {
          dataPagRecebDate.setDate(parseInt(newDuplicatas.data_Pag_Receb.split('-')[2]));
        }

        newDuplicatas.data_Pag_Receb = dataPagRecebDate.toISOString();
      } else {
        newDuplicatas.data_Pag_Receb = null;
      }
    }

    newDuplicatas.tipoPag = tipoPag ? true : false;

    const duplicatasId = data?.id;
    const empresaId = empresaSelecionada?.id;

    calcularValorFinal();

    newDuplicatas.valorFinal = parseFloat(valorFinalAuto);
    newDuplicatas.valorLiq = parseFloat(valorLiquido);
    newDuplicatas.desconto = parseFloat(desconto);
    newDuplicatas.descontoPorcento = parseFloat(descontoPorcento);
    newDuplicatas.acresc = parseFloat(acrescimo);
    newDuplicatas.acrescPorcento = parseFloat(acrescimoPorcento);

    if (duplicatasId) {
      await updateDuplicatas({ id: duplicatasId, ...newDuplicatas });
      queryClient.invalidateQueries({ queryKey: ['DUPLICATAS'] })
    } else {
      await createDuplicatas({ empresaId: empresaId, ...newDuplicatas });
    }
    handleCloseDialog();
  }



  const isLoadingCreateOrUpdateDuplicatas =
    isLoadingCreateDuplicatas || isLoadingUpdateDuplicatas

  useEffect(() => {
    if (!isOpen) {
      reset();
      setValorFinalAuto('');
    }
  }, [isOpen, reset]);

  useEffect(() => {
    calcularValorFinal();
  }, [valorLiquido, desconto, acrescimo, valorFinalAuto, descontoPorcento, acrescimoPorcento]);


  useEffect(() => {
    if (data) {
      setTipoPag(data.tipoPag);
    } else {
      setTipoPag(false);
    }
  }, [data]);




  const handleUploadSuccess = (fileName: string) => {
    setValue('comp_url', fileName);
  };

  const defaultVencimento = data && data.vencimento ? new Date(data.vencimento).toISOString().split('T')[0] : '';
  const defaultPagamento = data && data.data_Pag_Receb ? new Date(data.data_Pag_Receb).toISOString().split('T')[0] : '';



  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title='Cadastro Duplicatas' icon={<ClipboardPlus />}>
        <FormRoot onSubmit={handleSubmit(submitDuplicatas)}>

          <div className='grid-cols-2 flex  gap-2'>
            <div className='w-full'>
              <Input

                defaultValue={data ? data.pessoaRef?.toString() ?? '' : ''}
                icon={<UsersRound size={20} />}
                label='Pessoa / Empresa*'
                {...register('pessoaRef')}
                error={errors.pessoaRef}
              />
            </div>
            <div className='w-full'>
              <Input

                defaultValue={data ? data.responsavel?.toString() ?? '' : ''}
                icon={<UserRound size={20} />}
                label='Nome do Responsável'
                {...register('responsavel')}
                error={errors.responsavel}
              />
            </div>
          </div>
          <div className='grid-cols-2 flex  gap-2'>
            <div className='w-full'>
              <Input
                defaultValue={data ? data.valorLiq?.toFixed(2) : ''}

                accept='number'
                icon={<Wallet size={20} />}
                label='Valor Liquido*'
                {...register("valorLiq", {
                  valueAsNumber: true,
                })}
                onChange={handleChangeValorLiquido}
                error={errors.valorLiq}
              />
            </div>
            <div className='w-full'>
              <Input
                accept='number'
                defaultValue={data ? data.desconto?.toFixed(2) : ''}
                icon={<BadgeDollarSign size={20} />}
                label='Desconto R$*'
                {...register("desconto", {
                  valueAsNumber: true,
                })}
                onChange={handleChangeDesconto}
                error={errors.desconto}
              />
            </div>
            <div className='w-full'>
              <Input
                accept='number'
                defaultValue={data ? data.descontoPorcento?.toFixed(2) : ''}
                icon={<BadgePercent size={20} />}
                label='Desconto %*'
                {...register("descontoPorcento", {
                  valueAsNumber: true,
                })}
                onChange={handleChangeDescontoPorcento}
                error={errors.descontoPorcento}
              />
            </div>

          </div>
          <div className='grid-cols-2 flex  gap-2'>
            <div className='w-full'>
              <Input
                readOnly={true}
                accept='number'
                value={data ? data.valorFinal?.toString() : (valorFinalAuto !== '0' ? valorFinalAuto : '')}
                icon={<DollarSign size={20} />}
                label='Valor Final*'
                {...register("valorFinal", {
                  valueAsNumber: true,
                })}
                error={errors.valorFinal}
              />
            </div>
            <div className='w-full'>
              <Input
                accept='number'
                defaultValue={data ? data.acresc?.toFixed(2) : ''}
                icon={<BadgeDollarSign size={20} />}
                label='Acrescimo R$*'
                {...register("acrescPorcento", {
                  valueAsNumber: true,
                })}
                onChange={handleChangeAcrescimo}
                error={errors.acresc}
              />
            </div>

            <div className='w-full'>
              <Input
                accept='number'
                defaultValue={data ? data.acresc?.toFixed(2) : ''}
                icon={<BadgePercent size={20} />}
                label='Acrescimo %*'
                {...register("acresc", {
                  valueAsNumber: true,
                })}
                onChange={handleChangeAcrescimoPorcento}
                error={errors.acrescPorcento}
              />
            </div>

          </div>
          <Input

            icon={<AlignLeft size={20} />}
            defaultValue={data ? data.descricao?.toString() ?? '' : ''}
            type='text'
            label='Descrição*'
            {...register('descricao')}
            error={errors.descricao}
          />
          <div className='grid-cols-3 flex  gap-2'>
            <Input

              type='date'
              defaultValue={defaultVencimento}
              label='Vencimento*'
              {...register('vencimento')}
              error={errors.vencimento}
            />
            <Input

              defaultValue={defaultPagamento}
              type='date'
              label='Data Pagamento/Recebimento'
              {...register('data_Pag_Receb')}
              error={errors.data_Pag_Receb}
            />
            <ToggleTipoDuplicata
              value={tipoPag}
              onChange={(value) => setTipoPag(value)}
            />


          </div>
          <div className=' gap-4 flex w-full'>
            <UploadImage onUploadSuccess={handleUploadSuccess} />
            <div className='w-full'>
              <AssinaturaPad />
            </div>
            <div className='w-full h-full'>
              <RegistroDuplicatas />
            </div>
          </div>
          <Input
            icon={<FilePen size={20} />}
            defaultValue={data ? data.ass_url?.toString() ?? '' : ''}
            label='Assinatura*'
            {...register('ass_url')}
            error={errors.ass_url}
          />
          <Dialog.Actions isLoading={isLoadingCreateOrUpdateDuplicatas} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  )
}

