import { MdOutlineCheckCircle } from "react-icons/md";

export function Section2() {
  return(
    <div className="p-12 bg-gray-100 gap-14 flex items-center w-full">
      <div className="w-full flex justify-end">
        <div className="w-2/3">
          <img src="https://via.placeholder.com/150" alt="Imagem" width={400} />
        </div>
      </div>
      <div className="w-full">
        <div className="w-2/3 flex flex-col justify-center items-center text-center text-2xl">
                
          <h1 className="font-semibold text-4xl mb-5">Feito para você</h1>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/> Micros, Pequenas e Médias Empresas</p>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/>Indústrias e Distribuidoras</p>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/>Vendedores Autônomos</p>
          <p className="mb-1 flex items-center gap-2"><MdOutlineCheckCircle color="green"/>Representantes Comerciais</p>
        </div>
      </div> 
    </div>

  )
}