import {
    TextareaHTMLAttributes,
    ReactElement,
    forwardRef,
    useEffect,
    useState,
  } from "react";
  import { FieldError } from "react-hook-form";
  
  export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    icon?: ReactElement;
    iconError?: ReactElement;
    error?: FieldError;
    label?: string;
    customSize?: string;
    maxLength?: number;
  }
  
  const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
      {
        className,
        icon,
        iconError,
        error,
        label,
        customSize,
        maxLength,
        value,
        onChange,
        ...props
      },
      ref
    ) => {
      const [charCount, setCharCount] = useState(0);
  
      useEffect(() => {
        if (value) {
          setCharCount(String(value).length);
        }
      }, [value]);
  
      const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = event.target.value;
  
        if (!maxLength || val.length <= maxLength) {
          setCharCount(val.length);
          if (onChange) onChange(event);
        }
      };
  
      return (
        <div>
          <div className="flex justify-center items-center relative">
            <div
              className={`relative ${customSize || "w-full"} ${customSize || "min-w-[200px]"} min-h-[100px] flex justify-center items-start`}
            >
              <textarea
                ref={ref}
                maxLength={maxLength}
                value={value}
                onChange={handleChange}
                className={`peer w-full h-full bg-transparent text-brand-blue-500 outline-none transition-all placeholder-shown:border placeholder-shown:border-brand-blue-500 placeholder-shown:border-t-brand-blue-500 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-brand-blue-500 resize-none ${className}`}
                {...props}
              />
  
              <div className="absolute top-2 right-3">
                {error && iconError ? (
                  <div className="text-red-700">{iconError}</div>
                ) : (
                  icon && (
                    <div className="text-brand-blue-400 cursor-pointer">
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
  
            
            {maxLength && (
              <span className="absolute bottom-1 right-3 text-xs text-gray-400">
                {charCount}/{maxLength}
              </span>
            )}
          </div>
  
          <div className="w-full flex justify-end text-red-700">
            {error && <span className="text-xs">{error.message}</span>}
          </div>
        </div>
      );
    }
  );
  
  Textarea.displayName = "Textarea";
  
  export { Textarea };
  