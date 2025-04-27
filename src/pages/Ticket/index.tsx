
import { PlusCircle } from 'lucide-react';
import { Page } from '@/components/Page'
import { TableTicket } from './Components/TicketColumn';
import { Form } from './Components/Form';
import { useTicketStore } from '@/store/Ticket/Index';
import { Notificacao } from '@/components/Notificacao/Index';

export function Ticket() {

  const handleOpenDialog = useTicketStore((state) => state.actions.handleOpenDialog)

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Tickets" />
          <Notificacao />
        </Page.Header>

        <Form/>
        <TableTicket/>
        <Page.Actions>
          <div className="flex justify-center items-center -mt-16">
            <Page.Action
              label="Criar Ticket"
              icon={<PlusCircle size={30} />}
              onClick={handleOpenDialog}
            />
          </div>
        </Page.Actions>

      </Page.Root>

    </>
  )
}