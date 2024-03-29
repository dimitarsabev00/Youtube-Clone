import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../Types";
import store from "..";
import { getHomePageVideos } from "../reducers/getHomePageVideos";
import { getSearchPageVideos } from "../reducers/getSearchPageVideos";
import { getVideoDetails } from "../reducers/getVideoDetails";
import { getRecommendedVideos } from "../reducers/getRecommendedVideos";
import { loginUserWithGoogle } from "../reducers/loginWithGoogle";

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
  user: JSON.parse(localStorage.getItem('currentUser')) || null,
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload.parsedData;
    });
    builder.addCase(loginUserWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  generalSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
