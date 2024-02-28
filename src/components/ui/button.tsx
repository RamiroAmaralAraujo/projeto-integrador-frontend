import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from '../Spinner/spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  isLoading?: boolean
  icon?: ReactNode
}

export function Button(props: ButtonProps) {
  const { label, isLoading, icon, ...rest } = props

  return (

    <div>
      <button
        {...rest}
        className={`gap-2  w-full flex justify-center items-center bg-brand-blue-500 text-gray-100 p-2 rounded-[7px] tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-brand-blue-400 shadow-lg cursor-pointer transition ease-in duration-300 disabled:bg-brand-blue-200 disabled:cursor-not-allowed ${isLoading && 'brightness-75 cursor-not-allowed'}`} >
        {isLoading ? <Spinner /> : <>{icon}{label}</>}

      </button>
    </div>


  )
}
