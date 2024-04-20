import { AuthContext } from "@/Context/AuthContext"
import { useContext } from "react"
import LogoSemFundoAzul from '../../assets/LogoSemFundoAzul.svg'
import { format } from 'date-fns';




export default function PrintDuplicatamodel() {

  const { empresaSelecionada, duplicataSelecionada } = useContext(AuthContext)

  const tipoPag = duplicataSelecionada?.tipoPag || ''
  const desconto = duplicataSelecionada?.desconto || ''
  const descontoPorcento = duplicataSelecionada?.descontoPorcento || ''
  const acresc = duplicataSelecionada?.acresc || ''
  const acrescPorcento = duplicataSelecionada?.acrescPorcento || ''
  const pagamento_recebimento = duplicataSelecionada?.data_Pag_Receb || ''


  const formatarValorFinalPorExtenso = (valor: number) => {
    const unidades = ['', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE', 'DEZ', 'ONZE', 'DOZE', 'TREZE', 'QUATORZE', 'QUINZE', 'DEZESSEIS', 'DEZESSETE', 'DEZOITO', 'DEZENOVE'];
    const dezenas = ['', '', 'VINTE', 'TRINTA', 'QUARENTA', 'CINQUENTA', 'SESSENTA', 'SETENTA', 'OITENTA', 'NOVENTA'];
    const centenas = ['', 'CENTO E', 'DUZENTOS', 'TREZENTOS', 'QUATROCENTOS', 'QUINHENTOS', 'SEISCENTOS', 'SETECENTOS', 'OITOCENTOS', 'NOVECENTOS'];
    const milhares = ['', 'MIL', 'MILHÃO', 'BILHÃO', 'TRILHÃO'];


    const [parteInteira, parteDecimal] = valor.toFixed(2).split('.');
    let valorPorExtenso: string[] = [];

    // Parte inteira
    let valorAtual = parseInt(parteInteira, 10);
    let posicao = 0;

    while (valorAtual > 0) {
      let parteAtual = valorAtual % 1000;
      valorAtual = Math.floor(valorAtual / 1000);

      if (parteAtual > 0) {
        let parteAtualPorExtenso = '';

        if (parteAtual >= 100) {
          parteAtualPorExtenso += centenas[Math.floor(parteAtual / 100)] + ' ';
          parteAtual %= 100;
        }

        if (parteAtual >= 20) {
          parteAtualPorExtenso += dezenas[Math.floor(parteAtual / 10)] + ' ';
          parteAtual %= 10;
        }

        if (parteAtual > 0) {
          if (parteAtual >= 10 && parteAtual <= 19) {

            parteAtualPorExtenso += unidades[parteAtual] + ' ';

          } else {
            parteAtualPorExtenso += unidades[parteAtual] + ' ';
          }
        }

        if (posicao === 0) {
          parteAtualPorExtenso += 'REAIS';
        }

        parteAtualPorExtenso += ' ';
        parteAtualPorExtenso += milhares[posicao];
        valorPorExtenso.unshift(parteAtualPorExtenso);
      }

      posicao++;
    }

    // Parte decimal
    if (parteDecimal) {
      valorAtual = parseInt(parteDecimal, 10);

      if (valorAtual >= 20) {
        valorPorExtenso.push(dezenas[Math.floor(valorAtual / 10)] + ' ');
        valorAtual %= 10;
      }

      if (valorAtual > 0) {
        valorPorExtenso.push(unidades[valorAtual] + ' CENTAVOS ');
      }



    }


    if (valorPorExtenso.length === 0) {
      valorPorExtenso.push('ZERO');
    }

    return valorPorExtenso.join(' E ');
  };



  const valorFinalPorExtenso = duplicataSelecionada && typeof duplicataSelecionada.valorFinal === 'number' ? formatarValorFinalPorExtenso(duplicataSelecionada.valorFinal) : '';






  return (
    <div className="flex justify-center p-6 flex-col">
      <div className="flex flex-col items-center">
        <div className="bg-brand-blue-500 w-full h-12"></div>
        <h1 className="font-bold text-4xl text-brand-blue-500 mb-7 mt-4">RECIBO DIGITAL</h1>
        <div className="w-full flex justify-end -mt-16 ">
          <img src={LogoSemFundoAzul} alt="" width={100} />
        </div>
      </div>


      <div className="flex justify-center gap-10">
        {/* Dados da empresa */}
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-bold text-xl text-brand-blue-500 mb-3 ">{tipoPag ? "PAGADOR" : "RECEBEDOR"}</h1>
          <div className="flex flex-col items-start">
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">EMPRESA:</h1>
              <p className="w-full font-semibold text-gray-500 text-sm">{empresaSelecionada?.empresaNome.toUpperCase()}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">CNPJ/CPF:</h1>
              <p className="font-semibold text-gray-500 text-sm">{empresaSelecionada?.cnpj_cpf}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">ENDEREÇO:</h1>
              <p className="font-semibold text-gray-500 text-sm">{empresaSelecionada?.endereco.toUpperCase()}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">BAIRRO:</h1>
              <p className="font-semibold text-gray-500 text-sm">{empresaSelecionada?.bairro.toUpperCase()}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">CIDADE:</h1>
              <p className="font-semibold text-gray-500 text-sm">{empresaSelecionada?.cidade.toUpperCase()}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">UF:</h1>
              <p className="font-semibold text-gray-500 text-sm">{empresaSelecionada?.uf}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">CEP:</h1>
              <p className="font-semibold text-gray-500 text-sm">{empresaSelecionada?.cep}</p>
            </div>
          </div>
        </div>


        {/* Dados do Cliente */}
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-bold text-xl text-brand-blue-500 mb-3 ">DOCUMENTO</h1>
          <div className="flex flex-col justify-start items-start">
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">PESSOA:</h1>
              <p className="font-semibold text-gray-500 text-sm">{duplicataSelecionada?.pessoaRef.toUpperCase()}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">RESPONSÁVEL:</h1>
              <p className="font-semibold text-gray-500 text-sm">{duplicataSelecionada?.responsavel.toUpperCase()}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">VENCIMENTO:</h1>
              <p className="font-semibold text-gray-500 text-sm">{duplicataSelecionada ? format(new Date(duplicataSelecionada.vencimento), 'dd/MM/yyyy') : 'Data não disponível'}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">{tipoPag ? "PAGAMENTO:" : "RECEBIMENTO:"}</h1>
              <p className="font-semibold text-gray-500 text-sm">{duplicataSelecionada?.data_Pag_Receb ? format(new Date(duplicataSelecionada.data_Pag_Receb), 'dd/MM/yyyy') : 'PENDENTE'}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">VALOR LIQUIDO:</h1>
              <p className="font-semibold text-gray-500 text-sm">R${duplicataSelecionada?.valorLiq.toFixed(2).toString()}</p>
            </div>
            {desconto && (
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-bold text-base">DESCONTO:</h1>
                <p className="font-semibold text-gray-500 text-sm">R${duplicataSelecionada?.desconto.toFixed(2).toString()}</p>
              </div>
            )}
            {descontoPorcento && (
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-bold text-base">DESCONTO:</h1>
                <p className="font-semibold text-gray-500 text-sm">%{duplicataSelecionada?.descontoPorcento.toString()}</p>
              </div>
            )}
            {acresc && (
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-bold text-base">ACRESCIMO:</h1>
                <p className="font-semibold text-gray-500 text-sm">R${duplicataSelecionada?.acresc.toString()}</p>
              </div>
            )}
            {acrescPorcento && (
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-bold text-base">ACRESCIMO:</h1>
                <p className="font-semibold text-gray-500 text-sm">%{duplicataSelecionada?.acrescPorcento.toString()}</p>
              </div>
            )}
            <div className="flex gap-2 justify-center items-center outline-dashed p-2">
              <h1 className="font-bold text-xl">VALOR TOTAL:</h1>
              <p className="font-semibold text-brand-blue-500 text-xl "> {duplicataSelecionada?.valorFinal.toFixed(2).toString()}</p>
            </div>

          </div>
        </div>
      </div>


      {pagamento_recebimento && tipoPag && (
        <div className="flex justify-center items-center full mt-10">
          <h1 className="font-bold text-base text-brand-blue-500 ">Eu {duplicataSelecionada?.responsavel} declaro o recebimento  da quantia de {valorFinalPorExtenso} no dia {duplicataSelecionada ? format(new Date(duplicataSelecionada.data_Pag_Receb), 'dd/MM/yyyy') : 'Data não disponível'}, referete a competencia de {duplicataSelecionada?.descricao.toString()} pela empresa {empresaSelecionada?.empresaNome} portadora do CNPJ/CPF {empresaSelecionada?.cnpj_cpf}</h1>
        </div>
      )}

      {pagamento_recebimento && !tipoPag && (
        <div className="flex justify-center items-center full mt-10">
          <h1 className="font-bold text-base text-brand-blue-500 ">Nos da empresa {empresaSelecionada?.empresaNome}  portadora do CNPJ/CPF  {empresaSelecionada?.cnpj_cpf} declaramos o recebimento da quantia de {valorFinalPorExtenso} na data do dia {duplicataSelecionada ? format(new Date(duplicataSelecionada.data_Pag_Receb), 'dd/MM/yyyy') : 'Data não disponível'}, referente a competencia de {duplicataSelecionada?.descricao.toString()}</h1>
        </div>
      )}

      {!pagamento_recebimento && tipoPag && (
        <div className="flex justify-center items-center full mt-10">
          <h1 className="font-bold text-base text-brand-blue-500 ">Nos da empresa {empresaSelecionada?.empresaNome}  portadora do CNPJ/CPF  {empresaSelecionada?.cnpj_cpf} declaramos ter ciência da responsabilidade de arcar com o pagamento da quantia de {valorFinalPorExtenso} até a data do dia {duplicataSelecionada ? format(new Date(duplicataSelecionada.vencimento), 'dd/MM/yyyy') : 'Data não disponível'}, referente a competencia de {duplicataSelecionada?.descricao.toString()}. Reiteramos ter ciência de possiveis sanções, multas e juros que podem ser aplicadas sobre a empresa.</h1>
        </div>
      )}

      {!pagamento_recebimento && !tipoPag && (
        <div className="flex justify-center items-center full mt-10">
          <h1 className="font-bold text-base text-brand-blue-500 ">Eu {duplicataSelecionada?.responsavel}  responsável por pela duplicata atribuida à  {duplicataSelecionada?.pessoaRef} declaro ter ciência da responsabilidade de arcar com o pagamento da quantia de {valorFinalPorExtenso} até a data do dia {duplicataSelecionada ? format(new Date(duplicataSelecionada.vencimento), 'dd/MM/yyyy') : 'Data não disponível'}, referente a competencia de {duplicataSelecionada?.descricao.toString()}. Reitero ter ciencenica de possiveis sanções, multas e juros que podem ser aplicadas sobre minha pessoa.</h1>
        </div>
      )}
    </div>
  )
}