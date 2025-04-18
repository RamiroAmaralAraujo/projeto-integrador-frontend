import React from "react";

interface SelectableDivProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SelectFilter: React.FC<SelectableDivProps> = ({ label, isSelected, onClick }) => {
  return (
    <div
      className={`w-28 h-11 flex justify-center items-center text-sm font-bold cursor-pointer rounded-xl text-center text-brand-blue-500   ${
        isSelected ? "border-2 border-brand-blue-500 bg-brand-blue-500 text-white hover:bg-brand-blue-400"  : "border-2 border-brand-blue-500 hover:bg-brand-blue-200"
      }`}
      onClick={onClick}
    >
      <span>{label}</span>
    </div>
  );
};

export default SelectFilter;
