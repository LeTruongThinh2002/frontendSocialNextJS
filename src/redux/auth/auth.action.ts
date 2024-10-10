// redux/auth/auth.action.ts
import forgotPasswordSchema from "@/schema/forgotPasswordSchema";
import loginSchema from "@/schema/loginSchema";
import registerSchema from "@/schema/registerSchema";
import resetPasswordSchema from "@/schema/resetPasswordSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { z } from "zod";
import { persistor } from "../store"; // Import persistor from your store file
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
  first_name: string;
  last_name: string;
  avatar: string;
  background: string;
  email: string;
  email_verified_at: Date;
  country: string;
  updated_at: Date;
  created_at: Date;
  // Add any other fields that the profile API returns
}

// New interfaces for the new actions

// Thunk for login
export const loginUserAction = createAsyncThunk<
  LoginResponse, // Success type
  z.infer<typeof loginSchema>, // Input type
  { rejectValue: string } // Rejected value type
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    // Validate the credentials using the schema
    loginSchema.parse(credentials);
    const response = await fetch(
      "https://backend-social-laravel.vercel.app/api/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

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
    if (error instanceof z.ZodError) {
      return rejectWithValue(error.errors[0].message);
    }
    return rejectWithValue("An error occurred during the login process.");
  }
});

// Thunk for register
export const registerUserAction = createAsyncThunk<
  RegisterResponse, // Success type
  z.infer<typeof registerSchema>, // Input type
  { rejectValue: string } // Rejected value type
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    // Validate the credentials using the schema
    registerSchema.parse(credentials);
    const response = await fetch(
      "https://backend-social-laravel.vercel.app/api/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const accessTokenExpiry = new Date(
        new Date().getTime() + 1 * 60 * 60 * 1000
      ); // 1 hour
      const refreshTokenExpiry = new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      ); // 30 days

      Cookies.set("access_token", data.access_token, {
        expires: accessTokenExpiry,
      });
      Cookies.set("refresh_token", data.refresh_token, {
        expires: refreshTokenExpiry,
      });
      return data;
    } else {
      const errorData = await response.json();
      return rejectWithValue(errorData.error || "An unknown error occurred");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return rejectWithValue(error.errors[0].message);
    }
    return rejectWithValue("An error occurred during the register process.");
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
        const response = await fetch(
          "https://backend-social-laravel.vercel.app/api/api/auth/fetchProfile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const userData: ProfileResponse = await response.json();
          return userData;
        } else {
          const refreshToken = Cookies.get("refresh_token");

          if (refreshToken) {
            const refreshResponse = await fetch(
              "https://backend-social-laravel.vercel.app/api/api/auth/refresh",
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
              const accessTokenExpiry = new Date(
                new Date().getTime() + 1 * 60 * 60 * 1000
              ); // 1 hour

              Cookies.set("access_token", refreshData.access_token, {
                expires: accessTokenExpiry,
              });

              // Retry fetching user data after refreshing token
              const retryResponse = await fetch(
                "https://backend-social-laravel.vercel.app/api/api/auth/profile",
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
          "https://backend-social-laravel.vercel.app/api/api/auth/refresh",
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
          const accessTokenExpiry = new Date(
            new Date().getTime() + 1 * 60 * 60 * 1000
          ); // 1 hour

          Cookies.set("access_token", refreshData.access_token, {
            expires: accessTokenExpiry,
          });

          // Retry fetching user data after refreshing token
          const retryResponse = await fetch(
            "https://backend-social-laravel.vercel.app/api/api/auth/profile",
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

const handlePasswordAction = async (
  actionType: "forgotPassword" | "resetPassword",
  credentials:
    | z.infer<typeof forgotPasswordSchema>
    | z.infer<typeof resetPasswordSchema>,
  schema: typeof forgotPasswordSchema | typeof resetPasswordSchema
) => {
  try {
    schema.parse(credentials);
    const response = await fetch(
      `https://backend-social-laravel.vercel.app/api/api/auth/${actionType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (response.ok) {
      return {
        success: true,
        message: `${
          actionType === "forgotPassword"
            ? "Send email reset"
            : "Reset password"
        } successfully!`,
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unknown error occurred");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw new Error(`An error occurred during the ${actionType} process.`);
  }
};

export const forgotPasswordAction = createAsyncThunk<
  any,
  z.infer<typeof forgotPasswordSchema>,
  { rejectValue: string }
>("auth/forgotPassword", async (credentials, { rejectWithValue }) => {
  try {
    return await handlePasswordAction(
      "forgotPassword",
      credentials,
      forgotPasswordSchema
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const resetPasswordAction = createAsyncThunk<
  any,
  z.infer<typeof resetPasswordSchema>,
  { rejectValue: string }
>("auth/resetPassword", async (credentials, { rejectWithValue }) => {
  try {
    return await handlePasswordAction(
      "resetPassword",
      credentials,
      resetPasswordSchema
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

// Thunk for verify email
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
        `https://backend-social-laravel.vercel.app/api/api/auth/email/verify/${id}/${token}`,
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
export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    // Remove cookies
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    // Clear persisted state
    await persistor.purge();

    // Reset the entire Redux store (optional, depending on your needs)
    // dispatch({ type: 'RESET_STORE' });

    return null;
  }
);

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
    throw new Error(errorData.message || "An unknown error occurred");
  }
};

export const destroyAccountAction = createAsyncThunk<
  any,
  { userId: number },
  { rejectValue: string }
>("user/destroyAccount", async ({ userId }, { rejectWithValue }) => {
  try {
    const accessToken = Cookies.get("access_token");
    if (!accessToken)
      return rejectWithValue("No access token found. Please log in again.");

    return await apiRequest(
      `https://backend-social-laravel.vercel.app/api/api/users/${userId}`,
      "DELETE",
      accessToken
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "An error occurred while destroying the account."
    );
  }
});
