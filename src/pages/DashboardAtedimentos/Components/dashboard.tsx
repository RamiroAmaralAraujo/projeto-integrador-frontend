import { useState } from "react";
import { Page } from "@/components/Page";
import { SelectEmpresaButton } from "@/components/SelectEmpresaButton/SelectEmpresaButton";
import { CardAtendimentosCriticos } from "./components/CardAtendimentosCriticos";
import { CardAtendimentosTotal } from "./components/CardAtendimentosTotal";
import { CardAtendimentosExcelentes } from "./components/CardAtendimentosExcelentes";
import { CardAtendimentosMedia } from "./components/CardAtendimentosMedia";
import { Grafico } from "./components/GraficoAtednimentos";  // Importando o componente Grafico
import { GraficoPizzaAtendimentos } from "./components/GraficoPizzaAtendimento";
import { GraficoPizzaPlataformaAtendimentos } from "./components/GraficoPizzaPlataformaAtendimento";
import { GraficoBarrasAtendimentos } from "./components/GraficoBarrasAtendimentos";
import { CardAtendimentoStatus } from "./components/CardAtendimentoStatus";
import { CardAtendimentosMediaTempo } from "./components/CardMediaTempoFinaliza";
import { CardAtendimentosMediaTempoFila } from "./components/CardMediaTempoFila";
import { CardAtendimentosAndamento } from "./components/CardAtendimentosAndamento";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { CardAtendimentosBot } from "./components/CardAtendimentosBot";
import { CardAtendimentosHumano } from "./components/CardAtendimentosHumano";

export function DashboardAtendimentos() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState(format(sevenDaysAgo, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));

  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard Ominichannel" />
        <div className="opacity-0">
          <SelectEmpresaButton />
        </div>
      </Page.Header>

      <div className="flex gap-4 mb-4">
      <Input
            type="date"
            label="Data Inicial"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Input
            type="date"
            label="Data Final"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
      </div>
      <div className="flex gap-4 mr-14">
        <CardAtendimentosTotal startDate={startDate} endDate={endDate}  />
        <CardAtendimentosCriticos startDate={startDate} endDate={endDate} />
        <CardAtendimentosExcelentes startDate={startDate} endDate={endDate}/>
        <CardAtendimentosMedia startDate={startDate} endDate={endDate}/>
      </div>

      <div className="flex gap-4 mr-14">
        <CardAtendimentoStatus startDate={startDate} endDate={endDate}/>
      </div>

      <div className="flex gap-4 mr-14">
        <CardAtendimentosMediaTempo startDate={startDate} endDate={endDate}/>
        <CardAtendimentosMediaTempoFila startDate={startDate} endDate={endDate}/>
        <CardAtendimentosAndamento startDate={startDate} endDate={endDate} />
      </div>

      <div className="flex gap-4 w-full justify-center">
        <div className="w-2/3">
          <Grafico startDate={startDate} endDate={endDate} />
        </div>

        <div className="w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14">
          <GraficoPizzaAtendimentos   startDate={startDate} endDate={endDate}/>
        </div>
      </div>

      <div className="flex gap-4 mr-14 ">
        <CardAtendimentosBot startDate={startDate} endDate={endDate}/>
        <CardAtendimentosHumano startDate={startDate} endDate={endDate}/>
        
      </div>

      <div className="flex gap-4 w-full h-96 justify-around mt-4 ">
        <div className="w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center ">
          <GraficoPizzaPlataformaAtendimentos startDate={startDate} endDate={endDate}/>
        </div>

        <div className="w-2/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14 p-6 ">
          <GraficoBarrasAtendimentos startDate={startDate} endDate={endDate}/>
        </div>
      </div>
    </Page.Root>
  );
}
