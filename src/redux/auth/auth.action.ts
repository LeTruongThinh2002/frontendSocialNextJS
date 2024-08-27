// redux/auth/auth.action.ts
import { FormSchemaLogin } from "@/app/login/page";
import { FormSchemaRegister } from "@/app/register/page";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { z } from "zod";
// Define types for the expected response of each thunk
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires: number;
}

interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  expires: number;
}

interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  // Add any other fields that the profile API returns
}

// Thunk for login
export const loginUserAction = createAsyncThunk<
  LoginResponse, // Success type
  z.infer<typeof FormSchemaLogin>, // Input type
  { rejectValue: string } // Rejected value type
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("http://spider.jp/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      Cookies.set("access_token", data.access_token, { expires: 1 / 24 });
      Cookies.set("refresh_token", data.refresh_token, { expires: 30 });
      return data;
    } else {
      const errorData = await response.json();
      return rejectWithValue(errorData.error || "An unknown error occurred");
    }
  } catch (error) {
    return rejectWithValue("An error occurred during login.");
  }
});

// Thunk for register
export const registerUserAction = createAsyncThunk<
  RegisterResponse, // Success type
  z.infer<typeof FormSchemaRegister>, // Input type
  { rejectValue: string } // Rejected value type
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("http://spider.jp/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      Cookies.set("access_token", data.access_token, { expires: 1 / 24 });
      Cookies.set("refresh_token", data.refresh_token, { expires: 30 });
      return data;
    } else {
      const errorData = await response.json();
      return rejectWithValue(errorData.error || "An unknown error occurred");
    }
  } catch (error) {
    return rejectWithValue("An error occurred during registration.");
  }
});

export const fetchUserProfileAction = createAsyncThunk<
  ProfileResponse, // Success type
  void, // Input type (no input)
  { rejectValue: string } // Rejected value type
>(
  "auth/fetchUserProfile",
  async (
    _,
    { rejectWithValue }
  ): Promise<ProfileResponse | ReturnType<typeof rejectWithValue>> => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      try {
        const response = await fetch("http://spider.jp/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userData: ProfileResponse = await response.json();
          return userData;
        } else {
          const refreshToken = Cookies.get("refresh_token");

          if (refreshToken) {
            const refreshResponse = await fetch(
              "http://spider.jp/api/auth/refresh",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
              }
            );

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              Cookies.set("access_token", refreshData.access_token, {
                expires: 1 / 24,
              });

              // Retry fetching user data after refreshing token
              const retryResponse = await fetch(
                "http://spider.jp/api/auth/profile",
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${refreshData.access_token}`,
                  },
                }
              );

              if (retryResponse.ok) {
                const retryUserData: ProfileResponse =
                  await retryResponse.json();
                return retryUserData;
              } else {
                return rejectWithValue(
                  "Failed to fetch user profile after token refresh."
                );
              }
            } else {
              Cookies.remove("access_token");
              Cookies.remove("refresh_token");
              return rejectWithValue(
                "Invalid refresh token. Please log in again."
              );
            }
          } else {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            return rejectWithValue(
              "No refresh token found. Please log in again."
            );
          }
        }
      } catch (error) {
        return rejectWithValue("An error occurred while fetching the profile.");
      }
    } else {
      const refreshToken = Cookies.get("refresh_token");

      if (refreshToken) {
        const refreshResponse = await fetch(
          "http://spider.jp/api/auth/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          }
        );

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          Cookies.set("access_token", refreshData.access_token, {
            expires: 1 / 24,
          });

          // Retry fetching user data after refreshing token
          const retryResponse = await fetch(
            "http://spider.jp/api/auth/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${refreshData.access_token}`,
              },
            }
          );

          if (retryResponse.ok) {
            const retryUserData: ProfileResponse = await retryResponse.json();
            return retryUserData;
          } else {
            return rejectWithValue(
              "Failed to fetch user profile after token refresh."
            );
          }
        } else {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          return rejectWithValue("Invalid refresh token. Please log in again.");
        }
      } else {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return rejectWithValue("No refresh token found. Please log in again.");
      }
    }
  }
);

// Thunk for forgot password
export const forgotPasswordAction = createAsyncThunk(
  "auth/forgotPassword",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await fetch("http://spider.jp/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        return {
          success: true,
          message: "Send email reset successfully!",
        };
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "An unknown error occurred");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for reset password
export const resetPasswordAction = createAsyncThunk(
  "auth/resetPassword",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await fetch("http://spider.jp/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        return {
          success: true,
          message: "Reset password successfully!",
        };
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "An unknown error occurred");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyEmailAction = createAsyncThunk(
  "auth/verifyEmail",
  async (
    {
      id,
      token,
      expires,
      signature,
    }: { id: string; token: string; expires: string; signature: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://spider.jp/api/auth/email/verify/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expires, signature }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An unknown error occurred");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for logout
export const logoutAction = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  return null;
});
