import { configureStore } from "@reduxjs/toolkit";

import tracker from "./tracker";
import counter from "./counter";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: {
    tracker,
    counter
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
