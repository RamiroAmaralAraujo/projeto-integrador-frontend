export function Login() {
    return (
        <>
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


                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="w-full">
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    type="email"
                                    className="peer w-full h-full bg-transparent text-brand-blue-500 outline-none focus:outline-none disabled:bg-brand-blue-500 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-brand-blue-500 placeholder-shown:border-t-brand-blue-500 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-brand-blue-500 focus:border-brand-blue-500"
                                    placeholder=" "
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-brand-blue-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-brand-blue-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-[7px] before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-[7px] after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-brand-blue-500 peer-focus:text-brand-blue-500 before:border-brand-blue-500 peer-focus:before:!border-brand-blue-500 after:border-brand-blue-500 peer-focus:after:!border-brand-blue-500"
                                >
                                    Email
                                </label>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    type="password"
                                    className="peer w-full h-full bg-transparent text-brand-blue-500 outline-none focus:outline-none disabled:bg-brand-blue-500 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-brand-blue-500 placeholder-shown:border-t-brand-blue-500 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-brand-blue-500 focus:border-brand-blue-500"
                                    placeholder=" "
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-brand-blue-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-brand-blue-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-[7px] before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-[7px] after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-brand-blue-500 peer-focus:text-brand-blue-500 before:border-brand-blue-500 peer-focus:before:!border-brand-blue-500 after:border-brand-blue-500 peer-focus:after:!border-brand-blue-500"
                                >
                                    Senha
                                </label>
                            </div>
                        </div>
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
                            <button type="submit"
                                className="w-full flex justify-center bg-brand-blue-500 text-gray-100 p-2 rounded-[7px] tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-brand-blue-400 shadow-lg cursor-pointer transition ease-in duration-300">
                                Login
                            </button>
                        </div>
                        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span>Ainda não tem uma conta?</span>
                            <a href="#"
                                className="text-brand-blue-300 hover:text-brand-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-100">
                                Cadastre-se
                            </a>
                        </p>
                    </form>
                </div>
            </div>

        </>
    )
}
