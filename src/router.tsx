import { createBrowserRouter } from 'react-router-dom'

import { AuthProvider } from './Context/AuthContext'
import { UnauthenticatedLayout } from './layout/UnauthenticatedLayout'
import { AuthenticatedLayout } from './layout/AuthenticatedLayout'
import { Dashboard } from './pages/Dashboard/dashboard'
import { Login } from './pages/login/login'
import { CadastroUsuario } from './pages/cadastroUsuario/cadastroUsuario'
import TermosDeUso from './pages/termosDeUso/termosDeUso'
import { Site } from './pages/Site/site'
import { PlanoSistemaPDV } from './pages/PlanoSistemaPDV/planoSistemaPDV'
import PoliticaDePrivacidade from './pages/politicaDePrivacidade/politicaDePrivacidade'
import { Produtos } from './pages/Produtos/Index'
import { Categorias } from './pages/Categorias/Index'
import { Pedidos } from './pages/Pedidos/index'
import { Movimentacoes } from './pages/Movimentacoes/index'
import { NotFound } from './pages/NotFound/NotFound'
import { Empresas } from './pages/Empresas/Index'
import { Configuracoes } from './pages/Configuracoes/Configuracoes'
import { Finaceiro } from './pages/Pagaveis'
import { LoadingFullscreen } from './components/LoadingFull/LoadingFullscreen'
import PrintDuplicatamodel from './pages/PrintDuplicataModel/PrintDuplicataModel'
import { PrintLayout } from './layout/PrintLayout'
import PrintPedidomodel from './pages/PrintPedidoModel/PrintPedidoModel'
import { SolucoesSistemaPDV } from './pages/SolucoesSistemaPDV'


export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <PrintLayout>
        </PrintLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: '/printduplicata',
        element: <PrintDuplicatamodel />
      },
      {
        path: '/printpedido',
        element: <PrintPedidomodel />
      },
      {
        path: '/termos-de-uso',
        element: <TermosDeUso />
      },
      {
        path: '/politica-de-privacidade',
        element: <PoliticaDePrivacidade />
      },
      {
        path: '/',
        element: <Site />
      },
      {
        path: '/planos/sistema-pdv',
        element: <PlanoSistemaPDV />
      },
      {
        path: '/solucoes/sistema-pdv',
        element: <SolucoesSistemaPDV />
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
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/cadastro-usuario',
        element: <CadastroUsuario />
      },
    ],
  },
  {
    element: (
      <AuthProvider>
        <AuthenticatedLayout>
        </AuthenticatedLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/loading',
        element: <LoadingFullscreen />
      },
      {
        path: '/produtos',
        element: <Produtos />
      },
      {
        path: '/categorias',
        element: <Categorias />
      },
      {
        path: '/pedidos',
        element: <Pedidos />
      },
      {
        path: '/movimentacoes',
        element: <Movimentacoes />
      },
      {
        path: '/financeiro',
        element: <Finaceiro />
      },
      {
        path: '/empresas',
        element: <Empresas />
      },
      {
        path: '/configuracoes',
        element: <Configuracoes />
      },
      {
        path: '/printduplicata',
        element: <PrintDuplicatamodel />
      },
      {
        path: '/printpedido',
        element: <PrintPedidomodel />
      },
    ],
  },
])
