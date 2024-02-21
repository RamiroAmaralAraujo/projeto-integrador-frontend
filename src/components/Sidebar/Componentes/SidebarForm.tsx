import { ReactNode, useContext, createContext, useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical, UserRound } from "lucide-react";
import LogoSemFundoAzul from "../../../assets/LogoSemFundoAzul.svg"



interface SidebarProps {
  children: ReactNode;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

export default function SidebarForm({ children }: SidebarProps) {



  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div className="flex gap-4">
        <aside className={`h-screen shadow-2xl shadow-base-background ${expanded ? "w-60" : "w-20"}`}>
          <nav className="h-full flex flex-col bg-white border-r gap-4">

            <div className="p-4 pb-14 flex justify-center items-center flex-col">
              <img
                src={LogoSemFundoAzul}
                className={`overflow-hidden transition-all ${expanded ? "w-14" : "w-10"}`}
                alt=""
              />
              <div className={`flex gap-1 text-brand-blue-500 justify-center items-center  ${expanded ? "w-20" : "hidden"}`}>
                <span className="font-bold">Core</span>
                <span className="font-semibold">Commerce</span>
              </div>

            </div>



            <SidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-3 ">{children}</ul>
            </SidebarContext.Provider>

            <button>
              <div className={`border-t flex w-full justify-center p-3 hover:bg-gray-200 ${expanded ? "justify-center items-center" : ""}`}>
                <div className="w-10 h-10 p-3 rounded-full bg-brand-blue-500 text-white flex items-center justify-center">
                  <UserRound />
                </div>
                <div
                  className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
                >
                  <div className="leading-4">
                    <h4 className="font-semibold">Ramiro Araujo</h4>
                    <span className="text-xs text-gray-600">ramiro.zello@hotmail.com</span>
                  </div>
                  <MoreVertical size={20} />
                </div>
              </div>
            </button>
          </nav >
        </aside >
        <div className="flex pt-4 pb-6 justify-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 w-10 h-10 rounded-full bg-brand-blue-200 hover:bg-brand-blue-400 text-brand-blue-300"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </div>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        gap-1 mb-2 relative flex items-center py-2 px-3 my-1 font-medium rounded-xl cursor-pointer transition-colors group justify-center 
        ${active ? "bg-brand-blue-400 text-brand-blue-200 " : " bg-brand-blue-200 text-brand-blue-400"}
      `}
    >
      {icon}
      <span className={`overflow-hidden transition-all flex justify-between ${expanded ? "w-60 ml-3 " : "w-0"}`}>{text}</span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded-full bg-brand-blue-200 ${expanded ? "" : "top-2"}`} />
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-xl px-2 py-1 ml-6 bg-brand-blue-100 text-brand-blue-500 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  );
}
