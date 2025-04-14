import { Fragment, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { AlertTriangle } from 'lucide-react'
import { UseMutateAsyncFunction } from 'react-query'
import { AxiosError } from 'axios'
import { useDeleteAlertProdutosStore } from '@/store/DeleteAlertProdutosStore'
import { queryClient } from '@/service/reactQuery'


interface AlertDeleteProdutoProps {
  onDelete: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    string,
    unknown
  >
}

export default function AlertDeleteProduto(props: AlertDeleteProdutoProps) {
  const { onDelete } = props


  const cancelButtonRef = useRef(null)


  const {
    id,
    isOpen,
    actions: { onCloseAlert, setLoading },
  } = useDeleteAlertProdutosStore()


  function handleSubmit() {
    setLoading(true)
    onDelete(id || '').finally(() => {
      queryClient.invalidateQueries({ queryKey: ['PRODUTOS'] });
      setLoading(false)
      onCloseAlert()
    })
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
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
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">EXCLUIR PRODUTO</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        A exlcusão apaga todos os registros do produto no Banco de Dados, assim todas as informações referentes a esse produto serão deletadas.
                      </p>
                      <span className="text-sm text-gray-500 font-medium">Você tem certeza que deseja realizar a exclusão desse produto?</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="rounded-xl w-full inline-flex justify-center  border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  Excluir
                </button>
                <button
                  type="button"
                  className="rounded-xl mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-400 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onCloseAlert}
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
