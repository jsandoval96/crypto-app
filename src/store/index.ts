import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

import { loadFromLocalStorage, saveToLocalStorage } from "@app/services/utils";
import authReducer from "@app/store/auth";

const APP_NAME = import.meta.env.VITE_APP_NAME;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: loadFromLocalStorage(APP_NAME),
});

store.subscribe(() => saveToLocalStorage(APP_NAME, store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
