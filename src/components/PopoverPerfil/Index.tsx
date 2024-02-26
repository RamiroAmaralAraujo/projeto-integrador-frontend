
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { PopoverPerfilForm } from "./componentes/PopoverPerfilForm";
import { PopoverPerfilItens } from "./componentes/PopoverPerfilItens";
import { LogOut, UserRoundCog, Store } from 'lucide-react';

export function PopoverPerfil() {

  const { signOut } = useContext(AuthContext);

  function handleLogout() {
    signOut()
  }

  return (
    <>
      <PopoverPerfilForm >
        <PopoverPerfilItens text="Empresas" icon={<Store />} />
        <PopoverPerfilItens text="Configurações" icon={<UserRoundCog />} />
        <PopoverPerfilItens text="Logout" icon={<LogOut />} action={handleLogout} />
      </PopoverPerfilForm>
    </>
  )
}