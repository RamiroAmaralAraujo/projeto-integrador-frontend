export function Section3() {
  return(
    <div className="p-12 bg-white flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center mb-20 gap-2">
        <h1 className="font-semibold text-4xl">As melhores soluções em um só lugar</h1>
        <p>Você contrata somente as soluções que o seu negócio precisa</p>
      </div>

      <div className="flex justify-center items-start w-full">

        <div className="flex flex-col justify-center items-end w-1/3">
          <div className="flex flex-col justify-center items-center w-4/6">
            <img src="https://via.placeholder.com/150" alt="Imagem1" className="mb-10" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="font-semibold text-xl">Aplicativo para vendas</h1>
              <div className="h-36">
                <p className="text-center">Emita seus pedidos em qualquer lugar, sem internet, com um aplicativo rápido que não trava na frente do cliente</p>
              </div>
            </div>
            <div className="bg-base-background text-white rounded-xl h-10 flex items-center justify-center p-5">
              <p>Conheça o aplicativo para vendas</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/3">
          <div className="flex flex-col justify-center items-center w-4/6">
            <img src="https://via.placeholder.com/150" alt="Imagem2" className="mb-10" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="font-semibold text-xl">ERP</h1>
              <div className="h-36">
                <p className="text-center">Emissão de Notas Fiscais com cálculo automático dos impostos, boletos registrados no seu banco, PDV, integração com marketplaces e intermediadores de pagamento. Gerencie todo seu negócio em uma única plataforma</p>
              </div>
            </div>
            <div className="bg-base-background text-white rounded-xl h-10 flex items-center justify-center p-5">
              <p className="text-center">Conheça o ERP</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start w-1/3">
          <div className="flex flex-col justify-center items-center w-4/6">
            <img src="https://via.placeholder.com/150" alt="Imagem3" className="mb-10" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="font-semibold text-xl">E-commerce</h1>
              <div className="h-36">
                <p className="text-center">Crie sua própria loja virtual ou catálogo online em poucos cliques e venda sem pagar comissões</p>
              </div>
            </div>
            <div className="bg-base-background text-white rounded-xl h-10 flex items-center justify-center p-5">
              <p className="text-center">Conheça o E-commerce</p>
            </div>
          </div>
        </div>

      </div>
        
    </div>
  )
}
