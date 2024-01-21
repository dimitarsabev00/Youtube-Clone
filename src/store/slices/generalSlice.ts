import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../Types";
import store from "..";

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
