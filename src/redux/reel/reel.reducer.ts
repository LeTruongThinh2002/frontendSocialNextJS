import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as reelActions from "./reel.action";

export interface ReelState {
  reels: any[];
  currentReel: any | null;
  userReels: any[];
  comments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReelState = {
  reels: [],
  currentReel: null,
  userReels: [],
  comments: [],
  loading: false,
  error: null,
};

const reelSlice = createSlice({
  name: "reel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch latest reels
      .addCase(reelActions.fetchReels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.fetchReels.fulfilled,
        (state, action: PayloadAction<{ data: any[] }>) => {
          state.loading = false;
          state.reels = action.payload.data;
          state.error = null;
        }
      )
      .addCase(reelActions.fetchReels.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Create a new reel
      .addCase(reelActions.createReel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.createReel.fulfilled,
        (state, action: PayloadAction<{ data: any }>) => {
          state.loading = false;
          state.reels.unshift(action.payload.data);
          state.error = null;
        }
      )
      .addCase(reelActions.createReel.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Fetch a specific reel
      .addCase(reelActions.fetchReel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.fetchReel.fulfilled,
        (state, action: PayloadAction<{ data: any }>) => {
          state.loading = false;
          state.currentReel = action.payload.data;
          state.error = null;
        }
      )
      .addCase(reelActions.fetchReel.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Update a reel
      .addCase(reelActions.updateReel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.updateReel.fulfilled,
        (state, action: PayloadAction<{ data: any }>) => {
          state.loading = false;
          const updatedReel = action.payload.data;
          const index = state.reels.findIndex(
            (reel) => reel.id === updatedReel.id
          );
          if (index !== -1) {
            state.reels[index] = updatedReel;
          }
          if (state.currentReel && state.currentReel.id === updatedReel.id) {
            state.currentReel = updatedReel;
          }
          state.error = null;
        }
      )
      .addCase(reelActions.updateReel.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Delete a reel
      .addCase(reelActions.deleteReel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.deleteReel.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.reels = state.reels.filter(
            (reel) => reel.id !== action.payload
          );
          if (state.currentReel && state.currentReel.id === action.payload) {
            state.currentReel = null;
          }
          state.error = null;
        }
      )
      .addCase(reelActions.deleteReel.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Fetch reels of a specific user
      .addCase(reelActions.fetchUserReels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.fetchUserReels.fulfilled,
        (state, action: PayloadAction<{ data: any[] }>) => {
          state.loading = false;
          state.userReels = action.payload.data;
          state.error = null;
        }
      )
      .addCase(reelActions.fetchUserReels.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Fetch comments for a reel
      .addCase(reelActions.fetchReelComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.fetchReelComments.fulfilled,
        (state, action: PayloadAction<{ data: any[] }>) => {
          state.loading = false;
          state.comments = action.payload.data;
          state.error = null;
        }
      )
      .addCase(reelActions.fetchReelComments.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // like reel
      .addCase(reelActions.likeReel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.likeReel.fulfilled,
        (state, action: PayloadAction<{ data: any }>) => {
          state.loading = false;
          state.reels =
            state.reels.length > 0
              ? state.reels.map((reel) => {
                  if (reel.id === action.payload.data.id) {
                    return action.payload.data;
                  }
                  return reel;
                })
              : [];
          state.userReels =
            state.userReels.length > 0
              ? state.userReels.map((reel) => {
                  if (reel.id === action.payload.data.id) {
                    return action.payload.data;
                  }
                  return reel;
                })
              : [];
          state.error = null;
        }
      )
      .addCase(reelActions.likeReel.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Create a comment for a reel
      .addCase(reelActions.createReelComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.createReelComment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.comments = action.payload.data.parent_comment_id
            ? state.comments.map((comment) => {
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
      .addCase(reelActions.createReelComment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Like a reel comment
      .addCase(reelActions.likeReelComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.likeReelComment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          const data = action.payload;

          if (data) {
            const { id, parent_comment_id } = data;

            if (parent_comment_id) {
              state.comments = state.comments.map((comment) => {
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
              });
            } else {
              const index = state.comments.findIndex(
                (comment) => comment.id === id
              );
              if (index !== -1) {
                state.comments[index] = data;
              }
            }
          }

          state.error = null;
        }
      )
      .addCase(reelActions.likeReelComment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Update a reel comment
      .addCase(reelActions.updateReelComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.updateReelComment.fulfilled,
        (state, action: PayloadAction<{ data: any }>) => {
          state.loading = false;
          state.comments = action.payload.data.parent_comment_id
            ? state.comments.map((comment) => {
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
      .addCase(reelActions.updateReelComment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })

      // Delete a reel comment
      .addCase(reelActions.deleteReelComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reelActions.deleteReelComment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          const deletedCommentId = action.payload;

          // Function to remove comment from replies
          const removeFromReplies = (replies: any[]) =>
            replies.filter((reply) => reply.id !== deletedCommentId);

          // Update comments array
          state.comments = state.comments.reduce((acc, comment) => {
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
          }, []);
          state.error = null;
        }
      )
      .addCase(reelActions.deleteReelComment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      });
  },
});

export default reelSlice.reducer;
