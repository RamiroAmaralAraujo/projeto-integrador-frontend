import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { AuthProvider } from "./Context/AuthContext";
import { CadastroUsuario } from "./pages/cadastroUsuario/cadastroUsuario";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    )
  },
  {
    path: "/cadastro-usuario",
    element: (<AuthProvider>
      <CadastroUsuario />
    </AuthProvider>)

  },
  {
    path: "/dashboard",
    element: <Dashboard />

  },

])
