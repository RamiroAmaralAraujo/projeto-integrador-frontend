import { Page } from '@/components/Page'
import { TableMovimentacoes } from './Components/MovimentacoesColumn';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';
import { Notificacao } from '@/components/Notificacao/Index';

export function Movimentacoes() {

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Movimentações" />
          <div className="flex justify-end items-center">
            <Notificacao />
            <SelectEmpresaButton />
          </div>
        </Page.Header>

        <TableMovimentacoes />

      </Page.Root>

    </>
  )
}