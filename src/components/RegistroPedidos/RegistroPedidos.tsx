
import { usePedidosStore } from "@/store/Pedidos/Index";
import { Download } from 'lucide-react';
import PlaceHolderPed from '../../assets/PlaceHolderPed.png'



export function RegistroPedidos() {
  const { pedidos } = usePedidosStore()

  const PedPedido = pedidos?.ped_url





  return (
    <>
      <div className="gap-2 flex flex-col h-full">

        {PedPedido && (
          <div className="h-full w-full">
            <a href={`https://core-commerce.s3.sa-east-1.amazonaws.com/${pedidos?.ped_url}`}>
              <div className="p-2 h-full flex-col items-center rounded-xl border border-dashed border-base-hover border-brand-blue-500 hover:border-4 hover:bg-gray-200 hover:opacity-45" >

                <div className="h-full w-ful flex justify-center items-center flex-col">
                  <div className="flex justify-center items-center">
                    <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${pedidos?.ped_url}`} alt="" className="w-32" />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-sm font-semibold text-brand-blue-500 text-nowrap ">Pedido</p>
                    <Download size={15} />
                  </div>
                </div>

              </div>
            </a>
          </div>
        )}
        {!PedPedido && (
          <div className="h-full w-full">
            <div className="cursor-not-allowed h-full flex-col items-center justify-around p-1 rounded-xl border border-dashed border-base-hover border-brand-blue-300 opacity-45" >
              <div className="h-full w-ful flex justify-center items-center flex-col">
                <div className="flex justify-center items-center">
                  <img src={PlaceHolderPed} alt="" className="w-32" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm font-bold text-brand-blue-200 text-nowrap ">Pedido</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
