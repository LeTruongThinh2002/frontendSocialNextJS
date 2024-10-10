import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as newsActions from "./news.action";

export interface NewsState {
  latestNews: any[];
  currentNews: any | null;
  userNews: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  latestNews: [],
  currentNews: null,
  userNews: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addNewsCases(builder);
  },
});
export const addNewsCases = (builder: any) => {
  builder
    // Create a new news item
    .addCase(newsActions.createNews.pending, (state: { loading: boolean }) => {
      state.loading = true;
    })
    .addCase(
      newsActions.createNews.fulfilled,
      (
        state: { loading: boolean; latestNews: any[] },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.latestNews.unshift(action.payload);
      }
    )
    .addCase(
      newsActions.createNews.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: null } }
      ) => {
        state.loading = false;
        state.error = action.error.message || null;
      }
    )

    // Fetch latest news from followed users
    .addCase(
      newsActions.fetchLatestNews.pending,
      (state: { loading: boolean }) => {
        state.loading = true;
      }
    )
    .addCase(
      newsActions.fetchLatestNews.fulfilled,
      (
        state: { loading: boolean; latestNews: any[] },
        action: PayloadAction<any[]>
      ) => {
        state.loading = false;
        state.latestNews = action.payload;
      }
    )
    .addCase(
      newsActions.fetchLatestNews.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: null } }
      ) => {
        state.loading = false;
        state.error = action.error.message || null;
      }
    )

    // Fetch a specific news item
    .addCase(newsActions.fetchNews.pending, (state: { loading: boolean }) => {
      state.loading = true;
    })
    .addCase(
      newsActions.fetchNews.fulfilled,
      (
        state: { loading: boolean; currentNews: any },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.currentNews = action.payload;
      }
    )
    .addCase(
      newsActions.fetchNews.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: null } }
      ) => {
        state.loading = false;
        state.error = action.error.message || null;
      }
    )

    // Update a news item
    .addCase(newsActions.updateNews.pending, (state: { loading: boolean }) => {
      state.loading = true;
    })
    .addCase(
      newsActions.updateNews.fulfilled,
      (
        state: {
          loading: boolean;
          latestNews: any[];
          currentNews: { id: any };
        },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        const index = state.latestNews.findIndex(
          (news: { id: any }) => news.id === action.payload.id
        );
        if (index !== -1) {
          state.latestNews[index] = action.payload;
        }
        if (state.currentNews && state.currentNews.id === action.payload.id) {
          state.currentNews = action.payload;
        }
      }
    )
    .addCase(
      newsActions.updateNews.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: null } }
      ) => {
        state.loading = false;
        state.error = action.error.message || null;
      }
    )

    // Delete a news item
    .addCase(newsActions.deleteNews.pending, (state: { loading: boolean }) => {
      state.loading = true;
    })
    .addCase(
      newsActions.deleteNews.fulfilled,
      (
        state: {
          loading: boolean;
          latestNews: any[];
          currentNews: { id: string } | null;
        },
        action: PayloadAction<string>
      ) => {
        state.loading = false;
        state.latestNews = state.latestNews.filter(
          (news: { id: string }) => news.id !== action.payload
        );
        if (state.currentNews && state.currentNews.id === action.payload) {
          state.currentNews = null;
        }
      }
    )
    .addCase(
      newsActions.deleteNews.rejected,
      (
        state: { loading: boolean; error: any },
        action: { error: { message: null } }
      ) => {
        state.loading = false;
        state.error = action.error.message || null;
      }
    )

    // Fetch news of a specific user
    .addCase(
      newsActions.fetchUserNews.pending,
      (state: { loading: boolean }) => {
        state.loading = true;
      }
    )
    .addCase(
      newsActions.fetchUserNews.fulfilled,
      (
        state: { loading: boolean; userNews: any[]; error: any },
        action: PayloadAction<any>
      ) => {
        state.loading = false;
        state.userNews = action.payload;
        state.error = null;
      }
    )
    .addCase(
      newsActions.fetchUserNews.rejected,
      (
        state: { loading: boolean; userNews: any[]; error: any },
        action: { error: { message: null } }
      ) => {
        state.loading = false;
        state.userNews = [];
        state.error = action.error.message || null;
      }
    );
};

export default newsSlice.reducer;
