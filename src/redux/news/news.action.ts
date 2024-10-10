import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Helper function to make authenticated requests
const authenticatedRequest = async (
  url: string,
  method: string,
  body?: any
) => {
  const accessToken = Cookies.get("access_token");
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// Create a new news item
export const createNews = createAsyncThunk(
  "news/createNews",
  async (newsData: any) => {
    return authenticatedRequest(
      "https://backend-social-laravel.vercel.app/api/api/news",
      "POST",
      newsData
    );
  }
);

// Fetch latest news from followed users
export const fetchLatestNews = createAsyncThunk(
  "news/fetchLatestNews",
  async () => {
    return authenticatedRequest(
      "https://backend-social-laravel.vercel.app/api/api/news/latestNews",
      "GET"
    );
  }
);

// Fetch a specific news item
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (newsId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/news/${newsId}`,
      "GET"
    );
  }
);

// Update a news item
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ newsId, newsData }: { newsId: string; newsData: any }) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/news/${newsId}`,
      "PUT",
      newsData
    );
  }
);

// Delete a news item
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (newsId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/news/${newsId}`,
      "DELETE"
    );
  }
);

// Fetch news of a specific user
export const fetchUserNews = createAsyncThunk(
  "news/fetchUserNews",
  async (userId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/news/${userId}/user`,
      "GET"
    );
  }
);
