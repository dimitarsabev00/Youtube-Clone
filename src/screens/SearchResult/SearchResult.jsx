/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store";
import { fetchDataFromApi } from "../../utilities/api";
import SearchResultVideoCard from "../SearchResultVideoCard/SearchResultVideoCard";
import { Sidebar } from "../../components";

const SearchResult = ({ mobileMenu, setMobileMenu }) => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    dispatch(startLoading());
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      dispatch(stopLoading());
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      {mobileMenu ? (
        <Sidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      ) : null}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item.video;
            return <SearchResultVideoCard key={video.videoId} video={video} />;
          })}
          results
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
