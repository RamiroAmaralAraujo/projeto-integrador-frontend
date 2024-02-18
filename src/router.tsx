import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { AuthProvider } from "./Context/AuthContext";

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
    path: "/dashboard",
    element: <Dashboard />

  }
])
