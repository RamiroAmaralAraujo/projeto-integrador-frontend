import { AuthContext } from "@/Context/AuthContext"
import { useContext } from "react"
import { FaRegQuestionCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export function SelectEmpresaButton() {

  const { empresaSelecionada } = useContext(AuthContext)

  const navigate = useNavigate()


  return (
    <>
      <div onClick={(() => navigate('/empresas'))} className="w-full flex justify-end relative cursor-pointer">
        <div className=" max-w-[500px]">
          <div className=" bg-brand-blue-400 rounded-xl justify-between mr-14 shadow-lg">
            <div className={`flex justify-around items-center p-3 gap-3 `}>
              <div className="w-full">
                <h1 className="font-bold text-lg  text-white whitespace-nowrap ">Empresa Selecionada:</h1>
              </div>
              <div className={` rounded-xl p-2 ${empresaSelecionada ? "bg-white" : "bg-gray-200"}`}>
                <span className='text-brand-blue-500 font-semibold  whitespace-nowrap  ' >
                  {empresaSelecionada ? empresaSelecionada.empresaNome.substring(0, 10) + '...' : <FaRegQuestionCircle className="text-brand-blue-500 animate-pulse" size={25} />}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}