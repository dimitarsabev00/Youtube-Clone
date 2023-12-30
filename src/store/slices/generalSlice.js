import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loadingText: "Loading...",
  modal: { isOpen: false, type: "", props: {} },
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setGeneralFields: (state, { payload }) => ({ ...state, ...payload }),
    startLoading: (state) => ({ ...state, loading: true }),
    stopLoading: (state) => ({ ...state, loading: false }),
    setLoadingText: (state, { payload }) => ({
      ...state,
      loadingText: payload,
    }),
    setModal: (state, { payload }) => ({ ...state, modal: payload }),
  },
});

export const {
  setGeneralFields,
  startLoading,
  stopLoading,
  setLoadingText,
  setModal,
} = generalSlice.actions;

export default generalSlice.reducer;
