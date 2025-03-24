import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext, useAuth } from "../Context/AuthContext";
import { LoadingFullscreen } from "../components/LoadingFull/LoadingFullscreen";
import SidebarForm from "../components/Sidebar/Componentes/SidebarForm";
import {
  LayoutDashboard,
  ShoppingBasket,
  PackageSearch,
  Receipt,
  MessageCircleMore,
} from "lucide-react";
import { SidebarItem } from "../components/Sidebar/Componentes/SidebarItem";
import { useContext } from "react";




export function AuthenticatedMasterLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();
  
  const { user } = useContext(AuthContext)

  const location = useLocation();

  if (!isAuthenticating) {
    return <LoadingFullscreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  

  if (user?.master) {
    return (
      <>
        <div className=" min-h-screen flex bg-slate-200">
          <SidebarForm>
            <SidebarItem
              icon={<LayoutDashboard />}
              text="MASTER"
              url="/dashboard/geral"
              alert
            />
            <SidebarItem
              icon={<LayoutDashboard />}
              text="Dashboards"
              subItems={[
                { text: "Geral", url: "/dashboard/geral" },
                { text: "Vendas", url: "/dashboard/vendas" },
                { text: "Duplicatas", url: "/dashboard/duplicatas" },
              ]}
              alert
            />
            <SidebarItem
              icon={<PackageSearch />}
              text="Estoque"
              subItems={[
                { text: "Categorias", url: "/categorias" },
                { text: "Produtos", url: "/produtos" },
                { text: "Movimentações", url: "/movimentacoes" },
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
            <SidebarItem
              icon={<MessageCircleMore />}
              text="Atendimentos"
              url="/atendimentos"
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
  }
  