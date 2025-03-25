

import { useRead } from '@/hook/queries/useAtendimentos';
import { Siren } from 'lucide-react';


export function CardPendentesAtendimentos() {
  const { data: atendimentos } = useRead();



  if (!atendimentos) {
    return <div>Carregando...</div>;
  }


  const atendimentosCriticos = atendimentos.filter(atendimento => atendimento.nota === 1);


  const somatorioAtendimentosCriticos = atendimentosCriticos.reduce((total, atendimento) => total + Number(atendimento.nota), 0);

  return (
    <>
      <div className='bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4'>
        <h1 className="font-bold text-brand-blue-500 text-2xl">Atendimentos Críticos</h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-gray-500 font-semibold"> {somatorioAtendimentosCriticos}</span>
          <div className="w-14 h-14 bg-yellow-300 rounded-full flex justify-center items-center text-yellow-700"> <Siren size={30} /> </div>
        </div>
      </div>
    </>
  );
}
