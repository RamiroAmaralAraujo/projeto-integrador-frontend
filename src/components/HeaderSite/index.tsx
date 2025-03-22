import { useState } from 'react';
import LogoSemFundoBranco from "../../assets/LogoSemFundoBranco.svg";
import { Link, useNavigate } from 'react-router-dom';
import Popover from "./components/Popover";
import { ChevronDown } from 'lucide-react';

export function HeaderSite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleMenuItemClick = (route: string) => {
    navigate(route);
    setIsMenuOpen(false); // Fechar o menu ao clicar em uma opção
  };

  function paginaInicial() {
    navigate("/");
  }

  const itensSolucoes = [
    { label: "Sistema PDV", onClick: () => handleMenuItemClick("/solucoes/sistema-pdv") },
    // { label: "ERP", onClick: () => handleMenuItemClick("/") },
    // { label: "E-commerce", onClick: () => handleMenuItemClick("/") },
  ];

  const itensPlanosePrecos = [
    { label: "Sistema PDV", onClick: () => handleMenuItemClick("/planos/sistema-pdv") },
    // { label: "ERP", onClick: () => handleMenuItemClick("/") },
    // { label: "E-commerce", onClick: () => handleMenuItemClick("/") },
  ];

  return (
    <div className="fixed w-full bg-base-background h-14 z-10 shadow-xl">

      <div className="flex justify-center gap-10 md:justify-between items-center w-full h-14 px-4 md:px-8">

        <div onClick={paginaInicial} className="flex items-center gap-2 cursor-pointer">
          <img src={LogoSemFundoBranco} alt="Logo" width={30} />
          <p className="hidden md:flex font-semibold text-white text-xl md:text-2xl">Core<span className="font-normal">Commerce</span></p>
        </div>

        <div className="hidden md:flex md:w-auto md:justify-center">
          <Popover menuItems={itensSolucoes}>
            <button className="text-white py-2 px-4 rounded hover:bg-brand-blue-400">
              <p className="flex items-center justify-center">Soluções <ChevronDown size={25} /></p>
            </button>
          </Popover>

          <Popover menuItems={itensPlanosePrecos}>
            <button className="text-white py-2 px-4 rounded hover:bg-brand-blue-400">
              <p className="flex items-center justify-center">Planos e Preços <ChevronDown size={25} /></p>
            </button>
          </Popover>

          <button className="text-white py-2 px-4 rounded hover:bg-brand-blue-400">
            <a className="flex items-center justify-center" href="https://api.whatsapp.com/send?phone=5522992081232" target="_blank">Fale Conosco</a>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-white p-1 pl-3 pr-3 rounded-full flex justify-center hover:bg-gray-100">
            <Link to="/dashboard/geral" className="text-brand-blue-500 font-bold">AREA DO CLIENTE</Link>
          </div>
          <button 
            className="md:hidden text-white py-2 px-4 rounded hover:bg-brand-blue-400" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col justify-center bg-base-background text-white px-4 py-2 space-y-2">
          <Popover menuItems={itensSolucoes}>
            <button className="w-full text-left py-2 border-b border-gray-700">Soluções <ChevronDown className="inline" size={20} /></button>
          </Popover>
          <Popover menuItems={itensPlanosePrecos}>
            <button className="w-full text-left py-2 border-b border-gray-700">Planos e Preços <ChevronDown className="inline" size={20} /></button>
          </Popover>
          <a 
            className="block py-2 border-b border-gray-700" 
            href="https://api.whatsapp.com/send?phone=5522992081232" 
            target="_blank" 
            onClick={() => setIsMenuOpen(false)}
          >
            Fale Conosco
          </a>
        </div>
      )}

    </div>
  );
}
