import { TableEmpresas } from "./Components/EmpresasColumn";
import { PlusCircle } from "lucide-react";
import { useEmpresasStore } from "@/store/Empresas/Index";
import { Page } from "@/components/Page";
import { Form } from "./Components/Form";
import { SelectEmpresaButton } from "@/components/SelectEmpresaButton/SelectEmpresaButton";
import { Notificacao } from "@/components/Notificacao/Index";

export function Empresas() {
  const handleOpenDialog = useEmpresasStore(
    (state) => state.actions.handleOpenDialog
  );

  return (
    <>
      <Page.Root>
        <Page.Header>
          <Page.Title title="Empresas" />
          <div className="flex justify-end items-center">
            <Notificacao />
            <SelectEmpresaButton />
          </div>
        </Page.Header>

        <Form />
        <TableEmpresas />
        <Page.Actions>
          <div className="flex justify-center items-center -mt-16">
            <Page.Action
              label="Adicionar Empresa"
              icon={<PlusCircle size={30} />}
              onClick={handleOpenDialog}
            />
          </div>
        </Page.Actions>
      </Page.Root>
    </>
  );
}
