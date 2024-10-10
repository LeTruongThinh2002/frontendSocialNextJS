import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { authReducer, AuthTypes } from "./auth/auth.reducer";
import postReducer from "./post/post.reducer";
import newsReducer from "./news/news.reducer";
import reelReducer from "./reel/reel.reducer";
import { userReducer } from "./user/user.reducer";

// Tạo store
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    news: newsReducer,
    reel: reelReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Tạo persistor
export const persistor = persistStore(store);

// Định nghĩa RootState
export interface RootState {
  auth: AuthTypes;
  post: ReturnType<typeof postReducer>;
  news: ReturnType<typeof newsReducer>;
  reel: ReturnType<typeof reelReducer>;
  user: ReturnType<typeof userReducer>;
}

// Định nghĩa AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
