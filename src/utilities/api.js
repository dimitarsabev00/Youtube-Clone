import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";
const YOUTUBE_API_KEY = "d19c2a403amsh0d28099a9a6b254p1a5ef7jsnc96f5f79843f";

const options = {
  params: { hl: "en", gl: "US" },
  headers: {
    "X-RapidAPI-Key": YOUTUBE_API_KEY,
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

export const fetchDataFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
