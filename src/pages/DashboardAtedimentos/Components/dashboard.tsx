import { Page } from '@/components/Page'

import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';

import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { CardPendentesAtendimentos} from './components/CardPendentesAtendimentos';
import { CardRecebidas } from './components/CardRecebidas';
import { CardPagos } from './components/CardPagos';
import { CardBalanco } from './components/CardBalanco';
import { Grafico } from './components/GraficoAtednimentos';
import { GraficoPizzaAtendimentos } from './components/GraficoPizzaAtendimento';

export function DashboardAtendimentos() {

  const { empresaSelecionada } = useContext(AuthContext)

  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard" />
        <SelectEmpresaButton />
      </Page.Header>


      {empresaSelecionada && (
        <div className='flex gap-4 mr-14'>
          <CardPendentesAtendimentos />
          <CardRecebidas />
          <CardPagos />
          <CardBalanco />
        </div>
      )}

      {!empresaSelecionada && (
        <div className='flex gap-4 mr-14 opacity-45'>
          <CardPendentesAtendimentos />
          <CardRecebidas />
          <CardPagos />
          <CardBalanco />
        </div>
      )}

      {empresaSelecionada && (
        <div className='flex gap-4 w-full justify-center  '>



          <div className='w-2/3'>
            <Grafico />
          </div>

          <div className='w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14'>
            <GraficoPizzaAtendimentos />
          </div>

        </div>
      )}

      {!empresaSelecionada && (
        <div className='flex gap-4 w-full justify-center opacity-45'>


          <div className='w-2/3'>
            <Grafico />
          </div>

          <div className='w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14'>
            <GraficoPizzaAtendimentos />
          </div>

        </div>
      )}
    </Page.Root>
  );
}