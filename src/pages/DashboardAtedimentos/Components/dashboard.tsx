import { Page } from "@/components/Page";

import { SelectEmpresaButton } from "@/components/SelectEmpresaButton/SelectEmpresaButton";

import { CardAtendimentosCriticos } from "./components/CardAtendimentosCriticos";
import { CardAtendimentosTotal } from "./components/CardAtendimentosTotal";
import { CardAtendimentosExcelentes } from "./components/CardAtendimentosExcelentes";
import { CardAtendimentosMedia } from "./components/CardAtendimentosMedia";
import { Grafico } from "./components/GraficoAtednimentos";
import { GraficoPizzaAtendimentos } from "./components/GraficoPizzaAtendimento";

export function DashboardAtendimentos() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard" />
        <div className="opacity-0">
          <SelectEmpresaButton />
        </div>
      </Page.Header>

      <div className="flex gap-4 mr-14">
        <CardAtendimentosTotal />
        <CardAtendimentosCriticos />
        <CardAtendimentosExcelentes />
        <CardAtendimentosMedia />
      </div>
      <div className="flex gap-4 w-full justify-center  ">
        <div className="w-2/3">
          <Grafico />
        </div>

        <div className="w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14">
          <GraficoPizzaAtendimentos />
        </div>
      </div>
    </Page.Root>
  );
}
