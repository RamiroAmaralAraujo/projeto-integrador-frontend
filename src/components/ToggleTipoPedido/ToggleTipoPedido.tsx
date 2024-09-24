import { forwardRef } from 'react';
import { Switch } from '@headlessui/react';
import { PackagePlus, PackageMinus } from 'lucide-react';
import { TipoMovimentacao } from '@/enums/TipoMovimentacao';

interface ToggleTipoPedidoProps {
  value: TipoMovimentacao;
  onChange: (value: TipoMovimentacao) => void;
}

const ToggleTipoPedido = forwardRef<HTMLButtonElement, ToggleTipoPedidoProps>(
  ({ value, onChange, ...props }, ref) => {
    // Verifica se o valor atual é SAIDA
    const isSaida = value === TipoMovimentacao.SAIDA;

    // Alterna entre ENTRADA e SAIDA
    const toggleValue = () => {
      onChange(isSaida ? TipoMovimentacao.ENTRADA : TipoMovimentacao.SAIDA);
    };

    return (
      <Switch checked={isSaida} onChange={toggleValue} as="div" className="flex justify-center items-center gap-2 w-36">
        <button
          ref={ref}
          {...props}
          aria-pressed={isSaida}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
            isSaida ? 'bg-red-700' : 'bg-green-700'
          }`}
        >
          <span className="sr-only">Alternar entre Entrada e Saída</span>
          <span
            className={`inline-block h-4 w-4 transform bg-white rounded-full transition ${
              isSaida ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>

        <div className={`flex gap-2 justify-center items-center ${isSaida ? 'text-red-700' : 'text-green-700'}`}>
          <label className="font-semibold">{isSaida ? 'Saída' : 'Entrada'}</label>
          {isSaida ? <PackageMinus /> : <PackagePlus />}
        </div>
      </Switch>
    );
  }
);

ToggleTipoPedido.displayName = 'ToggleTipoPedido';

export { ToggleTipoPedido };
