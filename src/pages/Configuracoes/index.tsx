import { Page } from "@/components/Page";
import { FormConfiguracoes } from "./FormConfiguracoes";
import { UploadFotoPerfil } from "./UploadFotoPerfil";



export function Configuracoes() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Configurações" />
      </Page.Header>
      <div className="flex flex-col w-full justify-center items-center ">
        <div className="bg-gray-50 rounded-3xl shadow-2xl p-12">
          <div className="flex justify-center items-center">
          <UploadFotoPerfil />
          </div>
          <FormConfiguracoes />
          
        </div>
      </div>
    </Page.Root>
  );
}
