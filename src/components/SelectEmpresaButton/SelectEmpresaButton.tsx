import { AuthContext } from "@/Context/AuthContext"
import { useContext } from "react"
import { FaRegQuestionCircle } from "react-icons/fa"

export function SelectEmpresaButton() {

  const { empresaSelecionada } = useContext(AuthContext)


  return (
    <>
      <div className="w-full flex justify-end relative ">
        <div className=" max-w-[500px]">
          <div className=" bg-brand-blue-400 rounded-xl justify-between mr-14 shadow-lg">
            <div className={`flex justify-around items-center p-3 gap-3 `}>
              <h1 className="font-bold text-lg text-white">Empresa Selecionada:</h1>  <span className={`rounded-xl p-2 text-brand-blue-500 font-semibold ${empresaSelecionada ? "bg-white" : "bg-gray-200"}`}>
                {empresaSelecionada ? empresaSelecionada.empresaNome : <FaRegQuestionCircle className="text-brand-blue-500" size={25} />}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}