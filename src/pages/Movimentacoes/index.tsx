import { Page } from '@/components/Page'
import { TableMovimentacoes } from './Components/MovimentacoesColumn';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';

export function Movimentacoes() {

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Movimentações" />
          <SelectEmpresaButton />
        </Page.Header>

        <TableMovimentacoes />

      </Page.Root>

    </>
  )
}