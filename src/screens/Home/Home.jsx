/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Sidebar, VideoCard } from "../../components";
import { useSelector } from "react-redux";

const Home = ({ mobileMenu, setMobileMenu }) => {
  const { loading, categoryResult } = useSelector(
    ({ generalSlice }) => generalSlice
  );

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      {mobileMenu ? (
        <Sidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      ) : null}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            categoryResult.map((item) => {
              if (item.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
