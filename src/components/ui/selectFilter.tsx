import React from "react";

interface SelectableDivProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  widthClass?: string; // padrão: w-28
  heightClass?: string; // padrão: h-11
  alert?: boolean;
}

const SelectFilter: React.FC<SelectableDivProps> = ({
  label,
  isSelected,
  onClick,
  widthClass = "w-28",
  heightClass = "h-11",
  alert,
}) => {
  return (
    <div
      className={`${widthClass} ${heightClass} flex justify-center items-center text-sm font-bold cursor-pointer rounded-xl text-center text-brand-blue-500 border-2 ${
        isSelected
          ? "bg-brand-blue-500 text-white border-brand-blue-500 hover:bg-brand-blue-400"
          : "border-brand-blue-500 hover:bg-brand-blue-200"
      }`}
      onClick={onClick}
    >
      <span>{label}</span>
      {alert && (
        <span className="ml-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default SelectFilter;
