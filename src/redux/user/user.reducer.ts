import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userAuth: any;
  userById: any;
  recommendUser: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userAuth: null,
  userById: null,
  recommendUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addUserCases(builder);
  },
});

const addUserCases = (builder: any) => {
  builder
    .addCase(
      "user/getUserProfile/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/getUserProfile/fulfilled",
      (
        state: { loading: boolean; userById: any; error: null },
        action: { payload: any }
      ) => {
        state.loading = false;
        state.userById = action.payload.data;
        state.error = null;
      }
    )
    .addCase(
      "user/getUserProfile/rejected",
      (
        state: { loading: boolean; error: string; userById: null },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    )

    // get AuthUser
    .addCase(
      "user/fetchAuthUserInfoAction/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/fetchAuthUserInfoAction/fulfilled",
      (
        state: { loading: boolean; userAuth: any; error: null },
        action: { payload: any }
      ) => {
        state.loading = false;
        state.userAuth = action.payload;
        state.error = null;
      }
    )
    .addCase(
      "user/fetchAuthUserInfoAction/rejected",
      (
        state: { loading: boolean; error: string; userAuth: null },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
        state.userAuth = null;
      }
    )

    // follow user
    .addCase(
      "user/followUser/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/followUser/fulfilled",
      (
        state: { loading: boolean; userAuth: any; error: null },
        action: { payload: any }
      ) => {
        state.loading = false;
        state.userAuth = {
          ...state.userAuth,
          userFollow: action.payload.userFollow,
        };
        state.error = null;
      }
    )
    .addCase(
      "user/followUser/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    )

    // block user
    .addCase(
      "user/blockUser/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/blockUser/fulfilled",
      (
        state: { loading: boolean; userAuth: any; error: null },
        action: { payload: any }
      ) => {
        state.loading = false;
        state.userAuth = { ...state.userAuth, userBlock: action.payload };
        state.error = null;
      }
    )
    .addCase(
      "user/blockUser/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    )

    // Update user profile (for logged-in user)
    .addCase(
      "user/updateUserProfile/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/updateUserProfile/fulfilled",
      (
        state: { loading: boolean; userAuth: any; error: null },
        action: { payload: any }
      ) => {
        state.loading = false;
        state.userAuth = {
          ...state.userAuth,
          userFollow: action.payload.userFollow,
        };
        state.error = null;
      }
    )
    .addCase(
      "user/updateUserProfile/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    )
    // Change password (for logged-in user)
    .addCase(
      "user/changePassword/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/changePassword/fulfilled",
      (state: { loading: boolean; error: null }) => {
        state.loading = false;
        state.error = null;
      }
    )
    .addCase(
      "user/changePassword/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    )
    // Change email (for logged-in user)
    .addCase(
      "user/changeEmail/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/changeEmail/fulfilled",
      (
        state: { loading: boolean; userAuth: any; error: null },
        action: { payload: { new_email: any } }
      ) => {
        state.loading = false;
        state.userAuth = { ...state.userAuth, email: action.payload.new_email };
        state.error = null;
      }
    )
    .addCase(
      "user/changeEmail/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    )

    // recommend user
    .addCase(
      "user/recommendUser/pending",
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      "user/recommendUser/fulfilled",
      (
        state: { loading: boolean; recommendUser: any; error: null },
        action: { payload: any }
      ) => {
        state.loading = false;
        state.recommendUser = action.payload.recommendUsers;
        state.error = null;
      }
    )
    .addCase(
      "user/recommendUser/rejected",
      (
        state: { loading: boolean; error: string },
        action: { payload: string }
      ) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
};

export const userReducer = userSlice.reducer;
