import { AreaChart } from "@tremor/react";
import skeletonGrafico from "../../../../../assets/skeletonGrafico.png";
import { format } from "date-fns";
import { useState} from "react";
import { useRead } from "@/hook/queries/useAtendimentos";
import { Select } from "@/components/ui/select";

interface GraficoProps {
  startDate: string;
  endDate: string;
}

export function Grafico({ startDate, endDate }: GraficoProps) {
  const { data: atendimento } = useRead();

  

  const [modoGrafico, setModoGrafico] = useState<"todos" | "notas">("notas");

  

  if (!atendimento) {
    return (
      <div className="bg-gray-50 w-full rounded-xl shadow-lg opacity-50">
        <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
          Atendimentos Realizados (Dia)
        </h3>
        <div className="w-full flex justify-center items-center opacity-45">
          <img src={skeletonGrafico} width={650} alt="Skeleton" />
        </div>
      </div>
    );
  }

  // Filtra os atendimentos com base no intervalo de datas
  const filteredAtendimentos = atendimento.filter((atendimento) => {
    const dataCriacao = new Date(atendimento.createdAt);
    if (startDate && endDate) {
      return (
        dataCriacao >= new Date(startDate) &&
        dataCriacao <= new Date(endDate + "T23:59:59")
      );
    }
    return true;
  });

  // Ordena os atendimentos por data de criação
  filteredAtendimentos.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Objeto auxiliar para contar o número de atendimentos por data e por nota
  const acumuladoPorData: { [key: string]: { [key: string]: number } } = {};

  filteredAtendimentos.forEach((atendimento) => {
    // Formata a data para considerar apenas o dia
    const dataCriacao = format(
      new Date(atendimento.createdAt).setHours(0, 0, 0, 0),
      "dd/MM/yy"
    );
    const nota = String(atendimento.nota);

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
        "Sem Nota": acumuladoPorData[date]["0"],
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
    { value: "notas", label: "Atendimentos/Nota" },
    { value: "todos", label: "Todos Atendimentos" },
  ];

  return (
    <div className="bg-gray-50 w-full rounded-xl shadow-lg p-2 pr-6 flex flex-col items-center">
      <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
          ({filteredAtendimentos.length}) Atendimentos Realizados nesse período
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
            ? ["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5", "Sem Nota"]
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
