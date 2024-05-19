import { Input } from "../../components/ui/input";
import { FiMail, FiUnlock } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

import * as z from 'zod'
import { useAuth } from "../../Context/AuthContext";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

import LogoSemFundoBranco from "../../assets/LogoSemFundoBranco.svg"


const LogInSchema = z.object({
    email: z
        .string()
        .nonempty({ message: 'E-mail é obrigatório' })
        .email({ message: 'Informe um e-mail válido' }),
    password: z.string().min(8, 'A senha deve conter no minimo 8 caracteres')
        .nonempty({ message: 'Senha é obrigatório' })

})

type LogInData = z.infer<typeof LogInSchema>


export function Login() {
    const { signIn } = useAuth()

    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<LogInData>({
        resolver: zodResolver(LogInSchema),

    })

    async function handleLogIn(data: LogInData) {
        await signIn(data)
    }

    function retornarPaginaInicial() {
        navigate('/');
    }


    return (
        <>
        <div>
            <div onClick={retornarPaginaInicial} className="flex items-center gap-2 w-1/5 justify-center z-10 absolute mt-12 cursor-pointer">
                <img src={LogoSemFundoBranco} alt="Logo" width={30} />
                <p className="font-semibold text-white text-2xl">Core<span className="font-normal">Commerce</span></p>
            </div>

            <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8bg-no-repeat bg-cover ">
                <div className="absolute bg-base-background opacity-
                0 inset-0 z-0"></div>
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">

                    <div className="text-center">
                        <h4 className="text-gray-500 font-normal">Bem-vindo ao</h4>
                        <h2 className="text-3xl font-bold text-brand-blue-500">
                            CORE COMMERCE
                        </h2>
                        <p className="mt-6 text-sm text-gray-500">Realize o login para acessar a Área do Cliente</p>
                    </div>


                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(handleLogIn)}>
                        <input type="hidden" name="remember" value="true" />

                        <Input
                            type="email"
                            label="Email"
                            icon={<FiMail size={20} />}
                            iconError={<FiMail size={20} />}
                            error={errors?.email}
                            {...register('email')}

                        />
                        <Input
                            type="password"
                            label="Senha"
                            icon={<FiLock size={20} />}
                            iconError={<FiUnlock size={20} />}
                            error={errors?.password}
                            {...register('password')}
                        />


                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox"
                                    className="accent-brand-blue-500 h-4 w-4 hover:accent-brand-blue-300 border-gray-300 rounded" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Lembre meu usuário.
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-brand-blue-300 hover:text-brand-blue-500">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>
                        <div>
                            <Button label="Login" type="submit" isLoading={isSubmitting} />
                        </div>
                        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span>Ainda não tem uma conta?</span>
                            <a
                                onClick={() => navigate('/cadastro-usuario')}
                                className="text-brand-blue-300 hover:text-brand-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-100">
                                Cadastre-se
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>

        </>
    )
}
