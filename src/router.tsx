import { createBrowserRouter } from 'react-router-dom'

import { AuthProvider } from './Context/AuthContext'
import { UnauthenticatedLayout } from './layout/UnauthenticatedLayout'
import { AuthenticatedLayout } from './layout/AuthenticatedLayout'
import { Dashboard } from './pages/Dashboard/dashboard'
import { Login } from './pages/login/login'
import { CadastroUsuario } from './pages/cadastroUsuario/cadastroUsuario'
import { Produtos } from './pages/Produtos/Produtos'
import { Pedidos } from './pages/Pedidos/pedidos'
import { Pagaveis } from './pages/Pagaveis/pagaveis'
import { Recebiveis } from './pages/Recebiveis/Recebiveis'
import { NotFound } from './pages/NotFound/NotFound'


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
        path: '/produtos',
        element: <Produtos />
      },
      {
        path: '/pedidos',
        element: <Pedidos />
      },
      {
        path: '/pagaveis',
        element: <Pagaveis />
      },
      {
        path: '/recebiveis',
        element: <Recebiveis />
      },
    ],
  },
])
