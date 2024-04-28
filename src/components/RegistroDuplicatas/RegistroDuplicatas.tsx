
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
      <div className="gap-2 flex flex-col h-full">

        {CompDuplicata && (
          <div className="h-1/2 w-32">
            <a href={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.comp_url}`}>
              <div className="p-2 h-full flex-col items-center rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >

                <div className="h-full w-ful flex justify-center items-center flex-col">
                  <div className="flex justify-center items-center">
                    <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.comp_url}`} alt="" className="w-14" />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-sm font-semibold text-brand-blue-500 text-nowrap ">Comprovante</p>
                    <Download size={15} />
                  </div>
                </div>

              </div>
            </a>
          </div>
        )}
        {!CompDuplicata && (
          <div className="h-1/2 w-32">
            <div className="cursor-not-allowed h-full flex-col items-center justify-around p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-300 opacity-45" >
              <div className="h-full w-ful flex justify-center items-center flex-col">
                <div className="flex justify-center items-center">
                  <img src={PlaceHolderComp} alt="" className="w-14" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm font-bold text-brand-blue-200 text-nowrap ">Comprovante</p>
                </div>
              </div>

            </div>
          </div>
        )}
        {AssDuplicata && (
          <div className="h-1/2 w-32 ">
            <a href={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.ass_url}`}>
              <div className="p-2 h-full flex-col items-center  rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >
                <div className="h-full w-ful flex justify-center items-center flex-col">
                  <div className="flex justify-center items-center">
                    <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${duplicatas?.ass_url}`} alt="" className="w-14" />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-xs font-bold text-brand-blue-500 text-nowrap">Assinatura Digital</p>
                    <Download size={15} />
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}
        {!AssDuplicata && (
          <div className="h-1/2 w-32 ">
            <div className="cursor-not-allowed h-full  p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-300 opacity-45" >
              <div className="h-full w-ful flex justify-center items-center flex-col">
                <div className="flex justify-center items-center">
                  <img src={PlacaHolderAss} alt="" className="w-14" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm font-bold text-brand-blue-200 ">Assinatura Digital</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
