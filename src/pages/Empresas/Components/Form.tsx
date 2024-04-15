import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store, Building, MapPinned, MapPin, Building2, Home, Flag} from 'lucide-react'
import { TiBusinessCard } from "react-icons/ti";

import { useEmpresasStore } from '@/store/Empresas/Index'


import { Dialog } from '@/components/Dialog'
import { FormRoot } from '../../../components/FormRoot'
import { Input } from '@/components/ui/input'


import { z } from 'zod'
import { useEmpresas } from '@/hook/queries/useEmpresas'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/Context/AuthContext'



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
    reset,
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

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
      <Dialog.Content title='Cadastro Empresa' icon={<Store />}>
        <FormRoot onSubmit={handleSubmit(submitEmpresas)}>

          <Input
            defaultValue={data?.empresaNome}
            icon={<Building size={20} />}
            label='Empresa Nome*'
            {...register('empresaNome')}
            error={errors.empresaNome}
          />

          <Input
            defaultValue={data ? data.cnpj_cpf?.toString() ?? '' : ''}
            icon={<TiBusinessCard size={20} />}
            label='CNPJ/CPF*'
            maskType='cnpj'
            {...register('cnpj_cpf')}
            error={errors.cnpj_cpf}
          />

          <div className='grid-cols-2 flex gap-2'>
            <div className='w-full'>
              <Input
                defaultValue={data ? data.endereco?.toString() ?? '' : ''}
                icon={<MapPinned size={20} />}
                label='Endereço'
                {...register('endereco')}
                error={errors.endereco}
              />
            </div>
            <Input
              defaultValue={data ? data.bairro?.toString() ?? '' : ''}
              icon={<Home size={20} />}
              label='Bairro'
              {...register('bairro')}
              error={errors.bairro}
            />
          </div>
          <div className='grid-cols-2 flex gap-2'>
            <div className='w-full'>
              <Input
                defaultValue={data ? data.cidade?.toString() ?? '' : ''}
                icon={<Building2 size={20} />}
                label='Cidade'
                {...register('cidade')}
                error={errors.cidade}
              />
            </div>

            <Input
              defaultValue={data ? data.uf?.toString() ?? '' : ''}
              icon={<Flag size={20} />}
              label='UF'
              maxLength={2}
              {...register('uf')}
              error={errors.uf}
            />

            <Input
              defaultValue={data ? data.cep?.toString() ?? '' : ''}
              icon={<MapPin size={20} />}
              label='CEP'
              maskType='cep'
              {...register('cep')}
              error={errors.cep}
            />
          </div>




          <Dialog.Actions isLoading={isLoadingCreateOrUpdateEmpresas} />
        </FormRoot>
      </Dialog.Content>
    </Dialog.Root >
  )
}
