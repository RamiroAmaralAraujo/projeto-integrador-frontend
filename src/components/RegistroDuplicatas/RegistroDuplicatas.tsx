
import { useDuplicatasStore } from "@/store/Duplicatas/Index";
import { Download } from 'lucide-react';



export function RegistroDuplicatas() {
  const { duplicatas } = useDuplicatasStore()

  const CompDuplicata = duplicatas?.comp_url
  const AssDuplicata = duplicatas?.ass_url





  return (
    <>
      <div className="gap-2 flex flex-col">
        {CompDuplicata && (
          <a href={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.comp_url}`}>
            <div className="h-28 flex items-center justify-around p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >
              <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.comp_url}`} alt="" className="w-10" />
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm font-bold text-brand-blue-500 ">Foto Comprovante</p>
                <Download />
              </div>
            </div>
          </a>
        )}
        {AssDuplicata && (
          <a href={``}>
            <div className="h-28 flex items-center justify-around p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >
              <img src={`https://www.svgrepo.com/show/508699/landscape-placeholder.svg`} alt="" className="w-10" />
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm font-bold text-brand-blue-500 ">Assinatura Digital</p>
                <Download />
              </div>
            </div>
          </a>
        )}
      </div>
    </>
  );
}
