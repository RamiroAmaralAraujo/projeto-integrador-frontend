import { ReactNode, useContext, MouseEventHandler } from "react";
import { SidebarContext } from "../../Sidebar/Componentes/SidebarForm";
import { useNavigate, useLocation } from 'react-router-dom'


interface PopoverItensProps {
  icon: ReactNode
  text: string
  action?: MouseEventHandler<HTMLLIElement>
  url: string
}


export function PopoverPerfilItens({ icon, text, action, url }: PopoverItensProps) {

  const navigate = useNavigate()
  const location = useLocation()

  const activeLink = location.pathname === url

  function handleNavigateTo() {
    navigate(url)
  }

  const { expanded } = useContext(SidebarContext);

  return (
    <>
      <li
        className={`gap-1 mb-2 relative flex items-center py-2 px-3 my-1 font-medium rounded-xl cursor-pointer transition-colors group justify-center hover:bg-gray-300 shadow-md ${activeLink ? "bg-brand-blue-400 text-brand-blue-200 " : " bg-gray-200 text-brand-blue-400"}`}
        onClick={action || handleNavigateTo}
      >
        {icon}
        <span className={` overflow-hidden transition-all flex justify-between ${expanded ? "w-60 ml-3 " : "w-0"}`}>{text}</span>

        {!expanded && (
          <div className={`  absolute left-full rounded-xl px-2 py-1 ml-6 bg-brand-blue-500 text-brand-blue-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
            {text}
          </div>
        )}
      </li>
    </>
  )
}