import { useState, useRef, useEffect } from "react";
import { SelectHTMLAttributes, ReactElement, forwardRef } from "react";
import { FieldError } from "react-hook-form";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactElement;
  iconError?: ReactElement;
  error?: FieldError;
  label?: string;
  text?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, icon, iconError, error, label, options, text, value, disabled, ...props }) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const selectedOption = options.find((opt) => opt.value === value);
      if (selectedOption) {
        setSearch(selectedOption.label);
      }
    }, [value, options]);

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="relative w-full" ref={containerRef}>
        <div className="relative w-full min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={(e) => !disabled && setSearch(e.target.value)}
            onFocus={() => !disabled && setIsOpen(true)}
            placeholder={text}
            disabled={disabled}
            className={`peer w-full border px-3 py-2 rounded-[7px] text-brand-blue-500 focus:outline-none bg-transparent placeholder:text-brand-blue-500
              ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60 border-gray-300" : "border-brand-blue-500"}
            `}
          />

          <div
            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!disabled) setIsOpen(!isOpen);
            }}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {isOpen && !disabled && (
            <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-40 overflow-y-auto z-50 rounded-xl">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setSearch(option.label);
                      setIsOpen(false);
                      if (props.onChange) {
                        props.onChange({ target: { value: option.value } } as any);
                      }
                    }}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">Nenhuma opção encontrada</li>
              )}
            </ul>
          )}
        </div>

        <div className="w-full flex justify-end text-red-700">
          {error && <span className="text-xs">{error.message}</span>}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
