import React, { useState } from 'react';
import BlocoPlanos from '../BlocoPlanos';

const PaginaPlanos: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('Mensal');

  const plans = {
    Mensal: [
      {
        titulo: 'Free',
        desconto: '0',
        preco: '0',
        tempo: 'mês',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '5 usuários',
          '60 MB de dados',
          '1,5 GB de arquivos',
          '200 importações de pedidos em marketplaces por mês'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Básico',
        desconto: '0',
        preco: '150',
        tempo: 'mês',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '10 usuários',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '0',
        preco: '280',
        tempo: 'mês',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
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
        preco: '500',
        tempo: 'mês',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
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
        desconto: '3',
        preco: '55',
        tempo: 'trimestre',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '5 usuários',
          '60 MB de dados',
          '1,5 GB de arquivos',
          '200 importações de pedidos em marketplaces por mês'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '3',
        preco: '150',
        tempo: 'trimestre',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '10 usuários',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Avançado',
        desconto: '3',
        preco: '280',
        tempo: 'trimestre',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '15 usuários',
          '360 MB de dados',
          '9 GB de arquivos',
          '1200 importações de pedidos em marketplaces por semestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
    ],
    Semestral: [
      {
        titulo: 'Básico',
        desconto: '6',
        preco: '55',
        tempo: 'semestre',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '5 usuários',
          '60 MB de dados',
          '1,5 GB de arquivos',
          '200 importações de pedidos em marketplaces por mês'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '6',
        preco: '150',
        tempo: 'semestre',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '10 usuários',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Avançado',
        desconto: '6',
        preco: '280',
        tempo: 'semestre',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '15 usuários',
          '360 MB de dados',
          '9 GB de arquivos',
          '1200 importações de pedidos em marketplaces por semestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
    ],
    Anual: [
      {
        titulo: 'Básico',
        desconto: '12',
        preco: '55',
        tempo: 'ano',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '5 usuários',
          '60 MB de dados',
          '1,5 GB de arquivos',
          '200 importações de pedidos em marketplaces por mês'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Intermediário',
        desconto: '12',
        preco: '150',
        tempo: 'ano',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '10 usuários',
          '180 MB de dados',
          '4,5 GB de arquivos',
          '600 importações de pedidos em marketplaces por trimestre'
        ],
        suporte: 'Suporte ilimitado e gratuito via telefone, e-mail, chat e ticket'
      },
      {
        titulo: 'Avançado',
        desconto: '12',
        preco: '280',
        tempo: 'ano',
        equivalente: '55',
        recursosInclusos: [
          'Integrações com +250 e-commerces, marketplaces e operadores logísticos',
          'Sincronização de estoque',
          'Atualização automática de pedidos de venda',
          'Emissão de notas fiscais (NF-e, NFC-e e NFS-e)'
        ],
        recursosNaoInclusos: [
          'Impressão de etiqueta',
          'Campos customizáveis de produto',
          'Frente de Caixa (PDV)',
          'Ordens de serviço',
          'Área Meu Contador',
          'Logística reversa',
        ],
        especificacoes: [
          '15 usuários',
          '360 MB de dados',
          '9 GB de arquivos',
          '1200 importações de pedidos em marketplaces por semestre'
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
