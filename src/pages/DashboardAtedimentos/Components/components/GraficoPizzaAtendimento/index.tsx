import { useRead } from '@/hook/queries/useAtendimentos';
import { DonutChart } from '@tremor/react';

export function GraficoPizzaAtendimentos() {
  const { data } = useRead();
  const atendimentos = data;

  if (!atendimentos) {
    return <div>Loading...</div>;  // Exibe algo enquanto os dados não chegam
  }

  // Contagem de atendimentos por nota
  const Nota5 = atendimentos.filter(atendimento => atendimento.nota === 5).length;
  const Nota4 = atendimentos.filter(atendimento => atendimento.nota === 4).length;
  const Nota3 = atendimentos.filter(atendimento => atendimento.nota === 3).length;
  const Nota2 = atendimentos.filter(atendimento => atendimento.nota === 2).length;
  const Nota1 = atendimentos.filter(atendimento => atendimento.nota === 1).length;

  // Dados para o gráfico com valores numéricos no "value" e nomes nas "name"
  const sales = [
    {
      name: 'Péssimo', 
      value: Nota1,     
      color: 'red-700',     
    },
    {
      name: 'Ruim',
      value: Nota2,
      color: 'orange-400',
    },
    {
      name: 'Neutro',
      value: Nota3,
      color: 'yellow-400',
    },
    {
      name: 'Bom',
      value: Nota4,
      color: 'green-500',
    },
    {
      name: 'Ótimo',
      value: Nota5,
      color: 'green-700',
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

    const color = categoryPayload.color || 'gray'; // Cor definida ou padrão

    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${color} rounded`} // Cor usando a variável color
          />
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
        Total de Atendimentos
      </h3>
      {atendimentos && (
        <DonutChart
          className="h-3/4 font-bold text-lg"
          data={sales}         // Passa os dados para o gráfico
          colors={colors}
          category="value"     // Indica que o valor que será usado nas fatias é o "value"
          index="name"         // A categoria da fatia é "name"
          customTooltip={customTooltip}  // Tooltip customizado
          animationDuration={5000}
          showAnimation={true}
        />
      )}
    </div>
  );
}
