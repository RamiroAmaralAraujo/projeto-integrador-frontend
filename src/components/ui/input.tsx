import {
  InputHTMLAttributes,
  ReactElement,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { FieldError } from "react-hook-form";
import InputMask from "react-input-mask";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
  iconError?: ReactElement;
  error?: FieldError;
  label?: string;
  maxLength?: number;
  maskType?: "cpf" | "cnpj" | "cep" | "telefone" | "cnpj_cpf";
  customSize?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconError,
      error,
      label,
      maskType,
      maxLength,
      customSize,
      onChange,
      ...props
    },
    ref
  ) => {
    const [mask, setMask] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const formatCpfCnpj = (value: string): string => {
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length <= 11) {
        return cleanedValue
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
        return cleanedValue
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
      }
    };

    useEffect(() => {
      switch (maskType) {
        case "cpf":
          setMask("999.999.999-99");
          break;
        case "cnpj":
          setMask("99.999.999/9999-99");
          break;
        case "cep":
          setMask("99999-999");
          break;
        case "telefone":
          setMask("(99) 9 9999-9999");
          break;
        case "cnpj_cpf":
          setMask("");
          break;
        default:
          setMask("");
      }
    }, [maskType]);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (maskType === "cnpj_cpf") {
        value = formatCpfCnpj(value);
        setValue(value);
      } else {
        setValue(value);
      }
      if (onChange) {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: value,
          },
        });
      }
    };

    return (
      <div>
        <div className="flex justify-center items-center">
          <div
            className={`relative ${customSize || "w-full"} ${customSize || "min-w-[200px]"} h-10 flex justify-center items-center`}
          >
            <InputMask
              placeholder=""
              maxLength={maxLength}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              mask={maskType === "cnpj_cpf" ? "" : mask}
              value={value}
              onChange={handleChange}
              className={`peer w-full h-full bg-transparent text-brand-blue-500 outline-none transition-all placeholder-shown:border placeholder-shown:border-brand-blue-500 placeholder-shown:border-t-brand-blue-500 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-brand-blue-500 ${className}`}
              inputRef={ref}
              {...props}
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {error && iconError ? (
                <div className="text-red-700">{iconError}</div>
              ) : (
                icon && (
                  <div
                    onClick={handleShowPassword}
                    className="text-brand-blue-400 cursor-pointer"
                  >
                    {icon}
                  </div>
                )
              )}
            </div>

            {label && (
              <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-brand-blue-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-brand-blue-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-[7px] before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-[7px] after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-brand-blue-500 peer-focus:text-brand-blue-500 before:border-brand-blue-500 peer-focus:before:!border-brand-blue-500 after:border-brand-blue-500 peer-focus:after:!border-brand-blue-500"
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

Input.displayName = "Input";

export { Input };
