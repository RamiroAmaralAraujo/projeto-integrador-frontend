
import { useDuplicatasStore } from "@/store/Duplicatas/Index";
import { Download } from 'lucide-react';
import PlacaHolderAss from '../../assets/PlaceHolderAss.png'
import PlaceHolderComp from '../../assets/PlaceHolderComp.png'



export function RegistroDuplicatas() {
  const { duplicatas } = useDuplicatasStore()

  const CompDuplicata = duplicatas?.comp_url
  const AssDuplicata = duplicatas?.ass_url





  return (
    <>
      <div className="gap-2 flex flex-col">
        {CompDuplicata && (
          <a href={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.comp_url}`}>
            <div className="p-2 h-28 flex-col items-center rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >
              <div className="flex justify-center items-center">
                <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.comp_url}`} alt="" className="w-20" />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-sm font-bold text-brand-blue-500 ">Foto Comprovante</p>
                <Download size={15} />
              </div>
            </div>
          </a>
        )}
        {!CompDuplicata && (
          <div className="cursor-not-allowed h-28 flex-col items-center justify-around p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-300 opacity-45" >
            <div className="flex justify-center items-center">
              <img src={PlaceHolderComp} alt="" className="w-20" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font-bold text-brand-blue-200 ">Foto Comprovante</p>
            </div>
          </div>
        )}
        {AssDuplicata && (
          <a href={``}>
            <div className="p-2 h-28 flex-col items-center  rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >
              <div className="flex justify-center items-center">
                <img src={`${duplicatas?.ass_url}`} alt="" className="w-20" />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-sm font-bold text-brand-blue-500 ">Assinatura Digital</p>
                <Download size={15} />
              </div>
            </div>
          </a>
        )}
        {!AssDuplicata && (
          <div className="cursor-not-allowed h-28 flex-col items-center justify-around p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-300 opacity-45" >
            <div className="flex justify-center items-center">
              <img src={PlacaHolderAss} alt="" className="w-20" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font-bold text-brand-blue-200 ">Assinatura Digital</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
