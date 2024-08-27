import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserAction,
  registerUserAction,
  fetchUserProfileAction,
  forgotPasswordAction,
  resetPasswordAction,
  logoutAction,
  verifyEmailAction,
} from "./auth.action";

interface Types {
  error: any;
  loading: boolean;
  user: any;
  searchUser: any;
  userById: any;
  suggestUsers: any;
}

const initialState: Types = {
  error: null,
  loading: false,
  user: null,
  searchUser: [],
  userById: null,
  suggestUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Các actions khác...
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // register
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetch user profile
    builder
      .addCase(fetchUserProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // forgot password
    builder
      .addCase(forgotPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // reset password
    builder
      .addCase(resetPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //verify
    builder
      .addCase(verifyEmailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // logout
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.user = null;
      state.error = null;
    });
  },
});

export const authReducer = authSlice.reducer;
