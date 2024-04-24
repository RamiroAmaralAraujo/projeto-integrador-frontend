
import PlaceHolderComp from '../../assets/PlaceHolderComp.png'
import { useEmpresasStore } from "@/store/Empresas/Index";



export function RegistroEmpresas() {
  const { empresas } = useEmpresasStore()

  const empresaLogo = empresas?.logo_url






  return (
    <>
      <div className="flex flex-col w-full h-full">
        {empresaLogo && (
          <div className="p-2 h-full justify-center flex flex-col items-center rounded-xl border border-dashed border-base-hover border-brand-blue-500 " >
            <div className="flex flex-col justify-center items-center">
              <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${empresas.logo_url}`} alt="" className="w-48" />
              <p className="text-sm font-bold text-brand-blue-500 ">Logo Empresa</p>
            </div>
          </div>
        )}
        {!empresaLogo && (
          <div className=" p-2 h-full cursor-not-allowed flex-col items-center justify-around rounded-xl border border-dashed border-base-hover border-brand-blue-300 opacity-45" >
            <div className="flex flex-col justify-center items-center">
              <img src={PlaceHolderComp} alt="" className="w-48" />
              <p className="text-sm font-bold text-brand-blue-200 ">Logo Empresa</p>
            </div>
          </div>

        )}
      </div>
    </>
  );
}
