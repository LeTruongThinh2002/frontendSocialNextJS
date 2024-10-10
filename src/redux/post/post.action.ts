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

  if (method === "DELETE") {
    return url.split("/").pop();
  }

  return response.json();
};

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return authenticatedRequest(
    "https://backend-social-laravel.vercel.app/api/api/posts",
    "GET"
  );
});

// Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: any) => {
    return authenticatedRequest(
      "https://backend-social-laravel.vercel.app/api/api/posts",
      "POST",
      postData
    );
  }
);

// Fetch posts from followed users
export const fetchFollowedPosts = createAsyncThunk(
  "posts/fetchFollowedPosts",
  async () => {
    return authenticatedRequest(
      "https://backend-social-laravel.vercel.app/api/api/posts/followedPosts",
      "GET"
    );
  }
);

// Fetch a specific post
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (postId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/${postId}`,
      "GET"
    );
  }
);

// Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, postData }: { postId: string; postData: any }) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/${postId}`,
      "PUT",
      postData
    );
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/${postId}`,
      "DELETE"
    );
  }
);

// Like a post
export const likePostAction = createAsyncThunk(
  "posts/likePostAction",
  async (postId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/like/${postId}`,
      "POST"
    );
  }
);

// Fetch top posts of a specific user
export const fetchTopPosts = createAsyncThunk(
  "posts/fetchTopPosts",
  async (userId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/${userId}/top`,
      "GET"
    );
  }
);

// Fetch posts of a specific user
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/${userId}/getPosts`,
      "GET"
    );
  }
);

// Fetch comments for a post
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/${postId}/comments`,
      "GET"
    );
  }
);

// Create a comment
export const createComment = createAsyncThunk(
  "posts/createComment",
  async (commentData: any) => {
    return authenticatedRequest(
      "https://backend-social-laravel.vercel.app/api/api/posts/comments",
      "POST",
      commentData
    );
  }
);

// Like a comment
export const likeComment = createAsyncThunk(
  "posts/likeComment",
  async (commentId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/comments/like/${commentId}`,
      "POST"
    );
  }
);

// Update a comment
export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async ({
    commentId,
    commentData,
  }: {
    commentId: string;
    commentData: any;
  }) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/comments/${commentId}`,
      "PUT",
      commentData
    );
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentId: string) => {
    return authenticatedRequest(
      `https://backend-social-laravel.vercel.app/api/api/posts/comments/${commentId}`,
      "DELETE"
    );
  }
);
