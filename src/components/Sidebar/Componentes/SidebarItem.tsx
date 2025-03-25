import { ReactNode, useContext, useState, useEffect } from "react";
import { SidebarContext } from "./SidebarForm";
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "@/Context/AuthContext";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  url?: string;
  alert?: boolean;
  subItems?: { text: string; url: string }[];
}

export function SidebarItem({ icon, text, alert, url, subItems }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const { empresaSelecionada } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const activeLink = location.pathname === url;
  
  const isAnySubItemActive = subItems?.some(subItem => location.pathname === subItem.url);

  const empresaSelected = empresaSelecionada?.id;

  const { user } = useContext(AuthContext)
  const isMaster = user?.master;

  useEffect(() => {
    if (subItems && isAnySubItemActive) {
      setIsPopoverOpen(true);
    }
  }, [location.pathname, subItems, isAnySubItemActive]);

  function handleNavigateTo() {
    if (url) {
      navigate(url);
    }
    if (subItems) {
      setIsPopoverOpen(!isPopoverOpen);
    }
  }

  return (
    <>
      {(empresaSelected || isMaster)&&(
        <li
          className={`
            mb-2 relative flex flex-col items-center py-2 px-3 my-1 font-medium rounded-xl cursor-pointer transition-colors group justify-center hover:bg-brand-blue-300 shadow-md
            ${(activeLink || isAnySubItemActive) ? "bg-brand-blue-400 text-brand-blue-200 " : " bg-brand-blue-200 text-brand-blue-400"} 
          `}
          onClick={handleNavigateTo}
        >
          <div className="flex items-center w-full">
            {icon}
            <span className={`overflow-hidden transition-all flex justify-between ${expanded ? "w-60 ml-3 " : "w-0"}`}>
              {text}
            </span>
            {subItems && (
              isPopoverOpen ? <ChevronUp className="ml-auto" /> : <ChevronDown className="ml-auto" />
            )}
            {alert && (activeLink) && (
              <div className="absolute right-4 w-2 h-2 rounded-full bg-brand-blue-200" />
            )}
          </div>

          {isPopoverOpen && subItems && (
            <ul className={`w-full mt-2 pl-4 transition-all ${expanded ? "block" : "hidden"}`}>
              {subItems.map((subItem, index) => {
                const isSubItemActive = location.pathname === subItem.url;
                return (
                  <li
                    key={index}
                    className={`py-1 cursor-pointer flex items-center transition-colors ${
                      isAnySubItemActive ? "text-brand-blue-200" : "text-brand-blue-400 hover:text-brand-blue-200"
                    }`}
                    onClick={() => navigate(subItem.url)}
                  >
                    {subItem.text}
                    {isSubItemActive && (
                      <div className="absolute right-4 w-2 h-2 rounded-full bg-brand-blue-200" />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      )}

      {(!empresaSelected && !isMaster) && (
        <li
          className={`
            mb-2 relative flex items-center py-2 px-3 my-1 font-medium rounded-xl cursor-not-allowed transition-colors group justify-center shadow-md opacity-45
            ${activeLink ? "bg-gray-400 text-gray-600 " : " bg-gray-200 text-brand-blue-400"} 
          `}
        >
          {icon}
          <span className={`overflow-hidden transition-all flex justify-between ${expanded ? "w-60 ml-3 " : "w-0"}`}>{text}</span>
        </li>
      )}
    </>
  );
}
