import { useRead } from '@/hook/queries/useTicket';
import { DonutChart } from '@tremor/react';
import PlaceHolderDonuts from "@/assets/PlaceHolderDonuts.jpg"

interface GraficoPizzaPlataformaTicketsProps {
  startDate: string;
  endDate: string;
}

export function GraficoPizzaTicketsCategoria({ startDate, endDate }: GraficoPizzaPlataformaTicketsProps) {
  const { data } = useRead();
  const tickets = data;

  if (!tickets) {
    return <div>Loading...</div>;
  }

  // Filtra tickets pelo período
  const ticketsFiltrados = tickets.filter((ticket) => {
    const createdAt = ticket.createdAt ? new Date(ticket.createdAt) : null;
    return (
      createdAt !== null &&
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  });

  const Financeiro = ticketsFiltrados.filter(ticket => ticket.categoria === "FINANCEIRO").length;
  const Comercial = ticketsFiltrados.filter(ticket => ticket.categoria === "COMERCIAL").length;
  const Suporte = ticketsFiltrados.filter(ticket => ticket.categoria === "SUPORTE").length;

  const sales = [
    {
      name: 'Financeiro',
      value: Financeiro,
      color: 'green-500',
    },
    {
      name: 'Comercial',
      value: Comercial,
      color: 'blue-500',
    },
    {
        name: 'Suporte',
        value: Suporte,
        color: 'red-500',
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
        Tickets por Categoria
      </h3>
      {ticketsFiltrados.length > 0 ? (
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
