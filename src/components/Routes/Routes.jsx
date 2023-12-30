import { Routes, Route } from "react-router-dom";
import { Home, Search, VideoDetails } from "../../screens";
import Header from "../Header/Header";
import { useState } from "react";

const RoutesComp = () => {
  const [mobileMenu, setMobileMenu] = useState(true);

  return (
    <>
      <Header mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>
      <Routes>
        <Route exact path="/" element={<Home mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>} />
        <Route exact path="/search/:searchQuery" element={<Search />} />
        <Route exact path="/video/:id" element={<VideoDetails />} />
      </Routes>
    </>
  );
};

export default RoutesComp;
