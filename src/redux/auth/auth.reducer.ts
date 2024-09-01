import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface AuthTypes {
  error: any;
  loading: boolean;
  user: any;
  searchUser: any;
  userById: any;
  suggestUsers: any;
}

const initialState: AuthTypes = {
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
    // Move the extraReducers logic to a separate function
    addAuthCases(builder);
  },
});

// Define a function to add the extra reducers
export function addAuthCases(builder: any) {
  // login
  builder
    .addCase("auth/login/pending", (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("auth/login/fulfilled", (state: any, action: any) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("auth/login/rejected", (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // register
  builder
    .addCase("auth/register/pending", (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("auth/register/fulfilled", (state: any, action: any) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("auth/register/rejected", (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // fetch user profile
  builder
    .addCase("auth/fetchUserProfile/pending", (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("auth/fetchUserProfile/fulfilled", (state: any, action: any) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("auth/fetchUserProfile/rejected", (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
      state.user = null; // Clear user data on rejection
    });

  // forgot password
  builder
    .addCase("auth/forgotPassword/pending", (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("auth/forgotPassword/fulfilled", (state: any) => {
      state.loading = false;
    })
    .addCase("auth/forgotPassword/rejected", (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // reset password
  builder
    .addCase("auth/resetPassword/pending", (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("auth/resetPassword/fulfilled", (state: any) => {
      state.loading = false;
    })
    .addCase("auth/resetPassword/rejected", (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // verify email
  builder
    .addCase("auth/verifyEmail/pending", (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("auth/verifyEmail/fulfilled", (state: any) => {
      state.loading = false;
      state.error = null;
    })
    .addCase("auth/verifyEmail/rejected", (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // logout
  builder.addCase("auth/logout/fulfilled", (state: any) => {
    state.user = null;
    state.error = null;
  });

  // Add case for clearUserData
  builder.addCase("auth/clearUserData/fulfilled", (state: any) => {
    state.user = null;
    state.error = null;
  });
}

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], // Chỉ lưu trữ trạng thái 'user'
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
