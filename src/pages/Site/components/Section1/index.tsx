import image from "./assets/section1site.png";

export function Section1() {
  return (
    <div className="p-6 lg:p-28 pt-20 bg-brand-blue-200 flex md:flex-row flex-col items-center">
      <div className="flex md:justify-end font-semibold justify-center w-full text-center md:text-left">
        <div className="text-2xl md:text-3xl lg:text-4xl w-full lg:w-3/4">
          <h1>Sistema ERP</h1>
          <p className="font-normal text-sm md:text-base mt-4">
          Com o Sistema ERP da CoreCommerce, você tem a solução completa para a gestão eficiente das vendas, do financeiro e do estoque. Nosso sistema oferece funcionalidades robustas que facilitam o controle de vendas, o acompanhamento financeiro e a organização do estoque, tudo em um único lugar. Além disso, você pode contar com integrações que otimizam o processo, garantindo uma experiência ainda mais fluida para o seu negócio.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex md:justify-start justify-center md:w-auto w-full items-center md:ml-32 mt-8 md:mt-0">
          <img
            src={image}
            alt="Imagem"
            width={500}
          />
        </div>
      </div>
    </div>
  );
}
