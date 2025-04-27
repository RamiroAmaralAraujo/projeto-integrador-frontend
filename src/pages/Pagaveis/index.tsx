
import { PlusCircle } from 'lucide-react';
import { Page } from '@/components/Page'
import { FormDuplicatas } from "./Components/Form";
import { TablePagaveis } from './Components/PagaveisColumn';
import { useDuplicatasStore } from '@/store/Duplicatas/Index';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';
import { Notificacao } from '@/components/Notificacao/Index';

export function Finaceiro() {

  const handleOpenDialog = useDuplicatasStore((state) => state.actions.handleOpenDialog)

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Financeiro" />
          <div className="flex justify-end items-center">
            <Notificacao />
            <SelectEmpresaButton />
          </div>
        </Page.Header>

        <FormDuplicatas />
        <TablePagaveis />
        <Page.Actions>
          <div className="flex justify-center items-center -mt-16">
            <Page.Action
              label="Adicionar Duplicata"
              icon={<PlusCircle size={30} />}
              onClick={handleOpenDialog}
            />
          </div>
        </Page.Actions>

      </Page.Root>

    </>
  )
}