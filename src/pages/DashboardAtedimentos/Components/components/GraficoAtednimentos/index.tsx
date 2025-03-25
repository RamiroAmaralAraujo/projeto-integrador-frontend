import { AreaChart } from '@tremor/react';
import skeletonGrafico from '../../../../../assets/skeletonGrafico.png';
import { format } from 'date-fns';
import { useRead } from '@/hook/queries/useAtendimentos';

export function Grafico() {
  const { data: atendimento } = useRead();

  // Verifica se os dados estão carregados
  if (!atendimento) {
    return (
      <div className='bg-gray-50 w-full rounded-xl shadow-lg opacity-50'>
        <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">Atendimentos Realizados (Dia)</h3>
        <div className='w-full flex justify-center items-center opacity-45'>
          <img src={skeletonGrafico} width={650} alt="Skeleton" />
        </div>
      </div>
    );
  }

  // Ordena os atendimentos por data de criação
  atendimento.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  // Objeto auxiliar para contar o número de atendimentos por data
  const acumuladoPorData: { [key: string]: number } = {};

  atendimento.forEach((atendimento) => {
    // Formata apenas a data (sem hora) para considerar somente o dia
    const dataCriacao = format(new Date(atendimento.createdAt).setHours(0, 0, 0, 0), 'dd/MM/yy'); // Remove as horas

    // Conta o número de atendimentos por data
    if (acumuladoPorData[dataCriacao]) {
      acumuladoPorData[dataCriacao] += 1; // Incrementa 1 para cada atendimento no mesmo dia
    } else {
      acumuladoPorData[dataCriacao] = 1; // Inicia com 1 se for o primeiro atendimento no dia
    }
  });

  // Convertendo o objeto acumulado em um array para o gráfico
  const chartData = Object.keys(acumuladoPorData).map((date) => ({
    date,
    total: acumuladoPorData[date], // 'total' agora representa o número de atendimentos
  }));

  // Função para formatar os valores
  const dataFormatter = (number: number | bigint) =>
    `${number}`; // Mostra a quantidade de atendimentos

  return (
    <div className='bg-gray-50 w-full rounded-xl shadow-lg p-2 pr-6'>
      <h3 className="p-6 text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">Atendimentos Realizados (Dia)</h3>
      <AreaChart
        className="mt-4 h-72"
        animationDuration={5000}
        showAnimation={true}
        data={chartData}
        index="date"
        yAxisWidth={65}
        categories={['total']} 
        colors={['indigo']} 
        valueFormatter={dataFormatter}
        curveType="monotone"
      />
    </div>
  );
}
