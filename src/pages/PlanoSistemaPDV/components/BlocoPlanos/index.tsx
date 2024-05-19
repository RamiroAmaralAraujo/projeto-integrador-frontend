import React from 'react';

import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";

interface BlocoPlanosProps {
  titulo: string;
  desconto: string;
  preco: string;
  tempo: string;
  equivalente: string;
  recursosInclusos: string[];
  recursosNaoInclusos: string[];
  especificacoes: string[];
  suporte: string;
  isFirstBlock?: boolean;
  isMensal?: boolean;
}

const BlocoPlanos: React.FC<BlocoPlanosProps> = ({
  titulo,
  desconto,
  preco,
  tempo,
  equivalente,
  recursosInclusos,
  recursosNaoInclusos,
  especificacoes,
  suporte,
  isFirstBlock = false,
  isMensal = false
}) => {
  return (
    <div className={`w-full md:w-1/5 shadow-xl p-6 bg-gray-50 rounded-xl mb-${isFirstBlock ? '0' : '20'} flex flex-col transition-transform transform hover:scale-105 ${isFirstBlock ? '' : 'mt-20'}`}>
      <div>
        <h1 className="text-2xl font-semibold mb-3 text-brand-blue-500">{titulo}</h1>

        {!isMensal && (
          <>
            <p className="mt-5 mb-2 flex text-white bg-green-500 py-2 px-4 rounded-full w-1/2 justify-center font-semibold">ECONOMIZE {desconto}%</p>
          </>
        )}

        <p className="text-5xl font-bold text-brand-blue-500">
          <span className="text-base align-text-top">R$</span>
          {preco}
          <span className="text-lg font-normal">/{tempo}</span>
        </p>

        {!isMensal && (
          <>
            <p className="mt-5">Equivalente</p>
            <p>a <span className='font-bold'>R${equivalente}</span>/mês</p>
          </>
        )}

        <div className="font-semibold bg-brand-blue-500 text-white flex rounded-full justify-center items-center py-2 mt-4 cursor-pointer">
          Comece grátis
        </div>
      </div>

      <div className="my-6 -m-6 border border-brand-blue-100"></div>

      <div className="bg-brand-blue-100 rounded-xl p-2 pb-4">
        <h1 className="font-semibold text-brand-blue-300 mb-2 text-lg">
          Recursos ilimitados
        </h1>
        <div className="flex flex-col gap-3 font-semibold">
          {recursosInclusos.map((feature, index) => (
            <div className='flex items-center gap-1'>
              <div>
                <MdOutlineCheckCircle color='green' size={20}/>
              </div>
              <p key={index}>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-gray-400 my-5 flex flex-col gap-3 ml-2">
        {recursosNaoInclusos.map((feature, index) => (
          <div className='flex items-center gap-1'>
            <div>
              <MdOutlineHighlightOff color='#F78685' size={20}/>
            </div>
            <p key={index}>{feature}</p>
          </div>
        ))}
      </div>

      <div className="my-6 -m-6 border border-brand-blue-100"></div>

      <h1 className="font-semibold text-lg">No Plano {titulo}, você tem:</h1>

      <div className="flex flex-col gap-3 mt-5 text-brand-blue-500">
        {especificacoes.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </div>

      <p className="bg-brand-blue-100 rounded-xl p-2 pb-4 mt-8 font-semibold text-brand-blue-300">
        {suporte}
      </p>
    </div>
  );
};

export default BlocoPlanos;