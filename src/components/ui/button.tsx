import { ButtonHTMLAttributes } from 'react'
import { Spinner } from '../Spinner/spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  isLoading?: boolean
}

export function Button(props: ButtonProps) {
  const { label, isLoading, ...rest } = props

  return (

    <div>
      <button
        {...rest}
        className={`w-full flex justify-center bg-brand-blue-500 text-gray-100 p-2 rounded-[7px] tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-brand-blue-400 shadow-lg cursor-pointer transition ease-in duration-300 ${isLoading && 'brightness-75 cursor-not-allowed'}`} disabled={isLoading}>
        {isLoading ? <Spinner /> : label}
      </button>
    </div>


  )
}
