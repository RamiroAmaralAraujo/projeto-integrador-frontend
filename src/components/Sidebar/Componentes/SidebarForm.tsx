import { ReactNode, createContext, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoSemFundoAzul from "../../../assets/LogoSemFundoAzul.svg";
import { PopoverPerfil } from "../../PopoverPerfil/Index";

interface SidebarProps {
  children: ReactNode;
}

export const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });


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


            <SidebarContext.Provider value={{ expanded }}>
              <PopoverPerfil />
            </SidebarContext.Provider>



          </nav>
        </aside>
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
