import { configureStore } from "@reduxjs/toolkit";
import catsReducer, { initialState } from "./catSlice";

const STORAGE_KEY = "catfact-redux-state";

function loadState(): { cats: typeof initialState } | undefined {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return undefined;

    const parsed = JSON.parse(saved);
    return { cats: { ...initialState, ...parsed.cats } };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: { cats: catsReducer },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      cats: store.getState().cats,
    }),
  );
});
