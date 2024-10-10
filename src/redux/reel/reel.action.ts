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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText);
  }

  if (method === "DELETE") {
    return url.split("/").pop();
  }

  return response.json();
};

export const likeReel = createAsyncThunk(
  "reels/likeReel",
  async (reelId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/like/${reelId}`,
      "POST"
    );
  }
);

// Fetch latest reels
export const fetchReels = createAsyncThunk("reels/fetchReels", async () => {
  return authenticatedRequest(
    "https://backend-social-laravel.vercel.app/api/api/reels",
    "GET"
  );
});

// Create a new reel
export const createReel = createAsyncThunk(
  "reels/createReel",
  async (reelData: any) => {
    return authenticatedRequest(
      "https://backend-social-laravel.vercel.app/api/api/reels",
      "POST",
      reelData
    );
  }
);

// Fetch a specific reel
export const fetchReel = createAsyncThunk(
  "reels/fetchReel",
  async (reelId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/${reelId}`,
      "GET"
    );
  }
);

// Update a reel
export const updateReel = createAsyncThunk(
  "reels/updateReel",
  async ({ reelId, reelData }: { reelId: string; reelData: any }) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/${reelId}`,
      "PUT",
      reelData
    );
  }
);

// Delete a reel
export const deleteReel = createAsyncThunk(
  "reels/deleteReel",
  async (reelId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/${reelId}`,
      "DELETE"
    );
  }
);

// Fetch reels of a specific user
export const fetchUserReels = createAsyncThunk(
  "reels/fetchUserReels",
  async (userId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/${userId}/getReels`,
      "GET"
    );
  }
);

// Fetch comments for a reel
export const fetchReelComments = createAsyncThunk(
  "reels/fetchReelComments",
  async (reelId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/${reelId}/comments`,
      "GET"
    );
  }
);

// Create a comment for a reel
export const createReelComment = createAsyncThunk(
  "reels/createReelComment",
  async (commentData: any) => {
    return authenticatedRequest(
      "https://backend-social-laravel.vercel.app/api/api/reels/comments",
      "POST",
      commentData
    );
  }
);

// Like a reel comment
export const likeReelComment = createAsyncThunk(
  "reels/likeReelComment",
  async (commentId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/comments/like/${commentId}`,
      "POST"
    );
  }
);

// Update a reel comment
export const updateReelComment = createAsyncThunk(
  "reels/updateReelComment",
  async ({
    commentId,
    commentData,
  }: {
    commentId: string;
    commentData: any;
  }) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/comments/${commentId}`,
      "PUT",
      commentData
    );
  }
);

// Delete a reel comment
export const deleteReelComment = createAsyncThunk(
  "reels/deleteReelComment",
  async (commentId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/reels/comments/${commentId}`,
      "DELETE"
    );
  }
);
