import { useNavigate } from "react-router-dom";
import estoque from "./assets/estoque.png";
import financeiro from "./assets/financeiro.png";
import gestaodevendas from "./assets/gestaodevendas.png";






export function Section3() {
  const navigate = useNavigate()

  function paginaSolucoes() {

    navigate('solucoes/sistema-pdv')

  }

  return (
    <div className="p-6 md:p-12 bg-white flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center mb-10 md:mb-20 gap-2">
        <h1 className="font-semibold text-2xl md:text-4xl text-center">As melhores soluções em um só lugar</h1>
        <p className="text-center">Você contrata soluções que o seu negócio precisa</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start w-full gap-6 md:gap-0">

        <div className="flex flex-col justify-center items-center md:items-end w-full md:w-1/3">
          <div className="flex flex-col justify-center items-center w-4/5 md:w-4/6">
            <img src={gestaodevendas} alt="Imagem1" width={200} className="mb-6 md:mb-10" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="font-semibold text-lg md:text-xl text-center">Gestão de vendas</h1>
              <div className="md:h-36 md:mb-0 mb-2">
                <p className="text-center">É essencial para impulsionar o sucesso comercial, oferecendo insights em tempo real e automação de processos</p>
              </div>
            </div>
            <div onClick={paginaSolucoes} className="bg-base-background text-white rounded-xl h-10 flex items-center justify-center md:p-5 p-3 font-semibold md:mb-0 mb-10 cursor-pointer">
              <p className="text-center">Conheça a Gestão de vendas</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full md:w-1/3">
          <div className="flex flex-col justify-center items-center w-4/5 md:w-4/6">
            <img src={financeiro} alt="Imagem2" width={200} className="mb-6 md:mb-10" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="font-semibold text-lg md:text-xl text-center">Financeiro</h1>
              <div className="md:h-36 md:mb-0 mb-2">
                <p className="text-center">Desempenha um papel fundamental na gestão e na análise dos aspectos monetários do negócio</p>
              </div>
            </div>
            <div onClick={paginaSolucoes} className="bg-base-background text-white rounded-xl h-10 flex items-center justify-center md:p-5 p-3 font-semibold md:mb-0 mb-10 cursor-pointer">
              <p className="text-center">Conheça o Financeiro</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/3">
          <div className="flex flex-col justify-center items-center w-4/5 md:w-4/6">
            <img src={estoque} alt="Imagem3" width={200} className="mb-6 md:mb-10" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="font-semibold text-lg md:text-xl text-center">Estoque</h1>
              <div className="md:h-36 md:mb-0 mb-2">
                <p className="text-center">É essencial para o controle eficiente de inventário e gestão de mercadorias</p>
              </div>
            </div>
            <div onClick={paginaSolucoes} className="bg-base-background text-white rounded-xl h-10 flex items-center justify-center md:p-5 p-3 font-semibold md:mb-0 mb-10 cursor-pointer">
              <p className="text-center">Conheça o Estoque</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
