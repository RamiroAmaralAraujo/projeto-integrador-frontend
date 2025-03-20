
import { Page } from '@/components/Page'

import { SelectEmpresaButton } from "@/components/SelectEmpresaButton/SelectEmpresaButton";
import { TableAtendimentos } from './Components/AtendimentosColumn';

export function Atendimentos() {


  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Atendimentos" />
          <SelectEmpresaButton />
        </Page.Header>

        <TableAtendimentos />

      </Page.Root>

    </>
  )
}