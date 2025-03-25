import { Page } from '@/components/Page'
import { TableUsuarios } from './Components/UsuariosColumn';

export function Usuarios() {

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Usuarios" />
          <div className='py-8'>
          
          </div>
        </Page.Header>
        <TableUsuarios />

      </Page.Root>

    </>
  )
}