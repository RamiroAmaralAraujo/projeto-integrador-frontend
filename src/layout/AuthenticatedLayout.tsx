import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { LoadingFullscreen } from "../components/LoadingFull/LoadingFullscreen";
import SidebarForm from "../components/Sidebar/Componentes/SidebarForm";
import {
  LayoutDashboard,
  ShoppingBasket,
  PackageSearch,
  Receipt,
} from "lucide-react";
import { SidebarItem } from "../components/Sidebar/Componentes/SidebarItem";

export function AuthenticatedLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();

  const location = useLocation();

  if (!isAuthenticating) {
    return <LoadingFullscreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <div className=" min-h-screen flex bg-slate-200">
        <SidebarForm>
          <SidebarItem
            icon={<LayoutDashboard />}
            text="Dashboard"
            url="/dashboard"
            alert
          />
          <SidebarItem
            icon={<PackageSearch />}
            text="Estoque"
            subItems={[
              { text: "Categorias", url: "/categorias" },
              { text: "Produtos", url: "/produtos" },
            ]}
            alert
          />
          <SidebarItem
            icon={<ShoppingBasket />}
            text="Pedidos"
            url="/pedidos"
            alert
          />
          <SidebarItem
            icon={<Receipt />}
            text="Financeiro"
            url="/financeiro"
            alert
          />
        </SidebarForm>
        <div className="max-w-[1440px] m-auto  w-full h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
}
