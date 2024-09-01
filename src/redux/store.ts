import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { addAuthCases, AuthTypes } from "./auth/auth.reducer";
import { createSlice } from "@reduxjs/toolkit";

// Create a temporary slice to hold the auth reducer
const tempAuthSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    addAuthCases(builder);
  },
});

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
};

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, tempAuthSlice.reducer);

// Tạo store
const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tạo persistor
export const persistor = persistStore(store);

// Định nghĩa RootState
export interface RootState {
  auth: AuthTypes;
}

// Định nghĩa AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
