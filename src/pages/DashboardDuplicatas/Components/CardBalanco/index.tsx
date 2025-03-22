import { useRead } from "@/hook/queries/useDuplicatas";
import { CandlestickChart } from 'lucide-react';

export function CardBalanco() {
  const { data: duplicatasData } = useRead();

  if (!duplicatasData) {
    return <div>Carregando...</div>;
  }


  const pagaveis = duplicatasData.filter(duplicata => duplicata.data_Pag_Receb && !duplicata.tipoPag);
  const recebiveis = duplicatasData.filter(duplicata => duplicata.data_Pag_Receb && duplicata.tipoPag);


  const saldo = pagaveis.reduce((total, duplicata) => total + Number(duplicata.valorFinal), 0) - recebiveis.reduce((total, duplicata) => total + Number(duplicata.valorFinal), 0);

  return (
    <div className='bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4 justify-between flex flex-col'>
      <h1 className="font-bold text-brand-blue-500 text-2xl">Balanço do Caixa</h1>
      <div className="flex items-center justify-between gap-5 mt-5">
        <span className="text-2xl font-semibold">R$ {saldo.toFixed(2)}</span>
        <div className={`w-14 h-14 rounded-full flex justify-center items-center ${saldo < 0 ? 'bg-red-300 text-red-700' : saldo > 0 ? 'bg-green-300 text-green-700' : 'bg-gray-300 text-gray-700'}`}> <CandlestickChart size={30} /> </div>
      </div>
    </div>
  );
}
