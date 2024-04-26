import { useRead } from "@/hook/queries/useDuplicatas";
import { HandCoins } from 'lucide-react';

export function CardRecebidas() {
  const { data: duplicatasData } = useRead();


  if (!duplicatasData) {
    return <div>Carregando...</div>;
  }


  const duplicatasSemPagamento = duplicatasData.filter(duplicata => !duplicata.tipoPag && duplicata.data_Pag_Receb);


  const somatorioDuplicatasSemPagamento = duplicatasSemPagamento.reduce((total, duplicata) => total + Number(duplicata.valorFinal), 0);

  return (
    <>
      <div className='bg-gray-50 w-full rounded-xl shadow-lg p-6 mb-4'>
        <h1 className="font-bold text-brand-blue-500 text-2xl">Duplicatas Recebidas</h1>
        <div className="flex items-center justify-between gap-5 mt-5">
          <span className="text-2xl text-green-500 font-semibold"> + R$ {somatorioDuplicatasSemPagamento.toFixed(2)}</span>
          <div className="w-14 h-14 bg-green-300 rounded-full flex justify-center items-center text-green-700"> <HandCoins size={30} /> </div>

        </div>
      </div>
    </>
  );
}
