import React, { useState } from 'react';
import BlocoPlanos from '../BlocoPlanos';

const PaginaPlanos: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('Mensal');

  const plans = {
    Mensal: [
      {
        titulo: 'Básico',
        desconto: '0',
        preco: '100',
        tempo: 'mês',
        equivalente: '100',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Simples',
          'Controle de Estoque Básico',
          'Controle Financeiro Básico',
        ],
        recursosNaoInclusos: [
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '1 usuário',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '0',
        preco: '200',
        tempo: 'mês',
        equivalente: '200',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Intermediário',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
        ],
        recursosNaoInclusos: [
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '15 usuários',
          '360 MB de dados',
          '9 GB de arquivos',
          '1200 importações de pedidos em marketplaces por semestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Avançado',
        desconto: '0',
        preco: '300',
        tempo: 'mês',
        equivalente: '300',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Completo',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        recursosNaoInclusos: [

        ],
        especificacoes: [
          '50 usuários',
          '720 MB de dados',
          '18 GB de arquivos',
          '2400 importações de pedidos em marketplaces por ano'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
    ],
    Trimestral: [
      {
        titulo: 'Básico',
        desconto: '5',
        preco: '285',
        tempo: 'trimestre',
        equivalente: '95',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Simples',
          'Controle de Estoque Básico',
          'Controle Financeiro Básico',
        ],
        recursosNaoInclusos: [
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '1 usuário',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '5',
        preco: '570',
        tempo: 'trimestre',
        equivalente: '190',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Intermediário',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
        ],
        recursosNaoInclusos: [
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '15 usuários',
          '360 MB de dados',
          '9 GB de arquivos',
          '1200 importações de pedidos em marketplaces por semestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Avançado',
        desconto: '5',
        preco: '855',
        tempo: 'trimetre',
        equivalente: '285',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Completo',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        recursosNaoInclusos: [

        ],
        especificacoes: [
          '50 usuários',
          '720 MB de dados',
          '18 GB de arquivos',
          '2400 importações de pedidos em marketplaces por ano'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
    ],
    Semestral: [
      {
        titulo: 'Básico',
        desconto: '10',
        preco: '540',
        tempo: 'semestre',
        equivalente: '90',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Simples',
          'Controle de Estoque Básico',
          'Controle Financeiro Básico',
        ],
        recursosNaoInclusos: [
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '1 usuário',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '10',
        preco: '1080',
        tempo: 'semestre',
        equivalente: '180',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Intermediário',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
        ],
        recursosNaoInclusos: [
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '15 usuários',
          '360 MB de dados',
          '9 GB de arquivos',
          '1200 importações de pedidos em marketplaces por semestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Avançado',
        desconto: '10',
        preco: '1620',
        tempo: 'semestre',
        equivalente: '270',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Completo',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        recursosNaoInclusos: [

        ],
        especificacoes: [
          '50 usuários',
          '720 MB de dados',
          '18 GB de arquivos',
          '2400 importações de pedidos em marketplaces por ano'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
    ],
    Anual: [
      {
        titulo: 'Básico',
        desconto: '15',
        preco: '1020',
        tempo: 'ano',
        equivalente: '85',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Simples',
          'Controle de Estoque Básico',
          'Controle Financeiro Básico',
        ],
        recursosNaoInclusos: [
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '1 usuário',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '15',
        preco: '2040',
        tempo: 'ano',
        equivalente: '170',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Intermediário',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
        ],
        recursosNaoInclusos: [
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        especificacoes: [
          '15 usuários',
          '360 MB de dados',
          '9 GB de arquivos',
          '1200 importações de pedidos em marketplaces por semestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Avançado',
        desconto: '15',
        preco: '2940',
        tempo: 'ano',
        equivalente: '245',
        recursosInclusos: [
          'Cadastro de Produtos',
          'Registro de Vendas',
          'Relatórios Avançados',
          'Controle de Estoque Avançado',
          'Controle Financeiro Completo',
          'Gestão de Clientes (CRM)',
          'Múltiplos Usuários',
          'Integração com e-commerce',
          'Automação de Marketing',
          'Analytics Avançado',
          'Personalização de Interface',
          'Integração com ERP',
        ],
        recursosNaoInclusos: [

        ],
        especificacoes: [
          '50 usuários',
          '720 MB de dados',
          '18 GB de arquivos',
          '2400 importações de pedidos em marketplaces por ano'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
    ]
  };

  const handlePlanChange = (planType: string) => {
    setSelectedPlan(planType);
  };

  return (
    <div className="w-full flex flex-col items-center md:p-4">
      <div className="flex flex-wrap justify-center space-x-1 md:space-x-4 md:space-y-0 mb-8">
        {['Mensal', 'Trimestral', 'Semestral', 'Anual'].map((planType) => (
          <button
            key={planType}
            className={`px-4 py-2 rounded-full ${selectedPlan === planType ? 'bg-brand-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handlePlanChange(planType)}
          >
            {planType}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col md:flex-row md:flex-wrap md:space-x-10 space-y-4 md:space-y-0 justify-center mb-20">
        {plans[selectedPlan as keyof typeof plans].map((plan, index) => (
          <BlocoPlanos
            key={index}
            titulo={plan.titulo}
            desconto={plan.desconto}
            preco={plan.preco}
            tempo={plan.tempo}
            equivalente={plan.equivalente}
            recursosInclusos={plan.recursosInclusos}
            recursosNaoInclusos={plan.recursosNaoInclusos}
            especificacoes={plan.especificacoes}
            suporte={plan.suporte}
            isFirstBlock={index === 0}
            isMensal={selectedPlan === 'Mensal'}
          />
        ))}
      </div>
    </div>
  );
};

export default PaginaPlanos;
