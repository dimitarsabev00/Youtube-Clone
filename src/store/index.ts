import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice.ts";

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
