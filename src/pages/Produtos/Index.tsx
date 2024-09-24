
import { PlusCircle } from 'lucide-react';
import { Page } from '@/components/Page'
import { FormProdutos } from "./Components/Form";
import { TablePagaveis } from './Components/ProdutosColumn';
import { useProdutosStore } from '@/store/Produtos/Index';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';

export function Produtos() {

  const handleOpenDialog = useProdutosStore((state) => state.actions.handleOpenDialog)

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Produtos" />
          <SelectEmpresaButton />
        </Page.Header>

        <FormProdutos />
        <TablePagaveis />
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