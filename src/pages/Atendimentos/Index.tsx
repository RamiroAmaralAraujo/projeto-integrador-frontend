
import { Page } from '@/components/Page'

import { TableAtendimentos } from './Components/AtendimentosColumn';

export function Atendimentos() {


  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Atendimentos" />
          <div className='py-8'>
          
          </div>
        </Page.Header>

        <TableAtendimentos />

      </Page.Root>

    </>
  )
}