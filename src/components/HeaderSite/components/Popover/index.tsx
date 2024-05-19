import React, { useState } from "react";

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface PopoverProps {
  menuItems: MenuItem[];
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ menuItems, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>{children}</div>
      {isOpen && (
        <div className="absolute z-10 w-64 bg-white border border-gray-200 rounded-xl shadow-lg">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded-xl"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Popover;
