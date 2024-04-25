import { ReactNode, useContext } from "react";
import { SidebarContext } from "./SidebarForm";
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from "@/Context/AuthContext";



interface SidebarItemProps {
  icon: ReactNode
  text: string;
  url: string;
  alert?: boolean;
}


export function SidebarItem({ icon, text, alert, url }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  const { empresaSelecionada } = useContext(AuthContext)


  const navigate = useNavigate()
  const location = useLocation()

  const activeLink = location.pathname === url

  const empresaSelected = empresaSelecionada?.id

  function handleNavigateTo() {
    navigate(url)
  }

  return (
    <>
      {empresaSelected && (

        <li
          className={`
         mb-2 relative flex items-center py-2 px-3 my-1 font-medium rounded-xl cursor-pointer transition-colors group justify-center hover:bg-brand-blue-300 shadow-md
        ${activeLink ? "bg-brand-blue-400 text-brand-blue-200 " : " bg-brand-blue-200 text-brand-blue-400"} 
      `}
          onClick={handleNavigateTo}
        >
          {icon}
          <span className={`overflow-hidden transition-all flex justify-between ${expanded ? "w-60 ml-3 " : "w-0"}`}>{text}</span>
          {alert && (
            <div className={` ${activeLink ? "absolute right-2 w-2 h-2 rounded-full bg-brand-blue-200" : ""} ${expanded ? "" : "top-2"}`} />
          )}
          {!expanded && (
            <div className={`absolute left-full rounded-xl px-2 py-1 ml-6 bg-brand-blue-500 text-brand-blue-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
              {text}
            </div>
          )}
        </li>

      )}

      {!empresaSelected && (
        <li
          className={`
       mb-2 relative flex items-center py-2 px-3 my-1 font-medium rounded-xl cursor-not-allowed transition-colors group justify-center  shadow-md opacity-45
      ${activeLink ? "bg-gray-400 text-gray-600 " : " bg-gray-200 text-brand-blue-"} 
    `}

        >
          {icon}
          <span className={`overflow-hidden transition-all flex justify-between ${expanded ? "w-60 ml-3 " : "w-0"}`}>{text}</span>
          {alert && (
            <div className={` ${activeLink ? "absolute right-2 w-2 h-2 rounded-full bg-gray-600" : ""} ${expanded ? "" : "top-2"}`} />
          )}
          {!expanded && (
            <div className={`absolute left-full rounded-xl px-2 py-1 ml-6 bg-brand-blue-500 text-brand-blue-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
              {text}
            </div>
          )}
        </li>
      )}
    </>
  );
}
