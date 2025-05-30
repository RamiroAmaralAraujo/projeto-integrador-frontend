import React from "react";
import {
  MessageCircle,
  Zap,
  GitMerge,
  HeartHandshake,
  BarChart2,
} from "lucide-react";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <MessageCircle size={36} />,
      title: "Atendimento Centralizado",
      description:
        "Gerencie todas as interações com clientes em uma única plataforma, independente do canal utilizado.",
    },
    {
      icon: <Zap size={36} />,
      title: "Eficiência Operacional",
      description:
        "Automatize processos repetitivos e reduza erros, permitindo que sua equipe foque no que realmente importa.",
    },
    {
      icon: <BarChart2 size={36} />,
      title: "Resultados Visíveis",
      description:
        "Acompanhe o impacto das suas operações com métricas claras e painéis intuitivos em tempo real.",
    },

    {
      icon: <HeartHandshake size={36} />,
      title: "Suporte Humanizado",
      description:
        "Conte com nossa equipe de especialistas para ajudar em qualquer momento que precisar.",
    },
  ];

  return (
    <section id="benefits" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 animate-on-scroll">
            Benefícios da CoreCommerce
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg animate-on-scroll">
            Descubra como nossas soluções podem transformar a maneira como você
            gerencia seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-on-scroll"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-700 rounded-full mb-6 mx-auto">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Nossas soluções são projetadas para empresas que buscam crescimento
            sustentável e melhor relacionamento com seus clientes.
          </p>
          <a href="#contact" className="btn btn-primary">
            Conheça nossas soluções
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
