import { Routes, Route } from "react-router-dom";
import { Home, SearchResult, VideoDetails } from "../../screens";
import Header from "../Header/Header";
import { useState } from "react";
import React from "react";

const RoutesComp = () => {
  const [mobileMenu, setMobileMenu] = useState(true);

  return (
    <>
      <Header mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <Routes>
        <Route
          path="/"
          element={
            <Home mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
          }
        />
        <Route
          path="/searchResult/:searchQuery"
          element={
            <SearchResult
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          }
        />
        <Route path="/video/:id" element={<VideoDetails />} />
      </Routes>
    </>
  );
};

export default RoutesComp;
