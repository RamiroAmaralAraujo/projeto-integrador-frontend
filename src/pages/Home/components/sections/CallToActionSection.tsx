import React from "react";

const CallToActionSection: React.FC = () => {
  return (
    <section id="contact" className="section bg-primary-50">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl p-8 md:p-12 shadow-xl text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Pronto para transformar seu negócio?
          </h2>
          <p className="max-w-3xl mx-auto text-primary-100 text-lg mb-8 animate-on-scroll">
            Entre em contato conosco hoje mesmo e descubra como a CoreCommerce
            pode ajudar sua empresa a crescer com nossas soluções de automação
            comercial.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center animate-on-scroll">
            <a
              href="https://wa.me/5522992081232?text=Olá!%20Gostaria%20de%20agendar%20uma%20demonstração%20do%20sistema%20CoreCommerce%20para%20entender%20melhor%20as%20funcionalidades."
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-primary-900 hover:bg-gray-100"
            >
              Agendar demonstração
            </a>
            <a
              href="https://wa.me/5522992081232?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20CoreCommerce%20para%20tirar%20algumas%20dúvidas."
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-transparent border border-white hover:bg-white/10"
            >
              Falar com um consultor
            </a>
          </div>
        </div>

        {/* Seção única de Perguntas Frequentes centralizada */}
        <div className="mt-20 max-w-3xl mx-auto animate-on-scroll">
          <h3 className="text-2xl font-semibold text-primary-900 mb-6 text-center">
            Perguntas frequentes
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-primary-900 mb-2">
                Como funciona a integração com meus canais atuais?
              </h4>
              <p className="text-gray-600">
                Nossa plataforma se conecta facilmente com WhatsApp, Instagram,
                Telegram e outros canais, centralizando todas as interações em
                uma única interface.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-primary-900 mb-2">
                Quanto tempo leva para implementar o sistema?
              </h4>
              <p className="text-gray-600">
                A implementação básica pode ser concluída em apenas 48 horas,
                com personalizações adicionais conforme a necessidade do seu
                negócio.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-primary-900 mb-2">
                Vocês oferecem suporte técnico?
              </h4>
              <p className="text-gray-600">
                Sim, oferecemos suporte técnico por chat, e-mail e telefone em
                horário comercial, com planos premium para suporte 24/7.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-primary-900 mb-2">
                É possível personalizar a solução para meu negócio?
              </h4>
              <p className="text-gray-600">
                Absolutamente! Nossas soluções são modulares e podem ser
                adaptadas às necessidades específicas do seu negócio,
                independente do segmento ou tamanho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
