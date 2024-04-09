import { configureStore } from "@reduxjs/toolkit";
import stageSlice from "../views/stage/features/stageReducer";

export const store = configureStore({
  reducer: {
    stage: stageSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
