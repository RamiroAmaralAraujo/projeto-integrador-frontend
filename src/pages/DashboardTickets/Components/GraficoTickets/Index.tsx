import { AreaChart } from "@tremor/react";
import skeletonGrafico from "@/assets/skeletonGrafico.png";
import { format } from "date-fns";
import { useState} from "react";
import { useRead } from "@/hook/queries/useTicket";
import { Select } from "@/components/ui/select";

interface GraficoProps {
  startDate: string;
  endDate: string;
}

export function GraficoTickets({ startDate, endDate }: GraficoProps) {
  const { data: ticket } = useRead();

  

  const [modoGrafico, setModoGrafico] = useState<"todos" | "notas">("notas");

  

  if (!ticket) {
    return (
      <div className="bg-gray-50 w-full rounded-xl shadow-lg opacity-50">
        <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
          Tickets Realizados (Dia)
        </h3>
        <div className="w-full flex justify-center items-center opacity-45">
          <img src={skeletonGrafico} width={650} alt="Skeleton" />
        </div>
      </div>
    );
  }

  // Filtra os tickets com base no intervalo de datas
  const filteredTickets = ticket.filter((ticket) => {
    const dataCriacao = new Date(ticket.createdAt ?? "");
    if (startDate && endDate) {
      return (
        dataCriacao >= new Date(startDate) &&
        dataCriacao <= new Date(endDate + "T23:59:59")
      );
    }
    return true;
  });

  // Ordena os tickets por data de criação
  filteredTickets.sort(
    (a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()
  );

  // Objeto auxiliar para contar o número de tickets por data e por nota
  const acumuladoPorData: { [key: string]: { [key: string]: number } } = {};

  filteredTickets.forEach((ticket) => {
    // Formata a data para considerar apenas o dia
    const dataCriacao = format(
      new Date(ticket.createdAt ?? "").setHours(0, 0, 0, 0),
      "dd/MM/yy"
    );
    const nota = String(ticket.avaliacao);

    // Inicializa o objeto de data se não existir
    if (!acumuladoPorData[dataCriacao]) {
      acumuladoPorData[dataCriacao] = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "0": 0,
      };
    }

    // Incrementa o contador da nota específica
    acumuladoPorData[dataCriacao][nota] += 1;
  });

  // Convertendo o objeto acumulado em um array para o gráfico
  const chartData = Object.keys(acumuladoPorData).map((date) => {
    if (modoGrafico === "notas") {
      return {
        date,
        "Nota 1": acumuladoPorData[date]["1"],
        "Nota 2": acumuladoPorData[date]["2"],
        "Nota 3": acumuladoPorData[date]["3"],
        "Nota 4": acumuladoPorData[date]["4"],
        "Nota 5": acumuladoPorData[date]["5"],
        "Sem Avaliação": acumuladoPorData[date]["0"],
      };
    } else {
      const total =
        acumuladoPorData[date]["1"] +
        acumuladoPorData[date]["2"] +
        acumuladoPorData[date]["3"] +
        acumuladoPorData[date]["4"] +
        acumuladoPorData[date]["5"]+
        acumuladoPorData[date]["0"]
      return {
        date,
        Total: total,
      };
    }
  });

  // Função para formatar os valores
  const dataFormatter = (number: number | bigint) => `${number}`;

  const selectOptions = [
    { value: "notas", label: "Tickets/Nota" },
    { value: "todos", label: "Todos Tickets" },
  ];

  return (
    <div className="bg-gray-50 w-full rounded-xl shadow-lg p-2 pr-6 flex flex-col items-center">
      <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
          ({filteredTickets.length}) Tickets Realizados nesse período
        </h3>
      <div className="w-full flex justify-center items-center ">
        <div className="flex gap-3">
          

          <Select
            text="Tipo de Gráfico"
            value={modoGrafico}
            onChange={(e) =>
              setModoGrafico(e.target.value as "todos" | "notas")
            }
            options={selectOptions}
          />
        </div>
      </div>

      {chartData.length > 0 ? (
        <AreaChart
        className="mt-4 h-72"
        animationDuration={8000}
        showAnimation={true}
        data={chartData}
        index="date"
        yAxisWidth={65}
        categories={
          modoGrafico === "notas"
            ? ["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5", "Sem Avaliação"]
            : ["Total"]
        }
        colors={["blue","red", "orange", "yellow", "green", "gray"]}
        valueFormatter={dataFormatter}
        curveType="monotone"
        onValueChange={(v) => v}
      />
      ):
      <div>
        <img src={skeletonGrafico} width={700}  alt="" className=" opacity-30 rounded-xl" />
      </div>
      }
    </div>
  );
}
