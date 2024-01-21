import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utilities/constants";
import { parseDataVideoDetails } from "../../utilities";

export const getVideoDetails = createAsyncThunk(
  "yotubeApp/videoDetails",
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `${BASE_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    return parseDataVideoDetails(items[0]);
  }
);
