import { UserRound } from "lucide-react";

import { useContext, useState } from "react";
import { SidebarContext } from "../../Sidebar/Componentes/SidebarForm";
import { AuthContext } from "../../../Context/AuthContext";
import { useReadUsuario } from "@/hook/queries/useUsuarios";

export function PopoverPerfilForm({ children }: { children: React.ReactNode }) {

  const { user } = useContext(AuthContext)
  const userId = user?.sub ?? "";

  const { data: userData} = useReadUsuario(userId);



  const { expanded } = useContext(SidebarContext);



  const [dropdownOpen, setDropdownOpen] = useState(false);



  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <>
      <div className={`relative `} >
        <button onClick={toggleDropdown} className="w-full">
          <div className={`border-t flex  justify-center  p-3 hover:bg-gray-200 shadow-md ${expanded ? "justify-center items-center" : ""}`}>
            <div className="w-10 h-10 p-3 rounded-full bg-brand-blue-500 text-white flex items-center justify-center">
              <UserRound />
            </div>
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 "}`}>
              <div className="leading-4">
                <h4 className="font-semibold">{userData?.userName}</h4>
                <span className="text-xs text-gray-600">{userData?.email}</span>
              </div>
            </div>
          </div>
        </button>
        {dropdownOpen && (
          <div className=" w-full flex items-center justify-center absolute right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-md z-10 bottom-full">
            <div className="py-1 w-full flex flex-col p-2">
              {children}
            </div>
          </div>
        )}
      </div >
    </>
  )
}
