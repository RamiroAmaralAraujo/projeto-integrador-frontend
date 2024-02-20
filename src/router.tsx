import { createBrowserRouter } from 'react-router-dom'

import { AuthProvider } from './Context/AuthContext'
import { UnauthenticatedLayout } from './layout/UnauthenticatedLayout'
import { AuthenticatedLayout } from './layout/AuthenticatedLayout'
import { Dashboard } from './pages/Dashboard/dashboard'
import { Login } from './pages/login/login'
import { CadastroUsuario } from './pages/cadastroUsuario/cadastroUsuario'

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
        element: <h1>Page Not Found</h1>,
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
        <AuthenticatedLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
    ],
  },
])
