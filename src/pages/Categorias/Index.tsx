
import { PlusCircle } from 'lucide-react';
import { Page } from '@/components/Page'
import { FormCategorias } from "./Components/Form";
import { TableCategorias } from './Components/CategoriasColumn';
import { useCategoriasStore } from '@/store/Categorias/Index';
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';

export function Categorias() {

  const handleOpenDialog = useCategoriasStore((state) => state.actions.handleOpenDialog)

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Categorias" />
          <SelectEmpresaButton />
        </Page.Header>

        <FormCategorias />
        <TableCategorias />
        <Page.Actions>
          <div className="flex justify-center items-center -mt-16">
            <Page.Action
              label="Adicionar Categorias"
              icon={<PlusCircle size={30} />}
              onClick={handleOpenDialog}
            />
          </div>
        </Page.Actions>

      </Page.Root>

    </>
  )
}