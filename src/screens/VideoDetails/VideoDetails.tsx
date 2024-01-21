import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";

import SuggestionVideoCard from "../SuggestionVideoCard/SuggestionVideoCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getVideoDetails } from "../../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../../store/reducers/getRecommendedVideos";
import { Sidebar } from "../../components";

const VideoDetails = ({ mobileMenu, setMobileMenu }) => {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.generalSlice.currentPlaying
  );
  const recommendedVideos = useAppSelector(
    (state) => state.generalSlice.recommendedVideos
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      {mobileMenu ? (
        <Sidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      ) : null}
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="w-full  flex flex-col lg:flex-row px-5">
          <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
            <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000000" }}
                playing={true}
              />
            </div>
            <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
              {currentPlaying.videoTitle}
            </div>
            <div className="flex justify-between flex-col md:flex-row mt-4">
              <div className="flex">
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={currentPlaying.channelInfo.image}
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-3">
                  <div className="text-white text-md font-semibold flex items-center">
                    {currentPlaying.channelInfo.name}
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                    <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-red-600 ml-8">
                      Subscribe
                    </div>
                  </div>

                  <div className="text-white/[0.7] text-sm">
                    {currentPlaying.channelInfo.subscribers} subscribers
                  </div>
                </div>
              </div>
              <div className="flex text-white mt-4 md:mt-0 gap-2">
                <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                  <AiOutlineLike className="text-xl text-white mr-2" />
                  {`${currentPlaying.videoLikes} Likes`}
                </div>
                <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                  <FaShare className="text-xl text-white mr-2" />
                  Share
                </div>
                <div className="flex items-center justify-center h-11 px-3 rounded-3xl bg-white/[0.15]">
                  <BsThreeDots className="text-xl text-white " />
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
              <div className="flex items-center mr-5 mt-4 text-white">
                <span className="after:content-['•'] after:mx-1">
                  {currentPlaying.videoViews} views
                </span>
                <span> {currentPlaying.videoAge} ago</span>
              </div>
              <div
                className={`${
                  !showMoreStatus ? "max-h-20 overflow-hidden" : ""
                } text-sm w-11/12`}
              >
                <pre
                  style={{
                    fontFamily: `"Roboto", sans-serif`,
                  }}
                  className="whitespace-pre-wrap text-white"
                >
                  {currentPlaying.videoDescription}
                </pre>
              </div>
              <div>
                <button
                  className="uppercase text-sm cursor-pointer text-white"
                  onClick={() => setShowMoreStatus(!showMoreStatus)}
                >
                  Show {showMoreStatus ? "less" : "more"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
            {getRecommendedVideos.length &&
              recommendedVideos.map((item) => {
                return <SuggestionVideoCard data={item} key={item.videoId} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
