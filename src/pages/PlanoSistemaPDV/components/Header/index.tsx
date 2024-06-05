export function Header() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col p-6 pt-20">
      <div className="text-4xl md:text-6xl font-bold flex justify-center flex-col items-center mb-6 md:mb-10 gap-2">
        <h1 className="text-center">Cresça seu negócio</h1>
        <h1 className="text-center">com o <span className="text-brand-blue-400">melhor investimento!</span></h1>
      </div>
      <p className="text-xl md:text-3xl text-orange-500 text-center">
        Teste 7 dias grátis sem informar dados de pagamento.
      </p>
    </div>
  );
}
