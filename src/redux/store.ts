import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth.reducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Định nghĩa RootState
export type RootState = ReturnType<typeof store.getState>;

// Định nghĩa AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
