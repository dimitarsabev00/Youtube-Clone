import { Routes, Route } from "react-router-dom";
import { Home, SearchResult, VideoDetails } from "../../screens";
import Header from "../Header";
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
          path="/search/:searchTerm"
          element={
            <SearchResult
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          }
        />
        <Route
          path="/watch/:id"
          element={
            <VideoDetails
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          }
        />
      </Routes>
    </>
  );
};

export default RoutesComp;
