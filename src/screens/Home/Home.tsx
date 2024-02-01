import React, { useEffect } from "react";
import { Loader, Sidebar, VideoCard } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getHomePageVideos } from "../../store/reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../../Types";
import { clearVideos } from "../../store";

const Home = ({ mobileMenu, setMobileMenu }) => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(({ generalSlice }) => generalSlice.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, []);
  return (
    // FIX BUG WITH HEIGHT FOR CONTAINER ON THE PAGE!
    <div className="flex flex-row h-[calc(100%-56px)]">
      {mobileMenu ? (
        <Sidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      ) : null}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div
          // FIX BUG WITH RESPONSIVE HERE!
          // className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5  `}

          className={`grid grid-cols-1 gap-4 p-5  `}
        >
          {videos.length ? (
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Loader />}
            >
              <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                {videos.map((item: HomePageVideos) => {
                  return <VideoCard data={item} key={item.videoId} />;
                })}
              </div>
            </InfiniteScroll>
          ) : null}
        </div>
        {!videos.length && <Loader />}
      </div>
    </div>
  );
};

export default Home;
