// services/auth.js
import { FormSchemaLogin } from "@/app/login/page";
import { FormSchemaRegister } from "@/app/register/page";
import Cookies from "js-cookie";
import { z } from "zod";

export const login = async (credentials: z.infer<typeof FormSchemaLogin>) => {
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
      Cookies.set("access_token", data.access_token, {
        expires: data.expires / 60 / 60 / 24,
      }); // expires in 1 hour
      Cookies.set("refresh_token", data.refresh_token, { expires: 30 }); // expires in 30 days
      return true;
    } else {
      // Handle error response
      console.error("Login failed");
      return false;
    }
  } catch (error) {
    console.error("Error logging in", error);
    return false;
  }
};

export const register = async (
  credentials: z.infer<typeof FormSchemaRegister>
) => {
  try {
    const response = await fetch("http://spider.jp/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (response.ok) {
      const data = await response.json();
      Cookies.set("access_token", data.access_token, {
        expires: data.expires / 60 / 60 / 24,
      }); // expires in 1 hour
      Cookies.set("refresh_token", data.refresh_token, { expires: 30 }); // expires in 30 days
      return true;
    } else {
      // Handle error response
      console.error("Register failed");
      return false;
    }
  } catch (error) {
    console.error("Error logging in", error);
    return false;
  }
};

export const fetchUser = async () => {
  const accessToken = Cookies.get("access_token");
  if (accessToken) {
    try {
      const response = await fetch("http://spider.jp/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else if (response.status === 401) {
        const refreshToken = Cookies.get("refresh_token");
        if (refreshToken) {
          const refreshResponse = await fetch(
            "http://spider.jp/api/auth/refresh",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: refreshToken }),
            }
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            Cookies.set("access_token", refreshData.access_token, {
              expires: 1 / 24,
            });
            Cookies.set("refresh_token", refreshData.refresh_token, {
              expires: 30,
            });
            fetchUser(); // Retry fetching user data
          } else {
            // Refresh token is invalid, clear cookies and redirect to login
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            return false;
          }
        } else {
          // No refresh token, clear cookies and redirect to login
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          return false;
        }
      }
    } catch (error) {
      console.error("Error fetching user", error);
      return false;
    }
  } else {
    return false;
  }
};
export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};
