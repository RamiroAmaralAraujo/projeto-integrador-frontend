import { useState, useRef } from "react";
import { SelectHTMLAttributes, ReactElement, forwardRef } from "react";
import { FieldError } from "react-hook-form";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactElement;
  iconError?: ReactElement;
  error?: FieldError;
  label?: string;
  text?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, icon, iconError, error, label, options, text, ...props }) => {
    const [search, setSearch] = useState(""); // Estado para pesquisa
    const [isOpen, setIsOpen] = useState(false); // Controla a visibilidade das opções
    const containerRef = useRef<HTMLDivElement>(null); // Referência para fechar ao clicar fora

    // Filtra as opções com base na pesquisa do usuário
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="relative w-full" ref={containerRef}>
        <div className="relative w-full min-w-[200px]">
          {/* Campo de entrada para pesquisa */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={text}
            className="peer w-full border border-brand-blue-500 px-3 py-2 rounded-[7px] text-brand-blue-500 focus:outline-none bg-transparent placeholder:text-brand-blue-500"
          />

          {/* Ícone de seta */}
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
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

          {/* Dropdown de opções */}
          {isOpen && (
            <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300  shadow-lg max-h-40 overflow-y-auto z-50 rounded-xl">
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

        {/* Exibe erro, se houver */}
        <div className="w-full flex justify-end text-red-700">
          {error && <span className="text-xs">{error.message}</span>}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
