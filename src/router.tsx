import { createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./Context/AuthContext";
import { UnauthenticatedLayout } from "./layout/UnauthenticatedLayout";
import { AuthenticatedLayout } from "./layout/AuthenticatedLayout";
import { DashboardDuplicatas } from "./pages/DashboardDuplicatas/dashboard";
import { Login } from "./pages/login/login";
import { CadastroUsuario } from "./pages/cadastroUsuario/cadastroUsuario";
import TermosDeUso from "./pages/termosDeUso/termosDeUso";
import { Site } from "./pages/Site/site";
import { PlanoSistemaPDV } from "./pages/PlanoSistemaPDV/planoSistemaPDV";
import PoliticaDePrivacidade from "./pages/politicaDePrivacidade/politicaDePrivacidade";
import { Produtos } from "./pages/Produtos/Index";
import { Categorias } from "./pages/Categorias/Index";
import { Pedidos } from "./pages/Pedidos/index";
import { Movimentacoes } from "./pages/Movimentacoes/index";
import { NotFound } from "./pages/NotFound/NotFound";
import { Empresas } from "./pages/Empresas/Index";
import { Configuracoes } from "./pages/Configuracoes";
import { Finaceiro } from "./pages/Pagaveis";
import { LoadingFullscreen } from "./components/LoadingFull/LoadingFullscreen";
import PrintDuplicatamodel from "./pages/PrintDuplicataModel/PrintDuplicataModel";
import { PrintLayout } from "./layout/PrintLayout";
import PrintPedidomodel from "./pages/PrintPedidoModel/PrintPedidoModel";
import { SolucoesSistemaPDV } from "./pages/SolucoesSistemaPDV";
import { Atendimentos } from "./pages/Atendimentos/Index";
import { AuthenticatedMasterLayout } from "./layout/AuthenticatedMasterLayout";
import { Usuarios } from "./pages/Usuarios/Index";
import { DashboardAtendimentos } from "./pages/DashboardAtedimentos/Components/dashboard";
import { ForgotPassword } from "./pages/ForgotPassword/Index";
import { ResetPassword } from "./pages/ResetPassword/Index";
import { Ticket } from "./pages/Ticket";
import { DashboardGeral } from "./pages/DashboardConstruction/dashboard";
import { ChatAtendimentos } from "./pages/ChatAtendimentos";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <PrintLayout></PrintLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: "/printduplicata",
        element: <PrintDuplicatamodel />,
      },
      {
        path: "/printpedido",
        element: <PrintPedidomodel />,
      },
      {
        path: "/termos-de-uso",
        element: <TermosDeUso />,
      },
      {
        path: "/politica-de-privacidade",
        element: <PoliticaDePrivacidade />,
      },
      {
        path: "/",
        element: <Site />,
      },
      {
        path: "/planos/sistema-pdv",
        element: <PlanoSistemaPDV />,
      },
      {
        path: "/solucoes/sistema-pdv",
        element: <SolucoesSistemaPDV />,
      },
    ],
  },
  {
    element: (
      <AuthProvider>
        <UnauthenticatedLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cadastro-usuario",
        element: <CadastroUsuario />,
      },
      {
        path: "/esqueceu-senha",
        element: <ForgotPassword />,
      },
      {
        path: "/redefinir-senha/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: (
      <AuthProvider>
        <AuthenticatedLayout></AuthenticatedLayout>
        <AuthenticatedMasterLayout></AuthenticatedMasterLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: "/dashboard/geral",
        element: <DashboardGeral />,
      },
      {
        path: "/dashboard/duplicatas",
        element: <DashboardDuplicatas />,
      },
      {
        path: "/dashboard/atendimentos",
        element: <DashboardAtendimentos />,
      },
      {
        path: "/loading",
        element: <LoadingFullscreen />,
      },
      {
        path: "/produtos",
        element: <Produtos />,
      },
      {
        path: "/categorias",
        element: <Categorias />,
      },
      {
        path: "/pedidos",
        element: <Pedidos />,
      },
      {
        path: "/movimentacoes",
        element: <Movimentacoes />,
      },
      {
        path: "/financeiro",
        element: <Finaceiro />,
      },
      {
        path: "/empresas",
        element: <Empresas />,
      },
      {
        path: "/tickets",
        element: <Ticket />,
      },
      {
        path: "/configuracoes",
        element: <Configuracoes />,
      },
      {
        path: "/printduplicata",
        element: <PrintDuplicatamodel />,
      },
      {
        path: "/printpedido",
        element: <PrintPedidomodel />,
      },
      {
        path: "/ominichannel/atendimentos",
        element: <Atendimentos />,
      },
      {
        path: "/ominichannel/chat",
        element: <ChatAtendimentos />,
      },
      {
        path: "/usuarios",
        element: <Usuarios />,
      },
    ],
  },
]);
