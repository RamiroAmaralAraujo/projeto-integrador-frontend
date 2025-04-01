import { Page } from "@/components/Page";
import { FormConfiguracoes } from "./FormConfiguracoes";

export function Configuracoes() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Configurações" />
      </Page.Header>

      <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-full justify-center items-center p-4 bg-gray-50 rounded-3xl shadow-2xl md:p-12  max-w-2xl ">
        <div className="">
          <FormConfiguracoes />
        </div>
      </div>
      </div>
    </Page.Root>
  );
}