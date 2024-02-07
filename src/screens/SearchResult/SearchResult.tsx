import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Sidebar,SearchResultVideoCard } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearVideos } from "../../store";
import { getSearchPageVideos } from "../../store/reducers/getSearchPageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../../Types";

type SearchResultScreenProps = {
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchResult: React.FC<SearchResultScreenProps> = ({ mobileMenu, setMobileMenu }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector(({ generalSlice }) => generalSlice.videos);
  const searchTerm = useAppSelector(
    ({ generalSlice }) => generalSlice.searchTerm
  );

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      {mobileMenu ? (
        <Sidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      ) : null}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {videos.length ? (
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Loader />}
            height={800}

            >
              {videos.map((item: HomePageVideos) => {
                return (
                  <div className="my-5">
                    <SearchResultVideoCard data={item} key={item.videoId} />
                  </div>
                );
              })}
            </InfiniteScroll>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
