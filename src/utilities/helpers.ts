import React from "react";

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

import axios from "axios";
import { API_KEY, BASE_URL } from "./constants";
import { HomePageVideos, Item, RecommendedVideos } from "../Types";

export const categories = [
  { name: "New", icon: React.createElement(AiFillHome), type: "home" },
  {
    name: "Trending",
    icon: React.createElement(MdLocalFireDepartment),
    type: "category",
  },
  { name: "Music", icon: React.createElement(CgMusicNote), type: "category" },
  { name: "Films", icon: React.createElement(FiFilm), type: "category" },
  { name: "Live", icon: React.createElement(MdLiveTv), type: "category" },
  {
    name: "Gaming",
    icon: React.createElement(IoGameControllerSharp),
    type: "category",
  },
  { name: "News", icon: React.createElement(ImNewspaper), type: "category" },
  {
    name: "Sports",
    icon: React.createElement(GiDiamondTrophy),
    type: "category",
  },
  {
    name: "Learning",
    icon: React.createElement(RiLightbulbLine),
    type: "category",
  },
  {
    name: "Fashion & beauty",
    icon: React.createElement(GiEclipse),
    type: "category",
    divider: true,
  },
  { name: "Settings", icon: React.createElement(FiSettings), type: "menu" },
  {
    name: "Report History",
    icon: React.createElement(AiOutlineFlag),
    type: "menu",
  },
  { name: "Help", icon: React.createElement(FiHelpCircle), type: "menu" },
  {
    name: "Send feedback",
    icon: React.createElement(RiFeedbackLine),
    type: "menu",
  },
];
export const parseData = async (items: any[]) => {
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];
    items.forEach(
      (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
        channelIds.push(item.snippet.channelId);
        videoIds.push(item.id.videoId);
      }
    );

    const {
      data: { items: channelsData },
    } = await axios.get(
      `${BASE_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedChannelsData: { id: string; image: string }[] = [];
    channelsData.forEach(
      (channel: {
        id: string;
        snippet: { thumbnails: { default: { url: string } } };
      }) =>
        parsedChannelsData.push({
          id: channel.id,
          image: channel.snippet.thumbnails.default.url,
        })
    );

    const {
      data: { items: videosData },
    } = await axios.get(
      `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    
    const parsedData: HomePageVideos[] = [];
    items.forEach(
      (
        item: {
          snippet: {
            channelId: string;
            title: string;
            description: string;
            thumbnails: { medium: { url: string } };
            publishedAt: Date;
            channelTitle: string;
          };
          id: { videoId: string };
        },
        index: number
      ) => {
        const { image: channelImage } = parsedChannelsData.find(
          (data) => data.id === item.snippet.channelId
        )!;
        if (channelImage)
          parsedData.push({
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            videoThumbnail: item.snippet.thumbnails.medium.url,
            videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            videoDuration: parseVideoDuration(
              videosData[index].contentDetails.duration
            ),
            videoViews: convertRawViewstoString(
              videosData[index].statistics.viewCount
            ),
            videoAge: timeSince(new Date(item.snippet.publishedAt)),
            channelInfo: {
              id: item.snippet.channelId,
              image: channelImage,
              name: item.snippet.channelTitle,
            },
          });
      }
    );

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
export const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
export const parseVideoDuration = (duration: string): string => {
  const durationParts: string[] = duration
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");

  if (durationParts.length === 3) {
    return `${durationParts[0]}:${
      parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
    }:${
      parseInt(durationParts[2]) < 9 ? `0${durationParts[2]}` : durationParts[2]
    }`;
  }

  if (durationParts.length === 2) {
    return `${durationParts[0]}:${
      parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
    }`;
  }

  if (durationParts.length === 1) {
    return `0:${
      parseInt(durationParts[0]) < 9 ? `0${durationParts[0]}` : durationParts[0]
    }`;
  }

  return "";
};

export const convertRawViewstoString = (
  labelValue: String,
  isSub = false
): string => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(0) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(0) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(isSub ? 2 : 0) + "K"
    : Math.abs(Number(labelValue)).toString();
};

export const parseRecommendedData = async (items: Item[], videoId: string) => {
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];
    const newItems: Item[] = [];
    items.forEach((item: Item) => {
      channelIds.push(item.snippet.channelId);
      if (item.contentDetails?.upload?.videoId) {
        videoIds.push(item.contentDetails.upload.videoId);
        newItems.push(item);
      }
    });

    const {
      data: { items: videosData },
    } = await axios.get(
      `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedData: RecommendedVideos[] = [];
    newItems.forEach((item, index) => {
      if (index >= videosData.length) return;
      if (videoId === item?.contentDetails?.upload?.videoId) return;
      parsedData.push({
        videoId: item.contentDetails.upload.videoId,
        videoTitle: item.snippet.title,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        videoDuration: parseVideoDuration(
          videosData[index].contentDetails.duration
        ),
        videoViews: convertRawViewstoString(
          videosData[index].statistics.viewCount
        ),
        videoAge: timeSince(new Date(item.snippet.publishedAt)),
        channelInfo: {
          id: item.snippet.channelId,
          name: item.snippet.channelTitle,
        },
      });
    });

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
export const parseDataVideoDetails = async (item: {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: Date;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
}) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${BASE_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  return {
    videoId: item.id,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description,
    videoViews: parseInt(item.statistics.viewCount).toLocaleString(),
    videoLikes: convertRawViewstoString(item.statistics.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViewstoString(subscriberCount, true),
    },
  };
};
