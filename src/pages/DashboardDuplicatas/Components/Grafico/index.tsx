import { useRead } from '@/hook/queries/useDuplicatas';
import { AreaChart } from '@tremor/react';
import skeletonGrafico from '../../../../assets/skeletonGrafico.png'

import { format } from 'date-fns';

export function Grafico() {
  const { data: duplicatasData } = useRead();


  // if (isLoading) {
  //   return <div>Carregando...</div>;
  // }

  // if (isError) {
  //   return <div>Ocorreu um erro ao carregar os dados das duplicatas.</div>;
  // }

  if (!duplicatasData || duplicatasData.length === 0) {
    return (<>
      <div className='bg-gray-50 w-full rounded-xl shadow-lg opac'>
        <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">Duplicatas Pagáveis e Recebíveis (Dia)</h3>
        <div className='w-full flex justify-center items-center opacity-45'>
          <img src={skeletonGrafico} width={650} alt="" />
        </div>
      </div>
    </>)
  }

  // Ordenar o array pelo campo de data de vencimento
  duplicatasData.sort((a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime());

  // Objeto auxiliar para armazenar os valores acumulados para cada data de vencimento
  const acumuladoPorData: { [key: string]: { Pagáveis: number, Recebíveis: number } } = {};

  // Percorrer o array e somar os valores das duplicatas com vencimento no mesmo dia
  duplicatasData.forEach(duplicata => {
    const dataVencimento = format(new Date(duplicata.vencimento), 'dd/MM/yy'); // Converter e formatar a data
    const valor = Number(duplicata.valorFinal);
    const tipoPag = duplicata.tipoPag ? "Pagáveis" : "Recebíveis";
    if (acumuladoPorData[dataVencimento]) {
      acumuladoPorData[dataVencimento][tipoPag] += valor;
    } else {
      acumuladoPorData[dataVencimento] = { Pagáveis: tipoPag === "Pagáveis" ? valor : 0, Recebíveis: tipoPag === "Recebíveis" ? valor : 0 };
    }
  });

  // Construir o novo array de dados para o gráfico
  const chartData = Object.keys(acumuladoPorData).map(date => ({
    date,
    Pagáveis: acumuladoPorData[date].Pagáveis,
    Recebíveis: acumuladoPorData[date].Recebíveis
  }));

  const dataFormatter = (number: number | bigint) =>
    `$${Intl.NumberFormat('pt-br').format(number).toString()}`;

  return (
    <>
      {duplicatasData && (
        <div className='bg-gray-50 w-full rounded-xl shadow-lg p-2 pr-6'>
          <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">Duplicatas Pagáveis e Recebíveis (Dia)</h3>
          <AreaChart
            className="mt-4 h-72 "
            animationDuration={5000}
            showAnimation={true}
            data={chartData}
            index="date"
            yAxisWidth={65}
            categories={['Pagáveis', 'Recebíveis']}
            colors={['red', 'indigo']}
            valueFormatter={dataFormatter}
            curveType="monotone"
          // showXAxis={false}
          />
        </div>
      )}

    </>
  );
}
