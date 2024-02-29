import { TableEmpresas } from "./Components/EmpresasColumn"
import { PlusCircle } from 'lucide-react';
import { useEmpresasStore } from "@/store/Empresas/Index";
import { Page } from '@/components/Page'
import { Form } from "./Components/Form";

export function Empresas() {

  const handleOpenDialog = useEmpresasStore((state) => state.actions.handleOpenDialog)

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Empresas" />
          <div className="w-full flex justify-end relative ">
            <div className=" max-w-[500px]">
              <div className=" bg-brand-blue-400 rounded-xl justify-between mr-14 shadow-lg">
                <div className="flex justify-around items-center p-3 gap-3">
                  <h1 className="font-bold text-lg text-white">Empresa Selecionada:</h1> <span className="bg-white rounded-xl p-2 text-brand-blue-500 font-semibold">mercado 2 irmãos</span>
                </div>
              </div>
            </div>
          </div>
        </Page.Header>

        <Form />
        <TableEmpresas />
        <Page.Actions>
          <div className="flex justify-center items-center -mt-16">
            <Page.Action
              label="Adicionar Empresa"
              icon={<PlusCircle size={30} />}
              onClick={handleOpenDialog}
            />
          </div>
        </Page.Actions>

      </Page.Root>

    </>
  )
}