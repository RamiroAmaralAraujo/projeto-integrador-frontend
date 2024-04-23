import { Fragment, useContext, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { AlertTriangle } from 'lucide-react'
import { UseMutateAsyncFunction } from 'react-query'
import { AxiosError } from 'axios'
import { useSelectEmpresaStore } from '@/store/SelectEmpresaStore/Index'
import { EmpresasData } from '@/hook/queries/useEmpresas'
import { AuthContext } from '@/Context/AuthContext'


interface AlertSelectEmpresaDProps {
  onSelectEmpresa: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    EmpresasData,
    unknown
  >
}

export default function AlertSelectEmpresa(props: AlertSelectEmpresaDProps) {
  const { onSelectEmpresa } = props

  const { setEmpresaSelecionada } = useContext(AuthContext)



  const cancelButtonRef = useRef(null)


  const {
    empresas,
    isOpen,
    actions: { handleCloseDialog },
  } = useSelectEmpresaStore()

  function handleSubmit() {
    if (empresas && setEmpresaSelecionada) {

      try {
        localStorage.setItem('EmpresaStorage', empresas.id)
        onSelectEmpresa(empresas)
        setEmpresaSelecionada(empresas)

      }
      catch {
        console.log("erro")
      }
      finally {
        handleCloseDialog()

      }
    }
  }



  return (
    < Transition.Root show={isOpen} as={Fragment}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-brand-blue-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Seleção de Empresas</h3>
                    <div className="mt-2 flex gap-2">
                      <p className="text-sm text-gray-500">Você está selecionando a empresa</p><span className='text-sm text-brand-blue-400 font-bold'>{empresas?.empresaNome}.</span>
                    </div>

                    <span className="text-sm text-gray-500">Após a seleção, as ações realizadas em sistema serão vinculadas exclusivamentes a mesma.</span>
                    <span className="text-sm text-gray-500 font-medium ml-1">Tem certeza deseja selecionar a empresa em questão?</span>

                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="rounded-xl w-full inline-flex justify-center  border border-transparent shadow-sm px-4 py-2 bg-brand-blue-500 text-base font-medium text-white hover:bg-brand-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  Selecionar
                </button>
                <button
                  type="button"
                  className="rounded-xl mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-400 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCloseDialog}
                  ref={cancelButtonRef}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div >
    </Transition.Root >
  )
}
