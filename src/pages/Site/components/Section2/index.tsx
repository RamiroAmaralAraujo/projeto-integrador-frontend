import { MdOutlineCheckCircle } from "react-icons/md";
import image from "./assets/section2site.png";

export function Section2() {
  return(
    <div className="p-6 md:p-12 bg-gray-100 gap-8 md:gap-14 flex flex-col lg:flex-row items-center w-full">
      <div className="w-full flex justify-center lg:justify-end">
        <div className="w-2/3 flex justify-center md:justify-start">
          <img src={image} alt="Imagem" width={500} />
        </div>
      </div>
      <div className="w-full">
        <div className="md:w-2/3 w-full flex flex-col justify-center items-center text-center md:text-2xl text-lg">
                
          <h1 className="font-semibold text-3xl md:text-4xl mb-5">Feito para você</h1>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/> Micros, Pequenas e Médias Empresas</p>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/>Indústrias e Distribuidoras</p>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/>Vendedores Autônomos</p>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/>Representantes Comerciais</p>
        </div>
      </div> 
    </div>
  )
}