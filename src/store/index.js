import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice.js";

export * from "./slices/generalSlice";

const store = configureStore({
  reducer: {
    generalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["generalSlice/setModal"],
        ignoredPaths: ["generalSlice.modal"],
      },
    }),
});

export default store;
