import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as postActions from "./post.action";

export interface PostState {
  posts: any | null;
  followedPosts: any | null;
  currentPost: any | null;
  topPosts: any[];
  userPosts: any[];
  comments: any[];
  loading: boolean;
  error: string | null;
  topPostsLoading: boolean;
  topPostsError: string | null;
}

const initialState: PostState = {
  posts: null,
  followedPosts: null,
  currentPost: null,
  topPosts: [],
  userPosts: [],
  comments: [],
  loading: false,
  error: null,
  topPostsLoading: false,
  topPostsError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addPostCases(builder);
  },
});

export const addPostCases = (builder: any) => {
  builder
    // Fetch all posts
    .addCase(postActions.fetchPosts.pending, (state: PostState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      postActions.fetchPosts.fulfilled,
      (
        state: { loading: boolean; posts: any; error: null },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchPosts.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Create a new post
    .addCase(
      postActions.createPost.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.createPost.fulfilled,
      (
        state: { loading: boolean; posts: any[]; error: null },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.posts.unshift(action.payload);
        state.error = null;
      }
    )
    .addCase(
      postActions.createPost.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Fetch posts from followed users
    .addCase(
      postActions.fetchFollowedPosts.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchFollowedPosts.fulfilled,
      (
        state: {
          loading: boolean;
          followedPosts: any;
          error: any;
        },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.followedPosts = action.payload;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchFollowedPosts.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Fetch a specific post
    .addCase(
      postActions.fetchPost.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchPost.fulfilled,
      (
        state: { loading: boolean; currentPost: any; error: null },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.currentPost = action.payload;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchPost.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Update a post
    .addCase(
      postActions.updatePost.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.updatePost.fulfilled,
      (
        state: {
          loading: boolean;
          posts: any[];
          currentPost: { id: any };
          error: null;
        },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post: { id: any }) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost && state.currentPost.id === action.payload.id) {
          state.currentPost = action.payload;
        }
        state.error = null;
      }
    )
    .addCase(
      postActions.updatePost.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Delete a post
    .addCase(
      postActions.deletePost.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.deletePost.fulfilled,
      (
        state: {
          loading: boolean;
          posts: any[];
          currentPost: { id: string } | null;
          error: null;
        },
        action: PayloadAction<string>
      ) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post: { id: string }) => post.id !== action.payload
        );
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost = null;
        }
        state.error = null;
      }
    )
    .addCase(
      postActions.deletePost.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Like a post
    .addCase(
      postActions.likePostAction.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.likePostAction.fulfilled,
      (
        state: {
          loading: boolean;
          posts: any[];
          userPosts: any[];
          error: null;
        },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.posts =
          state.posts.length > 0
            ? state.posts.map((post: { id: any }) => {
                if (post.id === action.payload.data.id) {
                  return action.payload.data;
                }
                return post;
              })
            : [];
        state.userPosts =
          state.userPosts.length > 0
            ? state.userPosts.map((post: { id: any }) => {
                if (post.id === action.payload.data.id) {
                  return action.payload.data;
                }
                return post;
              })
            : [];
        state.error = null;
      }
    )
    .addCase(
      postActions.likePostAction.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Fetch top posts of a specific user
    .addCase(
      postActions.fetchTopPosts.pending,
      (state: { topPostsLoading: boolean; topPostsError: null }) => {
        state.topPostsLoading = true;
        state.topPostsError = null;
      }
    )
    .addCase(
      postActions.fetchTopPosts.fulfilled,
      (
        state: {
          topPostsLoading: boolean;
          topPosts: any[];
          topPostsError: null;
        },
        action: PayloadAction<{ data: any[] }>
      ) => {
        state.topPostsLoading = false;
        state.topPosts = action.payload.data;
        state.topPostsError = null;
      }
    )
    .addCase(
      postActions.fetchTopPosts.rejected,
      (
        state: { topPostsLoading: boolean; topPostsError: any },
        action: { error: { message: string } }
      ) => {
        state.topPostsLoading = false;
        state.topPostsError = action.error.message || "An error occurred";
      }
    )

    // Fetch posts of a specific user
    .addCase(
      postActions.fetchUserPosts.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchUserPosts.fulfilled,
      (
        state: { loading: boolean; posts: any; userPosts: any[]; error: null },
        action: PayloadAction<{ data: any[] }>
      ) => {
        state.loading = false;
        state.posts = { ...state.posts, ...action.payload.data };
        state.userPosts = action.payload.data;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchUserPosts.rejected,
      (
        state: { loading: boolean; userPosts: never[]; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.userPosts = [];
        state.error = action.error.message || "An error occurred";
      }
    )

    // Fetch comments for a post
    .addCase(
      postActions.fetchComments.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchComments.fulfilled,
      (
        state: { loading: boolean; comments: any[]; error: null },
        action: PayloadAction<{ data: any[] }>
      ) => {
        state.loading = false;
        state.comments = action.payload.data;
        state.error = null;
      }
    )
    .addCase(
      postActions.fetchComments.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Create a comment
    .addCase(
      postActions.createComment.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.createComment.fulfilled,
      (
        state: { loading: boolean; comments: any[]; error: null },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.comments = action.payload.data.parent_comment_id
          ? state.comments.map((comment: { id: any; reply: any }) => {
              if (comment.id === action.payload.data.parent_comment_id) {
                return {
                  ...comment,
                  reply: comment.reply
                    ? [...comment.reply, action.payload.data]
                    : [action.payload.data],
                };
              }
              return comment;
            })
          : [action.payload.data, ...state.comments];
        state.error = null;
      }
    )
    .addCase(
      postActions.createComment.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Like a comment
    .addCase(
      postActions.likeComment.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.likeComment.fulfilled,
      (
        state: { loading: boolean; comments: any[]; error: null },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        const data = action.payload;

        if (data) {
          const { id, parent_comment_id } = data;

          if (parent_comment_id) {
            state.comments = state.comments.map(
              (comment: { id: any; reply: any[] }) => {
                if (comment.id === parent_comment_id) {
                  return {
                    ...comment,
                    reply: comment.reply.map((reply: any) => {
                      if (reply.id === id) {
                        return data;
                      }
                      return reply;
                    }),
                  };
                }
                return comment;
              }
            );
          } else {
            const index = state.comments.findIndex(
              (comment: { id: any }) => comment.id === id
            );
            if (index !== -1) {
              state.comments[index] = data;
            }
          }
        }

        state.error = null;
      }
    )
    .addCase(
      postActions.likeComment.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Update a comment
    .addCase(
      postActions.updateComment.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.updateComment.fulfilled,
      (
        state: { loading: boolean; comments: any[]; error: null },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.comments = action.payload.data.parent_comment_id
          ? state.comments.map((comment: { id: any; reply: any }) => {
              if (comment.id === action.payload.data.parent_comment_id) {
                return {
                  ...comment,
                  reply: comment.reply
                    ? [...comment.reply, action.payload.data]
                    : [action.payload.data],
                };
              }
              return comment;
            })
          : [action.payload.data, ...state.comments];
        state.error = null;
      }
    )
    .addCase(
      postActions.updateComment.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    )

    // Delete a comment
    .addCase(
      postActions.deleteComment.pending,
      (state: { loading: boolean; error: null }) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addCase(
      postActions.deleteComment.fulfilled,
      (
        state: { loading: boolean; comments: any[]; error: null },
        action: PayloadAction<string>
      ) => {
        state.loading = false;
        const deletedCommentId = action.payload;

        // Function to remove comment from replies
        const removeFromReplies = (replies: any[]) =>
          replies.filter((reply) => reply.id !== deletedCommentId);

        // Update comments array
        state.comments = state.comments.reduce(
          (acc: any, comment: { id: string; reply: any[] }) => {
            if (comment.id === deletedCommentId) {
              // If this is the comment to be deleted, don't add it to the accumulator
              return acc;
            }

            if (comment.reply) {
              // If this comment has replies, filter out the deleted comment from replies
              return [
                ...acc,
                { ...comment, reply: removeFromReplies(comment.reply) },
              ];
            }

            // If this comment is not the one to be deleted and has no replies, just add it to the accumulator
            return [...acc, comment];
          },
          []
        );

        state.error = null;
      }
    )
    .addCase(
      postActions.deleteComment.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: string } }
      ) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      }
    );
};

export default postSlice.reducer;
