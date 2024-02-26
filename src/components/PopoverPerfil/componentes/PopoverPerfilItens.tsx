import { ReactNode, useContext } from "react";
import { SidebarContext } from "../../Sidebar/Componentes/SidebarForm";


interface PopoverItensProps {
  icon: ReactNode
  text: string;
}


export function PopoverPerfilItens({ icon, text }: PopoverItensProps) {

  const { expanded } = useContext(SidebarContext);

  return (
    <>
      <li
        className={`gap-1 mb-2 relative flex items-center py-2 px-3 my-1 font-medium rounded-xl cursor-pointer transition-colors group justify-center hover:bg-brand-blue-300 shadow-md`}

      >
        {icon}
        <span className={`overflow-hidden transition-all flex justify-between ${expanded ? "w-60 ml-3 " : "w-0"}`}>{text}</span>
        {!expanded && (
          <div className={`  absolute left-full rounded-xl px-2 py-1 ml-6 bg-brand-blue-500 text-brand-blue-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
            {text}
          </div>
        )}
      </li>
    </>
  )
}