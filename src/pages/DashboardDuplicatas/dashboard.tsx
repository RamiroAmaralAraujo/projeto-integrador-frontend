import { Page } from '@/components/Page'

import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';
import { Grafico } from './Components/Grafico';
import { GraficoPizza } from './Components/GraficoPizza';
import { CardPendentes } from './Components/CardPendentes';
import { CardRecebidas } from './Components/CardRecebidas';
import { CardPagos } from './Components/CardPagos';
import { CardBalanco } from './Components/CardBalanco';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';

export function DashboardDuplicatas() {

  const { empresaSelecionada } = useContext(AuthContext)

  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard Financeiro" />
        <SelectEmpresaButton />
      </Page.Header>


      {empresaSelecionada && (
        <div className='flex gap-4 mr-14'>
          <CardPendentes />
          <CardRecebidas />
          <CardPagos />
          <CardBalanco />
        </div>
      )}

      {!empresaSelecionada && (
        <div className='flex gap-4 mr-14 opacity-45'>
          <CardPendentes />
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
            <GraficoPizza />
          </div>

        </div>
      )}

      {!empresaSelecionada && (
        <div className='flex gap-4 w-full justify-center opacity-45'>


          <div className='w-2/3'>
            <Grafico />
          </div>

          <div className='w-1/3 bg-gray-50 rounded-xl shadow-lg flex justify-center items-center mr-14'>
            <GraficoPizza />
          </div>

        </div>
      )}
    </Page.Root>
  );
}