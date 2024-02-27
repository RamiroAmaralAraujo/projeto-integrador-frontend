import { TituloPag } from "../../components/TituloPagina/TituloPag";

export function Empresas() {
  return (
    <>
      <div className="flex justify-between">
        <TituloPag titulo="Empresas" />
        <div className=" max-w-[500px] mt-32">
          <div className=" bg-brand-blue-400 rounded-full justify-between ">
            <div className="flex justify-around items-center p-3 gap-3">
              <h1 className="font-bold text-white ml-9">Empresasa Selecionada:</h1> <span className="bg-white rounded-full p-1 text-brand-blue-500 font-semibold">Panifacadora Alpha</span>
            </div>
          </div>
        </div>
      </div>


    </>


  );
}