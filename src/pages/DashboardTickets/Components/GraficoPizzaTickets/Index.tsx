import { useRead } from "@/hook/queries/useTicket";
import { DonutChart } from "@tremor/react";
import PlaceHolderDonuts from "@/assets/PlaceHolderDonuts.jpg"

interface GraficoPizzaTicketsProps {
  startDate: string;
  endDate: string;
}

export function GraficoPizzaTickets({ startDate, endDate }: GraficoPizzaTicketsProps) {
  const { data } = useRead();
  const tickets = data;

  if (!tickets) {
    return <div>Loading...</div>;
  }

  
  const filteredTickets = tickets.filter((ticket) => {
    const dataCriacao = ticket.createdAt ? new Date(ticket.createdAt) : new Date(0);
    return (
      dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate + "T23:59:59")
    );
  });

  
  const Nota5 = filteredTickets.filter((ticket) => ticket.avaliacao === 5).length;
  const Nota4 = filteredTickets.filter((ticket) => ticket.avaliacao === 4).length;
  const Nota3 = filteredTickets.filter((ticket) => ticket.avaliacao === 3).length;
  const Nota2 = filteredTickets.filter((ticket) => ticket.avaliacao === 2).length;
  const Nota1 = filteredTickets.filter((ticket) => ticket.avaliacao === 1).length;
  const NotaNull = filteredTickets.filter((ticket) => ticket.avaliacao === 0).length;

  
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
        Avaliação por Tickets
      </h3>
      {filteredTickets.length > 0 ?(
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
