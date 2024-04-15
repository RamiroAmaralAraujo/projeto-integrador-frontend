import { Fragment, forwardRef } from 'react'
import { Switch } from '@headlessui/react'
import { Receipt, HandCoins } from 'lucide-react'

interface ToggleTipoDuplicataProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleTipoDuplicata = forwardRef<HTMLButtonElement, ToggleTipoDuplicataProps>(

  ({ value, onChange, ...props }, ref) => {

    return (
      <Switch checked={value} onChange={onChange} as={Fragment}>
        {({ checked }) => (

          <div className='flex justify-center items-center gap-2 w-36'>

            <button
              ref={ref}
              {...props}
              className={`${checked ? 'bg-red-700' : 'bg-green-700'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${checked ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </button>

            <div className={`flex gap-2 justify-center items-center ${checked ? 'text-red-700' : 'text-green-700'}`}>
              <label className='font-semibold '>{checked ? 'Pagável' : 'Recebível'}</label>
              <div>{checked ? <Receipt /> : <HandCoins />} </div>
            </div>
          </div>
        )}
      </Switch>
    )
  }
)

ToggleTipoDuplicata.displayName = 'ToggleTipoDuplicata';

export { ToggleTipoDuplicata };
