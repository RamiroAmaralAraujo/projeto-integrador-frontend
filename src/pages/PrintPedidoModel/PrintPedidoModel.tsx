import { AuthContext } from "@/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import LogoSemFundoBranco from "../../assets/LogoSemFundoBranco.svg";

import { usePedidos, PedidosData } from "../../hook/queries/usePedidos";
import { useProdutos } from "../../hook/queries/useProdutos";

export default function PrintPedidomodel() {
  const { empresaSelecionada, pedidoSelecionado } = useContext(AuthContext);
  const { useRead: useReadPedidos } = usePedidos();
  const { useRead: useReadProdutos } = useProdutos();
  const { data: pedidos, isLoading, error } = useReadPedidos();
  const { data: produtos } = useReadProdutos();
  const [pedido, setPedido] = useState<PedidosData | null>(null);
  const [isPrintReady, setIsPrintReady] = useState(false); // Novo estado

  // Função para obter o nome do produto pelo ID
  const getProdutoNome = (produtoId: string) => {
    const produto = produtos?.find((cat) => cat.id === produtoId);
    return produto ? produto.nome : "Produto não encontrado";
  };

  // Atualiza o estado do pedido baseado no contexto e na lista de pedidos
  useEffect(() => {
    if (pedidos && pedidos.length > 0 && pedidoSelecionado) {
      const pedidoEncontrado = pedidos.find(
        (p) => p.id === pedidoSelecionado.id
      );
      setPedido(pedidoEncontrado || null);
    }
  }, [pedidos, pedidoSelecionado]);

  // Garante que a impressão só ocorre quando tudo está pronto
  useEffect(() => {
    if (empresaSelecionada && pedidoSelecionado && pedido) {
      setIsPrintReady(true);
    }
  }, [empresaSelecionada, pedidoSelecionado, pedido]);

  // Chama a impressão assim que a página estiver pronta
  useEffect(() => {
    if (isPrintReady) {
      window.print();
    }
  }, [isPrintReady]);

  if (isLoading) {
    return <p>Carregando pedidos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar pedidos. Tente novamente mais tarde.</p>;
  }

  if (!pedido) {
    return <p>Nenhum pedido correspondente foi encontrado.</p>;
  }

  const dateValue = new Date(pedidoSelecionado?.data || "");
  const formattedDate = dateValue.toLocaleDateString("pt-BR");

  return (
    <div className="flex justify-center p-6 flex-col print:absolute">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center">
        <div className="bg-brand-blue-500 w-full h-12"></div>
        <h1 className="font-bold text-4xl text-brand-blue-500 mb-14 mt-4">
          PEDIDO DIGITAL
        </h1>
        <div className="w-full flex justify-end -mt-16">
          <img
            src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${empresaSelecionada?.logo_url}`}
            alt="Logo da Empresa"
            width={100}
          />
        </div>
      </div>

      <div className="flex justify-center gap-10 mt-16">
        {/* Dados da empresa */}
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-col items-start">
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">EMPRESA:</h1>
              <p className="w-full font-semibold text-gray-500 text-sm">
                {empresaSelecionada?.empresaNome.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">CNPJ/CPF:</h1>
              <p className="font-semibold text-gray-500 text-sm">
                {empresaSelecionada?.cnpj_cpf}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">ENDEREÇO:</h1>
              <p className="font-semibold text-gray-500 text-sm">
                {empresaSelecionada?.endereco.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">BAIRRO:</h1>
              <p className="font-semibold text-gray-500 text-sm">
                {empresaSelecionada?.bairro.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">CIDADE:</h1>
              <p className="font-semibold text-gray-500 text-sm">
                {empresaSelecionada?.cidade.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">UF:</h1>
              <p className="font-semibold text-gray-500 text-sm">
                {empresaSelecionada?.uf.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="font-bold text-base">CEP:</h1>
              <p className="font-semibold text-gray-500 text-sm">
                {empresaSelecionada?.cep}
              </p>
            </div>
          </div>
        </div>

        {/* Dados do Pedido */}
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-bold text-xl text-brand-blue-500 mb-3">
            {`PEDIDO #${pedidoSelecionado?.idPedido}`}
          </h1>

          <div className="flex gap-2 justify-center items-center">
            <h1 className="font-bold text-base">TIPO:</h1>
            <p className="font-semibold text-gray-500 text-sm">
              {pedidoSelecionado?.tipo}
            </p>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <h1 className="font-bold text-base">OBSERVAÇÃO:</h1>
            <p className="font-semibold text-gray-500 text-sm">
              {pedidoSelecionado?.observacao}
            </p>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <h1 className="font-bold text-base">DATA:</h1>
            <p className="font-semibold text-gray-500 text-sm">
              {formattedDate}
            </p>
          </div>

          <h2 className="font-bold text-base mt-4">PRODUTOS:</h2>
          <div className="flex flex-col w-full gap-2">
            {pedido.produtos?.length > 0 ? (
              pedido.produtos.map((produto, index) => (
                <div
                  key={index}
                  className="flex justify-between w-full border-b pb-2 mb-2 gap-2"
                >
                  <span className="font-semibold text-sm text-gray-500">
                    Produto: {getProdutoNome(produto.produtoId)}
                  </span>
                  <span className="text-gray-500 text-sm">|</span>
                  <span className="font-semibold text-sm text-gray-500">
                    Quantidade: {produto.quantidade} 
                  </span>
                </div>
              ))
            ) : (
              <p>Este pedido não contém produtos.</p>
            )}
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer>
        <div className="w-full p-2 mt-16 bg-brand-blue-500 flex justify-center items-center">
          <div>
            <img src={LogoSemFundoBranco} alt="Logo da Empresa" width={40} />
          </div>
        </div>
      </footer>
    </div>
  );
}
