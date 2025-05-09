import { useRead } from '@/hook/queries/useAtendimentos';
import { DonutChart } from '@tremor/react';
import PlaceHolderDonuts from "@/assets/PlaceHolderDonuts.jpg"

interface GraficoPizzaPlataformaAtendimentosProps {
  startDate: string;
  endDate: string;
}

export function GraficoPizzaPlataformaAtendimentos({ startDate, endDate }: GraficoPizzaPlataformaAtendimentosProps) {
  const { data } = useRead();
  const atendimentos = data;

  if (!atendimentos) {
    return <div>Loading...</div>;
  }

  // Filtra atendimentos pelo período
  const atendimentosFiltrados = atendimentos.filter((atendimento) => {
    const createdAt = new Date(atendimento.createdAt);
    return (
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  });

  const WhatsApp = atendimentosFiltrados.filter(atendimento => atendimento.plataforma === "WHATSAPP").length;
  const Telegram = atendimentosFiltrados.filter(atendimento => atendimento.plataforma === "TELEGRAM").length;

  const sales = [
    {
      name: 'WhatsApp',
      value: WhatsApp,
      color: 'green-500',
    },
    {
      name: 'Telegram',
      value: Telegram,
      color: 'blue-500',
    },
  ];

  const colors = sales.map(sale => sale.color);

  type CustomTooltipTypeDonut = {
    payload: any[];
    active: boolean | undefined;
  };

  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const { payload, active } = props;
    if (!active || !payload || payload.length === 0) return null;
    const categoryPayload = payload[0];

    const color = categoryPayload.color || 'gray';

    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${color} rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="whitespace-nowrap text-right text-tremor-content">
                {categoryPayload.name}
              </p>
              <p className="whitespace-nowrap text-right font-medium text-tremor-content-emphasis">
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
        Atendimentos por Plataforma
      </h3>
      {atendimentosFiltrados.length > 0 ? (
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
