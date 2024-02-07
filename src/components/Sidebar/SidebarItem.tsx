import React from "react";

interface SidebarItemProps {
  text: string;
  icon: React.ReactNode;
  className: string;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, icon, className, onClick }) => {
  return (
    <div
      className={
        "text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " +
        className
      }
      onClick={onClick}
    >
      <span className="text-xl mr-5">{icon}</span>
      {text}
    </div>
  );
};

export default SidebarItem;
