/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { categories } from "../../utilities";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ mobileMenu, setMobileMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };
  return (
    <div
      className={` w-[240px] overflow-y-auto h-full py-4 bg-black relative z-10`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <SidebarItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                onClick={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                  selectedCategory === item.name ? "bg-white/[0.15]" : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">
          Clone by: Dimitar Sabev
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
