/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Sidebar } from "../../components";

const Home = ({ mobileMenu, setMobileMenu }) => {
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      {mobileMenu ? (
        <Sidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      ) : null}
      Home Screen
    </div>
  );
};

export default Home;