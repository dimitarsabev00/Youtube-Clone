import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Login, SearchResult, VideoDetails } from "../../screens";
import Header from "../Header";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";

const RoutesComp = () => {
  const [mobileMenu, setMobileMenu] = useState(true);
  const { user, loading } = useSelector(({ generalSlice }) => generalSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  return (
    <>
      {user && <Header mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />}
      <Routes>
        <Route path="/login" element={<Login />} />
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
