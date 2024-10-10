import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface AuthTypes {
  error: any;
  loading: boolean;
  user: any;
}

const initialState: AuthTypes = {
  error: null,
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAuthCases(builder);
  },
});
const addAuthCases = (builder: any) => {
  // Giữ lại các case liên quan đến user đang đăng nhập
  builder
    // login
    .addCase(
      "auth/login/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "auth/login/fulfilled",
      (state: { loading: boolean; user: any }, action: { payload: any }) => {
        state.loading = false;
      }
    )
    .addCase(
      "auth/login/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    )
    // fetchUserProfile
    .addCase(
      "auth/fetchUserProfile/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "auth/fetchUserProfile/fulfilled",
      (state: { loading: boolean; user: any }, action: { payload: any }) => {
        state.loading = false;
        state.user = action.payload;
      }
    )
    .addCase(
      "auth/fetchUserProfile/rejected",
      (
        state: { loading: boolean; user: any; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
      }
    )
    // logout
    .addCase("auth/logout/fulfilled", (state: { user: null; error: null }) => {
      state.user = null;
      state.error = null;
    })

    .addCase(
      "auth/destroyAccount/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "auth/destroyAccount/fulfilled",
      (state: { loading: boolean; user: any; error: null }) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      }
    )
    .addCase(
      "auth/destroyAccount/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
};

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
