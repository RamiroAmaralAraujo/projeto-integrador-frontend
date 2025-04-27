import { Page } from "@/components/Page";

import { SelectEmpresaButton } from "@/components/SelectEmpresaButton/SelectEmpresaButton";

import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { CardPendentes } from "../DashboardDuplicatas/Components/CardPendentes";
import { CardRecebidas } from "../DashboardDuplicatas/Components/CardRecebidas";
import { CardPagos } from "../DashboardDuplicatas/Components/CardPagos";
import { CardBalanco } from "../DashboardDuplicatas/Components/CardBalanco";
import { useNavigate } from "react-router-dom";
import { Notificacao } from "@/components/Notificacao/Index";




export function DashboardGeral() {
  const { empresaSelecionada } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard Geral" />
        <div className="flex justify-end items-center">
            <Notificacao />
            <SelectEmpresaButton />
          </div>
      </Page.Header>

      
        <div className={empresaSelecionada ? "cursor-pointer" : "opacity-45"}>
          <div className="mt-10  " onClick={() => navigate('/dashboard/duplicatas')}>
            <h3 className="text-xl font-bold text-brand-blue-500">Financeiro</h3>
            <div className="flex gap-4 mr-14 mt-4 hover:opacity-75">
              <CardPendentes />
              <CardRecebidas />
              <CardPagos />
              <CardBalanco />
            </div>
          </div>
          <div className="mt-10">
          <h3 className="text-xl font-bold text-brand-blue-500">Pedidos</h3>
            <div className="flex gap-4 mr-14 mt-4 hover:opacity-75">
              <CardPendentes />
              <CardRecebidas />
              <CardPagos />
              <CardBalanco />
            </div>
          </div>
        </div>
    </Page.Root>
  );
}
