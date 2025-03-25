import { Page } from '@/components/Page'
import { TableUsuarios } from './Components/UsuariosColumn';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';

export function Usuarios() {

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Usuarios" />
          <SelectEmpresaButton />
        </Page.Header>
        <TableUsuarios />

      </Page.Root>

    </>
  )
}