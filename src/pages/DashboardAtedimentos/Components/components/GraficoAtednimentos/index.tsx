import { AreaChart } from "@tremor/react";
import skeletonGrafico from "../../../../../assets/skeletonGrafico.png";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useRead } from "@/hook/queries/useAtendimentos";
import { Input } from "@/components/ui/input";

export function Grafico() {
  const { data: atendimento } = useRead();

  // Estado para os filtros de data
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Data atual
  const today = new Date();

  // Calcula a data de 7 dias atrás
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Inicializa os filtros com as datas padrão (últimos 7 dias)
  useEffect(() => {
    setStartDate(format(sevenDaysAgo, "yyyy-MM-dd"));
    setEndDate(format(today, "yyyy-MM-dd"));
  }, []);

  // Verifica se os dados estão carregados
  if (!atendimento ) {
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
    return (
      dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate)
    );
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
      };
    }

    // Incrementa o contador da nota específica
    acumuladoPorData[dataCriacao][nota] += 1;
  });

  // Convertendo o objeto acumulado em um array para o gráfico
  const chartData = Object.keys(acumuladoPorData).map((date) => ({
    date,
    "Nota 1": acumuladoPorData[date]["1"],
    "Nota 2": acumuladoPorData[date]["2"],
    "Nota 3": acumuladoPorData[date]["3"],
    "Nota 4": acumuladoPorData[date]["4"],
    "Nota 5": acumuladoPorData[date]["5"],
  }));

  // Função para formatar os valores
  const dataFormatter = (number: number | bigint) => `${number}`;

  return (
    <div className="bg-gray-50 w-full rounded-xl shadow-lg p-2 pr-6 flex flex-col items-center">
      <div className="w-full flex justify-around items-center ">
        <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
        ({filteredAtendimentos.length}) Atendimentos Realizados nesse período
        </h3>

        <div className="flex gap-3">
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
      </div>

      <AreaChart
        className="mt-4 h-72"
        animationDuration={8000}
        showAnimation={true}
        data={chartData}
        index="date"
        yAxisWidth={65}
        categories={["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5"]}
        colors={["red", "orange", "yellow", "blue", "green"]}
        valueFormatter={dataFormatter}
        curveType="monotone"
      />
    </div>
  );
}
