import LogoSemFundoBranco from "../../assets/LogoSemFundoBranco.svg"
import { Link, useNavigate } from 'react-router-dom';
import Popover from "./components/Popover";
import { ChevronDown } from 'lucide-react';

export function HeaderSite() {

  const navigate = useNavigate();
  
  const handleMenuItemClick = (route: string) => {
    navigate(route);
  };

  function paginaInicial() {
    navigate("/");
  }
  
  const itensSolucoes = [
    { label: "Sistema PDV", onClick: () => handleMenuItemClick("/solucoes/sistema-pdv") },
    //{ label: "ERP", onClick: () => handleMenuItemClick("/") },
    // { label: "E-commerce", onClick: () => handleMenuItemClick("/") },
  ];
  const itensPlanosePrecos = [
    { label: "Sistema PDV", onClick: () => handleMenuItemClick("/planos/sistema-pdv") },
    //{ label: "ERP", onClick: () => handleMenuItemClick("/") },
    // { label: "E-commerce", onClick: () => handleMenuItemClick("/") },
  ];

  return(
    <div className="fixed w-full bg-base-background h-14 z-10 shadow-xl">

      <div className="flex justify-around items-center w-full h-14">

        <div onClick={paginaInicial} className="flex items-center gap-2 w-1/5 justify-center cursor-pointer">
          <img src={LogoSemFundoBranco} alt="Logo" width={30} />
          <p className="font-semibold text-white text-2xl">Core<span className="font-normal">Commerce</span></p>
        </div>

        <div className="w-3/5 flex justify-center">
          
          
          <div className="flex justify-center items-center">
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



        </div>

        <div className="w-1/5 flex justify-center">
          <div className="bg-white p-1 pl-3 pr-3 rounded-full flex justify-center hover:bg-gray-100">
            <Link to="/dashboard" className="text-brand-blue-500 font-bold">AREA DO CLIENTE</Link>
          </div>
        </div>

      </div>

    </div>

  )
}
