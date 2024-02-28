import { TituloPag } from "../../components/TituloPagina/TituloPag"
import { TableEmpresas } from "./Components/EmpresasColumn"

export function Empresas() {
  return (
    <>
      <div className="flex justify-between">
        <TituloPag titulo="Empresas" />
        <div className=" max-w-[500px] mt-32">
          <div className=" bg-brand-blue-400 rounded-xl justify-between mr-14 shadow-lg">
            <div className="flex justify-around items-center p-3 gap-3">
              <h1 className="font-bold text-lg text-white">Empresa Selecionada:</h1> <span className="bg-white rounded-xl p-2 text-brand-blue-500 font-semibold">mercado 2 irmãos</span>
            </div>
          </div>
        </div>
      </div>
      <TableEmpresas />
    </>
  )
}