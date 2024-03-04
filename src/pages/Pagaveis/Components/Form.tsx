import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListChecksIcon } from 'lucide-react'




import { Dialog } from '@/components/Dialog'
import { FormRoot } from '../../../components/FormRoot'
import { Input } from '@/components/ui/input'


import { z } from 'zod'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { useDuplicatas } from '@/hook/queries/useDuplicatas'
import { useDuplicatasStore } from '@/store/Duplicatas/Index'



const CreateDuplicatasSchema = z.object({
  id: z.string().optional(),
  tipoPag: z.boolean(),
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
  empresaId: z.string(),
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


  async function submitDuplicatas(newDuplicatas: CreateDuplicatasData) {
    const duplicatasId = data?.id
    const empresaId = empresaSelecionada?.id

    if (duplicatasId) {
      await updateDuplicatas({ id: duplicatasId, ...newDuplicatas })
      handleCloseDialog()
      return
    }


    await createDuplicatas({ id: empresaId, ...newDuplicatas })
    handleCloseDialog()
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
      <Dialog.Content>
        <FormRoot onSubmit={handleSubmit(submitDuplicatas)}>

          <Input

            icon={<ListChecksIcon size={20} />}
            label='Pessoa*'
            {...register('pessoaRef')}
            error={errors.pessoaRef}
          />

          <Input
            type='number'
            accept='number'
            icon={<ListChecksIcon size={20} />}
            label='Valor Liquido*'
            {...register('valorLiq')}
            error={errors.valorLiq}
          />


          <Input

            icon={<ListChecksIcon size={20} />}
            type='number'
            label='Desconto*'
            {...register('desconto')}
            error={errors.desconto}
          />
          <Input

            icon={<ListChecksIcon size={20} />}
            type='number'
            label='Ascrescimo*'
            {...register('acresc')}
            error={errors.acresc}
          />
          <Input

            icon={<ListChecksIcon size={20} />}
            type='number'
            label='Valor Final*'
            {...register('valorFinal')}
            error={errors.valorFinal}
          />

          <Input

            icon={<ListChecksIcon size={20} />}
            type='text'
            label='Descrição*'
            {...register('descricao')}
            error={errors.descricao}
          />
          <Input

            icon={<ListChecksIcon size={20} />}
            type='datetime-local'
            label='Vencimento*'
            {...register('vencimento')}
            error={errors.vencimento}
          />
          <Input

            icon={<ListChecksIcon size={20} />}
            label='Foto Comprovante*'
            {...register('comp_url')}
            error={errors.comp_url}
          />
          <Input

            icon={<ListChecksIcon size={20} />}
            label='Assinatura*'
            {...register('ass_url')}
            error={errors.ass_url}
          />
          <Input

            icon={<ListChecksIcon size={20} />}
            type='datetime-local'
            label='Data Pagamento/Recebimento'
            {...register('data_Pag_Receb')}
            error={errors.data_Pag_Receb}
          />
          <Input

            icon={<ListChecksIcon size={20} />}
            label='Nome do Responsável'
            {...register('responsavel')}
            error={errors.responsavel}
          />
          <Input
            type='boolean'
            icon={<ListChecksIcon size={20} />}
            label='Checkbox Pagamento'
            {...register('tipoPag')}
            error={errors.tipoPag}
          />




          <Dialog.Actions isLoading={isLoadingCreateOrUpdateDuplicatas} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  )
}
