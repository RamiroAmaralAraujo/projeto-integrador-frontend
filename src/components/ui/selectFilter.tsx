import React from "react";

interface SelectableDivProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  widthClass?: string;  // padrão: w-28
  heightClass?: string; // padrão: h-11
}

const SelectFilter: React.FC<SelectableDivProps> = ({
  label,
  isSelected,
  onClick,
  widthClass = "w-28",
  heightClass = "h-11",
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
    </div>
  );
};

export default SelectFilter;
