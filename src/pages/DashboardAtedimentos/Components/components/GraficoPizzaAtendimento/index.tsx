import { useRead } from "@/hook/queries/useAtendimentos";
import { DonutChart } from "@tremor/react";
import PlaceHolderDonuts from "@/assets/PlaceHolderDonuts.jpg"

interface GraficoPizzaAtendimentosProps {
  startDate: string;
  endDate: string;
}

export function GraficoPizzaAtendimentos({ startDate, endDate }: GraficoPizzaAtendimentosProps) {
  const { data } = useRead();
  const atendimentos = data;

  if (!atendimentos) {
    return <div>Loading...</div>;
  }

  
  const filteredAtendimentos = atendimentos.filter((atendimento) => {
    const dataCriacao = new Date(atendimento.createdAt);
    return (
      dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate + "T23:59:59")
    );
  });

  
  const Nota5 = filteredAtendimentos.filter((atendimento) => atendimento.nota === 5).length;
  const Nota4 = filteredAtendimentos.filter((atendimento) => atendimento.nota === 4).length;
  const Nota3 = filteredAtendimentos.filter((atendimento) => atendimento.nota === 3).length;
  const Nota2 = filteredAtendimentos.filter((atendimento) => atendimento.nota === 2).length;
  const Nota1 = filteredAtendimentos.filter((atendimento) => atendimento.nota === 1).length;
  const NotaNull = filteredAtendimentos.filter((atendimento) => atendimento.nota === 0).length;

  
  const sales = [
    {
      name: "Péssimo",
      value: Nota1,
      color: "red-500",
    },
    {
      name: "Ruim",
      value: Nota2,
      color: "orange-500",
    },
    {
      name: "Neutro",
      value: Nota3,
      color: "yellow-500",
    },
    {
      name: "Bom",
      value: Nota4,
      color: "blue-500",
    },
    {
      name: "Ótimo",
      value: Nota5,
      color: "green-500",
    },
    {
      name: "Sem Avaliação",
      value: NotaNull,
      color: "gray-500",
    },
  ];

  const colors = sales.map((sale) => sale.color);

  type CustomTooltipTypeDonut = {
    payload: any[];
    active: boolean | undefined;
  };

  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const { payload, active } = props;
    if (!active || !payload || payload.length === 0) return null;
    const categoryPayload = payload[0];

    const color = categoryPayload.color || "gray"; 

    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div className={`flex w-1.5 flex-col bg-${color} rounded`} />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="whitespace-nowrap text-right text-tremor-content">
                {categoryPayload.name}
              </p>
              <p className="whitespace-nowrap text-right font-medium text-tremor-content-emphasis ">
                {categoryPayload.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full justify-center items-center flex flex-col">
      <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
        Avaliação por Atendimentos
      </h3>
      {filteredAtendimentos.length > 0 ?(
        <DonutChart
          className="h-3/4 font-bold text-lg"
          data={sales}
          colors={colors}
          category="value"
          index="name"
          customTooltip={customTooltip}
          animationDuration={5000}
          showAnimation={true}
        />
      ) : (
        <div>
        <img src={PlaceHolderDonuts} alt="" className=" w-72 opacity-30 rounded-xl" />
      </div>
      )}
    </div>
  );
}
