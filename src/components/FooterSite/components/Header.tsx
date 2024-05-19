import { Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Youtube, Instagram } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function HeaderFooter() {
  
  const navigate = useNavigate()

  function navegarCadastro() {
    navigate('/cadastro-usuario');
  }

  return (
    <>
      <div className="flex w-full">

        <div className="w-1/3 ml-28 flex">
          <div className=" flex flex-col gap-2 items-center">
            <h1 className="font-normal">
              Teste agora mesmo o CoreCommerce
            </h1>
            <div className="flex">
              <span onClick={navegarCadastro} className="text-brand-blue-500 font-semibold bg-white rounded-full pt-1 pb-1 pl-3 pr-3 cursor-pointer shadow-lg hover:bg-gray-100">
                Experimente <span className="font-bold">grátis</span> por 7 dias
              </span>
            </div>
          </div>
        </div>

        <div  className="w-1/3 flex justify-center">
          <div className='flex items-start'>
            <div className="flex items-center gap-6">
              <a href=""><Instagram className='hover:text-brand-blue-400' size={32}/></a>
              <a href=""><Youtube className='hover:text-brand-blue-400' size={38}/></a>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex justify-end mr-28">
          <div className="flex flex-col">
            <h1 className="mb-2">Atendimento</h1>
            <span className="flex gap-2 justify-start items-center">
              <Phone />
              (22) 99208-1232
            </span>
            <span className="flex gap-2 justify-start items-center">
              <FaWhatsapp size={25} />
              (22) 99208-1232
            </span>
            <p className="flex gap-2 justify-start items-center">
              <Mail />
              atendimento@corecommerce.online
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
