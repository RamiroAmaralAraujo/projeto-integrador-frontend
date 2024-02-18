import { InputHTMLAttributes, ReactElement, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement
  error?: FieldError
  label?: String
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, label, ...props }, ref) => {
    return (
      <>

        <div className="w-full">
          <div className="relative w-full min-w-[200px] h-10">
            <input
              type={type}
              className="peer w-full h-full bg-transparent text-brand-blue-500 outline-none focus:outline-none disabled:bg-brand-blue-500 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-brand-blue-500 placeholder-shown:border-t-brand-blue-500 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-brand-blue-500 focus:border-brand-blue-500"
              placeholder=" "
              ref={ref}
              {...props}
            />
            <label
              className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-brand-blue-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-brand-blue-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-[7px] before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-[7px] after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-brand-blue-500 peer-focus:text-brand-blue-500 before:border-brand-blue-500 peer-focus:before:!border-brand-blue-500 after:border-brand-blue-500 peer-focus:after:!border-brand-blue-500"
              htmlFor={props.id}
            >
              {icon} {label}
            </label>
          </div>
        </div>
        {!!error && (
          <span className="block -mt-3 ml-2 text-brand-red text-sm text-pink-600">
            {error.message}
          </span>
        )}
      </>
    )
  },
)
Input.displayName = 'Input'

export { Input }
