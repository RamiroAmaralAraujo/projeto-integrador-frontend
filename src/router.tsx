import { createBrowserRouter } from 'react-router-dom'

import { AuthProvider } from './Context/AuthContext'
import { UnauthenticatedLayout } from './layout/UnauthenticatedLayout'
import { AuthenticatedLayout } from './layout/AuthenticatedLayout'
import { Dashboard } from './pages/Dashboard/dashboard'
import { Login } from './pages/login/login'
import { CadastroUsuario } from './pages/cadastroUsuario/cadastroUsuario'
import { Produtos } from './pages/Produtos/Produtos'
import { Pedidos } from './pages/Pedidos/pedidos'
import { NotFound } from './pages/NotFound/NotFound'
import { Empresas } from './pages/Empresas/Index'
import { Configuracoes } from './pages/Configuracoes/Configuracoes'
import { Finaceiro } from './pages/Pagaveis'
import { LoadingFullscreen } from './components/LoadingFull/LoadingFullscreen'


export const router = createBrowserRouter([
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
        path: '/',
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
        path: '/pedidos',
        element: <Pedidos />
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
    ],
  },
])
