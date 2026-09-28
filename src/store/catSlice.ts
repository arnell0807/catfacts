import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HistoryItem = {
  fact: string;
  viewedAt: string;
};

type CatsState = {
  favorites: string[];
  history: HistoryItem[];
  totalViewed: number;
  lastFetchedAt: number;
};

export const initialState: CatsState = {
  favorites: [],
  history: [],
  totalViewed: 0,
  lastFetchedAt: 0,
};

const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const fact = action.payload;
      const index = state.favorites.indexOf(fact);

      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.unshift(fact);
      }
    },

    
    addToHistory(
      state,
      action: PayloadAction<{ fact: string; fetchedAt: number }>
    ) {
      const { fact, fetchedAt } = action.payload;
      if (fetchedAt <= state.lastFetchedAt) return;

      state.lastFetchedAt = fetchedAt;
      state.history.unshift({
        fact,
        viewedAt: new Date(fetchedAt).toISOString(),
      });

      state.history = state.history.slice(0, 50);
      state.totalViewed += 1;
    },

    clearHistory(state) {
      state.history = [];
      state.totalViewed = 0;
    },

    clearFavorites(state) {
      state.favorites = [];
    },
  },
});

export const {
  toggleFavorite,
  addToHistory,
  clearHistory,
  clearFavorites,
} = catSlice.actions;

export default catSlice.reducer;
