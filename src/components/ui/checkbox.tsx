import React, { InputHTMLAttributes, ReactElement } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: ReactElement;
  icon?: ReactElement;
  iconError?: ReactElement;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  icon,
  iconError,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="mr-2 leading-tight"
        {...props}
      />
      <label className="text-sm text-gray-700">{label}</label>
      {error && (
        <div className="text-red-700 ml-2">
          {iconError}
        </div>
      )}
    </div>
  );
};
