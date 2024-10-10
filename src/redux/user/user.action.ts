import editProfileSchema from "@/schema/editProfileSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { z } from "zod";
import { persistor } from "../store";
import changePasswordSchema from "@/schema/changePasswordSchema";
import changeEmailSchema from "@/schema/changeEmailSchema";

interface ProfileResponse {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  background: string;
  date_of_birth: Date;
  email: string;
  email_verified_at: Date;
  country: string;
  updated_at: Date;
  created_at: Date;
  userFollow: any;
  userFollower: any;
  userBlock: any;
  friends: any;
  countPost: number;
}

interface UpdateProfileResponse {
  // Add fields returned by the update profile API
}

interface ChangePasswordResponse {
  // Add fields returned by the change password API
}

interface ChangeEmailResponse {
  // Add fields returned by the change email API
}

const apiRequest = async (url: string, method: string, accessToken: string) => {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || "An unknown error occurred");
  }
};

export const getUserProfileAction = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>("user/getUserProfile", async (userId, { rejectWithValue }) => {
  try {
    const accessToken = Cookies.get("access_token");
    if (!accessToken)
      return rejectWithValue("No access token found. Please log in again.");

    return await apiRequest(
      `https://backend-social-laravel.vercel.app/api/api/users/${userId}`,
      "GET",
      accessToken
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching the user profile."
    );
  }
});

export const fetchAuthUserInfoAction = createAsyncThunk<
  ProfileResponse, // Success type
  void, // Input type (no input)
  { rejectValue: string } // Rejected value type
>(
  "user/fetchAuthUserInfoAction",
  async (
    _,
    { rejectWithValue }
  ): Promise<ProfileResponse | ReturnType<typeof rejectWithValue>> => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      return rejectWithValue("No access token found. Please log in again.");
    }
    try {
      const response = await apiRequest(
        "https://backend-social-laravel.vercel.app/api/api/users/authUserInfo",
        "GET",
        accessToken
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred while fetching the profile."
      );
    }
  }
);

export const followUserAction = createAsyncThunk<
  any,
  number,
  { rejectValue: string; dispatch: any }
>("user/followUser", async (userId, { rejectWithValue, dispatch }) => {
  try {
    const accessToken = Cookies.get("access_token");
    if (!accessToken)
      return rejectWithValue("No access token found. Please log in again.");
    const response = await apiRequest(
      `https://backend-social-laravel.vercel.app/api/api/users/follow/${userId}`,
      "POST",
      accessToken
    );

    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "An error occurred while following the user."
    );
  }
});

export const blockUserAction = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>("user/blockUser", async (userId, { rejectWithValue }) => {
  try {
    const accessToken = Cookies.get("access_token");
    if (!accessToken)
      return rejectWithValue("No access token found. Please log in again.");

    return await apiRequest(
      `https://backend-social-laravel.vercel.app/api/api/users/block/${userId}`,
      "POST",
      accessToken
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "An error occurred while blocking the user."
    );
  }
});

const handleUserAction = async <T>(
  actionType: "updateProfile" | "changePassword" | "changeEmail",
  userId: number,
  data: any,
  schema: z.ZodSchema<any>
): Promise<T> => {
  try {
    schema.parse(data);
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      throw new Error("No access token found. Please log in again.");
    }

    const endpoint = {
      updateProfile: `users/${userId}`,
      changePassword: `users/changePwd/${userId}`,
      changeEmail: `users/changeEmail/${userId}`,
    }[actionType];

    const response = await fetch(
      `https://backend-social-laravel.vercel.app/api/api/${endpoint}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      if (actionType === "changePassword") {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        await persistor.purge();
      }
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unknown error occurred");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
};

export const updateUserProfileAction = createAsyncThunk<
  UpdateProfileResponse,
  { userId: number; userData: z.infer<typeof editProfileSchema> },
  { rejectValue: string }
>(
  "auth/updateUserProfile",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      return await handleUserAction<UpdateProfileResponse>(
        "updateProfile",
        userId,
        userData,
        editProfileSchema
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const changePasswordAction = createAsyncThunk<
  ChangePasswordResponse,
  { userId: number } & z.infer<typeof changePasswordSchema>,
  { rejectValue: string }
>(
  "auth/changePassword",
  async ({ userId, ...passwordData }, { rejectWithValue }) => {
    try {
      return await handleUserAction<ChangePasswordResponse>(
        "changePassword",
        userId,
        passwordData,
        changePasswordSchema
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const changeEmailAction = createAsyncThunk<
  ChangeEmailResponse,
  { userId: number } & z.infer<typeof changeEmailSchema>,
  { rejectValue: string }
>("auth/changeEmail", async ({ userId, ...emailData }, { rejectWithValue }) => {
  try {
    return await handleUserAction<ChangeEmailResponse>(
      "changeEmail",
      userId,
      emailData,
      changeEmailSchema
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});
