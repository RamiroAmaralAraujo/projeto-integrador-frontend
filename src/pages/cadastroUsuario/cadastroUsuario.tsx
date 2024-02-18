import { Input } from "../../components/ui/input";
import { IoMdArrowBack } from "react-icons/io";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { TiBusinessCard } from "react-icons/ti";
import { IoBusinessOutline } from "react-icons/io5";

import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../../components/ui/button";
import { useSignUp } from "../../hook/queries/useSingUp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const CadastroSchema = z
  .object({
    usuario: z.string().nonempty({ message: 'Nome é obrigatório' }),
    email: z
      .string()
      .nonempty({ message: 'E-mail é obrigatório' })
      .email({ message: 'Digite um e-mail válido' }),
    password: z
      .string()
      .min(8, 'Precisa ser maior que 8 caracteres')
      .nonempty({ message: 'Senha é obrigatório' }),
    passwordConfirm: z
      .string()
      .nonempty({ message: 'Confirmar a senha é obrigatório' }),
    empresa: z
      .string()
      .nonempty({ message: 'Nome da empresa é obrigatório' }),
    cnpj_cpf: z
      .string()
      .nonempty({ message: 'CNPJ ou CPF é obrigatório' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'As senhas não são iguais',
  })

type CadastroData = z.infer<typeof CadastroSchema>


export function CadastroUsuario() {

  const { mutateAsync: signUp, isLoading: isSignUp } = useSignUp()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CadastroData>({
    resolver: zodResolver(CadastroSchema),
  })

  const navigate = useNavigate()

  async function handleCreateAccount(data: CadastroData) {
    try {
      const newData = {

        usuario: data.usuario,
        email: data.email,
        password: data.password,
        empresa: data.empresa,
        cnpj_cpf: data.cnpj_cpf

      }

      await signUp(newData);
      console.log(newData)

      navigate('/dashboard');
      toast.success("Cadastro realizado com sucesso!");

    } catch (error: unknown) {
      if (axios.isAxiosError<Error>(error)) {
        toast.error(error.response?.data.message)
      }
    }
  }


  return (
    <>
      <div className="relative min-h-screen h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8bg-no-repeat bg-cover ">
        <div className="absolute bg-base-background opacity-
                0 inset-0 z-0"></div>
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">

          <div className="text-center">
            <h4 className="text-gray-500 font-normal">Juste-se ao</h4>
            <h2 className="text-3xl font-bold text-brand-blue-500">
              CORE COMMERCE
            </h2>
            <p className="mt-6 text-sm text-gray-500">Informe seus dados para criar um usuário de acesso.</p>
          </div>


          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(handleCreateAccount)}>
            <input type="hidden" name="remember" value="true" />

            <Input
              type="text"
              label="Usuário*"
              icon={<FiUser />}
              error={errors?.usuario}
              {...register('usuario')}
            />

            <Input
              type="email"
              label="Email*"
              icon={<FiMail />}
              error={errors?.email}
              {...register('email')}

            />
            <Input
              type="password"
              label="Senha*"
              icon={<FiLock />}
              error={errors?.password}
              {...register('password')}
            />

            <Input
              type="password"
              label="Confirme a Senha*"
              icon={<FiLock />}
              error={errors?.passwordConfirm}
              {...register('passwordConfirm')}
            />

            <Input
              type="text"
              label="Nome da Empresa*"
              icon={<IoBusinessOutline />}
              error={errors?.empresa}
              {...register('empresa')}
            />

            <Input
              type="text"
              label="CNPJ/CPF*"
              icon={<TiBusinessCard />}
              error={errors?.cnpj_cpf}
              {...register('cnpj_cpf')}
            />

            <Button label="Login" type="submit" isLoading={isSignUp} />

            <a onClick={() => navigate('/')}>
              <div className="mt-10 flex justify-center flex-row items-center text-brand-blue-300 hover:text-brand-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-100">

                <IoMdArrowBack />
                <span >Retornar a tela de Login.</span>

              </div>
            </a>
          </form>
        </div>
      </div>

    </>
  )
}
