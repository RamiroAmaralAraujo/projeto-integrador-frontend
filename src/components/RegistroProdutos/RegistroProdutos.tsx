
import { useProdutosStore } from "@/store/Produtos/Index";
import { Download } from 'lucide-react';
import PlaceHolderProd from '../../assets/PlaceHolderProd.png'



export function RegistroProdutos() {
  const { produtos } = useProdutosStore()

  const ProdProduto = produtos?.prod_url





  return (
    <>
      <div className="gap-2 flex flex-col h-full">

        {ProdProduto && (
          <div className="h-full w-full">
            <a href={`https://core-commerce.s3.sa-east-1.amazonaws.com/${produtos?.prod_url}`}>
              <div className="p-2 h-full flex-col items-center rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >

                <div className="h-full w-ful flex justify-center items-center flex-col">
                  <div className="flex justify-center items-center">
                    <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${produtos?.prod_url}`} alt="" className="w-32" />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-sm font-semibold text-brand-blue-500 text-nowrap ">Produto</p>
                    <Download size={15} />
                  </div>
                </div>

              </div>
            </a>
          </div>
        )}
        {!ProdProduto && (
          <div className="h-full w-full">
            <div className="cursor-not-allowed h-full flex-col items-center justify-around p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-300 opacity-45" >
              <div className="h-full w-ful flex justify-center items-center flex-col">
                <div className="flex justify-center items-center">
                  <img src={PlaceHolderProd} alt="" className="w-32" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm font-bold text-brand-blue-200 text-nowrap ">Produto</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
