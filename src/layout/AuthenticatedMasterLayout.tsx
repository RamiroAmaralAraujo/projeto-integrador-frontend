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
  Building,
  UsersRound,
  Ticket,
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
        <div className="h-screen flex bg-slate-200 overflow-hidden">
          <SidebarForm>
            <div>
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
            </div>
            <div className="mt-5 mb-5 border border-brand-blue-100 rounded-full"></div>
            <div>
              <SidebarItem 
                id="Geral"
                icon={<UsersRound />}
                text="Usuários"
                url="/usuarios"
                alert
              />
              <SidebarItem 
                id="Geral"
                icon={<Building />}
                text="Empresas"
                url="/empresas"
                alert
              />
              <div>
              <SidebarItem 
                id="Geral"
                icon={<Ticket />}
                text="Tickets"
                url="/tickets"
                alert
              />
              </div>
              <SidebarItem 
                id="Geral"
                icon={<MessageCircleMore />}
                text="Ominichannel"
                subItems={[
                  { text: "Atendimentos", url: "/ominichannel/atendimentos" },
                  { text: "Chat", url: "/ominichannel/chat" },
                ]}
                alert
              />
              <SidebarItem
                id="Geral"
                icon={<LayoutDashboard />}
                text="Monitoramento"
                subItems={[
                  { text: "Ominichannel", url: "/dashboard/atendimentos" },
                ]}
                alert
              />
            </div>
          </SidebarForm>
          <div className="flex-1 overflow-y-auto p-4  w-full">
            <Outlet />
          </div>
        </div>
      </>
    );
    }
  }
  