import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListChecksIcon } from 'lucide-react'

import { useEmpresasStore } from '@/store/Empresas/Index'


import { Dialog } from '@/components/Dialog'
import { FormRoot } from '../../../components/FormRoot'
import { Input } from '@/components/ui/input'


import { z } from 'zod'
import { useEmpresas } from '@/hook/queries/useEmpresas'
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { Empresas } from '../Index'



const CreateEmpresasSchema = z.object({
  id: z.string().optional(),
  empresaNome: z.string().nonempty({ message: 'Nome da Empresa é obrigatório' }),
  cnpj_cpf: z.string().nonempty({ message: 'CNPJ ou CPF é obrigatório' }),
  endereco: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  usuarioID: z.string().optional(),

})

export type CreateEmpresasData = z.infer<typeof CreateEmpresasSchema>
export type UpdateEmpresasData = CreateEmpresasData

export function Form() {

  const { user } = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateEmpresasData>({
    resolver: zodResolver(CreateEmpresasSchema),
  })

  const { data, handleCloseDialog, isOpen } = useEmpresasStore((state) => {
    return {
      data: state.empresas,
      handleCloseDialog: state.actions.handleCloseDialog,
      isOpen: state.isOpen,
    }
  })
  const { useCreate, useUpdate } = useEmpresas()
  const { mutateAsync: createEmpresas, isLoading: isLoadingCreateEmpresas } = useCreate()
  const { mutateAsync: updateEmpresas, isLoading: isLoadingUpdateCategory } = useUpdate()


  async function submitEmpresas(newEmpresas: CreateEmpresasData) {
    const empresasId = data?.id
    const usuarioID = user?.sub

    if (empresasId) {
      await updateEmpresas({ id: empresasId, ...newEmpresas })
      handleCloseDialog()
      return
    }


    await createEmpresas({ usuarioID: usuarioID, ...newEmpresas })
    handleCloseDialog()
  }

  const isLoadingCreateOrUpdateEmpresas =
    isLoadingCreateEmpresas || isLoadingUpdateCategory

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content>
        <FormRoot onSubmit={handleSubmit(submitEmpresas)}>

          <Input
            // defaultValue={data?.empresaNome}
            icon={<ListChecksIcon size={20} />}
            label='Empresa Nome*'
            {...register('empresaNome')}
            error={errors.empresaNome}
          />

          <Input
            icon={<ListChecksIcon size={20} />}
            label='CNPJ/CPF*'
            {...register('cnpj_cpf')}
            error={errors.cnpj_cpf}
          />

          <div className='grid-cols-2 flex gap-2'>
            <div className='w-full'>
              <Input
                icon={<ListChecksIcon size={20} />}
                label='endereco'
                {...register('endereco')}
                error={errors.endereco}
              />
            </div>
            <Input
              icon={<ListChecksIcon size={20} />}
              label='bairro'
              {...register('bairro')}
              error={errors.bairro}
            />
          </div>
          <div className='grid-cols-2 flex gap-2'>
            <div className='w-full'>
              <Input
                icon={<ListChecksIcon size={20} />}
                label='cidade'
                {...register('cidade')}
                error={errors.cidade}
              />
            </div>

            <Input
              icon={<ListChecksIcon size={20} />}
              label='uf'
              {...register('uf')}
              error={errors.uf}
            />

            <Input
              icon={<ListChecksIcon size={20} />}
              label='cep'
              {...register('cep')}
              error={errors.cep}
            />
          </div>




          <Dialog.Actions isLoading={isLoadingCreateOrUpdateEmpresas} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root>
  )
}
