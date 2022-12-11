import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./activity-slice";

const rootReducer = combineReducers({
  activity: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// types
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch