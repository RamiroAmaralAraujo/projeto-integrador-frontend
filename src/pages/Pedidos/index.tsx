
import { PlusCircle } from 'lucide-react';
import { Page } from '@/components/Page'
import { FormPedidos } from "./Components/Form";
import { TablePedidos } from './Components/PedidosColumn';
import { usePedidosStore } from '@/store/Pedidos/Index';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';

export function Pedidos() {

  const handleOpenDialog = usePedidosStore((state) => state.actions.handleOpenDialog)

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Pedidos" />
          <SelectEmpresaButton />
        </Page.Header>

        <FormPedidos />
        <TablePedidos />
        <Page.Actions>
          <div className="flex justify-center items-center -mt-16">
            <Page.Action
              label="Adicionar Pedido"
              icon={<PlusCircle size={30} />}
              onClick={handleOpenDialog}
            />
          </div>
        </Page.Actions>

      </Page.Root>

    </>
  )
}