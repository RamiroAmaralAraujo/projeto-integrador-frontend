import { useRead } from '@/hook/queries/useDuplicatas';
import { DonutChart } from '@tremor/react';

export function GraficoPizza() {
  const { data: duplicatasData, isError } = useRead();



  if (isError || !duplicatasData) {
    return
  }


  const pagaveis = duplicatasData.filter(duplicata => duplicata.data_Pag_Receb && !duplicata.tipoPag);
  const recebiveis = duplicatasData.filter(duplicata => duplicata.data_Pag_Receb && duplicata.tipoPag);

  const saldoPagaveis = pagaveis.reduce((total, duplicata) => total + Number(duplicata.valorFinal), 0);
  const saldoRecebiveis = recebiveis.reduce((total, duplicata) => total + Number(duplicata.valorFinal), 0);

  const sales = [
    {
      name: 'Pagáveis',
      value: saldoPagaveis
    },
    {
      name: 'Recebíveis',
      value: saldoRecebiveis
    }
  ];


  const valueFormatter = (number: number) =>
    ` ${Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BRL' }).format(number).toString()}`;


  type CustomTooltipTypeDonut = {
    payload: any[];
    active: boolean | undefined;
  };



  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const { payload, active } = props;
    if (!active || !payload || payload.length === 0) return null;
    const categoryPayload = payload[0];
    return (

      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${categoryPayload.color}-500 rounded`}
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
    <>

      <div className='w-full h-full justify-center items-center flex flex-col'>
        <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">Total Pagáveis e Recebíveis (Concluídos)</h3>
        {duplicatasData && (
          <DonutChart
            className='h-3/4 font-bold text-lg'
            data={sales}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            customTooltip={customTooltip}
            animationDuration={5000}
            showAnimation={true}

          />
        )}
      </div>
    </>
  );
}
