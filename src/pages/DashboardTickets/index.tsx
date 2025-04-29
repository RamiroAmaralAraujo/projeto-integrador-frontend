import { useState } from "react";
import { Page } from "@/components/Page";
import { SelectEmpresaButton } from "@/components/SelectEmpresaButton/SelectEmpresaButton";

import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { CardTicketsTotal } from "./Components/CardTicketsTotal/Index";
import { CardTicketsCriticos } from "./Components/CardTicketsCriticos/Index";
import { CardTicketsExcelentes } from "./Components/CardTicketsExcelentes/Index";
import { CardTicketsMedia } from "./Components/CardTicketsMedia/Index";
import { CardTicketStatus } from "./Components/CardTicketsStatus/Index";
import { CardTicketsMediaTempo } from "./Components/CardTicketsMediaTempo";
import { CardTicketsMediaTempoFila } from "./Components/CardTicketsMediaTempoFila/Index";
import { CardTicketsAndamento } from "./Components/CardTicketsAndamento";
import { GraficoTickets } from "./Components/GraficoTickets/Index";
import { GraficoPizzaTickets } from "./Components/GraficoPizzaTickets/Index";
import { GraficoPizzaTicketsCategoria } from "./Components/GraficoPizzaCategoria";

export function DashboardTickets() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState(format(sevenDaysAgo, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));

  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard Tickets" />
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
        <CardTicketsTotal startDate={startDate} endDate={endDate} />
        <CardTicketsCriticos startDate={startDate} endDate={endDate} />
        <CardTicketsExcelentes   startDate={startDate} endDate={endDate} />
        <CardTicketsMedia  startDate={startDate} endDate={endDate} />
      </div>

      <div className="flex gap-4 mr-14">
        <CardTicketStatus startDate={startDate} endDate={endDate} />
      </div>

      <div className="flex gap-4 mr-14">
        <CardTicketsMediaTempo startDate={startDate} endDate={endDate} />
        <CardTicketsMediaTempoFila startDate={startDate} endDate={endDate} />
        <CardTicketsAndamento startDate={startDate} endDate={endDate} />
       
      </div>

      <div className="flex gap-4 w-full justify-center">
        <div className="w-2/3">
          <GraficoTickets startDate={startDate} endDate={endDate} />
        </div>

        <div className="w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14">
          <GraficoPizzaTickets startDate={startDate} endDate={endDate} />
        </div>
      </div>

      <div className="flex gap-4 w-full h-96 justify-around mt-4 ">
        <div className="w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center ">
          <GraficoPizzaTicketsCategoria startDate={startDate} endDate={endDate} />
        </div>

        <div className="w-2/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14 p-6 ">
          {/* <GraficoBarrasAtendimentos startDate={startDate} endDate={endDate}/> */}
        </div>
      </div>
    </Page.Root>
  );
}
