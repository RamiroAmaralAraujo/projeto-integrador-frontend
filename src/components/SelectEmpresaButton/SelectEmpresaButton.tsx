import { AuthContext } from "@/Context/AuthContext";
import { useContext } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function SelectEmpresaButton() {
  const { empresaSelecionada } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-end relative ">
        <div className=" max-w-[500px]">
          <div
            onClick={() => navigate("/empresas")}
            className=" bg-brand-blue-400 cursor-pointer rounded-xl justify-between mr-14 shadow-lg"
          >
            <div className={`flex justify-around items-center p-3 gap-3 `}>
              <div className="w-full">
                <h1 className="font-bold text-lg  text-white whitespace-nowrap ">
                  Empresa:
                </h1>
              </div>
              <div
                className={` rounded-xl p-2 ${empresaSelecionada ? "bg-white" : "bg-red-700 animate-pulse border-2 border-white"}`}
              >
                <span className="text-brand-blue-500 font-semibold  whitespace-nowrap  ">
                  {empresaSelecionada ? (
                    empresaSelecionada.empresaNome.length > 30 ? (
                      `${empresaSelecionada.empresaNome.substring(0, 27)}...`
                    ) : (
                      empresaSelecionada.empresaNome
                    )
                  ) : (
                    <FaRegQuestionCircle className="text-white" size={25} />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
