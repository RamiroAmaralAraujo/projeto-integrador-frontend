import React from 'react';
import { MessageSquare, ShoppingCart, BarChart3, LayoutDashboard } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 animate-on-scroll">
            Sobre a CoreCommerce
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg animate-on-scroll">
            Somos uma empresa de tecnologia especializada em automação comercial e comunicação omnichannel,
            oferecendo soluções completas para micro, pequenas e médias empresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
              alt="CoreCommerce Office" 
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <p className="text-gray-600 mb-8 animate-on-scroll">
              Na CoreCommerce, desenvolvemos ferramentas que simplificam a gestão do seu negócio,
              automatizando processos e integrando canais de comunicação para oferecer a melhor
              experiência aos seus clientes.
            </p>

            <div className="space-y-6">
              <div className="flex animate-on-scroll">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <MessageSquare className="text-primary-700" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">
                    Chatbots Integrados
                  </h3>
                  <p className="text-gray-600">
                    Integração com WhatsApp, Instagram, Telegram e Web para atendimento unificado e eficiente.
                  </p>
                </div>
              </div>

              <div className="flex animate-on-scroll">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <ShoppingCart className="text-primary-700" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">
                    Controle de Pedidos
                  </h3>
                  <p className="text-gray-600">
                    Gerenciamento completo do ciclo de pedidos, desde a criação até a entrega.
                  </p>
                </div>
              </div>

              <div className="flex animate-on-scroll">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <BarChart3 className="text-primary-700" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">
                    Gestão de Estoque
                  </h3>
                  <p className="text-gray-600">
                    Controle de estoque em tempo real, com alertas de reposição e relatórios detalhados.
                  </p>
                </div>
              </div>

              <div className="flex animate-on-scroll">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <LayoutDashboard className="text-primary-700" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">
                    Painel Administrativo
                  </h3>
                  <p className="text-gray-600">
                    Interface intuitiva para gerenciar todos os aspectos do seu negócio em um só lugar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;