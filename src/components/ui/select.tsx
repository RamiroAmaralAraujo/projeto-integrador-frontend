import { SelectHTMLAttributes, ReactElement, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactElement;
  iconError?: ReactElement;
  error?: FieldError;
  label?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, icon, iconError, error, label, options, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <div className="relative w-full min-w-[200px] h-10 flex justify-center items-center">
            <select
              className={`peer w-full h-full bg-transparent text-brand-blue-500 outline-none focus:outline-none disabled:bg-brand-blue-500 disabled:border-0 transition-all border border-brand-blue-500 focus:border-2 focus:border-brand-blue-500 text-sm px-3 py-2.5 rounded-[7px] appearance-none`}
              ref={ref}
              {...props}
            >
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {error && iconError ? (
                <div className="text-red-700">{iconError}</div>
              ) : (
                icon && <div className="text-brand-blue-400">{icon}</div>
              )}
              {/* Ícone padrão de seta para baixo */}
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {label && (
              <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-brand-blue-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 text-[11px] peer-placeholder-shown:text-sm peer-focus:text-[11px] text-brand-blue-500"
                htmlFor={props.id}
              >
                {label}
              </label>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end text-red-700">
          {error && <span className="text-xs">{error.message}</span>}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
