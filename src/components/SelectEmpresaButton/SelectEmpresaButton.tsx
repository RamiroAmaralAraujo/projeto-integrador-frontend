import { AuthContext } from "@/Context/AuthContext"
import { useContext } from "react"

export function SelectEmpresaButton() {

  const { empresaSelecionada } = useContext(AuthContext)

  return (
    <>
      <div className="w-full flex justify-end relative ">
        <div className=" max-w-[500px]">
          <div className=" bg-brand-blue-400 rounded-xl justify-between mr-14 shadow-lg">
            <div className="flex justify-around items-center p-3 gap-3">
              <h1 className="font-bold text-lg text-white">Empresa Selecionada:</h1> <span className="bg-white rounded-xl p-2 text-brand-blue-500 font-semibold">{empresaSelecionada?.empresaNome}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}