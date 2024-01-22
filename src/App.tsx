import { BrowserRouter } from "react-router-dom";
import { Routes } from "./components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setGeneralFields, startLoading, stopLoading } from "./store";
import React from "react";

const App = () => {
  // const { selectedCategory } = useSelector(({ generalSlice }) => generalSlice);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   fetchSelectedCategoryData(selectedCategory);
  // }, [selectedCategory]);

  // const fetchSelectedCategoryData = (query) => {
  // dispatch(startLoading());
  // fetchDataFromApi(`search/?q=${query}`).then(({ contents: results }) => {
  //   dispatch(setGeneralFields({ categoryResult: results }));
  //   dispatch(stopLoading());
  // });
  // };
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
