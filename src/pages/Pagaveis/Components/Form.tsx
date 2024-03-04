import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListChecksIcon, ClipboardPlus } from 'lucide-react'




import { Dialog } from '@/components/Dialog'
import { FormRoot } from '../../../components/FormRoot'
import { Input } from '@/components/ui/input'


import { z } from 'zod'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { useDuplicatas } from '@/hook/queries/useDuplicatas'
import { useDuplicatasStore } from '@/store/Duplicatas/Index'
import { ToggleTipoDuplicata } from '@/components/ToggleTipoPagamento/ToggleTipoPagamento'




const CreateDuplicatasSchema = z.object({
  id: z.string().optional(),
  tipoPag: z.string(),
  pessoaRef: z.string().nonempty('Não é possivel cria uma duplicata sem informar a pessoa referente.'),
  vencimento: z.string(),
  data_Pag_Receb: z.string(),
  descricao: z.string(),
  valorLiq: z.number(),
  desconto: z.number(),
  acresc: z.number(),
  valorFinal: z.number(),
  responsavel: z.string(),
  comp_url: z.string(),
  ass_url: z.string(),
  empresaId: z.string().optional(),
})

export type CreateDuplicatasData = z.infer<typeof CreateDuplicatasSchema>
export type UpdateDuplicatasData = CreateDuplicatasData




export function FormDuplicatas() {


  const { empresaSelecionada } = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateDuplicatasData>({
    resolver: zodResolver(CreateDuplicatasSchema),
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
    newDuplicatas.vencimento = vencimentoDate.toISOString();


    const dataPagRecebDate = parseDate(newDuplicatas.data_Pag_Receb);
    if (dataPagRecebDate) {
      newDuplicatas.data_Pag_Receb = dataPagRecebDate.toISOString();
    } else {

      console.error("Data de pagamento/recebimento inválida!");

    }

    const duplicatasId = data?.id;
    const empresaId = empresaSelecionada?.id;

    if (duplicatasId) {

      await updateDuplicatas({ id: duplicatasId, ...newDuplicatas });
      handleCloseDialog();
    } else {

      await createDuplicatas({ empresaId: empresaId, ...newDuplicatas });
      handleCloseDialog();
    }
  }


  const isLoadingCreateOrUpdateDuplicatas =
    isLoadingCreateDuplicatas || isLoadingUpdateDuplicatas

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title='Cadastro Duplicatas' icon={<ClipboardPlus />}>
        <FormRoot onSubmit={handleSubmit(submitDuplicatas)}>

          <div className='grid-cols-2 flex  gap-2'>
            <div className='w-full'>
              <Input
                defaultValue={data ? data.pessoaRef?.toString() ?? '' : ''}
                icon={<ListChecksIcon size={20} />}
                label='Pessoa*'
                {...register('pessoaRef')}
                error={errors.pessoaRef}
              />
            </div>
            <div className='w-full'>
              <Input
                defaultValue={data ? data.responsavel?.toString() ?? '' : ''}
                icon={<ListChecksIcon size={20} />}
                label='Nome do Responsável'
                {...register('responsavel')}
                error={errors.responsavel}
              />
            </div>
          </div>
          <div className='grid-cols-2 flex  gap-2'>
            <div className='w-full'>
              <Input
                defaultValue={data ? data.valorLiq?.toString() ?? '' : ''}
                accept='number'
                icon={<ListChecksIcon size={20} />}
                label='Valor Liquido*'
                {...register("valorLiq", {
                  valueAsNumber: true,
                })}
                error={errors.valorLiq}
              />
            </div>
            <div className='w-full'>
              <Input
                accept='number'
                defaultValue={data ? data.desconto?.toString() ?? '' : ''}
                icon={<ListChecksIcon size={20} />}
                label='Desconto*'
                {...register("desconto", {
                  valueAsNumber: true,
                })}
                error={errors.desconto}
              />
            </div>

          </div>
          <div className='grid-cols-2 flex  gap-2'>
            <div className='w-full'>
              <Input
                accept='number'
                defaultValue={data ? data.acresc?.toString() ?? '' : ''}
                icon={<ListChecksIcon size={20} />}
                label='Ascrescimo*'
                {...register("acresc", {
                  valueAsNumber: true,
                })}
                error={errors.acresc}
              />
            </div>
            <div className='w-full'>
              <Input
                accept='number'
                defaultValue={data ? data.valorFinal?.toString() ?? '' : ''}
                icon={<ListChecksIcon size={20} />}
                label='Valor Final*'
                {...register("valorFinal", {
                  valueAsNumber: true,
                })}
                error={errors.valorFinal}
              />
            </div>
          </div>
          <Input
            icon={<ListChecksIcon size={20} />}
            defaultValue={data ? data.descricao?.toString() ?? '' : ''}
            type='text'
            label='Descrição*'
            {...register('descricao')}
            error={errors.descricao}
          />
          <div className='grid-cols-3 flex  gap-2'>
            <Input
              type='date'
              defaultValue={data ? data.vencimento?.toString() ?? '' : ''}
              label='Vencimento*'
              {...register('vencimento')}
              error={errors.vencimento}
            />
            <Input
              defaultValue={data ? data.data_Pag_Receb?.toString() ?? '' : ''}
              type='date'
              label='Data Pagamento/Recebimento'
              {...register('data_Pag_Receb')}
              error={errors.data_Pag_Receb}
            />
            <ToggleTipoDuplicata
              {...register('tipoPag', { setValueAs: value => value === 'true' })}
            />


          </div>
          <Input
            icon={<ListChecksIcon size={20} />}
            defaultValue={data ? data.comp_url?.toString() ?? '' : ''}
            label='Foto Comprovante*'
            {...register('comp_url')}
            error={errors.comp_url}
          />
          <Input
            icon={<ListChecksIcon size={20} />}
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

