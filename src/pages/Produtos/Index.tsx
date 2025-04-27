
import { PlusCircle } from 'lucide-react';
import { Page } from '@/components/Page'
import { FormProdutos } from "./Components/Form";
import { TableProdutos } from './Components/ProdutosColumn';
import { useProdutosStore } from '@/store/Produtos/Index';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';
import { Notificacao } from '@/components/Notificacao/Index';

export function Produtos() {

  const handleOpenDialog = useProdutosStore((state) => state.actions.handleOpenDialog)

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Produtos" />
          <div className="flex justify-end items-center">
            <Notificacao />
            <SelectEmpresaButton />
          </div>
        </Page.Header>

        <FormProdutos />
        <TableProdutos />
        <Page.Actions>
          <div className="flex justify-center items-center -mt-16">
            <Page.Action
              label="Adicionar Produto"
              icon={<PlusCircle size={30} />}
              onClick={handleOpenDialog}
            />
          </div>
        </Page.Actions>

      </Page.Root>

    </>
  )
}