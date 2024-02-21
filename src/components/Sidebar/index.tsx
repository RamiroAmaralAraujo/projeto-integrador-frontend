import SidebarForm, { SidebarItem } from "./Componentes/SidebarForm";
import { LayoutDashboard, ShoppingBasket, PackageSearch, Receipt, HandCoins } from 'lucide-react';


export function Sidebar() {
  return (
    <SidebarForm>
      <SidebarItem icon={<LayoutDashboard />} text="Dashboard" active alert />
      <SidebarItem icon={<PackageSearch />} text="Produtos" />
      <SidebarItem icon={<ShoppingBasket />} text="Pedidos" />
      <SidebarItem icon={<Receipt />} text="Pagaveis" />
      <SidebarItem icon={<HandCoins />} text="Recebiveis" />

    </SidebarForm>
  )
}